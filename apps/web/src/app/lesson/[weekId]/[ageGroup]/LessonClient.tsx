"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* ── Section icon circles ── */
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
        <span className="text-white text-xs leading-none">{s.icon}</span>
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

function DrawBox({ label, minH = 140 }: { label?: string; minH?: number }) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center"
      style={{ minHeight: minH }}>
      {label && <p className="text-xs md:text-sm text-gray-400 font-semibold text-center px-3">{label}</p>}
      <span className="text-3xl mt-2">✏️</span>
    </div>
  );
}

function Lines({ n = 4 }: { n?: number }) {
  return (
    <div className="space-y-3 mt-3">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-9 border-b-2 border-dashed border-gray-300" />
      ))}
    </div>
  );
}

function PageDivider({ label }: { label: string }) {
  return (
    <div className="bg-orange-500 text-white py-3 px-6 text-center">
      <h2 className="text-base md:text-2xl font-black uppercase tracking-widest">{label}</h2>
    </div>
  );
}

export default function LessonClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router  = useRouter();
  const [lesson,  setLesson]  = useState<any>(null);
  const [week,    setWeek]    = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const age  = decodeURIComponent(ageGroup ?? "");
  const is04 = age === "0-4";
  const is59 = age === "5-9";

  useEffect(() => {
    const token = localStorage.getItem("kss_token");
    if (!token) { router.push("/"); return; }
    const api = process.env.NEXT_PUBLIC_API_URL;
    Promise.all([
      fetch(`${api}/lesson/${weekId}/${encodeURIComponent(age)}`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${api}/lesson/week/${weekId}`,                        { headers: { Authorization: `Bearer ${token}` } }),
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

  const ex   = lesson.teaching_extra ?? {};
  const song = ex.song;
  const thinkLines: string[] = (ex.think_about_it ?? "").split("\n").filter(Boolean);
  const kp   = lesson.key_points as string[];
  const wb   = lesson.workbook;

  const videoId = lesson.youtube_url
    ? (lesson.youtube_url.split("v=")[1] ?? lesson.youtube_url.split("/").pop())
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* ════════════════════════════════════════
          WEEK HEADER
      ════════════════════════════════════════ */}
      <div className="bg-amber-300 py-2.5 px-6 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => router.push("/dashboard")}
          className="text-gray-700 font-black text-xs bg-white bg-opacity-50 px-3 py-1.5 rounded-lg hover:bg-opacity-70 transition flex-shrink-0">
          ← Dashboard
        </button>
        <p className="flex-1 text-center text-sm md:text-base font-black text-gray-800 uppercase tracking-widest">
          Week {weekId} – {week.title}
        </p>
        {/* Jump nav */}
        <div className="hidden md:flex items-center gap-2">
          {["#teaching","#video","#workbook"].map((h,i) => (
            <a key={h} href={h}
              className="text-xs font-black text-gray-700 bg-white bg-opacity-50 px-2.5 py-1 rounded-lg hover:bg-opacity-80 transition">
              {["📖 Teach","🎬 Video","✏️ Work"][i]}
            </a>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 1 — TEACHING OUTLINE
      ════════════════════════════════════════ */}
      <div id="teaching">
        <PageDivider label={`Teaching Outline (Age ${age})`} />

        <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200">

          {/* LEFT */}
          <div className="p-6 md:p-8 space-y-6 border-b md:border-b-0 border-gray-100">

            <div>
              <Head i={0} />
              <div className="ml-10 md:ml-12">
                <p className="text-sm md:text-base text-gray-800 font-semibold italic leading-snug">
                  &ldquo;{lesson.memory_verse}&rdquo;
                </p>
                <p className="text-xs md:text-sm font-black text-gray-500 mt-1">{lesson.memory_verse_ref}</p>
              </div>
            </div>

            {ex.introduction && (
              <div>
                <Head i={1} />
                <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700 leading-relaxed">{ex.introduction}</p>
              </div>
            )}

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

            <div>
              <Head i={3} />
              <ul className="ml-10 md:ml-12 space-y-1.5">
                {kp.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Bullet bg="bg-blue-500" />
                    <span className="text-sm md:text-base text-gray-700 font-semibold">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Head i={4} />
              <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700 leading-relaxed">{lesson.life_application}</p>
            </div>

            <div>
              <Head i={5} />
              <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700">{ex.activity_note ?? "See activity page."}</p>
            </div>

            {ex.confession && (
              <div>
                <Head i={6} />
                <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-800 font-bold italic">&ldquo;{ex.confession}&rdquo;</p>
              </div>
            )}

            {ex.closing_prayer && (
              <div>
                <Head i={7} />
                <p className="ml-10 md:ml-12 text-sm md:text-base text-gray-700 italic">{ex.closing_prayer}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 2 — VIDEO & SONG
      ════════════════════════════════════════ */}
      <div id="video" className="border-t-4 border-gray-200">
        <PageDivider label={`Video & Song (Age ${age})`} />

        <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200">

          {/* LEFT — Watch */}
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
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800 flex flex-col">
                  <div className="flex items-center justify-center p-8 min-h-[180px] md:min-h-[240px]">
                    <div className="bg-gray-700 rounded-xl w-full h-full flex flex-col items-center justify-center p-6 min-h-[140px]">
                      <span className="text-6xl md:text-8xl mb-3">📺</span>
                      <p className="text-gray-300 text-sm md:text-base text-center font-semibold">
                        {ex.video_description ?? "Video coming soon!"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-900 px-6 py-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">⬛</span>
                    </div>
                    <p className="text-gray-400 text-sm">Scan to watch the video!</p>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500 italic text-center">{ex.video_description}</p>
            </div>
            {/* Think About It */}
            <div className="bg-amber-200 px-6 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">💡</span>
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-black text-gray-800 uppercase tracking-widest mb-2">Think About It</p>
                  {thinkLines.length === 1 ? (
                    <div>
                      <p className="text-sm md:text-base text-gray-700 font-semibold">{thinkLines[0].replace(/^\d+\.\s*/,"")}</p>
                      <div className="mt-2 border-b-2 border-dashed border-gray-400" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {thinkLines.map((q, i) => (
                        <div key={i}>
                          <p className="text-sm md:text-base text-gray-700 font-semibold">{i+1}. {q.replace(/^\d+\.\s*/,"")}</p>
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
                  <span className="text-sm md:text-base font-black text-gray-800 uppercase tracking-wide">Song: {song.title}</span>
                  <span className="text-xl ml-auto">🎵</span>
                </div>
                <div className="flex-1 p-6 md:p-8 space-y-5">
                  <div className="bg-yellow-50 border-2 border-amber-200 rounded-2xl p-6">
                    <div className="text-center space-y-1">
                      {song.lyrics.split("\n").map((line: string, i: number) => (
                        <p key={i} className={`leading-relaxed ${
                          line.startsWith("(") ? "text-orange-500 font-black text-base md:text-lg"
                          : line === "" ? "my-2"
                          : "text-gray-800 font-semibold text-base md:text-lg"
                        }`}>{line || " "}</p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {song.actions?.map((a: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
                        <span className="text-2xl flex-shrink-0">{a.split(" ")[0]}</span>
                        <span className="text-sm md:text-base text-gray-700 font-semibold">{a.split(" ").slice(1).join(" ")}</span>
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
                    <p className="text-sm md:text-base text-gray-700 italic">{ex.video_description}</p>
                  </div>
                  {thinkLines.map((q, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm md:text-base font-bold text-gray-800 mb-3">{i+1}. {q.replace(/^\d+\.\s*/,"")}</p>
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
      </div>

      {/* ════════════════════════════════════════
          SECTION 3 — WORKBOOK
      ════════════════════════════════════════ */}
      <div id="workbook" className="border-t-4 border-gray-200">
        <PageDivider label={`Workbook / Activities (Age ${age})`} />

        {is04 ? (
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-200">

            <div className="flex flex-col">
              <div className="bg-orange-500 text-white px-4 md:px-6 py-2.5 flex items-center gap-2">
                <span className="font-black">▶</span>
                <span className="text-xs md:text-sm font-black uppercase tracking-wide">Look, Color &amp; Circle</span>
              </div>
              <div className="flex-1 p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-3">Color the picture.<br />Circle the things that show obedience.</p>
                <DrawBox label="Color & circle the picture here" minH={180} />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-blue-500 text-white px-4 md:px-6 py-2.5 flex items-center gap-2">
                <span className="font-black">▶</span>
                <span className="text-xs md:text-sm font-black uppercase tracking-wide">Draw Yourself Obeying.</span>
              </div>
              <div className="flex-1 p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-3">{wb.prompt}</p>
                <DrawBox label="Draw here" minH={180} />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-orange-400 text-white px-4 md:px-6 py-2.5 flex items-center gap-2">
                <span>🔗</span>
                <span className="text-xs md:text-sm font-black uppercase tracking-wide">Match</span>
              </div>
              <div className="flex-1 p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-4">Draw a line to match.</p>
                <div className="space-y-4">
                  {kp.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-bold text-gray-700 whitespace-nowrap">{pt}</span>
                      <div className="flex-1 border-b-2 border-dashed border-gray-300 mx-2" />
                      <span className="text-2xl md:text-3xl">{["👂","🙏","😊"][i] ?? "✓"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-purple-600 text-white px-4 md:px-6 py-2.5 flex items-center gap-2">
                <span>🙏</span>
                <span className="text-xs md:text-sm font-black uppercase tracking-wide">Prayer</span>
              </div>
              <div className="flex-1 p-4 md:p-6 flex gap-4">
                <p className="flex-1 text-xs md:text-sm text-gray-700 italic leading-relaxed">{wb.prayerGuide}</p>
                <span className="text-4xl md:text-5xl self-end flex-shrink-0">🧒</span>
              </div>
            </div>
          </div>

        ) : is59 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200">
            <div className="p-6 md:p-8 space-y-6 border-b md:border-b-0 border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-black">A</div>
                  <span className="text-sm md:text-base font-black text-gray-700 uppercase">{wb.activity}</span>
                </div>
                <p className="text-sm md:text-base text-gray-600">{wb.prompt}</p>
                <Lines n={4} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-black">B</div>
                  <span className="text-sm md:text-base font-black text-gray-700 uppercase">Draw a time you will obey</span>
                </div>
                <DrawBox label="Draw here" minH={160} />
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              {["What is happening when you choose to obey?","Why is obedience important to God?","When will you obey this week?"].map((q,i) => (
                <div key={i}>
                  <p className="text-sm md:text-base font-bold text-gray-700">{i+1}. {q}</p>
                  <Lines n={2} />
                </div>
              ))}
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-4 mt-4">
                <p className="text-xs font-black text-purple-700 uppercase mb-2">🙏 Prayer</p>
                <p className="text-sm md:text-base text-gray-700 italic">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200">
            <div className="p-6 md:p-8 space-y-5 border-b md:border-b-0 border-gray-100">
              <div className="bg-orange-500 text-white rounded-xl px-4 py-2 inline-flex items-center gap-2">
                <span className="text-sm font-black uppercase">📋 Read the Scenario &amp; Answer</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm md:text-base font-bold text-gray-700">
                  {age === "10-12"
                    ? "Your teacher gives instructions. Others ignore it or keep talking."
                    : "You see a friend cheat and do something wrong."}
                </p>
              </div>
              {["What will you do?","Why is obedience important here?","How does obeying please God?"].map((q,i) => (
                <div key={i}>
                  <p className="text-sm md:text-base font-bold text-gray-700">{i+1}. {q}</p>
                  <Lines n={2} />
                </div>
              ))}
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="bg-blue-500 text-white rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
                  <span className="text-sm font-black uppercase">
                    {age === "10-12" ? "One Way I Will Obey This Week" : "My Plan: I Will Choose Obedience By"}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-600">{wb.prompt}</p>
                <Lines n={5} />
              </div>
              <div>
                <div className="bg-purple-600 text-white rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
                  <span className="text-sm font-black uppercase">
                    {age === "10-12" ? "Prayer & Reflection" : "Prayer & Commitment"}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-700 italic">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════ FOOTER ═════════ */}
      <div className="bg-amber-300 py-3 px-6 text-center">
        <p className="text-sm font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
