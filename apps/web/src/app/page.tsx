import Link from "next/link";

function KidGirl({ size = 110 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 115" width={size} height={size * 1.4}>
      <circle cx="40" cy="28" r="24" fill="#1a0800" />
      <circle cx="22" cy="38" r="13" fill="#1a0800" />
      <circle cx="58" cy="38" r="13" fill="#1a0800" />
      <circle cx="40" cy="40" r="20" fill="#c47c3a" />
      <circle cx="33" cy="37" r="4" fill="white" />
      <circle cx="47" cy="37" r="4" fill="white" />
      <circle cx="34" cy="38" r="2.2" fill="#1a0800" />
      <circle cx="48" cy="38" r="2.2" fill="#1a0800" />
      <circle cx="35" cy="37" r="0.8" fill="white" />
      <circle cx="49" cy="37" r="0.8" fill="white" />
      <circle cx="28" cy="43" r="4.5" fill="#e87070" opacity="0.35" />
      <circle cx="52" cy="43" r="4.5" fill="#e87070" opacity="0.35" />
      <path d="M 33 47 Q 40 54 47 47" stroke="#7a3a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 34 48 Q 40 53 46 48" fill="white" />
      <path d="M 20 60 Q 18 62 17 90 L 63 90 Q 62 62 60 60 Q 50 57 40 57 Q 30 57 20 60Z" fill="#e74c3c" />
      <path d="M 33 60 L 40 67 L 47 60" fill="white" opacity="0.9" />
      <path d="M 20 64 Q 10 70 9 82 L 16 83 Q 17 73 22 68Z" fill="#c47c3a" />
      <path d="M 60 64 Q 70 70 71 82 L 64 83 Q 63 73 58 68Z" fill="#c47c3a" />
      <rect x="3" y="72" width="16" height="20" rx="2" fill="#3498db" />
      <line x1="11" y1="72" x2="11" y2="92" stroke="white" strokeWidth="0.8" opacity="0.5" />
      <rect x="25" y="88" width="12" height="20" rx="5" fill="#c47c3a" />
      <rect x="43" y="88" width="12" height="20" rx="5" fill="#c47c3a" />
      <ellipse cx="31" cy="109" rx="9" ry="5" fill="#1a0800" />
      <ellipse cx="49" cy="109" rx="9" ry="5" fill="#1a0800" />
    </svg>
  );
}

function KidBoy({ size = 110 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 115" width={size} height={size * 1.4}>
      <ellipse cx="40" cy="20" rx="22" ry="14" fill="#3d1f00" />
      <circle cx="40" cy="36" r="20" fill="#f5c99a" />
      <circle cx="20" cy="36" r="5" fill="#f5c99a" />
      <circle cx="60" cy="36" r="5" fill="#f5c99a" />
      <circle cx="33" cy="33" r="4" fill="white" />
      <circle cx="47" cy="33" r="4" fill="white" />
      <circle cx="34" cy="34" r="2.2" fill="#2c1a00" />
      <circle cx="48" cy="34" r="2.2" fill="#2c1a00" />
      <circle cx="34.8" cy="33.2" r="0.8" fill="white" />
      <circle cx="48.8" cy="33.2" r="0.8" fill="white" />
      <path d="M 29 29 Q 34 27 38 29" stroke="#3d1f00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 42 29 Q 47 27 51 29" stroke="#3d1f00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="39" r="4.5" fill="#ffaaaa" opacity="0.4" />
      <circle cx="52" cy="39" r="4.5" fill="#ffaaaa" opacity="0.4" />
      <path d="M 32 43 Q 40 51 48 43" stroke="#c47c3a" strokeWidth="1.8" fill="white" strokeLinecap="round" />
      <path d="M 18 56 Q 16 60 15 90 L 65 90 Q 64 60 62 56 Q 52 53 40 53 Q 28 53 18 56Z" fill="#2980b9" />
      <path d="M 18 60 Q 6 54 4 43 L 10 41 Q 13 52 20 58Z" fill="#f5c99a" />
      <path d="M 62 60 Q 72 66 73 78 L 66 79 Q 65 69 60 64Z" fill="#f5c99a" />
      <text x="-2" y="44" fontSize="12" fill="#f1c40f">★</text>
      <rect x="25" y="88" width="12" height="20" rx="5" fill="#f5c99a" />
      <rect x="43" y="88" width="12" height="20" rx="5" fill="#f5c99a" />
      <ellipse cx="31" cy="109" rx="9" ry="5" fill="#2c3e50" />
      <ellipse cx="49" cy="109" rx="9" ry="5" fill="#2c3e50" />
    </svg>
  );
}

