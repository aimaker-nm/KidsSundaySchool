"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VideoClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week, setWeek] = useState<any>(null);
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

  if (loading) return <div className="min-h-screen bg-amber-50 flex items-center justify-center"><span className="text-orange-400 font-black animate-pulse">Loading…</span></div>;
  if (!lesson || !week) return <div className="min-h-screen flex items-center justify-center"><button onClick={() => router.back()} className="text-blue-600 font-bold">← Back</button></div>;

  const ex = lesson.teaching_extra ?? {};
  const song = ex.song;
  const thinkLines: string[] = (ex.think_about_it ?? "").split("\n").filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* WEEK HEADER */}
      <div className="bg-amber-300 py-2 px-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-700 font-black text-xs bg-white bg-opacity-40 px-2 py-1 rounded-lg">←</button>
        <p className="flex-1 text-center text-xs md:text-sm font-black text-gray-800 uppercase tracking-wider">
          Week {weekId} — {week.title}
        </p>
      </div>

      {/* SUBTITLE */}
      <div className="bg-orange-500 py-3 px-4 text-center">
        <h1 className="text-sm md:text-xl font-black text-white uppercase tracking-widest">
          Video &amp; Song (Age {age})
        </h1>
      </div>

      {/* MAIN 2-COL */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:divide-x divide-gray-200 overflow-auto">

        {/* LEFT — Watch the Video */}
        <div className="flex flex-col border-b md:border-b-0 border-gray-100">
          {/* Section header */}
          <div className="bg-orange-400 text-white px-4 py-2 flex items-center gap-2">
            <span className="text-base font-black">▶</span>
            <span className="text-sm font-black uppercase tracking-wide">Watch the Video</span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {/* TV */}
            {lesson.youtube_url ? (
              <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.youtube_url.split("v=")[1] ?? lesson.youtube_url.split("/").pop()}`}
                  className="w-full h-full" allowFullScreen title="Lesson video"
                />
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md">
                {/* TV frame */}
                <div className="bg-gray-700 mx-auto my-3 rounded-lg flex items-center justify-center" style={{ aspectRatio: "4/3", maxHeight: 180 }}>
                  <div className="text-center">
                    <span className="text-5xl">📺</span>
                    <p className="text-gray-300 text-xs mt-1 px-2 font-semibold">
                      {ex.video_description ?? "Video coming soon"}
                    </p>
                  </div>
                </div>
                {/* QR placeholder */}
                <div className="bg-gray-900 px-4 pb-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⬛</span>
                  </div>
                  <p className="text-gray-400 text-xs">Scan to watch the video!</p>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-600 font-semibold text-center italic">
              {ex.video_description}
            </p>
          </div>

          {/* THINK ABOUT IT — bottom strip */}
          <div className="mt-auto">
            <div className="bg-amber-200 px-4 py-3">
              <div className="flex items-start gap-2">
                <span className="text-base">💡</span>
                <div className="flex-1">
                  <p className="text-xs font-black text-gray-800 uppercase tracking-wide mb-1">Think About It</p>
                  {thinkLines.length === 1 ? (
                    <div>
                      <p className="text-xs text-gray-700 font-semibold">{thinkLines[0].replace(/^\d+\.\s*/,"")}</p>
                      <div className="mt-1 border-b border-gray-400 border-dashed" />
                    </div>
                  ) : (
                    <ol className="space-y-1.5">
                      {thinkLines.map((q, i) => (
                        <li key={i}>
                          <p className="text-xs text-gray-700 font-semibold">{i + 1}. {q.replace(/^\d+\.\s*/,"")}</p>
                          <div className="mt-0.5 border-b border-gray-400 border-dashed" />
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Song or Discussion */}
        <div className="flex flex-col">
          {song ? (
            <>
              {/* Song header */}
              <div className="bg-amber-300 px-4 py-2 flex items-center gap-2">
                <span className="text-base">🎵</span>
                <span className="text-sm font-black text-gray-800 uppercase tracking-wide">Song: {song.title}</span>
                <span className="text-base ml-auto">🎵</span>
              </div>
              <div className="p-4 flex-1">
                {/* Lyrics box */}
                <div className="bg-yellow-50 border-2 border-amber-200 rounded-xl p-4 mb-4">
                  {song.lyrics.split("\n").map((line: string, i: number) => (
                    <p key={i} className={`text-sm leading-relaxed text-center ${
                      line.startsWith("(") ? "text-orange-500 font-black" :
                      line === "" ? "my-1" :
                      "text-gray-800 font-semibold"
                    }`}>
                      {line || " "}
                    </p>
                  ))}
                </div>
                {/* Actions */}
                <div className="space-y-3">
                  {song.actions?.map((a: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
                      <span className="text-xl flex-shrink-0">{a.split(" ")[0]}</span>
                      <span className="text-sm text-gray-700 font-semibold">{a.split(" ").slice(1).join(" ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
                <span className="text-base">💬</span>
                <span className="text-sm font-black uppercase tracking-wide">Discussion</span>
              </div>
              <div className="p-4 flex-1 space-y-3">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                  <p className="text-xs font-black text-blue-700 uppercase mb-1">After watching the video:</p>
                  <p className="text-sm text-gray-700 italic">{ex.video_description}</p>
                </div>
                {thinkLines.map((q, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                    <p className="text-xs font-black text-gray-500 mb-1">{i + 1}.</p>
                    <p className="text-sm text-gray-800 font-semibold">{q.replace(/^\d+\.\s*/,"")}</p>
                    <div className="mt-2 space-y-1">
                      <div className="h-6 border-b border-dashed border-gray-200" />
                      <div className="h-6 border-b border-dashed border-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-amber-300 py-2 px-4 text-center">
        <p className="text-xs font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
