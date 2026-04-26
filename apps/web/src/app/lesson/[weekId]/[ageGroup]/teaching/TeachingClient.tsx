"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AGE_COLOR: Record<string, string> = {
  "0-4": "bg-orange-500", "5-9": "bg-green-600",
  "10-12": "bg-blue-600", "13-19": "bg-pink-600",
};

function SectionIcon({ icon, color, num }: { icon: string; color: string; num: number }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-7 h-7 ${color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <span className="text-white text-xs font-black">{num}</span>
      </div>
      <span className="text-sm font-black text-gray-700 uppercase tracking-wide">{icon}</span>
    </div>
  );
}

export default function TeachingClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week, setWeek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const age = decodeURIComponent(ageGroup ?? "");
  const color = AGE_COLOR[age] ?? "bg-orange-500";

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

  if (loading) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center"><div className="text-orange-400 font-black animate-pulse">Loading…</div></div>;
  if (!lesson || !week) return <div className="min-h-screen flex items-center justify-center"><button onClick={() => router.back()} className="text-purple-600 font-bold">← Back</button></div>;

  const ex = lesson.teaching_extra ?? {};

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">

      {/* Header */}
      <div className="bg-gray-800 text-white text-center py-2">
        <p className="text-xs font-black tracking-widest uppercase">Week {weekId} — {week.title}</p>
      </div>
      <div className={`${color} text-white text-center py-3 shadow-md`}>
        <h1 className="text-base md:text-xl font-black tracking-widest uppercase">
          Teaching Outline (Age {age})
        </h1>
      </div>

      {/* Back */}
      <button onClick={() => router.back()} className="max-w-3xl mx-auto w-full px-4 pt-3 pb-0 text-left">
        <span className="text-xs text-gray-400 font-bold">← Back to Lesson</span>
      </button>

      {/* Content — 2 col on desktop */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* LEFT COLUMN */}
          <div className="space-y-4">

            {/* 1 Memory Verse */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <SectionIcon icon="Memory Verse" color="bg-yellow-500" num={1} />
              <p className="text-gray-800 font-bold text-sm italic leading-snug">
                &ldquo;{lesson.memory_verse}&rdquo;
              </p>
              <p className="text-xs font-black text-gray-500 mt-1">{lesson.memory_verse_ref}</p>
            </div>

            {/* 2 Introduction */}
            {ex.introduction && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <SectionIcon icon="Introduction" color="bg-yellow-400" num={2} />
                <p className="text-gray-700 text-sm leading-snug">{ex.introduction}</p>
              </div>
            )}

            {/* 3 Bible Teaching */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <SectionIcon icon="Bible Teaching" color="bg-orange-500" num={3} />
              <p className="text-xs font-bold text-gray-500 mb-2">We learn from the Bible:</p>
              <ul className="space-y-2">
                {lesson.bible_teaching.map((pt: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-orange-400 font-black flex-shrink-0 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">

            {/* 4 Key Points */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <SectionIcon icon="Key Points" color="bg-blue-500" num={4} />
              <ul className="space-y-1.5">
                {lesson.key_points.map((pt: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-semibold">
                    <span className="text-blue-500 font-black flex-shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5 Life Application */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <SectionIcon icon="Life Application" color="bg-pink-500" num={5} />
              <p className="text-gray-700 text-sm leading-snug">{lesson.life_application}</p>
            </div>

            {/* 6 Activity */}
            {ex.activity_note && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <SectionIcon icon="Activity" color="bg-yellow-400" num={6} />
                <p className="text-gray-700 text-sm">{ex.activity_note}</p>
              </div>
            )}

            {/* 7 Confession */}
            {ex.confession && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <SectionIcon icon="Confession" color="bg-green-500" num={7} />
                <p className="text-gray-800 font-bold text-sm italic">&ldquo;{ex.confession}&rdquo;</p>
              </div>
            )}

            {/* 8 Closing Prayer */}
            {ex.closing_prayer && (
              <div className="bg-purple-800 text-white rounded-2xl p-4 shadow-sm">
                <SectionIcon icon="Closing Prayer" color="bg-white/20" num={8} />
                <p className="text-sm italic opacity-90">{ex.closing_prayer}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Big Truth */}
      <div className={`${color} text-white text-center py-2 px-4`}>
        <p className="text-xs font-black uppercase tracking-widest">{week.big_truth}</p>
      </div>
      <div className="bg-yellow-400 text-white text-center py-1.5 px-4">
        <p className="text-xs font-bold">Little Disciples — Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
