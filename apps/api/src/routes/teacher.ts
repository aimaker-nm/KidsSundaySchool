import { Hono } from "hono";
import { Env } from "../index";
import { authMiddleware } from "../middleware/auth";
import { getStudentsByTeacher, createStudent, markComplete, getLatestWeek } from "@kss/db";

export const teacherRoutes = new Hono<{ Bindings: Env; Variables: { teacherId: string } }>();

teacherRoutes.use("*", authMiddleware);

teacherRoutes.get("/students", async (c) => {
  const teacherId = c.get("teacherId");
  const result = await getStudentsByTeacher(c.env.DB, teacherId) as any;
  return c.json(result.results);
});

teacherRoutes.post("/students", async (c) => {
  const teacherId = c.get("teacherId");
  const { name, ageGroup } = await c.req.json<{ name: string; ageGroup: string }>();
  if (!name || !ageGroup) return c.json({ error: "Name and age group required" }, 400);

  const { id, magicToken } = await createStudent(c.env.DB, teacherId, name, ageGroup);
  const magicLink = `${c.req.header("Origin") ?? "https://kids-sunday-school.pages.dev"}/child?token=${magicToken}`;
  return c.json({ id, magicLink }, 201);
});

teacherRoutes.post("/students/:studentId/complete", async (c) => {
  const { studentId } = c.req.param();
  const week = await getLatestWeek(c.env.DB) as any;
  if (!week) return c.json({ error: "No weeks found" }, 404);

  await markComplete(c.env.DB, studentId, week.id);
  return c.json({ success: true, weekId: week.id });
});
