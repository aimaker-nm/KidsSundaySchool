"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AGE_COLOR: Record<string, string> = {
  "0-4": "bg-orange-500", "5-9": "bg-green-600",
  "10-12": "bg-blue-600", "13-19": "bg-pink-600",
};

export default function VideoClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week, setWeek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const age = decodeURIComponent(ageGroup ?? "");
  const color = AGE_COLOR[age] ?? "bg-blue-500";

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

  if (loading) return <div className="min-h-screen bg-yellow-50 flex items-center justify-center"><div className="text-blue-400 font-black animate-pulse">Loading…</div></div>;
  if (!lesson || !week) return <div className="min-h-screen flex items-center justify-center"><button onClick={() => router.back()} className="text-purple-600 font-bold">← Back</button></div>;

  const ex = lesson.teaching_extra ?? {};
  const song = ex.song;
  const thinkAboutIt: string = ex.think_about_it ?? "";

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">

      {/* Header */}
      <div className="bg-gray-800 text-white text-center py-2">
        <p className="text-xs font-black tracking-widest uppercase">Week {weekId} — {week.title}</p>
      </div>
      <div className="bg-blue-500 text-white text-center py-3 shadow-md">
        <h1 className="text-base md:text-xl font-black tracking-widest uppercase">
          Video & Song (Age {age})
        </h1>
      </div>

      <button onClick={() => router.back()} className="max-w-3xl mx-auto w-full px-4 pt-3 text-left">
        <span className="text-xs text-gray-400 font-bold">← Back to Lesson</span>
      </button>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* LEFT — Watch Video */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
                <span className="text-lg">▶</span>
                <span className="font-black text-sm uppercase tracking-wide">Watch the Video</span>
              </div>
              <div className="p-4">
                {lesson.youtube_url ? (
                  <div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video mb-3">
                      <iframe
                        src={`https://www.youtube.com/embed/${lesson.youtube_url.split("v=")[1] ?? lesson.youtube_url.split("/").pop()}`}
                        className="w-full h-full"
                        allowFullScreen
                        title="Lesson Video"
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center">{ex.video_description}</p>
                  </div>
                ) : (
                  <div>
                    {/* TV placeholder */}
                    <div className="bg-gray-800 rounded-xl p-6 mb-3 flex flex-col items-center justify-center aspect-video">
                      <span className="text-5xl mb-2">📺</span>
                      <p className="text-gray-300 text-xs text-center font-semibold">
                        {ex.video_description ?? "Video coming soon!"}
                      </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
                      <p className="text-xs font-bold text-yellow-700">📌 Add YouTube URL in the lesson settings to embed the video here.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Think About It */}
            {thinkAboutIt && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-yellow-400 text-white px-4 py-2 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <span className="font-black text-sm uppercase tracking-wide">Think About It</span>
                </div>
                <div className="p-4">
                  {thinkAboutIt.includes("\n") ? (
                    <ol className="space-y-2">
                      {thinkAboutIt.split("\n").filter(Boolean).map((q, i) => (
                        <li key={i} className="text-sm text-gray-700 font-semibold leading-snug">
                          {q.replace(/^\d+\.\s*/, "")}
                          <div className="mt-1 h-7 border-b-2 border-dashed border-gray-100" />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-700 font-semibold">{thinkAboutIt}</p>
                      <div className="mt-2 h-8 border-b-2 border-dashed border-gray-100" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Song (0-4 only) or Discussion */}
          <div>
            {song ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-orange-400 text-white px-4 py-2 flex items-center gap-2">
                  <span className="text-lg">🎵</span>
                  <span className="font-black text-sm uppercase tracking-wide">Song: {song.title}</span>
                  <span className="text-lg ml-1">🎵</span>
                </div>
                <div className="p-4">
                  <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                    {song.lyrics.split("\n").map((line: string, i: number) => (
                      <p key={i} className={`text-sm leading-relaxed ${line.startsWith("(") ? "text-orange-500 font-black" : "text-gray-800 font-semibold"}`}>
                        {line || <br />}
                      </p>
                    ))}
                  </div>
                  {song.actions?.length > 0 && (
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Actions</p>
                      <ul className="space-y-2">
                        {song.actions.map((action: string, i: number) => (
                          <li key={i} className="text-sm text-gray-700 font-semibold flex items-center gap-2">
                            <span className="text-base">{action.split(" ")[0]}</span>
                            <span>{action.split(" ").slice(1).join(" ")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <span className="font-black text-sm uppercase tracking-wide">Discussion Guide</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-purple-50 rounded-xl p-3">
                    <p className="text-xs font-black text-purple-700 uppercase mb-1">Watch and Reflect</p>
                    <p className="text-sm text-gray-700">{ex.video_description}</p>
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">After the Video</p>
                  {thinkAboutIt.split("\n").filter(Boolean).map((q: string, i: number) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm font-semibold text-gray-700">{q.replace(/^\d+\.\s*/, "")}</p>
                      <div className="mt-2 space-y-1">
                        <div className="h-7 border-b border-dashed border-gray-200" />
                        <div className="h-7 border-b border-dashed border-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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
