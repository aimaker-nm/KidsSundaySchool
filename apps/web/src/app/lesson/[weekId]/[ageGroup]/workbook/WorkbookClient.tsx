"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

function QHead({ color, icon, title }: { color: string; icon: string; title: string }) {
  return (
    <div className={`${color} text-white px-4 md:px-6 py-2.5 flex items-center gap-2`}>
      <span className="font-black text-base">{icon}</span>
      <span className="text-xs md:text-sm font-black uppercase tracking-wide">{title}</span>
    </div>
  );
}

export default function WorkbookClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week,   setWeek]   = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const age   = decodeURIComponent(ageGroup ?? "");
  const is04  = age === "0-4";
  const is59  = age === "5-9";

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

  const wb = lesson.workbook;
  const kp = lesson.key_points as string[];

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
          Workbook / Activities (Age {age})
        </h1>
      </div>

      {/* CONTENT — full screen */}
      <div className="flex-1 overflow-auto">

        {is04 ? (
          /* ── AGES 0-4: 4 full-screen quadrants ── */
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 h-full" style={{ minHeight: "calc(100vh - 140px)" }}>

            {/* TOP-LEFT */}
            <div className="flex flex-col">
              <QHead color="bg-orange-500" icon="▶" title="Look, Color & Circle" />
              <div className="flex-1 p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-3">
                  Color the picture.<br />
                  Circle the things that show {week.theme.toLowerCase().replace("choosing to ","").replace("we can ","")}.
                </p>
                <DrawBox label="Color & circle the picture here" minH={200} />
              </div>
            </div>

            {/* TOP-RIGHT */}
            <div className="flex flex-col">
              <QHead color="bg-blue-500" icon="▶" title={`Draw ${wb.activity}.`} />
              <div className="flex-1 p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-3">{wb.prompt}</p>
                <DrawBox label="Draw here" minH={200} />
              </div>
            </div>

            {/* BOTTOM-LEFT */}
            <div className="flex flex-col">
              <QHead color="bg-orange-400" icon="🔗" title="Match" />
              <div className="flex-1 p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-4">Draw a line to match.</p>
                <div className="space-y-4">
                  {kp.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-bold text-gray-700 whitespace-nowrap min-w-0">{pt}</span>
                      <div className="flex-1 border-b-2 border-dashed border-gray-300 mx-2" />
                      <span className="text-2xl md:text-3xl flex-shrink-0">{["👂","🙏","😊"][i] ?? "✓"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM-RIGHT */}
            <div className="flex flex-col">
              <QHead color="bg-purple-600" icon="🙏" title="Prayer" />
              <div className="flex-1 p-4 md:p-6 flex gap-4">
                <p className="flex-1 text-xs md:text-sm text-gray-700 leading-relaxed italic">{wb.prayerGuide}</p>
                <div className="text-4xl md:text-6xl flex-shrink-0 self-end">🧒</div>
              </div>
            </div>
          </div>

        ) : is59 ? (
          /* ── AGES 5-9 ── */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200" style={{ minHeight: "calc(100vh - 140px)" }}>
            <div className="p-6 md:p-8 space-y-6 border-b md:border-b-0 border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-black">A</div>
                  <span className="text-sm md:text-base font-black text-gray-700 uppercase">{wb.activity}</span>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{wb.prompt}</p>
                <Lines n={4} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-black">B</div>
                  <span className="text-sm md:text-base font-black text-gray-700 uppercase">Draw a time you will obey</span>
                </div>
                <DrawBox label="Draw here" minH={180} />
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Reflection Questions</p>
              {["What is happening when you choose to obey?", "Why is obedience important to God?", "When will you obey this week?"].map((q, i) => (
                <div key={i}>
                  <p className="text-sm md:text-base font-bold text-gray-700">{i + 1}. {q}</p>
                  <Lines n={2} />
                </div>
              ))}
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-4 mt-4">
                <p className="text-xs font-black text-purple-700 uppercase mb-2">🙏 Prayer</p>
                <p className="text-sm md:text-base text-gray-700 italic leading-relaxed">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>

        ) : (
          /* ── AGES 10-12 / 13-19 ── */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200" style={{ minHeight: "calc(100vh - 140px)" }}>
            <div className="p-6 md:p-8 space-y-6 border-b md:border-b-0 border-gray-100">
              <div>
                <div className="bg-orange-500 text-white rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
                  <span className="text-sm font-black uppercase tracking-wide">📋 Read the Scenario &amp; Answer</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-sm md:text-base font-bold text-gray-700 leading-snug">
                    {age === "10-12"
                      ? "Your teacher gives instructions. Others ignore it or keep talking."
                      : "You see a friend cheat and do something wrong."}
                  </p>
                </div>
                {["What will you do?", "Why is obedience important here?", "How does obeying please God?"].map((q, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-sm md:text-base font-bold text-gray-700">{i + 1}. {q}</p>
                    <Lines n={2} />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="bg-blue-500 text-white rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
                  <span className="text-sm font-black uppercase tracking-wide">
                    {age === "10-12" ? "One Way I Will Obey This Week" : "My Plan: I Will Choose Obedience By"}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{wb.prompt}</p>
                <Lines n={5} />
              </div>
              <div>
                <div className="bg-purple-600 text-white rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
                  <span className="text-sm font-black uppercase tracking-wide">
                    {age === "10-12" ? "Prayer & Reflection" : "Prayer & Commitment"}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-700 italic leading-relaxed">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-amber-300 py-2 px-6 text-center">
        <p className="text-sm font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
