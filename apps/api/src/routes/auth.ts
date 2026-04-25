import { Hono } from "hono";
import { Env } from "../index";
import { getTeacherByEmail, createChurch, createTeacher } from "@kss/db";
import { signJWT } from "../middleware/auth";

export const authRoutes = new Hono<{ Bindings: Env }>();

/* ─── REGISTER ─── */
authRoutes.post("/register", async (c) => {
  const body = await c.req.json<{
    name: string; church: string; email: string; password: string; ageGroup: string;
  }>();

  const { name, church, email, password, ageGroup } = body;

  if (!name || !church || !email || !password || !ageGroup) {
    return c.json({ error: "All fields are required" }, 400);
  }
  if (password.length < 8) {
    return c.json({ error: "Password must be at least 8 characters" }, 400);
  }
  if (!["0-4", "5-9", "10-12", "13-19"].includes(ageGroup)) {
    return c.json({ error: "Invalid age group" }, 400);
  }

  const existing = await getTeacherByEmail(c.env.DB, email.toLowerCase().trim());
  if (existing) {
    return c.json({ error: "An account with that email already exists" }, 409);
  }

  const passwordHash = await hashPassword(password);
  const churchId = await createChurch(c.env.DB, church.trim());
  const teacherId = await createTeacher(c.env.DB, {
    churchId,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    ageGroup,
  });

  const token = await signJWT({ sub: teacherId, email: email.toLowerCase().trim() }, c.env.JWT_SECRET);
  return c.json({ token, teacher: { id: teacherId, name: name.trim(), ageGroup } }, 201);
});

/* ─── LOGIN ─── */
authRoutes.post("/login", async (c) => {
  const body = await c.req.json<{ email: string; password: string }>();
  const { email, password } = body;

  if (!email || !password) {
    return c.json({ error: "Email and password required" }, 400);
  }

  const teacher = await getTeacherByEmail(c.env.DB, email.toLowerCase().trim()) as any;
  if (!teacher) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const valid = await verifyPassword(password, teacher.password_hash);
  if (!valid) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const token = await signJWT(
    { sub: teacher.id, email: teacher.email },
    c.env.JWT_SECRET
  );
  return c.json({
    token,
    teacher: { id: teacher.id, name: teacher.name, ageGroup: teacher.age_group },
  });
});

/* ─── PASSWORD HELPERS (PBKDF2 via Web Crypto) ─── */
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256
  );
  const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, "0")).join("");
  const hashHex = Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `pbkdf2:${saltHex}:${hashHex}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  // Legacy SHA-256 hashes (plain hex, no prefix)
  if (!stored.startsWith("pbkdf2:")) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return hex === stored;
  }

  const [, saltHex, hashHex] = stored.split(":");
  const salt = new Uint8Array((saltHex.match(/.{2}/g) ?? []).map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256
  );
  const newHashHex = Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return newHashHex === hashHex;
}