function KidSmall({ size = 85 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 90" width={size} height={size * 1.5}>
      <ellipse cx="30" cy="14" rx="17" ry="12" fill="#5c3317" />
      <circle cx="30" cy="26" r="16" fill="#e8a870" />
      <circle cx="24" cy="24" r="3.2" fill="white" />
      <circle cx="36" cy="24" r="3.2" fill="white" />
      <circle cx="25" cy="25" r="1.8" fill="#2c1a00" />
      <circle cx="37" cy="25" r="1.8" fill="#2c1a00" />
      <circle cx="25.6" cy="24.3" r="0.6" fill="white" />
      <circle cx="37.6" cy="24.3" r="0.6" fill="white" />
      <circle cx="20" cy="29" r="3.5" fill="#e87070" opacity="0.35" />
      <circle cx="40" cy="29" r="3.5" fill="#e87070" opacity="0.35" />
      <path d="M 24 32 Q 30 38 36 32" stroke="#7a3a10" strokeWidth="1.5" fill="white" strokeLinecap="round" />
      <path d="M 14 42 Q 12 46 11 70 L 49 70 Q 48 46 46 42 Q 38 39 30 39 Q 22 39 14 42Z" fill="#27ae60" />
      <path d="M 14 46 Q 7 52 7 60 L 12 61 Q 12 54 16 50Z" fill="#e8a870" />
      <path d="M 46 46 Q 53 52 53 60 L 48 61 Q 48 54 44 50Z" fill="#e8a870" />
      <rect x="47" y="52" width="11" height="14" rx="2" fill="#8e44ad" />
      <line x1="52" y1="53" x2="52" y2="65" stroke="gold" strokeWidth="0.8" />
      <rect x="18" y="68" width="9" height="16" rx="4" fill="#e8a870" />
      <rect x="33" y="68" width="9" height="16" rx="4" fill="#e8a870" />
      <ellipse cx="22" cy="85" rx="7" ry="4" fill="#1a0800" />
      <ellipse cx="38" cy="85" rx="7" ry="4" fill="#1a0800" />
    </svg>
  );
}

