"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ─── SVG CHARACTERS (unchanged) ─── */
function Amara() {
  return (
    <svg viewBox="0 0 130 160" className="w-20 md:w-32 drop-shadow-lg">
      <circle cx="38" cy="42" r="26" fill="#1a0800" stroke="#0d0300" strokeWidth="2" />
      <circle cx="92" cy="42" r="26" fill="#1a0800" stroke="#0d0300" strokeWidth="2" />
      <circle cx="34" cy="38" r="18" fill="#2c1208" /><circle cx="88" cy="38" r="18" fill="#2c1208" />
      <circle cx="24" cy="56" r="7" fill="#f39c12" stroke="#e67e22" strokeWidth="1.5" />
      <circle cx="106" cy="56" r="7" fill="#f39c12" stroke="#e67e22" strokeWidth="1.5" />
      <ellipse cx="65" cy="66" rx="30" ry="28" fill="#8B4513" stroke="#6d3410" strokeWidth="2" />
      <ellipse cx="35" cy="66" rx="7" ry="9" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <ellipse cx="95" cy="66" rx="7" ry="9" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <ellipse cx="52" cy="62" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="53" cy="64" r="5.5" fill="#1a0800" /><circle cx="55" cy="62" r="2" fill="white" />
      <ellipse cx="78" cy="62" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="79" cy="64" r="5.5" fill="#1a0800" /><circle cx="81" cy="62" r="2" fill="white" />
      <line x1="44" y1="56" x2="43" y2="51" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="53" x2="52" y2="48" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="55" x2="61" y2="50" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="55" x2="69" y2="50" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="78" y1="53" x2="78" y2="48" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="86" y1="56" x2="87" y2="51" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="65" cy="72" rx="4" ry="3" fill="#6d3410" />
      <path d="M 50 80 Q 65 92 80 80" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 52 81 Q 65 90 78 81" fill="white" />
      <circle cx="40" cy="76" r="8" fill="#e87070" opacity="0.35" /><circle cx="90" cy="76" r="8" fill="#e87070" opacity="0.35" />
      <rect x="57" y="92" width="16" height="10" rx="4" fill="#7a3810" />
      <path d="M 22 102 Q 18 108 16 150 L 114 150 Q 112 108 108 102 Q 90 95 65 95 Q 40 95 22 102Z" fill="#e74c3c" stroke="#c0392b" strokeWidth="1.5" />
      <path d="M 35 102 Q 50 98 65 97 Q 80 98 95 102 Q 80 106 65 107 Q 50 106 35 102Z" fill="#ff6b6b" opacity="0.5" />
      <path d="M 50 97 L 65 108 L 80 97" fill="white" opacity="0.85" />
      <path d="M 22 106 Q 8 112 5 128 Q 5 138 14 138 Q 18 128 24 118Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <path d="M 108 106 Q 122 112 125 128 Q 125 138 116 138 Q 112 128 106 118Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <rect x="10" y="128" width="48" height="32" rx="3" fill="#3498db" stroke="#2980b9" strokeWidth="1.5" />
      <rect x="34" y="128" width="3" height="32" fill="#2471a3" />
      <rect x="12" y="132" width="20" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="12" y="137" width="18" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="38" y="132" width="18" height="2" rx="1" fill="white" opacity="0.4" />
      <path d="M 30 148 Q 25 155 30 160 L 55 160 Q 58 155 50 148Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <path d="M 100 148 Q 105 155 100 160 L 75 160 Q 72 155 80 148Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <ellipse cx="38" cy="160" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      <ellipse cx="92" cy="160" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
    </svg>
  );
}
function Marcus() {
  return (
    <svg viewBox="0 0 110 170" className="w-16 md:w-28 drop-shadow-lg">
      <ellipse cx="55" cy="28" rx="28" ry="20" fill="#1a0800" stroke="#0d0300" strokeWidth="2" />
      <ellipse cx="55" cy="24" rx="22" ry="14" fill="#2c1208" />
      <ellipse cx="55" cy="55" rx="28" ry="30" fill="#c47c3a" stroke="#a0621e" strokeWidth="2" />
      <ellipse cx="27" cy="55" rx="7" ry="9" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      <ellipse cx="83" cy="55" rx="7" ry="9" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      <ellipse cx="43" cy="50" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="44" cy="52" r="5.5" fill="#1a0800" /><circle cx="46" cy="50" r="2" fill="white" />
      <ellipse cx="67" cy="50" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="68" cy="52" r="5.5" fill="#1a0800" /><circle cx="70" cy="50" r="2" fill="white" />
      <path d="M 36 43 Q 44 39 51 42" stroke="#1a0800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 59 42 Q 67 39 75 43" stroke="#1a0800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="55" cy="62" rx="4.5" ry="3.5" fill="#a0621e" />
      <path d="M 40 72 Q 55 86 70 72" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 42 74 Q 55 84 68 74" fill="white" />
      <circle cx="34" cy="67" r="8" fill="#e87070" opacity="0.35" /><circle cx="76" cy="67" r="8" fill="#e87070" opacity="0.35" />
      <rect x="47" y="83" width="16" height="10" rx="4" fill="#b06c2a" />
      <path d="M 16 93 Q 13 100 12 145 L 98 145 Q 97 100 94 93 Q 78 87 55 87 Q 32 87 16 93Z" fill="#2980b9" stroke="#1f6da0" strokeWidth="1.5" />
      <path d="M 16 98 Q 2 88 0 70 Q 2 62 10 64 Q 14 80 20 90Z" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      <text x="-8" y="68" fontSize="18" fill="#f1c40f" className="sparkle">★</text>
      <path d="M 94 98 Q 108 106 110 122 Q 108 130 100 128 Q 98 114 90 104Z" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      <path d="M 18 143 Q 16 155 18 170 L 52 170 Q 54 155 55 143Z" fill="#1a5276" stroke="#154360" strokeWidth="1.5" />
      <path d="M 92 143 Q 94 155 92 170 L 58 170 Q 56 155 55 143Z" fill="#1a5276" stroke="#154360" strokeWidth="1.5" />
      <ellipse cx="32" cy="170" rx="16" ry="7" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      <ellipse cx="78" cy="170" rx="16" ry="7" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
    </svg>
  );
}
function Noah() {
  return (
    <svg viewBox="0 0 100 150" className="w-14 md:w-24 drop-shadow-lg">
      <ellipse cx="50" cy="22" rx="26" ry="18" fill="#5c3317" stroke="#4a2a10" strokeWidth="2" />
      <ellipse cx="34" cy="14" rx="8" ry="10" fill="#5c3317" stroke="#4a2a10" strokeWidth="1.5" transform="rotate(-15 34 14)" />
      <ellipse cx="66" cy="14" rx="8" ry="10" fill="#5c3317" stroke="#4a2a10" strokeWidth="1.5" transform="rotate(15 66 14)" />
      <ellipse cx="50" cy="47" rx="26" ry="27" fill="#f5c99a" stroke="#d4a070" strokeWidth="2" />
      <ellipse cx="24" cy="47" rx="6.5" ry="8" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <ellipse cx="76" cy="47" rx="6.5" ry="8" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <ellipse cx="39" cy="43" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="40" cy="45" r="5.5" fill="#2c1a00" /><circle cx="42" cy="43" r="2" fill="white" />
      <ellipse cx="61" cy="43" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="62" cy="45" r="5.5" fill="#2c1a00" /><circle cx="64" cy="43" r="2" fill="white" />
      <path d="M 32 36 Q 40 31 47 34" stroke="#3d1f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 53 34 Q 60 31 68 36" stroke="#3d1f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="53" rx="4" ry="3" fill="#d4a070" />
      <path d="M 36 63 Q 50 76 64 63" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 38 65 Q 50 74 62 65" fill="white" />
      <circle cx="30" cy="59" r="7.5" fill="#ffaaaa" opacity="0.45" /><circle cx="70" cy="59" r="7.5" fill="#ffaaaa" opacity="0.45" />
      <rect x="43" y="72" width="14" height="9" rx="4" fill="#e8b580" />
      <path d="M 14 81 Q 11 88 10 130 L 90 130 Q 89 88 86 81 Q 72 75 50 75 Q 28 75 14 81Z" fill="#f1c40f" stroke="#d4ac0d" strokeWidth="1.5" />
      <path d="M 14 86 Q 0 76 -2 60 Q 0 52 8 54 Q 10 68 18 78Z" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <path d="M 86 86 Q 100 76 102 60 Q 100 52 92 54 Q 90 68 82 78Z" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <circle cx="0" cy="55" r="7" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <circle cx="100" cy="55" r="7" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <path d="M 14 128 Q 12 140 14 150 L 46 150 Q 48 140 50 128Z" fill="#27ae60" stroke="#1e8449" strokeWidth="1.5" />
      <path d="M 86 128 Q 88 140 86 150 L 54 150 Q 52 140 50 128Z" fill="#27ae60" stroke="#1e8449" strokeWidth="1.5" />
      <ellipse cx="28" cy="150" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" transform="rotate(-15 28 150)" />
      <ellipse cx="72" cy="150" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" transform="rotate(15 72 150)" />
    </svg>
  );
}

