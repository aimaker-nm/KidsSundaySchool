import LessonClient from "./LessonClient";

export function generateStaticParams() {
  const weeks = ["1", "2", "3"];
  const ages = ["0-4", "5-9", "10-12", "13-19"];
  return weeks.flatMap((weekId) =>
    ages.map((ageGroup) => ({ weekId, ageGroup }))
  );
}

export default function LessonPage() {
  return <LessonClient />;
}
