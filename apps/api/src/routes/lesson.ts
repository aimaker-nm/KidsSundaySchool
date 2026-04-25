import { Hono } from "hono";
import { Env } from "../index";
import { authMiddleware } from "../middleware/auth";
import { getLessonByWeekAndAgeGroup, getWeek } from "@kss/db";

export const lessonRoutes = new Hono<{ Bindings: Env }>();

lessonRoutes.use("*", authMiddleware);

lessonRoutes.get("/week/:weekId", async (c) => {
  const weekId = Number(c.req.param("weekId"));
  const week = await getWeek(c.env.DB, weekId);
  if (!week) return c.json({ error: "Week not found" }, 404);
  return c.json(week);
});

lessonRoutes.get("/:weekId/:ageGroup", async (c) => {
  const weekId = Number(c.req.param("weekId"));
  const ageGroup = decodeURIComponent(c.req.param("ageGroup"));

  const lessonRow = await getLessonByWeekAndAgeGroup(c.env.DB, weekId, ageGroup) as any;
  if (!lessonRow) return c.json({ error: "Lesson not found" }, 404);

  return c.json({
    ...lessonRow,
    bible_teaching: JSON.parse(lessonRow.bible_teaching),
    key_points:     JSON.parse(lessonRow.key_points),
    workbook:       JSON.parse(lessonRow.workbook),
  });
});

lessonRoutes.get("/all/:weekId", async (c) => {
  const weekId = Number(c.req.param("weekId"));
  const result = await c.env.DB
    .prepare("SELECT * FROM lessons WHERE week_id = ? ORDER BY age_group")
    .bind(weekId)
    .all() as any;

  const lessons = result.results.map((r: any) => ({
    ...r,
    bible_teaching: JSON.parse(r.bible_teaching),
    key_points:     JSON.parse(r.key_points),
    workbook:       JSON.parse(r.workbook),
  }));
  return c.json(lessons);
});