/* ─── PRICING CARD ─── */
function PricingCard({
  name, price, period, description, features, color, badge, highlight,
}: {
  name: string; price: string; period: string; description: string;
  features: string[]; color: string; badge?: string; highlight?: boolean;
}) {
  return (
    <div className={`relative flex-shrink-0 w-64 md:w-auto rounded-2xl p-5 shadow-lg border-2 ${highlight ? "border-purple-600 bg-white scale-105" : "border-gray-100 bg-white"}`}>
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-full shadow">
          {badge}
        </span>
      )}
      <div className={`${color} text-white rounded-xl px-3 py-1.5 text-xs font-black inline-block mb-3`}>{name}</div>
      <div className="flex items-end gap-1 mb-1">
        <span className="text-3xl font-black text-gray-900">{price}</span>
        <span className="text-gray-400 text-sm mb-1">{period}</span>
      </div>
      <p className="text-gray-500 text-xs mb-4 leading-snug">{description}</p>
      <ul className="space-y-2 mb-4">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-gray-700">
            <span className="text-green-500 font-black mt-0.5">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full ${highlight ? "bg-purple-700 hover:bg-purple-800" : "bg-gray-800 hover:bg-gray-900"} text-white font-bold py-2.5 rounded-xl text-sm transition active:scale-95`}>
        Get Started
      </button>
    </div>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [church, setChurch] = useState("");
  const [ageGroup, setAgeGroup] = useState("5-9");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      localStorage.setItem("kss_token", data.token);
      router.push("/dashboard");
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, church, email, password, ageGroup }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      localStorage.setItem("kss_token", data.token);
      router.push("/dashboard");
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/ forever",
      description: "Perfect for trying out Little Disciples with one class.",
      color: "bg-gray-500",
      features: [
        "1 class • up to 10 students",
        "First 2 lessons free",
        "Parent magic links",
        "Basic workbooks",
      ],
    },
    {
      name: "Standard",
      price: "$12",
      period: "/ month",
      description: "Everything one teacher needs for a thriving Sunday School class.",
      color: "bg-purple-600",
      badge: "Most Popular",
      highlight: true,
      features: [
        "1 class • unlimited students",
        "All lessons & content",
        "Workbooks + videos + songs",
        "Parent magic links",
        "Scripture memory tracking",
        "Print-ready PDFs",
      ],
    },
    {
      name: "Church",
      price: "$39",
      period: "/ month",
      description: "For churches running multiple age-group classes.",
      color: "bg-orange-500",
      features: [
        "Up to 6 classes & teachers",
        "All 4 age groups (0-4 to 13-19)",
        "All lessons & content",
        "Admin dashboard",
        "Attendance reporting",
        "Priority support",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-yellow-400 font-sans overflow-x-hidden">

      {/* ── TOP BANNER ── */}
      <div className="bg-purple-800 text-white text-center py-2 px-4 text-xs font-black tracking-widest">
        ✝&nbsp;&nbsp;ROOTED IN GOD&apos;S WORD • BUILT ON FAITH • GROWING IN JESUS&nbsp;&nbsp;✝
      </div>

      {/* ══════════════════════════════
          MOBILE HERO (hidden on desktop)
      ══════════════════════════════ */}
      <div className="md:hidden px-4 pt-5 pb-3">
        {/* Logo compact */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.jpg" alt="Little Disciples" className="w-20 h-12 object-cover rounded-xl shadow-xl flex-shrink-0" />
          <div>
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Sunday School Curriculum
            </span>
            <p className="text-purple-700 text-xs font-semibold mt-1">Raising Disciples of Jesus Christ</p>
          </div>
        </div>

        {/* Characters — compact row */}
        <div className="relative flex items-end justify-around mb-0 pt-2">
          <span className="sparkle absolute top-0 left-1/3 text-yellow-300 text-xl">★</span>
          <span className="sparkle absolute top-2 right-1/4 text-orange-300 text-base" style={{ animationDelay: "0.6s" }}>✦</span>
          <div className="kid-float"><Amara /></div>
          <div className="kid-jump" style={{ animationDelay: "0.3s" }}><Noah /></div>
          <div className="kid-float-2" style={{ animationDelay: "0.6s" }}><Marcus /></div>
        </div>
        <div className="h-3 bg-green-500 rounded-b-xl mb-4" />

        {/* Age pills */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {[
            { label: "Ages 0–4", bg: "bg-orange-500" },
            { label: "Ages 5–9", bg: "bg-green-600" },
            { label: "Ages 10–12", bg: "bg-blue-600" },
            { label: "Ages 13–19", bg: "bg-pink-600" },
          ].map((g) => (
            <span key={g.label} className={`${g.bg} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{g.label}</span>
          ))}
        </div>

        {/* Bible verse */}
        <div className="bg-purple-800 bg-opacity-10 border-l-4 border-purple-700 rounded-xl px-3 py-2.5 mb-4">
          <p className="text-purple-900 text-xs font-bold italic leading-snug">
            &ldquo;Train up a child in the way he should go…&rdquo;
          </p>
          <p className="text-purple-600 text-xs font-black mt-0.5">— Proverbs 22:6</p>
        </div>
      </div>

      {/* ══════════════════════════════
          MAIN CONTENT — 2 cols desktop / single col mobile
      ══════════════════════════════ */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-10 md:pt-8 pb-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

          {/* ── LEFT COL (desktop only) ── */}
          <div className="hidden md:flex flex-1 flex-col gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img src="/logo.jpg" alt="Little Disciples" className="w-36 h-20 object-cover rounded-2xl shadow-2xl" />
              </div>
              <div>
                <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Sunday School Curriculum
                </span>
                <p className="text-purple-800 text-xs font-semibold mt-1">Raising Disciples of Jesus Christ</p>
              </div>
            </div>
            {/* Characters */}
            <div className="relative">
              <span className="sparkle absolute top-2 left-1/4 text-yellow-300 text-2xl z-10">★</span>
              <span className="sparkle absolute top-0 right-1/4 text-orange-300 text-lg z-10" style={{ animationDelay: "0.7s" }}>✦</span>
              <div className="flex items-end justify-around pt-4">
                <div className="kid-float"><Amara /></div>
                <div className="kid-jump" style={{ animationDelay: "0.3s" }}><Noah /></div>
                <div className="kid-float-2" style={{ animationDelay: "0.6s" }}><Marcus /></div>
              </div>
              <div className="h-4 bg-green-500 rounded-b-2xl" />
            </div>
            {/* Age pills */}
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Ages 0–4", bg: "bg-orange-500" },
                { label: "Ages 5–9", bg: "bg-green-600" },
                { label: "Ages 10–12", bg: "bg-blue-600" },
                { label: "Ages 13–19", bg: "bg-pink-600" },
              ].map((g) => (
                <span key={g.label} className={`${g.bg} text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-sm`}>{g.label}</span>
              ))}
            </div>
            {/* Features */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: "✝️", label: "Bible Truth" },
                { icon: "🙏", label: "Prayer" },
                { icon: "🎵", label: "Worship" },
                { icon: "📖", label: "Scripture" },
              ].map((f) => (
                <div key={f.label} className="bg-white rounded-xl py-3 text-center shadow-sm">
                  <div className="text-2xl">{f.icon}</div>
                  <div className="text-xs font-bold text-gray-600 mt-1">{f.label}</div>
                </div>
              ))}
            </div>
            {/* Bible verse */}
            <div className="bg-purple-800 bg-opacity-10 border-l-4 border-purple-700 rounded-xl px-4 py-3">
              <p className="text-purple-900 text-sm font-bold italic leading-snug">
                &ldquo;Train up a child in the way he should go, and when he is old he will not depart from it.&rdquo;
              </p>
              <p className="text-purple-600 text-xs font-black mt-1">— Proverbs 22:6</p>
            </div>
          </div>

          {/* ── RIGHT COL (full width on mobile) ── */}
          <div className="w-full md:flex-1 flex flex-col gap-4">

            {/* Login / Sign Up card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => { setTab("login"); setError(""); }}
                  className={`flex-1 py-3.5 text-sm font-black transition ${tab === "login" ? "bg-purple-800 text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  👩‍🏫 Login
                </button>
                <button
                  onClick={() => { setTab("signup"); setError(""); }}
                  className={`flex-1 py-3.5 text-sm font-black transition ${tab === "signup" ? "bg-purple-800 text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  ✨ Create Account
                </button>
              </div>

              <div className="p-5">
                {tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-4 py-3 text-sm outline-none transition bg-gray-50" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-4 py-3 text-sm outline-none transition bg-gray-50" required />
                    </div>
                    {error && <p className="text-red-500 text-xs font-semibold bg-red-50 rounded-xl px-3 py-2">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="w-full bg-purple-800 hover:bg-purple-900 disabled:opacity-50 text-white font-black py-3.5 rounded-xl text-base shadow-lg transition active:scale-95">
                      {loading ? "Logging in…" : "Login →"}
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      No account?{" "}
                      <button type="button" onClick={() => setTab("signup")} className="text-purple-600 font-bold">Create one free</button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleSignup} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Your Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                          placeholder="Pastor Grace"
                          className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-3 py-3 text-sm outline-none transition bg-gray-50" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Church</label>
                        <input type="text" value={church} onChange={(e) => setChurch(e.target.value)}
                          placeholder="Grace Chapel"
                          className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-3 py-3 text-sm outline-none transition bg-gray-50" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Age Group You Teach</label>
                      <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}
                        className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-4 py-3 text-sm outline-none transition bg-gray-50">
                        {["0-4", "5-9", "10-12", "13-19"].map((g) => (
                          <option key={g} value={g}>Ages {g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-4 py-3 text-sm outline-none transition bg-gray-50" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 8 characters"
                        className="w-full border-2 border-gray-100 focus:border-purple-500 rounded-xl px-4 py-3 text-sm outline-none transition bg-gray-50" required />
                    </div>
                    {error && <p className="text-red-500 text-xs font-semibold bg-red-50 rounded-xl px-3 py-2">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black py-3.5 rounded-xl text-base shadow-lg transition active:scale-95">
                      {loading ? "Creating account…" : "Create Free Account →"}
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      Already have an account?{" "}
                      <button type="button" onClick={() => setTab("login")} className="text-purple-600 font-bold">Login</button>
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* What's inside (desktop only in right col) */}
            <div className="hidden md:block bg-white rounded-2xl p-4 shadow">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">What&apos;s Inside Each Lesson</p>
              <div className="space-y-2">
                {[
                  { color: "bg-orange-500", label: "Bible Teaching — Memory Verse + Scripture Study" },
                  { color: "bg-green-600",  label: "Worship & Prayer — Songs + Guided Prayer Time" },
                  { color: "bg-blue-600",   label: "Faith in Action — Activities & Life Application" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`${item.color} w-3 h-3 rounded-full flex-shrink-0`} />
                    <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          PRICING SECTION
      ══════════════════════════════ */}
      <div className="bg-white px-4 md:px-10 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-1">Simple Pricing</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Choose Your Plan</h2>
            <p className="text-gray-500 text-sm mt-1">Start free. Upgrade when you&apos;re ready.</p>
          </div>

          {/* Mobile: horizontal scroll / Desktop: 3-col grid */}
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            ✝ All plans include access to our Christ-centred curriculum library
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
          BOTTOM STRIP
      ══════════════════════════════ */}
      <div className="bg-yellow-400 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-1 md:gap-2 flex-wrap mb-2">
            {[
              { word: "TEACH",  color: "text-orange-500", delay: "0s" },
              { word: "•",      color: "text-yellow-600", delay: "" },
              { word: "ENGAGE", color: "text-green-700",  delay: "0.2s" },
              { word: "•",      color: "text-yellow-600", delay: "" },
              { word: "EQUIP",  color: "text-blue-700",   delay: "0.4s" },
              { word: "•",      color: "text-yellow-600", delay: "" },
              { word: "IMPACT", color: "text-pink-600",   delay: "0.6s" },
            ].map((item, i) => (
              <span key={i}
                className={`font-black text-xl md:text-3xl ${item.color} ${item.delay ? "kid-float" : ""}`}
                style={item.delay ? { animationDelay: item.delay, display: "inline-block" } : {}}>
                {item.word}
              </span>
            ))}
          </div>
          <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">
            Philippians 4:13 &nbsp;•&nbsp; Proverbs 22:6 &nbsp;•&nbsp; Matthew 28:19
          </p>
          <p className="text-purple-900 text-sm font-semibold">
            Helping children know Jesus, love His Word, and live as His disciples.
          </p>
        </div>
      </div>

    </main>
  );
}
