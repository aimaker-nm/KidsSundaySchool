import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-400 font-sans">

      {/* Top banner */}
      <div className="bg-purple-700 text-white text-center py-2 px-4 text-xs font-bold tracking-widest uppercase">
        ★ 3 Full Weeks of Complete Lessons ★
      </div>

      {/* Hero section */}
      <div className="bg-yellow-400 px-6 pt-8 pb-6">
        <div className="max-w-md mx-auto">

          {/* Logo */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-yellow-300 text-2xl">👑</div>
                  <div className="text-white text-xs font-black leading-none">LD</div>
                </div>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h1 className="text-4xl font-black text-purple-800 leading-none tracking-tight">
                Little<br />Disciples
              </h1>
              <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                Weeks 1–3 Starter Pack
              </div>
              <p className="text-purple-700 text-xs font-semibold mt-1">
                A Global Children's Curriculum System
              </p>
            </div>
          </div>

          {/* Age groups */}
          <div className="flex gap-2 flex-wrap mb-4">
            {[
              { label: "Ages 0–4", color: "bg-orange-500" },
              { label: "Ages 5–9", color: "bg-green-600" },
              { label: "Ages 10–12", color: "bg-blue-600" },
              { label: "Ages 13–19", color: "bg-pink-600" },
            ].map((g) => (
              <span key={g.label} className={`${g.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                {g.label}
              </span>
            ))}
          </div>

          {/* Feature icons row */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[
              { icon: "📖", label: "Teaching" },
              { icon: "✏️", label: "Activities" },
              { icon: "🎵", label: "Songs" },
              { icon: "📺", label: "Videos" },
            ].map((f) => (
              <div key={f.label} className="bg-white rounded-xl p-2 text-center shadow-sm">
                <div className="text-2xl">{f.icon}</div>
                <div className="text-xs font-bold text-gray-600 mt-1">{f.label}</div>
              </div>
            ))}
          </div>

          {/* Walking tagline */}
          <p className="text-purple-800 text-sm font-bold text-center mb-6">
            Walking with Jesus Every Day
          </p>

          {/* Curriculum week cards */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { week: "Week 1", title: "Blessed to be a Blessing", color: "bg-orange-500" },
              { week: "Week 2", title: "Obedience Pleases God", color: "bg-green-600" },
              { week: "Week 3", title: "God's Power Helps Us", color: "bg-blue-600" },
            ].map((w) => (
              <div key={w.week} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className={`${w.color} text-white text-xs font-black text-center py-1`}>
                  {w.week}
                </div>
                <div className="p-2">
                  <p className="text-gray-700 text-xs font-semibold leading-tight">{w.title}</p>
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 bg-gray-100 rounded-full w-full" />
                    <div className="h-1.5 bg-gray-100 rounded-full w-4/5" />
                    <div className="h-1.5 bg-gray-100 rounded-full w-3/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature badges */}
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
              <span className="text-sm">🎵</span>
              <span className="text-xs font-bold text-gray-700">Songs Each Week</span>
            </div>
            <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
              <span className="text-sm">🖨️</span>
              <span className="text-xs font-bold text-gray-700">Print Ready PDFs</span>
            </div>
            <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
              <span className="text-sm">📱</span>
              <span className="text-xs font-bold text-gray-700">Easy to Use</span>
            </div>
          </div>
        </div>
      </div>

      {/* TEACH • ENGAGE • EQUIP • IMPACT section */}
      <div className="bg-white px-6 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center gap-2 flex-wrap mb-3">
            {["TEACH", "ENGAGE", "EQUIP", "IMPACT"].map((word, i) => {
              const colors = ["text-orange-500", "text-green-600", "text-blue-600", "text-pink-600"];
              return (
                <span key={word} className={`text-xl font-black ${colors[i]}`}>
                  {word}{i < 3 && <span className="text-gray-300 mx-1">•</span>}
                </span>
              );
            })}
          </div>
          <p className="text-gray-600 text-sm font-medium mb-6">
            Help children grow in faith and live like little disciples of Jesus!
          </p>

          <Link
            href="/login"
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-black py-4 px-10 rounded-2xl text-lg shadow-lg transition"
          >
            Teacher Login
          </Link>

          <div className="flex justify-center gap-3 mt-6">
            <div className="bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-xl text-center">
              <div className="text-lg">🎬</div>
              Videos &amp; Songs
            </div>
            <div className="bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl text-center">
              <div className="text-lg">⚡</div>
              Instant Access
            </div>
            <div className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl text-center">
              <div className="text-lg">🖨️</div>
              Print Ready
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
