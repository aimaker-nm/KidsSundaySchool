import WorkbookClient from "./WorkbookClient";

export function generateStaticParams() {
  return ["1","2","3"].flatMap((weekId) =>
    ["0-4","5-9","10-12","13-19"].map((ageGroup) => ({ weekId, ageGroup }))
  );
}

export default function WorkbookPage() {
  return <WorkbookClient />;
}
