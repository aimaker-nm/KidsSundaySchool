"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Student } from "@kss/types";

export default function DashboardPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState("");
  const [newAgeGroup, setNewAgeGroup] = useState("5-9");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function getToken() {
    return localStorage.getItem("kss_token");
  }

  async function fetchStudents() {
    const res = await fetch(`${apiUrl}/teacher/students`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (res.status === 401) { router.push("/login"); return; }
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  }

  useEffect(() => { fetchStudents(); }, []);

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/teacher/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ name: newName, ageGroup: newAgeGroup }),
    });
    const data = await res.json();
    navigator.clipboard.writeText(data.magicLink);
    setCopied(data.magicLink);
    setNewName("");
    fetchStudents();
  }

  async function markComplete(studentId: string) {
    await fetch(`${apiUrl}/teacher/students/${studentId}/complete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchStudents();
  }

  const AGE_COLORS: Record<string, string> = {
    "0-4": "bg-orange-500", "5-9": "bg-green-500", "10-12": "bg-blue-500", "13-19": "bg-pink-500",
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-orange-500">My Class</h1>
        <button onClick={() => { localStorage.removeItem("kss_token"); router.push("/login"); }}
          className="text-sm text-gray-400 hover:text-gray-600">Logout</button>
      </div>

      <form onSubmit={addStudent} className="bg-white rounded-2xl shadow p-4 mb-6 flex gap-2 flex-wrap">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Student name"
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm min-w-0"
          required
        />
        <select
          value={newAgeGroup}
          onChange={(e) => setNewAgeGroup(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm"
        >
          {["0-4", "5-9", "10-12", "13-19"].map((g) => (
            <option key={g} value={g}>Ages {g}</option>
          ))}
        </select>
        <button type="submit" className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-sm">
          Add + Copy Link
        </button>
      </form>

      {copied && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm text-green-700 break-all">
          Link copied: {copied}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-center py-8">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No students yet. Add one above.</p>
      ) : (
        <ul className="space-y-3">
          {students.map((s: any) => (
            <li key={s.id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
              <div className={`${AGE_COLORS[s.age_group] ?? "bg-gray-400"} text-white text-xs font-bold px-2 py-1 rounded-lg`}>
                {s.age_group}
              </div>
              <span className="font-semibold text-gray-800 flex-1">{s.name}</span>
              <button
                onClick={() => markComplete(s.id)}
                className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-bold px-3 py-1 rounded-lg transition"
              >
                Mark Done
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
