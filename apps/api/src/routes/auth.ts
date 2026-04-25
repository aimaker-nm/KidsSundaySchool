import { Hono } from "hono";
import { Env } from "../index";
import { getTeacherByEmail } from "@kss/db";
import { signJWT } from "../middleware/auth";

export const authRoutes = new Hono<{ Bindings: Env }>();

authRoutes.post("/login", async (c) => {
  const { email, password } = await c.req.json<{ email: string; password: string }>();
  if (!email || !password) return c.json({ error: "Email and password required" }, 400);

  const teacher = await getTeacherByEmail(c.env.DB, email) as any;
  if (!teacher) return c.json({ error: "Invalid credentials" }, 401);

  const valid = await verifyPassword(password, teacher.password_hash);
  if (!valid) return c.json({ error: "Invalid credentials" }, 401);

  const token = await signJWT({ sub: teacher.id, email: teacher.email }, c.env.JWT_SECRET);
  return c.json({ token, teacher: { id: teacher.id, name: teacher.name, ageGroup: teacher.age_group } });
});

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const encoded = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex === hash;
}
