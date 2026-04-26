"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const SECTIONS = [
  { num: 1, label: "MEMORY VERSE",     bg: "bg-blue-600",   icon: "📖" },
  { num: 2, label: "INTRODUCTION",     bg: "bg-yellow-500", icon: "💡" },
  { num: 3, label: "BIBLE TEACHING",   bg: "bg-amber-700",  icon: "📚" },
  { num: 4, label: "KEY POINTS",       bg: "bg-blue-500",   icon: "✓"  },
  { num: 5, label: "LIFE APPLICATION", bg: "bg-red-500",    icon: "❤️" },
  { num: 6, label: "ACTIVITY",         bg: "bg-yellow-400", icon: "⭐" },
  { num: 7, label: "CONFESSION",       bg: "bg-green-600",  icon: "🙏" },
  { num: 8, label: "CLOSING PRAYER",   bg: "bg-blue-400",   icon: "🙏" },
];

function Head({ i }: { i: number }) {
  const s = SECTIONS[i];
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-8 h-8 md:w-9 md:h-9 ${s.bg} rounded-full flex items-center justify-center flex-shrink-0 shadow`}>
        <span className="text-white text-xs md:text-sm leading-none">{s.icon}</span>
      </div>
      <span className="text-xs md:text-sm font-black text-gray-800 uppercase tracking-wide">
        {s.num}. {s.label}
      </span>
    </div>
  );
}

function Bullet({ bg }: { bg: string }) {
  return <div className={`w-2 h-2 rounded-full ${bg} flex-shrink-0 mt-1.5`} />;
}

export default function TeachingClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week,   setWeek]   = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const age = decodeURIComponent(ageGroup ?? "");

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

  if (loading) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <span className="text-orange-400 font-black animate-pulse text-xl">Loading…</span>
    </div>
  );
  if (!lesson || !week) return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={() => router.back()} className="text-blue-600 font-bold">← Back</button>
    </div>
  );

  const ex = lesson.teaching_extra ?? {};

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* ── WEEK HEADER ── */}
      <div className="bg-amber-300 py-2.5 px-6 flex items-center gap-4">
        <button onClick={() => router.back()}
          className="text-gray-700 font-black text-xs bg-white bg-opacity-50 px-3 py-1.5 rounded-lg hover:bg-opacity-70 transition flex-shrink-0">
          ←  Back
        </button>
        <p className="flex-1 text-center text-sm md:text-base font-black text-gray-800 uppercase tracking-widest">
          Week {weekId} – {week.title}
        </p>
      </div>

      {/* ── SUBTITLE ── */}
      <div className="bg-orange-500 py-3 px-6 text-center">
        <h1 className="text-base md:text-2xl font-black text-white uppercase tracking-widest">
          Teaching Outline (Age {age})
        </h1>
      </div>

      {/* ── FULL-WIDTH 2-COLUMN CONTENT ── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200 overflow-auto">

        {/* LEFT */}
        <div className="p-6 md:p-8 space-y-6 border-b md:border-b-0 border-gray-100">

          {/* 1. Memory Verse */}
          <div>
            <Head i={0} />
            <div className="ml-10 md:ml-12">
              <p className="text-sm md:text-base text-gray-800 font-semibold italic leading-snug">
                &ldquo;{lesson.memory_verse}&rdquo;
              </p>
              <p className="text-xs md:text-sm font-black text-gray-500 mt-1">{lesson.memory_verse_ref}</p>
            </div>
          </div>

          {/* 2. Introduction */}
          {ex.introduction && (
            <div>
              <Head i={1} />
              <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700 leading-relaxed">{ex.introduction}</p>
            </div>
          )}

          {/* 3. Bible Teaching */}
          <div>
            <Head i={2} />
            <div className="ml-10 md:ml-12">
              <p className="text-xs md:text-sm font-bold text-gray-600 mb-2">We learn from the Bible:</p>
              <ul className="space-y-2">
                {lesson.bible_teaching.map((pt: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Bullet bg="bg-orange-500" />
                    <span className="text-sm md:text-base text-gray-700 leading-snug">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-6 md:p-8 space-y-6">

          {/* 4. Key Points */}
          <div>
            <Head i={3} />
            <ul className="ml-10 md:ml-12 space-y-1.5">
              {lesson.key_points.map((pt: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Bullet bg="bg-blue-500" />
                  <span className="text-sm md:text-base text-gray-700 font-semibold">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Life Application */}
          <div>
            <Head i={4} />
            <div className="ml-10 md:ml-12">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{lesson.life_application}</p>
            </div>
          </div>

          {/* 6. Activity */}
          <div>
            <Head i={5} />
            <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700">{ex.activity_note ?? "See activity page."}</p>
          </div>

          {/* 7. Confession */}
          {ex.confession && (
            <div>
              <Head i={6} />
              <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-800 font-bold italic">
                &ldquo;{ex.confession}&rdquo;
              </p>
            </div>
          )}

          {/* 8. Closing Prayer */}
          {ex.closing_prayer && (
            <div>
              <Head i={7} />
              <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700 italic leading-relaxed">
                {ex.closing_prayer}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="bg-amber-300 py-2 px-6 text-center">
        <p className="text-sm font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
