"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function DrawBox({ label }: { label?: string }) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center" style={{ minHeight: 110 }}>
      {label && <p className="text-xs text-gray-400 font-semibold text-center px-2">{label}</p>}
      <span className="text-2xl mt-1">✏️</span>
    </div>
  );
}

function Lines({ n = 3 }: { n?: number }) {
  return (
    <div className="space-y-2.5 mt-2">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="border-b border-dashed border-gray-300 h-7" />
      ))}
    </div>
  );
}

function QuadHead({ color, icon, title }: { color: string; icon: string; title: string }) {
  return (
    <div className={`${color} text-white px-3 py-1.5 flex items-center gap-2`}>
      <span className="text-sm font-black">{icon}</span>
      <span className="text-xs font-black uppercase tracking-wide">{title}</span>
    </div>
  );
}

export default function WorkbookClient() {
  const { weekId, ageGroup } = useParams<{ weekId: string; ageGroup: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [week, setWeek] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const age = decodeURIComponent(ageGroup ?? "");
  const isYoung = age === "0-4";
  const isMid   = age === "5-9";

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

  const wb  = lesson.workbook;
  const kp  = lesson.key_points as string[];

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
          Workbook / Activities (Age {age})
        </h1>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-auto">

        {isYoung ? (
          /* ── AGES 0-4: exact 4-quadrant layout ── */
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 h-full">

            {/* TOP-LEFT: Look, Color & Circle */}
            <div className="flex flex-col">
              <QuadHead color="bg-orange-500" icon="▶" title="Look, Color & Circle" />
              <div className="p-3 flex-1">
                <p className="text-xs text-gray-600 mb-2">
                  Color the picture.<br />Circle the things that show obedience.
                </p>
                <DrawBox label="Color & circle the picture here" />
              </div>
            </div>

            {/* TOP-RIGHT: Draw Yourself */}
            <div className="flex flex-col">
              <QuadHead color="bg-blue-500" icon="▶" title="Draw Yourself Obeying." />
              <div className="p-3 flex-1">
                <p className="text-xs text-gray-600 mb-2">Draw a time you obeyed.</p>
                <DrawBox label="Draw here" />
              </div>
            </div>

            {/* BOTTOM-LEFT: Match */}
            <div className="flex flex-col">
              <QuadHead color="bg-orange-400" icon="🔗" title="Match" />
              <div className="p-3 flex-1">
                <p className="text-xs text-gray-600 mb-3">Draw a line to match.</p>
                <div className="space-y-3">
                  {kp.map((pt, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-xs font-bold text-gray-700 whitespace-nowrap">{pt}</span>
                      <div className="flex-1 border-b border-dashed border-gray-300 mx-1" />
                      <span className="text-lg flex-shrink-0">{["👂","🙏","😊"][i] ?? "✓"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM-RIGHT: Prayer */}
            <div className="flex flex-col">
              <QuadHead color="bg-purple-600" icon="🙏" title="Prayer" />
              <div className="p-3 flex-1 flex gap-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-700 leading-relaxed">{wb.prayerGuide}</p>
                </div>
                <div className="flex-shrink-0 text-3xl">🧒</div>
              </div>
            </div>
          </div>

        ) : isMid ? (
          /* ── AGES 5-9: 2-col questions + draw + prayer ── */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-200">

            {/* LEFT */}
            <div className="p-4 space-y-4 border-b md:border-b-0 border-gray-100">
              {/* Activity */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">A</div>
                  <span className="text-xs font-black text-gray-700 uppercase tracking-wide">{wb.activity}</span>
                </div>
                <p className="text-xs text-gray-600 leading-snug">{wb.prompt}</p>
                <Lines n={3} />
              </div>

              {/* Draw */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">B</div>
                  <span className="text-xs font-black text-gray-700 uppercase tracking-wide">Draw a time you will obey</span>
                </div>
                <DrawBox label="Draw here" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Reflection Questions</p>
                {["What is happening when you choose to obey?", "Why is obedience important to God?", "When will you obey this week?"].map((q, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-xs font-bold text-gray-700">{i + 1}. {q}</p>
                    <Lines n={2} />
                  </div>
                ))}
              </div>
              {/* Prayer */}
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-3">
                <p className="text-xs font-black text-purple-700 uppercase mb-1">🙏 Prayer</p>
                <p className="text-xs text-gray-700 italic leading-relaxed">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>

        ) : (
          /* ── AGES 10-12 & 13-19: scenario + reflection + prayer ── */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-200">

            {/* LEFT */}
            <div className="p-4 space-y-4 border-b md:border-b-0 border-gray-100">

              {/* Read the scenario */}
              <div>
                <div className="bg-orange-500 text-white rounded-xl px-3 py-1.5 inline-flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-black uppercase tracking-wide">📋 Read the Scenario &amp; Answer</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                  <p className="text-xs font-bold text-gray-700 leading-snug">
                    {age === "10-12"
                      ? "Your teacher gives instructions. Others ignore it and keep talking."
                      : "You see a friend cheat and do something wrong."}
                  </p>
                </div>
                {[wb.prompt.split(".")[0], "Why is obedience important in this situation?", "How does obeying please God?"].filter(Boolean).map((q: string, i: number) => (
                  <div key={i} className="mb-3">
                    <p className="text-xs font-bold text-gray-700">{i + 1}. {q}?</p>
                    <Lines n={2} />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-4 space-y-4">

              {/* One way I will obey */}
              <div>
                <div className="bg-blue-500 text-white rounded-xl px-3 py-1.5 inline-flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-black uppercase tracking-wide">
                    {age === "10-12" ? "One Way I Will Obey This Week" : "My Plan: I Will Choose Obedience By"}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{wb.activity}</p>
                <Lines n={4} />
              </div>

              {/* Prayer & Reflection */}
              <div>
                <div className="bg-purple-600 text-white rounded-xl px-3 py-1.5 inline-flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-black uppercase tracking-wide">
                    {age === "10-12" ? "Prayer & Reflection" : "Prayer & Commitment"}
                  </span>
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">{wb.prayerGuide}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-amber-300 py-2 px-4 text-center">
        <p className="text-xs font-bold text-gray-700">Little Disciples – Walking with Jesus Every Day</p>
      </div>
    </div>
  );
}
