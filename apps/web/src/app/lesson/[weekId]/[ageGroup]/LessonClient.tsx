"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AGE_COLORS: Record<string, { bg: string; header: string; light: string; text: string }> = {
  "0-4":   { bg: "bg-orange-500", header: "bg-orange-400", light: "bg-orange-50", text: "text-orange-600" },
  "5-9":   { bg: "bg-green-600",  header: "bg-green-500",  light: "bg-green-50",  text: "text-green-700"  },
  "10-12": { bg: "bg-blue-600",   header: "bg-blue-500",   light: "bg-blue-50",   text: "text-blue-700"   },
  "13-19": { bg: "bg-pink-600",   header: "bg-pink-500",   light: "bg-pink-50",   text: "text-pink-700"   },
};

export default function LessonClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [week, setWeek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const age = decodeURIComponent(ageGroup ?? "");
  const colors = AGE_COLORS[age] ?? AGE_COLORS["5-9"];
  const base = `/lesson/${weekId}/${encodeURIComponent(age)}`;

  useEffect(() => {
    const token = localStorage.getItem("kss_token");
    if (!token) { router.push("/"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson/week/${weekId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { setWeek(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [weekId]);

  if (loading) return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="text-orange-400 font-black animate-pulse text-lg">Loading…</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">

      {/* ── TOP HEADER (dark) ── */}
      <div className="bg-gray-800 text-white text-center py-2 px-4">
        <p className="text-xs md:text-sm font-black tracking-widest uppercase">
          Week {weekId} — {week?.title ?? ""}
        </p>
      </div>

      {/* ── SUBTITLE BAR ── */}
      <div className={`${colors.bg} text-white text-center py-3 px-4 shadow-md`}>
        <h1 className="text-lg md:text-2xl font-black tracking-wide uppercase">
          Ages {age}
        </h1>
      </div>

      {/* ── 3 BIG BOXES ── */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4">

        {/* Box 1 — Teaching Outline */}
        <button
          onClick={() => router.push(`${base}/teaching`)}
          className="w-full bg-white border-2 border-orange-400 rounded-2xl shadow-md overflow-hidden hover:shadow-lg active:scale-98 transition-all text-left"
        >
          <div className="bg-orange-400 text-white px-5 py-3 flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-black text-base uppercase tracking-wide">Teaching Outline</p>
              <p className="text-xs opacity-80">Memory Verse • Bible Teaching • Key Points</p>
            </div>
            <span className="ml-auto text-xl opacity-75">›</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-2 gap-2">
            {["1. Memory Verse", "2. Introduction", "3. Bible Teaching", "4. Key Points", "5. Life Application", "6. Confession & Prayer"].map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </button>

        {/* Box 2 — Video & Song */}
        <button
          onClick={() => router.push(`${base}/video`)}
          className="w-full bg-white border-2 border-blue-400 rounded-2xl shadow-md overflow-hidden hover:shadow-lg active:scale-98 transition-all text-left"
        >
          <div className="bg-blue-500 text-white px-5 py-3 flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <div>
              <p className="font-black text-base uppercase tracking-wide">Video & Song</p>
              <p className="text-xs opacity-80">Watch the Video • Song • Think About It</p>
            </div>
            <span className="ml-auto text-xl opacity-75">›</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-2 gap-2">
            {["📺 Watch the Video", "🎵 Song Lyrics", "💡 Think About It", "🙏 Worship Actions"].map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </button>

        {/* Box 3 — Workbook Activities */}
        <button
          onClick={() => router.push(`${base}/workbook`)}
          className="w-full bg-white border-2 border-green-500 rounded-2xl shadow-md overflow-hidden hover:shadow-lg active:scale-98 transition-all text-left"
        >
          <div className="bg-green-500 text-white px-5 py-3 flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            <div>
              <p className="font-black text-base uppercase tracking-wide">Workbook / Activities</p>
              <p className="text-xs opacity-80">Activities • Reflection • Prayer</p>
            </div>
            <span className="ml-auto text-xl opacity-75">›</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-2 gap-2">
            {["📝 Activity", "🎨 Creative Work", "💬 Reflection", "🙏 Prayer"].map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </button>

      </div>

      {/* ── FOOTER ── */}
      <div className="bg-orange-400 text-white text-center py-2 px-4 text-xs font-bold">
        Little Disciples — Walking with Jesus Every Day
      </div>

    </div>
  );
}
