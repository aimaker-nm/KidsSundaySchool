import { Hono } from "hono";
import { Env } from "../index";
import { getStudentByToken, getCompletionsByStudent, getLessonByWeekAndAgeGroup, getLatestWeek, getWeek } from "@kss/db";

export const magicLinkRoutes = new Hono<{ Bindings: Env }>();

magicLinkRoutes.get("/:token", async (c) => {
  const { token } = c.req.param();
  const student = await getStudentByToken(c.env.DB, token) as any;
  if (!student) return c.json({ error: "Not found" }, 404);

  const [completionsResult, currentWeek] = await Promise.all([
    getCompletionsByStudent(c.env.DB, student.id) as any,
    getLatestWeek(c.env.DB) as any,
  ]);

  const completions = completionsResult.results.map((r: any) => ({
    weekId: r.week_id,
    weekTitle: r.week_title,
    completedAt: r.completed_at,
  }));

  let currentLesson = null;
  if (currentWeek) {
    const lessonRow = await getLessonByWeekAndAgeGroup(c.env.DB, currentWeek.id, student.age_group) as any;
    if (lessonRow) {
      currentLesson = {
        ...lessonRow,
        bibleTeaching: JSON.parse(lessonRow.bible_teaching),
        keyPoints: JSON.parse(lessonRow.key_points),
        workbook: JSON.parse(lessonRow.workbook),
      };
    }
  }

  return c.json({
    student: { name: student.name, ageGroup: student.age_group },
    completions,
    currentLesson,
    currentWeek,
  });
});
