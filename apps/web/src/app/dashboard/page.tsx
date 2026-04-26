"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const WEEKS = [
  { id: 1, title: "Blessed to Be a Blessing", theme: "2 Corinthians 9:7", color: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600", border: "border-orange-300" },
  { id: 2, title: "Obedience Pleases God",     theme: "Ephesians 6:1",     color: "bg-green-600",  light: "bg-green-50",  text: "text-green-700",  border: "border-green-300"  },
  { id: 3, title: "God's Power Helps Us",      theme: "Philippians 4:13", color: "bg-blue-600",   light: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-300"   },
];

const AGE_GROUPS = [
  { label: "Ages 0–4",   value: "0-4",   color: "bg-orange-500", light: "bg-orange-50",  text: "text-orange-600" },
  { label: "Ages 5–9",   value: "5-9",   color: "bg-green-600",  light: "bg-green-50",   text: "text-green-700"  },
  { label: "Ages 10–12", value: "10-12", color: "bg-blue-600",   light: "bg-blue-50",    text: "text-blue-700"   },
  { label: "Ages 13–19", value: "13-19", color: "bg-pink-600",   light: "bg-pink-50",    text: "text-pink-700"   },
];

type Nav = "lessons" | "class";

export default function DashboardPage() {
  const router = useRouter();
  const [students,  setStudents]  = useState<any[]>([]);
  const [teacher,   setTeacher]   = useState<any>(null);
  const [newName,   setNewName]   = useState("");
  const [newAge,    setNewAge]    = useState("5-9");
  const [copied,    setCopied]    = useState("");
  const [nav,       setNav]       = useState<Nav>("lessons");
  const [adding,    setAdding]    = useState(false);

  const api = process.env.NEXT_PUBLIC_API_URL;
  const tok = () => localStorage.getItem("kss_token") ?? "";
  const logout = () => { localStorage.removeItem("kss_token"); router.push("/"); };

  async function fetchStudents() {
    const res = await fetch(`${api}/teacher/students`, { headers: { Authorization: `Bearer ${tok()}` } });
    if (res.status === 401) { logout(); return; }
    setStudents(await res.json());
  }

  useEffect(() => {
    const t = localStorage.getItem("kss_token");
    if (!t) { router.push("/"); return; }
    try { setTeacher(JSON.parse(atob(t.split(".")[1]))); } catch {}
    fetchStudents();
  }, []);

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    const res  = await fetch(`${api}/teacher/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${tok()}` },
      body: JSON.stringify({ name: newName, ageGroup: newAge }),
    });
    const data = await res.json();
    const link = data.magicLink ?? `${window.location.origin}/child?token=${data.magicLink?.split("token=")[1]}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(link);
    setNewName("");
    setAdding(false);
    fetchStudents();
  }

  async function markComplete(studentId: string) {
    await fetch(`${api}/teacher/students/${studentId}/complete`, {
      method: "POST", headers: { Authorization: `Bearer ${tok()}` },
    });
    fetchStudents();
  }

  const byAge = (val: string) => students.filter(s => s.age_group === val);

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="w-64 bg-purple-900 flex flex-col flex-shrink-0 shadow-xl">

        {/* Logo */}
        <div className="p-5 border-b border-purple-800">
          <img src="/logo.jpg" alt="Little Disciples" className="h-14 w-auto object-contain rounded-xl" />
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {([
            { id: "lessons", icon: "📚", label: "Lessons"  },
            { id: "class",   icon: "👥", label: "My Class" },
          ] as { id: Nav; icon: string; label: string }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => setNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                nav === item.id
                  ? "bg-white text-purple-900 shadow"
                  : "text-purple-200 hover:bg-purple-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Week shortcuts */}
          <div className="pt-4">
            <p className="text-purple-400 text-xs font-black uppercase tracking-widest px-4 mb-2">Quick Open</p>
            {WEEKS.map((w) => (
              <button
                key={w.id}
                onClick={() => { setNav("lessons"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-purple-300 hover:bg-purple-800 hover:text-white transition"
              >
                <div className={`w-2 h-2 rounded-full ${w.color}`} />
                Week {w.id} — {w.title}
              </button>
            ))}
          </div>
        </nav>

        {/* Teacher info + logout */}
        <div className="p-4 border-t border-purple-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0">
              {teacher?.email?.[0]?.toUpperCase() ?? "T"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{teacher?.email ?? "Teacher"}</p>
              <p className="text-purple-400 text-xs">Teacher account</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full text-xs font-bold text-purple-300 hover:text-white bg-purple-800 hover:bg-purple-700 py-2 rounded-lg transition"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-black text-gray-900">
              {nav === "lessons" ? "Lessons" : "My Class"}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {nav === "lessons"
                ? "Select a week and age group to open a lesson"
                : `${students.length} student${students.length !== 1 ? "s" : ""} enrolled`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {nav === "lessons" && (
              <button
                onClick={() => setNav("class")}
                className="bg-purple-800 hover:bg-purple-900 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
              >
                + Add Student
              </button>
            )}
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* ── LESSONS ── */}
          {nav === "lessons" && (
            <div className="space-y-6">
              {WEEKS.map((week) => (
                <div key={week.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                  {/* Week header row */}
                  <div className={`${week.light} ${week.border} border-l-4 px-6 py-4 flex items-center gap-4`}>
                    <div className={`${week.color} text-white text-xs font-black px-3 py-1 rounded-full`}>
                      Week {week.id}
                    </div>
                    <div>
                      <h2 className={`font-black text-lg ${week.text}`}>{week.title}</h2>
                      <p className="text-gray-400 text-xs font-semibold mt-0.5 italic">{week.theme}</p>
                    </div>
                  </div>

                  {/* Age group buttons — horizontal row */}
                  <div className="grid grid-cols-4 divide-x divide-gray-100">
                    {AGE_GROUPS.map((ag) => (
                      <button
                        key={ag.value}
                        onClick={() => router.push(`/lesson/${week.id}/${encodeURIComponent(ag.value)}`)}
                        className={`group flex flex-col items-center gap-2 py-5 px-4 hover:${ag.light} transition`}
                      >
                        <div className={`${ag.color} text-white text-xs font-black px-3 py-1 rounded-full group-hover:opacity-90`}>
                          {ag.label}
                        </div>
                        <span className={`text-xs font-semibold ${ag.text} opacity-0 group-hover:opacity-100 transition`}>
                          Open lesson →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MY CLASS ── */}
          {nav === "class" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* LEFT — Add student */}
              <div className="xl:col-span-1 space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-black text-gray-800 text-base mb-4">Add New Student</h3>
                  <form onSubmit={addStudent} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Student Name
                      </label>
                      <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Amara"
                        className="w-full border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 focus:bg-white transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Age Group
                      </label>
                      <select
                        value={newAge}
                        onChange={(e) => setNewAge(e.target.value)}
                        className="w-full border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 focus:bg-white transition"
                      >
                        {AGE_GROUPS.map((g) => (
                          <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={adding}
                      className="w-full bg-purple-800 hover:bg-purple-900 disabled:opacity-50 text-white font-black py-3 rounded-xl text-sm transition"
                    >
                      {adding ? "Adding…" : "Add Student & Copy Link"}
                    </button>
                  </form>
                </div>

                {/* Copied link */}
                {copied && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <p className="text-xs font-black text-green-700 mb-1">✓ Link copied to clipboard!</p>
                    <p className="text-xs text-green-600 break-all opacity-75">{copied}</p>
                    <button
                      onClick={() => { navigator.clipboard.writeText(copied); }}
                      className="mt-2 text-xs font-bold text-green-700 underline"
                    >
                      Copy again
                    </button>
                  </div>
                )}

                {/* Stats by age group */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-black text-gray-800 text-sm mb-4">Class Summary</h3>
                  <div className="space-y-3">
                    {AGE_GROUPS.map((ag) => {
                      const count = byAge(ag.value).length;
                      return (
                        <div key={ag.value} className="flex items-center gap-3">
                          <span className={`${ag.color} text-white text-xs font-bold px-2.5 py-1 rounded-full w-24 text-center`}>
                            {ag.label}
                          </span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className={`${ag.color} h-2 rounded-full transition-all`}
                              style={{ width: students.length ? `${(count / students.length) * 100}%` : "0%" }}
                            />
                          </div>
                          <span className="text-sm font-black text-gray-600 w-6 text-right">{count}</span>
                        </div>
                      );
                    })}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-400 font-semibold">
                        Total: <span className="font-black text-gray-700">{students.length}</span> students
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Student table */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-black text-gray-800 text-base">Students</h3>
                    <span className="text-xs text-gray-400 font-semibold">{students.length} total</span>
                  </div>

                  {students.length === 0 ? (
                    <div className="py-16 text-center">
                      <p className="text-5xl mb-3">👧</p>
                      <p className="text-gray-400 font-semibold">No students yet.</p>
                      <p className="text-gray-300 text-sm mt-1">Add a student using the form on the left.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Name</th>
                          <th className="text-left px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Age Group</th>
                          <th className="text-left px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Parent Link</th>
                          <th className="text-right px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {students.map((s: any) => {
                          const ag  = AGE_GROUPS.find((a) => a.value === s.age_group);
                          const link = `${typeof window !== "undefined" ? window.location.origin : ""}/child?token=${s.magic_token}`;
                          return (
                            <tr key={s.id} className="hover:bg-gray-50 transition">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 ${ag?.color ?? "bg-gray-400"} rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                                    {s.name[0].toUpperCase()}
                                  </div>
                                  <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`${ag?.color ?? "bg-gray-400"} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                                  {s.age_group}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => { navigator.clipboard.writeText(link); setCopied(link); }}
                                  className="text-xs text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1 transition"
                                >
                                  <span>📋</span> Copy link
                                </button>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => markComplete(s.id)}
                                  className="bg-green-100 hover:bg-green-200 text-green-700 text-xs font-bold px-4 py-2 rounded-lg transition"
                                >
                                  ✓ Mark Done
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
