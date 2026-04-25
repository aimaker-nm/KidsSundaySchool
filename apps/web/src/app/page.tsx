import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-orange-50 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-orange-500">Little Disciples</h1>
          <p className="text-gray-600 text-lg">Teach • Engage • Equip • Impact</p>
          <p className="text-gray-500 text-sm">Help children grow in faith and live like little disciples of Jesus</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition"
          >
            Teacher Login
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-8">
          {[
            { label: "Ages 0-4", color: "bg-orange-400" },
            { label: "Ages 5-9", color: "bg-green-500" },
            { label: "Ages 10-12", color: "bg-blue-500" },
            { label: "Ages 13-19", color: "bg-pink-500" },
          ].map((g) => (
            <div key={g.label} className={`${g.color} text-white text-xs font-bold py-2 px-1 rounded-lg text-center`}>
              {g.label}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
