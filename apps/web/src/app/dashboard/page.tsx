"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const WEEKS = [
  { id: 1, title: "Blessed to Be a Blessing",   color: "bg-orange-500", border: "border-orange-500" },
  { id: 2, title: "Obedience Pleases God",       color: "bg-green-600",  border: "border-green-600"  },
  { id: 3, title: "God's Power Helps Us",        color: "bg-blue-600",   border: "border-blue-600"   },
];

const AGE_GROUPS = [
  { label: "Ages 0–4",   value: "0-4",   color: "bg-orange-500" },
  { label: "Ages 5–9",   value: "5-9",   color: "bg-green-600"  },
  { label: "Ages 10–12", value: "10-12", color: "bg-blue-600"   },
  { label: "Ages 13–19", value: "13-19", color: "bg-pink-600"   },
];

export default function DashboardPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [teacher, setTeacher] = useState<any>(null);
  const [newName, setNewName] = useState("");
  const [newAgeGroup, setNewAgeGroup] = useState("5-9");
  const [copiedLink, setCopiedLink] = useState("");
  const [activeTab, setActiveTab] = useState<"lessons" | "class">("lessons");

  const api = process.env.NEXT_PUBLIC_API_URL;

  function token() { return localStorage.getItem("kss_token") ?? ""; }

  function logout() { localStorage.removeItem("kss_token"); router.push("/"); }

  async function fetchStudents() {
    const res = await fetch(`${api}/teacher/students`, { headers: { Authorization: `Bearer ${token()}` } });
    if (res.status === 401) { logout(); return; }
    setStudents(await res.json());
  }

  useEffect(() => {
    const t = localStorage.getItem("kss_token");
    if (!t) { router.push("/"); return; }
    // decode name from JWT payload
    try {
      const payload = JSON.parse(atob(t.split(".")[1]));
      setTeacher(payload);
    } catch {}
    fetchStudents();
  }, []);

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${api}/teacher/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ name: newName, ageGroup: newAgeGroup }),
    });
    const data = await res.json();
    const link = `${window.location.origin}/child?token=${data.magicLink?.split("token=")[1]}`;
    navigator.clipboard.writeText(data.magicLink ?? link);
    setCopiedLink(data.magicLink ?? link);
    setNewName("");
    fetchStudents();
  }

  async function markComplete(studentId: string) {
    await fetch(`${api}/teacher/students/${studentId}/complete`, {
      method: "POST", headers: { Authorization: `Bearer ${token()}` },
    });
    fetchStudents();
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-purple-800 text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Little Disciples" className="w-14 h-8 object-cover rounded-lg" />
            <div>
              <h1 className="font-black text-base leading-tight">Teacher Dashboard</h1>
              {teacher && <p className="text-xs opacity-75">{teacher.email}</p>}
            </div>
          </div>
          <button onClick={logout} className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-lg font-bold transition">
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex">
          <button onClick={() => setActiveTab("lessons")}
            className={`flex-1 py-3.5 text-sm font-black transition ${activeTab === "lessons" ? "border-b-2 border-purple-700 text-purple-800" : "text-gray-400"}`}>
            📚 Lessons
          </button>
          <button onClick={() => setActiveTab("class")}
            className={`flex-1 py-3.5 text-sm font-black transition ${activeTab === "class" ? "border-b-2 border-purple-700 text-purple-800" : "text-gray-400"}`}>
            👥 My Class
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* ── LESSONS TAB ── */}
        {activeTab === "lessons" && (
          <div className="space-y-6">
            {WEEKS.map((week) => (
              <div key={week.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className={`${week.color} text-white px-4 py-3`}>
                  <p className="text-xs font-bold opacity-75 uppercase tracking-widest">Week {week.id}</p>
                  <h2 className="font-black text-base">{week.title}</h2>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {AGE_GROUPS.map((ag) => (
                    <button
                      key={ag.value}
                      onClick={() => router.push(`/lesson/${week.id}/${encodeURIComponent(ag.value)}`)}
                      className={`${ag.color} hover:opacity-90 active:scale-95 text-white rounded-xl p-3 text-center transition shadow-sm`}
                    >
                      <div className="text-lg mb-0.5">📖</div>
                      <div className="text-xs font-black leading-tight">{ag.label}</div>
                      <div className="text-xs opacity-75 mt-0.5">Open Lesson →</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CLASS TAB ── */}
        {activeTab === "class" && (
          <div className="space-y-4">

            {/* Add student form */}
            <form onSubmit={addStudent} className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap gap-2 items-end">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Student Name</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Amara"
                  className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-3 py-2.5 text-sm outline-none bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Age Group</label>
                <select
                  value={newAgeGroup}
                  onChange={(e) => setNewAgeGroup(e.target.value)}
                  className="border-2 border-gray-100 focus:border-purple-500 rounded-xl px-3 py-2.5 text-sm outline-none bg-gray-50"
                >
                  {AGE_GROUPS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
              <button type="submit" className="bg-purple-800 hover:bg-purple-900 text-white font-black px-4 py-2.5 rounded-xl text-sm transition active:scale-95">
                Add + Copy Link
              </button>
            </form>

            {/* Copied link notice */}
            {copiedLink && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700 break-all">
                ✓ Link copied to clipboard! Share it with the parent.<br />
                <span className="opacity-60">{copiedLink}</span>
              </div>
            )}

            {/* Student list */}
            {students.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <p className="text-4xl mb-2">👧</p>
                <p className="text-gray-400 font-semibold text-sm">No students yet. Add one above.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {students.map((s: any) => {
                  const ag = AGE_GROUPS.find((a) => a.value === s.age_group);
                  return (
                    <div key={s.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
                      <span className={`${ag?.color ?? "bg-gray-400"} text-white text-xs font-black px-2.5 py-1 rounded-full`}>
                        {s.age_group}
                      </span>
                      <span className="font-bold text-gray-800 flex-1">{s.name}</span>
                      <button
                        onClick={() => markComplete(s.id)}
                        className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        ✓ Mark Done
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
