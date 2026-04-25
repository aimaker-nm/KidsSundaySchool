import { MagicLinkView } from "@kss/types";

const AGE_COLORS: Record<string, string> = {
  "0-4": "bg-orange-500",
  "5-9": "bg-green-500",
  "10-12": "bg-blue-500",
  "13-19": "bg-pink-500",
};

async function getChildData(token: string): Promise<MagicLinkView | null> {
  const apiUrl = process.env.API_URL ?? "http://localhost:8787";
  try {
    const res = await fetch(`${apiUrl}/child/${token}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ChildPage({ params }: { params: { token: string } }) {
  const data = await getChildData(params.token);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Link not found</h1>
          <p className="text-gray-500">Ask your teacher for a new link.</p>
        </div>
      </main>
    );
  }

  const { student, completions, currentLesson, currentWeek } = data;
  const colorClass = AGE_COLORS[student.ageGroup] ?? "bg-orange-500";

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4 max-w-lg mx-auto">
      <div className={`${colorClass} text-white rounded-2xl p-6 mb-6 shadow-lg`}>
        <p className="text-sm font-semibold opacity-80">Little Disciples</p>
        <h1 className="text-3xl font-extrabold">{student.name}</h1>
        <p className="text-sm mt-1 opacity-90">Ages {student.ageGroup} Class</p>
      </div>

      {currentWeek && currentLesson && (
        <div className="bg-white rounded-2xl shadow p-5 mb-6 border-l-4" style={{ borderColor: colorClass.replace("bg-", "") }}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">This Week</p>
          <h2 className="text-xl font-bold text-gray-800 mt-1">{currentWeek.title}</h2>

          <div className="mt-4 bg-yellow-50 rounded-xl p-4">
            <p className="text-xs font-bold text-yellow-700 uppercase">Memory Verse</p>
            <p className="text-gray-800 font-medium mt-1 italic">"{currentLesson.memoryVerse}"</p>
            <p className="text-xs text-gray-500 mt-1">{currentLesson.memoryVerseRef}</p>
          </div>

          {currentLesson.youtubeUrl && (
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Watch the Video</p>
              <a
                href={currentLesson.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${colorClass} text-white font-bold py-2 px-4 rounded-xl inline-block text-sm`}
              >
                Watch on YouTube
              </a>
            </div>
          )}

          <div className="mt-4">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Workbook Activity</p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">{currentLesson.workbook.activity}</p>
              <p>{currentLesson.workbook.prompt}</p>
              {currentLesson.workbook.prayerGuide && (
                <div className="mt-3 bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-blue-600 uppercase">Prayer</p>
                  <p className="text-gray-600 text-xs mt-1">{currentLesson.workbook.prayerGuide}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-orange-50 rounded-xl text-center">
            <p className="text-xs font-bold text-orange-600 uppercase">Big Truth</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">{currentWeek.bigTruth}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-bold text-gray-700 mb-3">Attendance</h3>
        {completions.length === 0 ? (
          <p className="text-gray-400 text-sm">No lessons completed yet.</p>
        ) : (
          <ul className="space-y-2">
            {completions.map((c) => (
              <li key={c.weekId} className="flex items-center gap-3 text-sm">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700 font-medium">{c.weekTitle}</span>
                <span className="text-gray-400 text-xs ml-auto">
                  {new Date(c.completedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
