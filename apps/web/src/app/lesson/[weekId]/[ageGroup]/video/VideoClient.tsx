"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VideoClient() {
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
  const song = ex.song;
  const thinkLines: string[] = (ex.think_about_it ?? "").split("\n").filter(Boolean);

  const videoId = lesson.youtube_url
    ? (lesson.youtube_url.split("v=")[1] ?? lesson.youtube_url.split("/").pop())
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* WEEK HEADER */}
      <div className="bg-amber-300 py-2.5 px-6 flex items-center gap-4">
        <button onClick={() => router.back()}
          className="text-gray-700 font-black text-xs bg-white bg-opacity-50 px-3 py-1.5 rounded-lg hover:bg-opacity-70 transition flex-shrink-0">
          ← Back
        </button>
        <p className="flex-1 text-center text-sm md:text-base font-black text-gray-800 uppercase tracking-widest">
          Week {weekId} – {week.title}
        </p>
      </div>

      {/* SUBTITLE */}
      <div className="bg-orange-500 py-3 px-6 text-center">
        <h1 className="text-base md:text-2xl font-black text-white uppercase tracking-widest">
          Video &amp; Song (Age {age})
        </h1>
      </div>

      {/* FULL-WIDTH 2-COL */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200">

        {/* LEFT — Watch the Video */}
        <div className="flex flex-col border-b md:border-b-0 border-gray-100">

          <div className="bg-orange-400 text-white px-6 py-3 flex items-center gap-3">
            <span className="text-xl font-black">▶</span>
            <span className="text-sm md:text-base font-black uppercase tracking-wide">Watch the Video</span>
          </div>

          <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">
            {videoId ? (
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                <iframe src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full" allowFullScreen title="Lesson video" />
              </div>
            ) : (
              /* TV placeholder — styled like the curriculum */
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800 flex flex-col">
                <div className="flex-1 flex items-center justify-center p-8 min-h-[200px] md:min-h-[260px]">
                  <div className="bg-gray-700 rounded-xl w-full h-full flex flex-col items-center justify-center p-6 min-h-[160px]">
                    <span className="text-6xl md:text-8xl mb-4">📺</span>
                    <p className="text-gray-300 text-sm md:text-base text-center font-semibold">
                      {ex.video_description ?? "Video coming soon!"}
                    </p>
                  </div>
                </div>
                {/* QR code row */}
                <div className="bg-gray-900 px-6 py-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">⬛</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-semibold">Scan to watch the video!</p>
                    <p className="text-gray-500 text-xs mt-0.5">Ask your teacher for the link</p>
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm md:text-base text-gray-600 font-semibold italic text-center">
              {ex.video_description}
            </p>
          </div>

          {/* THINK ABOUT IT — amber strip at the bottom */}
          <div className="bg-amber-200 px-6 py-4">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
              <div className="flex-1">
                <p className="text-xs md:text-sm font-black text-gray-800 uppercase tracking-widest mb-2">
                  Think About It
                </p>
                {thinkLines.length === 1 ? (
                  <div>
                    <p className="text-sm md:text-base text-gray-700 font-semibold">{thinkLines[0].replace(/^\d+\.\s*/,"")}</p>
                    <div className="mt-2 border-b-2 border-dashed border-gray-400" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {thinkLines.map((q, i) => (
                      <div key={i}>
                        <p className="text-sm md:text-base text-gray-700 font-semibold">
                          {i+1}. {q.replace(/^\d+\.\s*/,"")}
                        </p>
                        <div className="mt-1 border-b-2 border-dashed border-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Song or Discussion */}
        <div className="flex flex-col">
          {song ? (
            <>
              <div className="bg-amber-300 px-6 py-3 flex items-center gap-3">
                <span className="text-xl">🎵</span>
                <span className="text-sm md:text-base font-black text-gray-800 uppercase tracking-wide">
                  Song: {song.title}
                </span>
                <span className="text-xl ml-auto">🎵</span>
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
                {/* Lyrics box */}
                <div className="bg-yellow-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
                  <div className="text-center space-y-1">
                    {song.lyrics.split("\n").map((line: string, i: number) => (
                      <p key={i} className={`leading-relaxed ${
                        line.startsWith("(")
                          ? "text-orange-500 font-black text-base md:text-lg"
                          : line === ""
                          ? "my-2"
                          : "text-gray-800 font-semibold text-base md:text-lg"
                      }`}>
                        {line || " "}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {song.actions?.map((a: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
                      <span className="text-2xl flex-shrink-0">{a.split(" ")[0]}</span>
                      <span className="text-sm md:text-base text-gray-700 font-semibold">
                        {a.split(" ").slice(1).join(" ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-500 text-white px-6 py-3 flex items-center gap-3">
                <span className="text-xl">💬</span>
                <span className="text-sm md:text-base font-black uppercase tracking-wide">Discussion Guide</span>
              </div>

              <div className="flex-1 p-6 md:p-8 space-y-5">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs font-black text-blue-700 uppercase mb-1">After watching the video:</p>
                  <p className="text-sm md:text-base text-gray-700 italic leading-relaxed">{ex.video_description}</p>
                </div>
                {thinkLines.map((q, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <p className="text-sm md:text-base font-bold text-gray-800 mb-3">
                      {i+1}. {q.replace(/^\d+\.\s*/,"")}
                    </p>
                    <div className="space-y-2">
                      <div className="h-8 border-b-2 border-dashed border-gray-200" />
                      <div className="h-8 border-b-2 border-dashed border-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-amber-300 py-2 px-6 text-center">
        <p className="text-sm font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
