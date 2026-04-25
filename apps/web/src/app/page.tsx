import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-400 font-sans overflow-hidden">

      {/* Top banner */}
      <div className="bg-purple-700 text-white text-center py-2 px-4 text-xs font-bold tracking-widest uppercase animate-pulse">
        ★ 3 Full Weeks of Complete Lessons ★
      </div>

      {/* Hero — book cover image fills this section */}
      <div className="relative w-full">
        <Image
          src="/cover.jpg"
          alt="Little Disciples curriculum cover"
          width={800}
          height={600}
          className="w-full object-cover"
          priority
        />

        {/* Floating star decorations */}
        <div className="absolute top-4 right-4 text-yellow-300 text-3xl animate-spin" style={{ animationDuration: "6s" }}>✦</div>
        <div className="absolute top-12 left-6 text-yellow-200 text-xl animate-bounce" style={{ animationDelay: "0.5s" }}>★</div>
        <div className="absolute bottom-8 right-8 text-white text-2xl animate-bounce" style={{ animationDelay: "1s" }}>✦</div>
      </div>

      {/* TEACH • ENGAGE • EQUIP • IMPACT */}
      <div className="bg-white px-4 py-6">
        <div className="max-w-md mx-auto text-center">

          {/* Animated word row */}
          <div className="flex justify-center items-center gap-1 flex-wrap mb-2">
            {[
              { word: "TEACH", color: "text-orange-500" },
              { word: "•", color: "text-gray-300" },
              { word: "ENGAGE", color: "text-green-600" },
              { word: "•", color: "text-gray-300" },
              { word: "EQUIP", color: "text-blue-600" },
              { word: "•", color: "text-gray-300" },
              { word: "IMPACT", color: "text-pink-600" },
            ].map((item, i) => (
              <span
                key={i}
                className={`text-lg font-black ${item.color} ${item.word !== "•" ? "animate-float" : ""}`}
                style={{
                  animationDelay: item.word !== "•" ? `${i * 0.15}s` : undefined,
                  display: "inline-block",
                }}
              >
                {item.word}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-sm font-semibold mb-5">
            Help children grow in faith and live like little disciples of Jesus!
          </p>

          {/* Age group pills */}
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            {[
              { label: "Ages 0–4", color: "bg-orange-500" },
              { label: "Ages 5–9", color: "bg-green-600" },
              { label: "Ages 10–12", color: "bg-blue-600" },
              { label: "Ages 13–19", color: "bg-pink-600" },
            ].map((g) => (
              <span
                key={g.label}
                className={`${g.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}
              >
                {g.label}
              </span>
            ))}
          </div>

          {/* Feature row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: "🎵", label: "Songs Each Week" },
              { icon: "🖨️", label: "Print Ready PDFs" },
              { icon: "📺", label: "Videos & Songs" },
            ].map((f) => (
              <div key={f.label} className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="text-xs font-bold text-gray-700 leading-tight">{f.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/login"
            className="block bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-black py-4 px-8 rounded-2xl text-lg shadow-xl transition-all duration-150"
          >
            👩‍🏫 Teacher Login
          </Link>

          <p className="text-gray-400 text-xs mt-3">Walking with Jesus Every Day</p>
        </div>
      </div>

    </main>
  );
}
