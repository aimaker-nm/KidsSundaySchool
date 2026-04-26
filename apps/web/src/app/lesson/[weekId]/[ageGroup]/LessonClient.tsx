"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AGE_COLORS: Record<string, { bg: string; light: string }> = {
  "0-4":   { bg: "bg-orange-500", light: "bg-orange-50" },
  "5-9":   { bg: "bg-green-600",  light: "bg-green-50"  },
  "10-12": { bg: "bg-blue-600",   light: "bg-blue-50"   },
  "13-19": { bg: "bg-pink-600",   light: "bg-pink-50"   },
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
    }).then(r => r.json()).then(d => { setWeek(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [weekId]);

  if (loading) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <span className="text-orange-400 font-black animate-pulse text-lg">Loading…</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* WEEK HEADER */}
      <div className="bg-amber-300 py-2.5 px-6 flex items-center gap-4">
        <button onClick={() => router.push("/dashboard")}
          className="text-gray-700 font-black text-xs bg-white bg-opacity-50 px-3 py-1.5 rounded-lg hover:bg-opacity-70 transition">
          ← Dashboard
        </button>
        <p className="flex-1 text-center text-sm md:text-base font-black text-gray-800 uppercase tracking-widest">
          Week {weekId} — {week?.title ?? ""}
        </p>
      </div>

      {/* SUBTITLE */}
      <div className={`${colors.bg} text-white py-4 px-6 text-center`}>
        <h1 className="text-xl md:text-3xl font-black uppercase tracking-widest">
          Ages {age}
        </h1>
        <p className="text-sm opacity-80 mt-0.5">{week?.theme}</p>
      </div>

      {/* 3 BOXES — row on desktop, stacked on mobile */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">

        {/* Box 1 — Teaching Outline */}
        <button onClick={() => router.push(`${base}/teaching`)}
          className="flex flex-col hover:bg-orange-50 active:bg-orange-100 transition text-left group">
          <div className="bg-orange-500 text-white px-6 py-4 flex items-center gap-3 group-hover:bg-orange-600 transition">
            <span className="text-3xl">📖</span>
            <div>
              <p className="font-black text-lg uppercase tracking-wide">Teaching Outline</p>
              <p className="text-xs opacity-80">Memory Verse • Bible Teaching • Key Points</p>
            </div>
            <span className="ml-auto text-2xl opacity-60">›</span>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-3">
              {["1. Memory Verse","2. Introduction","3. Bible Teaching","4. Key Points","5. Life Application","6. Activity","7. Confession","8. Closing Prayer"].map((s,i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 font-semibold">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </button>

        {/* Box 2 — Video & Song */}
        <button onClick={() => router.push(`${base}/video`)}
          className="flex flex-col hover:bg-blue-50 active:bg-blue-100 transition text-left group">
          <div className="bg-blue-500 text-white px-6 py-4 flex items-center gap-3 group-hover:bg-blue-600 transition">
            <span className="text-3xl">🎬</span>
            <div>
              <p className="font-black text-lg uppercase tracking-wide">Video &amp; Song</p>
              <p className="text-xs opacity-80">Watch • Song Lyrics • Think About It</p>
            </div>
            <span className="ml-auto text-2xl opacity-60">›</span>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-3">
              {["📺 Watch the Video","🎵 Song: I Will Obey / God Is With Me","💡 Think About It","🙌 Worship Actions"].map((s,i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 font-semibold">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </button>

        {/* Box 3 — Workbook */}
        <button onClick={() => router.push(`${base}/workbook`)}
          className="flex flex-col hover:bg-green-50 active:bg-green-100 transition text-left group">
          <div className="bg-green-500 text-white px-6 py-4 flex items-center gap-3 group-hover:bg-green-600 transition">
            <span className="text-3xl">✏️</span>
            <div>
              <p className="font-black text-lg uppercase tracking-wide">Workbook / Activities</p>
              <p className="text-xs opacity-80">Color • Draw • Match • Prayer</p>
            </div>
            <span className="ml-auto text-2xl opacity-60">›</span>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-3">
              {["🎨 Look, Color & Circle","✏️ Draw Yourself","🔗 Match Activity","🙏 Prayer"].map((s,i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600 font-semibold">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </button>

      </div>

      {/* FOOTER */}
      <div className="bg-amber-300 py-2 px-6 text-center">
        <p className="text-xs font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
