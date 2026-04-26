"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AGE_COLOR: Record<string, string> = {
  "0-4": "bg-orange-500", "5-9": "bg-green-600",
  "10-12": "bg-blue-600", "13-19": "bg-pink-600",
};

function DrawingBox({ label }: { label: string }) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center min-h-[140px] p-2">
      <span className="text-3xl mb-1">✏️</span>
      <p className="text-xs text-gray-400 font-semibold text-center">{label}</p>
    </div>
  );
}

function WritingLines({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3 mt-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-9 border-b-2 border-dashed border-gray-200 rounded" />
      ))}
    </div>
  );
}

export default function WorkbookClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week, setWeek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const age = decodeURIComponent(ageGroup ?? "");
  const color = AGE_COLOR[age] ?? "bg-green-500";
  const isYoung = age === "0-4";

  useEffect(() => {
    const token = localStorage.getItem("kss_token");
    if (!token) { router.push("/"); return; }
    const api = process.env.NEXT_PUBLIC_API_URL;
    Promise.all([
      fetch(`${api}/lesson/${weekId}/${encodeURIComponent(age)}`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${api}/lesson/week/${weekId}`, { headers: { Authorization: `Bearer ${token}` } }),
    ]).then(async ([lr, wr]) => {
      const [ld, wd] = await Promise.all([lr.json(), wr.json()]);
      setLesson(ld); setWeek(wd); setLoading(false);
    }).catch(() => setLoading(false));
  }, [weekId, age]);

  if (loading) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center"><div className="text-green-400 font-black animate-pulse">Loading…</div></div>;
  if (!lesson || !week) return <div className="min-h-screen flex items-center justify-center"><button onClick={() => router.back()} className="text-purple-600 font-bold">← Back</button></div>;

  const wb = lesson.workbook;
  const ex = lesson.teaching_extra ?? {};

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">

      {/* Header */}
      <div className="bg-gray-800 text-white text-center py-2">
        <p className="text-xs font-black tracking-widest uppercase">Week {weekId} — {week.title}</p>
      </div>
      <div className="bg-green-500 text-white text-center py-3 shadow-md">
        <h1 className="text-base md:text-xl font-black tracking-widest uppercase">
          Workbook / Activities (Age {age})
        </h1>
      </div>

      <button onClick={() => router.back()} className="max-w-3xl mx-auto w-full px-4 pt-3 text-left">
        <span className="text-xs text-gray-400 font-bold">← Back to Lesson</span>
      </button>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4">

        {isYoung ? (
          /* ── AGES 0-4: 4 quadrant layout ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Top-left: Look Color & Circle */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-orange-400 text-white px-4 py-2 flex items-center gap-2">
                <span>▶</span>
                <span className="font-black text-xs uppercase tracking-wide">Look, Color & Circle</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-3">
                  Color the picture.<br />Circle the things that show {week.theme.toLowerCase()}.
                </p>
                <DrawingBox label="Color & circle here" />
              </div>
            </div>

            {/* Top-right: Draw Yourself */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
                <span>▶</span>
                <span className="font-black text-xs uppercase tracking-wide">{wb.activity}</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-3">{wb.prompt}</p>
                <DrawingBox label="Draw here" />
              </div>
            </div>

            {/* Bottom-left: Match */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-orange-300 text-white px-4 py-2 flex items-center gap-2">
                <span>🔗</span>
                <span className="font-black text-xs uppercase tracking-wide">Match</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-3">Draw a line to match.</p>
                <div className="space-y-3">
                  {lesson.key_points.map((pt: string, i: number) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-gray-700 bg-orange-50 rounded-lg px-2 py-1">{pt}</span>
                      <div className="flex-1 border-b-2 border-dashed border-gray-200 mx-2" />
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                        {["👂","🙏","😊"][i] ?? "✓"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom-right: Prayer */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2">
                <span>🙏</span>
                <span className="font-black text-xs uppercase tracking-wide">Prayer</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed italic">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>

        ) : (
          /* ── AGES 5-9, 10-12, 13-19: Reflective layout ── */
          <div className="space-y-4">

            {/* Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`${color} text-white px-4 py-2 flex items-center gap-2`}>
                <span>✏️</span>
                <span className="font-black text-sm uppercase tracking-wide">{wb.activity}</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{wb.prompt}</p>
                <WritingLines count={5} />
              </div>
            </div>

            {/* For 5-9: draw box too */}
            {age === "5-9" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
                  <span>🎨</span>
                  <span className="font-black text-sm uppercase tracking-wide">Draw It</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-2">Draw a picture showing what you will do this week.</p>
                  <DrawingBox label="Draw here" />
                </div>
              </div>
            )}

            {/* For 10-12 / 13-19: extra scenario box */}
            {(age === "10-12" || age === "13-19") && (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4">
                <p className="text-xs font-black text-yellow-700 uppercase tracking-widest mb-2">📋 Read the Scenario</p>
                <p className="text-sm text-gray-700 font-semibold leading-snug">
                  {age === "10-12"
                    ? "Your teacher gives instructions. Others ignore it or keep talking."
                    : "You see a friend cheat on a test and pressure you to do the same."}
                </p>
                <WritingLines count={3} />
              </div>
            )}

            {/* Prayer */}
            <div className="bg-purple-800 text-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black opacity-70 uppercase tracking-widest mb-2">🙏 Prayer</p>
              <p className="text-sm italic leading-relaxed opacity-90">{wb.prayerGuide}</p>
            </div>
          </div>
        )}
      </div>

      <div className={`${color} text-white text-center py-2 px-4`}>
        <p className="text-xs font-black uppercase tracking-widest">{week.big_truth}</p>
      </div>
      <div className="bg-yellow-400 text-white text-center py-1.5">
        <p className="text-xs font-bold">Little Disciples — Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