function BookStack({ size = 130 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 140" width={size} height={size * 1.17}>
      <rect x="10" y="30" width="95" height="110" rx="6" fill="#e91e8c" />
      <rect x="12" y="32" width="91" height="106" rx="5" fill="#f06292" />
      <rect x="12" y="32" width="10" height="106" rx="3" fill="#c2185b" />
      <text x="28" y="52" fontSize="7" fill="white" fontWeight="bold">Ages 13-19</text>
      <text x="28" y="64" fontSize="9" fill="white" fontWeight="bold">Little Disciples</text>
      <rect x="5" y="20" width="95" height="110" rx="6" fill="#1565c0" />
      <rect x="7" y="22" width="91" height="106" rx="5" fill="#1976d2" />
      <rect x="7" y="22" width="10" height="106" rx="3" fill="#0d47a1" />
      <text x="23" y="42" fontSize="7" fill="white" fontWeight="bold">Ages 10-12</text>
      <text x="23" y="54" fontSize="9" fill="white" fontWeight="bold">Little Disciples</text>
      <rect x="0" y="10" width="95" height="110" rx="6" fill="#2e7d32" />
      <rect x="2" y="12" width="91" height="106" rx="5" fill="#388e3c" />
      <rect x="2" y="12" width="10" height="106" rx="3" fill="#1b5e20" />
      <text x="18" y="30" fontSize="7" fill="white" fontWeight="bold">Ages 5-9</text>
      <text x="45" y="55" fontSize="22" fill="#f9a825">👑</text>
      <text x="22" y="74" fontSize="11" fill="white" fontWeight="900">Little</text>
      <text x="16" y="87" fontSize="11" fill="white" fontWeight="900">Disciples</text>
      <text x="18" y="99" fontSize="7" fill="#a5d6a7">Weeks 1-3</text>
      <line x1="18" y1="103" x2="78" y2="103" stroke="#a5d6a7" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

function WeekCard({ week, title, color }: { week: string; title: string; color: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className={`${color} text-white text-center py-1.5 text-xs font-black tracking-wide`}>{week}</div>
      <div className="p-3">
        <p className="text-gray-800 text-xs font-bold leading-snug mb-2">{title}</p>
        <div className="space-y-1 mb-2">
          <div className="h-1.5 bg-gray-100 rounded w-full" />
          <div className="h-1.5 bg-gray-100 rounded w-4/5" />
          <div className="h-1.5 bg-gray-100 rounded w-3/5" />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-orange-50 rounded p-1 text-center text-xs text-gray-500 font-semibold">Teach</div>
          <div className="bg-blue-50 rounded p-1 text-center text-xs text-gray-500 font-semibold">Work</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-400 font-sans overflow-x-hidden">

      {/* Top banner */}
      <div className="bg-purple-800 text-white text-center py-2 px-4 text-xs font-black tracking-widest">
        ★&nbsp;&nbsp;3 FULL WEEKS OF COMPLETE LESSONS&nbsp;&nbsp;★
      </div>

      {/* ===== MAIN HERO — 2-col on desktop ===== */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-10 pt-8 pb-6">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-purple-800 rounded-2xl flex flex-col items-center justify-center shadow-xl">
                  <span className="text-yellow-300 text-2xl md:text-3xl leading-none">👑</span>
                  <span className="text-white text-sm md:text-base font-black leading-none mt-1">LD</span>
                </div>
                <span className="absolute -top-2 -right-2 text-yellow-300 text-base animate-spin" style={{ animationDuration: "4s" }}>✦</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-purple-900 leading-none tracking-tight">
                  Little<br />Disciples
                </h1>
                <span className="inline-block bg-green-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full mt-2">
                  Weeks 1–3 Starter Pack
                </span>
                <p className="text-purple-800 text-xs md:text-sm font-semibold mt-1">
                  A Global Children's Curriculum System
                </p>
              </div>
            </div>

            {/* Cartoon kids row */}
            <div className="relative flex items-end justify-around flex-1 min-h-[180px] md:min-h-[260px]">
              {/* Sparkles */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-300 text-2xl animate-bounce" style={{ animationDuration: "2s" }}>★</span>
              <span className="absolute top-4 right-6 text-yellow-200 text-base animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.4s" }}>✦</span>
              <span className="absolute top-8 left-6 text-orange-300 text-sm animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.8s" }}>★</span>

              <div className="animate-bounce" style={{ animationDuration: "3s" }}>
                <KidGirl size={80} />
              </div>
              <div className="hidden md:block animate-bounce" style={{ animationDuration: "2.8s", animationDelay: "0.3s" }}>
                <KidGirl size={100} />
              </div>
              <div className="animate-bounce" style={{ animationDuration: "2.6s", animationDelay: "0.6s" }}>
                <KidSmall size={65} />
              </div>
              <div className="animate-bounce" style={{ animationDuration: "3.2s", animationDelay: "0.9s" }}>
                <KidBoy size={80} />
              </div>
            </div>

            {/* Age group tags */}
            <div className="flex gap-2 flex-wrap mt-4 mb-3">
              {[
                { label: "Ages 0–4", bg: "bg-orange-500" },
                { label: "Ages 5–9", bg: "bg-green-600" },
                { label: "Ages 10–12", bg: "bg-blue-600" },
                { label: "Ages 13–19", bg: "bg-pink-600" },
              ].map((g) => (
                <span key={g.label} className={`${g.bg} text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                  {g.label}
                </span>
              ))}
            </div>

            {/* Feature icons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { icon: "📖", label: "Teaching" },
                { icon: "✏️", label: "Activities" },
                { icon: "🎵", label: "Songs" },
                { icon: "📺", label: "Videos" },
              ].map((f) => (
                <div key={f.label} className="bg-white rounded-xl py-3 text-center shadow-sm">
                  <div className="text-2xl md:text-3xl">{f.icon}</div>
                  <div className="text-xs font-bold text-gray-600 mt-1">{f.label}</div>
                </div>
              ))}
            </div>

            <p className="text-purple-900 text-xs md:text-sm font-bold tracking-wide">
              Walking with Jesus Every Day
            </p>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Week cards */}
            <div className="grid grid-cols-3 gap-3">
              <WeekCard week="WEEK 1" title="Blessed to be a Blessing" color="bg-orange-500" />
              <WeekCard week="WEEK 2" title="Obedience Pleases God" color="bg-green-600" />
              <WeekCard week="WEEK 3" title="God's Power Helps Us" color="bg-blue-600" />
            </div>

            {/* Books + confidence badge row */}
            <div className="flex gap-4 items-center">
              <div className="animate-bounce flex-shrink-0" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                <BookStack size={120} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="bg-purple-800 text-white rounded-2xl p-4 shadow-lg">
                  <p className="text-xs md:text-sm font-black tracking-wide leading-snug text-center">
                    EVERYTHING YOU NEED TO<br />TEACH WITH CONFIDENCE ✓
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-orange-500 text-white rounded-xl p-2.5 text-center shadow-md">
                    <div className="text-xl mb-0.5">🎬</div>
                    <div className="text-xs font-bold leading-tight">Videos &amp; Songs</div>
                  </div>
                  <div className="bg-green-600 text-white rounded-xl p-2.5 text-center shadow-md">
                    <div className="text-xl mb-0.5">⚡</div>
                    <div className="text-xs font-bold leading-tight">Instant Access</div>
                  </div>
                  <div className="bg-blue-600 text-white rounded-xl p-2.5 text-center shadow-md">
                    <div className="text-xl mb-0.5">🖨️</div>
                    <div className="text-xs font-bold leading-tight">Print Ready PDFs</div>
                  </div>
                  <div className="bg-pink-600 text-white rounded-xl p-2.5 text-center shadow-md">
                    <div className="text-xl mb-0.5">📱</div>
                    <div className="text-xs font-bold leading-tight">Easy to Use</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini lesson preview strips */}
            <div className="bg-white rounded-2xl p-3 shadow-md">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">What&apos;s Inside Each Week</p>
              <div className="space-y-1.5">
                {[
                  { color: "bg-orange-500", label: "Teaching Sheet — Memory Verse + Bible Teaching" },
                  { color: "bg-green-600", label: "Video & Song — Engaging Visual Content" },
                  { color: "bg-blue-600", label: "Workbook — Activities & Life Application" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`${item.color} w-2.5 h-2.5 rounded-full flex-shrink-0`} />
                    <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM STRIP ===== */}
      <div className="bg-white px-4 md:px-10 py-8">
        <div className="max-w-6xl mx-auto text-center">

          {/* TEACH ENGAGE EQUIP IMPACT */}
          <div className="flex justify-center items-center gap-2 flex-wrap mb-3">
            {[
              { word: "TEACH", color: "text-orange-500", delay: "0s" },
              { word: "•", color: "text-gray-300", delay: "" },
              { word: "ENGAGE", color: "text-green-600", delay: "0.2s" },
              { word: "•", color: "text-gray-300", delay: "" },
              { word: "EQUIP", color: "text-blue-600", delay: "0.4s" },
              { word: "•", color: "text-gray-300", delay: "" },
              { word: "IMPACT", color: "text-pink-600", delay: "0.6s" },
            ].map((item, i) => (
              <span
                key={i}
                className={`font-black text-2xl md:text-4xl ${item.color} ${item.delay ? "animate-bounce" : ""}`}
                style={item.delay ? { animationDelay: item.delay, animationDuration: "1.8s", display: "inline-block" } : {}}
              >
                {item.word}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-sm md:text-base font-semibold mb-6 max-w-lg mx-auto">
            Help children grow in faith and live like little disciples of Jesus!
          </p>

          <Link
            href="/login"
            className="inline-block bg-purple-800 hover:bg-purple-900 active:scale-95 text-white font-black py-4 px-12 rounded-2xl text-lg md:text-xl shadow-xl transition-all duration-150"
          >
            👩‍🏫 Teacher Login
          </Link>
        </div>
      </div>

    </main>
  );
}
