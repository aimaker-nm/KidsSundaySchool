export type D1Database = import("@cloudflare/workers-types").D1Database;

export async function getStudentByToken(db: D1Database, token: string) {
  return db.prepare("SELECT * FROM students WHERE magic_token = ?").bind(token).first();
}

export async function getCompletionsByStudent(db: D1Database, studentId: string) {
  return db
    .prepare(`
      SELECT c.*, w.title as week_title
      FROM completions c
      JOIN weeks w ON w.id = c.week_id
      WHERE c.student_id = ?
      ORDER BY c.week_id DESC
    `)
    .bind(studentId)
    .all();
}

export async function getLessonByWeekAndAgeGroup(db: D1Database, weekId: number, ageGroup: string) {
  return db
    .prepare("SELECT * FROM lessons WHERE week_id = ? AND age_group = ?")
    .bind(weekId, ageGroup)
    .first();
}

export async function getWeek(db: D1Database, weekId: number) {
  return db.prepare("SELECT * FROM weeks WHERE id = ?").bind(weekId).first();
}

export async function getLatestWeek(db: D1Database) {
  return db.prepare("SELECT * FROM weeks ORDER BY id DESC LIMIT 1").first();
}

export async function markComplete(db: D1Database, studentId: string, weekId: number) {
  const id = crypto.randomUUID();
  return db
    .prepare("INSERT OR IGNORE INTO completions (id, student_id, week_id) VALUES (?, ?, ?)")
    .bind(id, studentId, weekId)
    .run();
}

export async function getTeacherByEmail(db: D1Database, email: string) {
  return db.prepare("SELECT * FROM teachers WHERE email = ?").bind(email).first();
}

export async function getStudentsByTeacher(db: D1Database, teacherId: string) {
  return db
    .prepare("SELECT * FROM students WHERE teacher_id = ? ORDER BY name")
    .bind(teacherId)
    .all();
}

export async function createStudent(
  db: D1Database,
  teacherId: string,
  name: string,
  ageGroup: string
) {
  const id = crypto.randomUUID();
  const magicToken = crypto.randomUUID();
  await db
    .prepare("INSERT INTO students (id, teacher_id, name, age_group, magic_token) VALUES (?, ?, ?, ?, ?)")
    .bind(id, teacherId, name, ageGroup, magicToken)
    .run();
  return { id, magicToken };
}
