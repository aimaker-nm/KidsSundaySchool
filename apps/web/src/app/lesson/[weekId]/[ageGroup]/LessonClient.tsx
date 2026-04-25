"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AGE_COLORS: Record<string, { bg: string; border: string; light: string; text: string }> = {
  "0-4":   { bg: "bg-orange-500", border: "border-orange-500", light: "bg-orange-50", text: "text-orange-600" },
  "5-9":   { bg: "bg-green-600",  border: "border-green-600",  light: "bg-green-50",  text: "text-green-700"  },
  "10-12": { bg: "bg-blue-600",   border: "border-blue-600",   light: "bg-blue-50",   text: "text-blue-700"   },
  "13-19": { bg: "bg-pink-600",   border: "border-pink-600",   light: "bg-pink-50",   text: "text-pink-700"   },
};

interface Lesson {
  id: string; week_id: number; age_group: string;
  memory_verse: string; memory_verse_ref: string;
  bible_teaching: string[]; key_points: string[];
  life_application: string; youtube_url?: string;
  workbook: { activity: string; prompt: string; prayerGuide?: string };
}
interface Week { id: number; title: string; theme: string; big_truth: string; }

export default function LessonClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [week, setWeek] = useState<Week | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"teach" | "workbook">("teach");

  const age = decodeURIComponent(ageGroup ?? "");
  const colors = AGE_COLORS[age] ?? AGE_COLORS["5-9"];

  useEffect(() => {
    const token = localStorage.getItem("kss_token");
    if (!token) { router.push("/"); return; }

    const api = process.env.NEXT_PUBLIC_API_URL;
    Promise.all([
      fetch(`${api}/lesson/${weekId}/${encodeURIComponent(age)}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${api}/lesson/week/${weekId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(async ([lr, wr]) => {
        const [ld, wd] = await Promise.all([lr.json(), wr.json()]);
        setLesson(ld);
        setWeek(wd);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [weekId, age]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-purple-500 font-bold animate-pulse">Loading lesson…</div>
    </div>
  );

  if (!lesson || !week) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 font-semibold">Lesson not found.</p>
        <button onClick={() => router.back()} className="mt-3 text-purple-600 font-bold text-sm">← Back</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className={`${colors.bg} text-white px-4 py-5 shadow-lg`}>
        <div className="max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-white opacity-80 text-sm mb-2 flex items-center gap-1">
            ← Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold opacity-75 uppercase tracking-widest">Week {week.id} • Ages {age}</p>
              <h1 className="text-2xl font-black leading-tight mt-0.5">{week.title}</h1>
              <p className="text-sm opacity-90 mt-0.5 italic">{week.theme}</p>
            </div>
            <div className="text-4xl">✝</div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Memory Verse */}
        <div className={`${colors.light} border-l-4 ${colors.border} rounded-xl px-5 py-4`}>
          <p className={`text-xs font-black uppercase tracking-widest ${colors.text} mb-1`}>📖 Memory Verse</p>
          <p className="text-gray-900 font-bold text-lg leading-snug italic">
            &ldquo;{lesson.memory_verse}&rdquo;
          </p>
          <p className={`text-sm font-black mt-1 ${colors.text}`}>{lesson.memory_verse_ref}</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <button onClick={() => setActiveTab("teach")}
            className={`flex-1 py-3 text-sm font-black transition ${activeTab === "teach" ? `${colors.bg} text-white` : "text-gray-400"}`}>
            📚 Teaching
          </button>
          <button onClick={() => setActiveTab("workbook")}
            className={`flex-1 py-3 text-sm font-black transition ${activeTab === "workbook" ? `${colors.bg} text-white` : "text-gray-400"}`}>
            ✏️ Workbook
          </button>
        </div>

        {activeTab === "teach" ? (
          <div className="space-y-4">

            {/* Bible Teaching */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">📖 Bible Teaching</p>
              <ul className="space-y-3">
                {lesson.bible_teaching.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`${colors.bg} text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">🔑 Key Points</p>
              <ul className="space-y-2">
                {lesson.key_points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`text-lg leading-none ${colors.text}`}>✓</span>
                    <span className="text-gray-800 text-sm font-semibold">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video */}
            {lesson.youtube_url && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">🎬 Video</p>
                <a href={lesson.youtube_url} target="_blank" rel="noopener noreferrer"
                  className={`${colors.bg} text-white font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2 text-sm`}>
                  ▶ Watch on YouTube
                </a>
              </div>
            )}

            {/* Life Application */}
            <div className="bg-purple-800 text-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black opacity-70 uppercase tracking-widest mb-2">❤️ Life Application</p>
              <p className="font-bold text-sm leading-snug">{lesson.life_application}</p>
            </div>

            {/* Big Truth */}
            <div className={`${colors.light} ${colors.border} border-2 rounded-2xl p-4 text-center`}>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Big Truth</p>
              <p className={`text-base font-black ${colors.text}`}>{week.big_truth}</p>
            </div>

          </div>
        ) : (
          <div className="space-y-4">

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className={`text-sm font-black ${colors.text} mb-2`}>{lesson.workbook.activity}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{lesson.workbook.prompt}</p>
              <div className="mt-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 border-b-2 border-dashed border-gray-100" />
                ))}
              </div>
            </div>

            {lesson.workbook.prayerGuide && (
              <div className={`${colors.light} border-l-4 ${colors.border} rounded-xl px-5 py-4`}>
                <p className={`text-xs font-black ${colors.text} uppercase tracking-widest mb-2`}>🙏 Prayer</p>
                <p className="text-gray-700 text-sm leading-relaxed italic">{lesson.workbook.prayerGuide}</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
