export type AgeGroup = "0-4" | "5-9" | "10-12" | "13-19";

export interface Church {
  id: string;
  name: string;
  createdAt: string;
}

export interface Teacher {
  id: string;
  churchId: string;
  name: string;
  email: string;
  ageGroup: AgeGroup;
  createdAt: string;
}

export interface Student {
  id: string;
  teacherId: string;
  name: string;
  ageGroup: AgeGroup;
  magicToken: string;
  createdAt: string;
}

export interface Week {
  id: number;
  title: string;
  theme: string;
  bigTruth: string;
}

export interface Lesson {
  id: string;
  weekId: number;
  ageGroup: AgeGroup;
  memoryVerse: string;
  memoryVerseRef: string;
  bibleTeaching: string[];
  keyPoints: string[];
  lifeApplication: string;
  youtubeUrl?: string;
  workbook: WorkbookPage;
}

export interface WorkbookPage {
  activity: string;
  prompt: string;
  prayerGuide?: string;
}

export interface Completion {
  id: string;
  studentId: string;
  weekId: number;
  completedAt: string;
}

export interface MagicLinkView {
  student: Pick<Student, "name" | "ageGroup">;
  completions: { weekId: number; weekTitle: string; completedAt: string }[];
  currentLesson: Lesson | null;
  currentWeek: Week | null;
}
