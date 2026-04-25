import Link from "next/link";

/* ─────────────────────────────────────────
   CHARACTER 1 — Amara (Black girl, afro puffs, red dress, reading)
───────────────────────────────────────── */
function Amara() {
  return (
    <svg viewBox="0 0 130 160" className="w-28 md:w-40 drop-shadow-lg">
      {/* ── Afro puffs ── */}
      <circle cx="38" cy="42" r="26" fill="#1a0800" stroke="#0d0300" strokeWidth="2" />
      <circle cx="92" cy="42" r="26" fill="#1a0800" stroke="#0d0300" strokeWidth="2" />
      <circle cx="34" cy="38" r="18" fill="#2c1208" />
      <circle cx="88" cy="38" r="18" fill="#2c1208" />
      {/* Hair-tie beads */}
      <circle cx="24" cy="56" r="7" fill="#f39c12" stroke="#e67e22" strokeWidth="1.5" />
      <circle cx="106" cy="56" r="7" fill="#f39c12" stroke="#e67e22" strokeWidth="1.5" />
      <circle cx="24" cy="56" r="3" fill="#fff" opacity="0.3" />
      <circle cx="106" cy="56" r="3" fill="#fff" opacity="0.3" />
      {/* ── Head ── */}
      <ellipse cx="65" cy="66" rx="30" ry="28" fill="#8B4513" stroke="#6d3410" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="35" cy="66" rx="7" ry="9" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <ellipse cx="95" cy="66" rx="7" ry="9" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      {/* Inner ear */}
      <ellipse cx="35" cy="66" rx="3.5" ry="5" fill="#6a3010" />
      <ellipse cx="95" cy="66" rx="3.5" ry="5" fill="#6a3010" />
      {/* ── Eyes ── */}
      {/* Left eye */}
      <ellipse cx="52" cy="62" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="53" cy="64" r="5.5" fill="#1a0800" />
      <circle cx="55" cy="62" r="2" fill="white" />
      {/* Right eye */}
      <ellipse cx="78" cy="62" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="79" cy="64" r="5.5" fill="#1a0800" />
      <circle cx="81" cy="62" r="2" fill="white" />
      {/* Eyelashes */}
      <line x1="44" y1="56" x2="43" y2="51" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="53" x2="52" y2="48" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="55" x2="61" y2="50" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="55" x2="69" y2="50" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="78" y1="53" x2="78" y2="48" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="86" y1="56" x2="87" y2="51" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="65" cy="72" rx="4" ry="3" fill="#6d3410" />
      {/* Smile */}
      <path d="M 50 80 Q 65 92 80 80" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 52 81 Q 65 90 78 81" fill="white" />
      {/* Cheeks */}
      <circle cx="40" cy="76" r="8" fill="#e87070" opacity="0.35" />
      <circle cx="90" cy="76" r="8" fill="#e87070" opacity="0.35" />
      {/* ── Neck ── */}
      <rect x="57" y="92" width="16" height="10" rx="4" fill="#7a3810" />
      {/* ── Body / red dress ── */}
      <path d="M 22 102 Q 18 108 16 150 L 114 150 Q 112 108 108 102 Q 90 95 65 95 Q 40 95 22 102Z" fill="#e74c3c" stroke="#c0392b" strokeWidth="1.5" />
      {/* Dress highlight */}
      <path d="M 35 102 Q 50 98 65 97 Q 80 98 95 102 Q 80 106 65 107 Q 50 106 35 102Z" fill="#ff6b6b" opacity="0.5" />
      {/* Collar */}
      <path d="M 50 97 L 65 108 L 80 97" fill="white" opacity="0.85" stroke="#eee" strokeWidth="0.5" />
      {/* ── Left arm (holding book) ── */}
      <path d="M 22 106 Q 8 112 5 128 Q 5 138 14 138 Q 18 128 24 118Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      {/* ── Right arm ── */}
      <path d="M 108 106 Q 122 112 125 128 Q 125 138 116 138 Q 112 128 106 118Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      {/* ── Open book in lap ── */}
      <rect x="10" y="128" width="48" height="32" rx="3" fill="#3498db" stroke="#2980b9" strokeWidth="1.5" />
      <rect x="34" y="128" width="3" height="32" fill="#2471a3" />
      <rect x="12" y="132" width="20" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="12" y="137" width="18" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="12" y="142" width="20" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="38" y="132" width="18" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="38" y="137" width="20" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="38" y="142" width="16" height="2" rx="1" fill="white" opacity="0.4" />
      {/* ── Sitting legs ── */}
      <path d="M 30 148 Q 25 155 30 160 L 55 160 Q 58 155 50 148Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      <path d="M 100 148 Q 105 155 100 160 L 75 160 Q 72 155 80 148Z" fill="#7a3810" stroke="#6d3410" strokeWidth="1.5" />
      {/* Shoes */}
      <ellipse cx="38" cy="160" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      <ellipse cx="92" cy="160" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   CHARACTER 2 — Marcus (Brown boy, blue outfit, standing, arm raised)
───────────────────────────────────────── */
function Marcus() {
  return (
    <svg viewBox="0 0 110 170" className="w-24 md:w-36 drop-shadow-lg">
      {/* ── Short afro hair ── */}
      <ellipse cx="55" cy="28" rx="28" ry="20" fill="#1a0800" stroke="#0d0300" strokeWidth="2" />
      <ellipse cx="55" cy="24" rx="22" ry="14" fill="#2c1208" />
      {/* Hairline */}
      <path d="M 27 35 Q 30 25 55 22 Q 80 25 83 35" fill="#1a0800" stroke="#0d0300" strokeWidth="1" />
      {/* ── Head ── */}
      <ellipse cx="55" cy="55" rx="28" ry="30" fill="#c47c3a" stroke="#a0621e" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="27" cy="55" rx="7" ry="9" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      <ellipse cx="83" cy="55" rx="7" ry="9" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      {/* ── Eyes ── */}
      <ellipse cx="43" cy="50" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="44" cy="52" r="5.5" fill="#1a0800" />
      <circle cx="46" cy="50" r="2" fill="white" />
      <ellipse cx="67" cy="50" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="68" cy="52" r="5.5" fill="#1a0800" />
      <circle cx="70" cy="50" r="2" fill="white" />
      {/* Eyebrows */}
      <path d="M 36 43 Q 44 39 51 42" stroke="#1a0800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 59 42 Q 67 39 75 43" stroke="#1a0800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="55" cy="62" rx="4.5" ry="3.5" fill="#a0621e" />
      {/* Big smile */}
      <path d="M 40 72 Q 55 86 70 72" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 42 74 Q 55 84 68 74" fill="white" />
      {/* Cheeks */}
      <circle cx="34" cy="67" r="8" fill="#e87070" opacity="0.35" />
      <circle cx="76" cy="67" r="8" fill="#e87070" opacity="0.35" />
      {/* ── Neck ── */}
      <rect x="47" y="83" width="16" height="10" rx="4" fill="#b06c2a" />
      {/* ── Body / blue shirt ── */}
      <path d="M 16 93 Q 13 100 12 145 L 98 145 Q 97 100 94 93 Q 78 87 55 87 Q 32 87 16 93Z" fill="#2980b9" stroke="#1f6da0" strokeWidth="1.5" />
      {/* Shirt highlight */}
      <path d="M 28 93 Q 42 89 55 88 Q 68 89 82 93 Q 68 97 55 98 Q 42 97 28 93Z" fill="#5dade2" opacity="0.5" />
      {/* Collar */}
      <path d="M 44 89 L 55 100 L 66 89" fill="white" opacity="0.8" />
      {/* ── LEFT ARM raised up with star ── */}
      <path d="M 16 98 Q 2 88 0 70 Q 2 62 10 64 Q 14 80 20 90Z" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      {/* Star in raised hand */}
      <text x="-8" y="68" fontSize="18" fill="#f1c40f" className="sparkle">★</text>
      {/* ── RIGHT arm down ── */}
      <path d="M 94 98 Q 108 106 110 122 Q 108 130 100 128 Q 98 114 90 104Z" fill="#b06c2a" stroke="#a0621e" strokeWidth="1.5" />
      {/* ── Shorts ── */}
      <path d="M 18 143 Q 16 155 18 170 L 52 170 Q 54 155 55 143Z" fill="#1a5276" stroke="#154360" strokeWidth="1.5" />
      <path d="M 92 143 Q 94 155 92 170 L 58 170 Q 56 155 55 143Z" fill="#1a5276" stroke="#154360" strokeWidth="1.5" />
      {/* Legs */}
      <rect x="22" y="168" width="24" height="2" rx="2" fill="#b06c2a" />
      <rect x="64" y="168" width="24" height="2" rx="2" fill="#b06c2a" />
      {/* Shoes */}
      <ellipse cx="32" cy="170" rx="16" ry="7" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      <ellipse cx="78" cy="170" rx="16" ry="7" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      {/* Shoe highlights */}
      <ellipse cx="28" cy="167" rx="6" ry="2.5" fill="white" opacity="0.2" />
      <ellipse cx="74" cy="167" rx="6" ry="2.5" fill="white" opacity="0.2" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   CHARACTER 3 — Sofia (Tan girl, pigtails, purple dress, Bible)
───────────────────────────────────────── */
function Sofia() {
  return (
    <svg viewBox="0 0 110 165" className="w-24 md:w-36 drop-shadow-lg">
      {/* ── Pigtails ── */}
      {/* Left pigtail */}
      <ellipse cx="20" cy="50" rx="12" ry="20" fill="#3d1f00" stroke="#2c1500" strokeWidth="1.5" transform="rotate(-15 20 50)" />
      <circle cx="19" cy="68" r="7" fill="#f39c12" stroke="#e67e22" strokeWidth="1.5" />
      {/* Right pigtail */}
      <ellipse cx="90" cy="50" rx="12" ry="20" fill="#3d1f00" stroke="#2c1500" strokeWidth="1.5" transform="rotate(15 90 50)" />
      <circle cx="91" cy="68" r="7" fill="#f39c12" stroke="#e67e22" strokeWidth="1.5" />
      {/* ── Main hair ── */}
      <ellipse cx="55" cy="28" rx="30" ry="22" fill="#3d1f00" stroke="#2c1500" strokeWidth="2" />
      <ellipse cx="55" cy="24" rx="24" ry="15" fill="#5c3317" />
      {/* ── Head ── */}
      <ellipse cx="55" cy="57" rx="27" ry="29" fill="#e8a870" stroke="#c8844c" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="28" cy="57" rx="6.5" ry="8.5" fill="#d4935a" stroke="#c8844c" strokeWidth="1.5" />
      <ellipse cx="82" cy="57" rx="6.5" ry="8.5" fill="#d4935a" stroke="#c8844c" strokeWidth="1.5" />
      {/* ── Eyes ── */}
      <ellipse cx="43" cy="52" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="44" cy="54" r="5.5" fill="#3d2000" />
      <circle cx="46" cy="52" r="2" fill="white" />
      <ellipse cx="67" cy="52" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="68" cy="54" r="5.5" fill="#3d2000" />
      <circle cx="70" cy="52" r="2" fill="white" />
      {/* Lashes */}
      <line x1="35" y1="46" x2="34" y2="41" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="43" y1="43" x2="43" y2="38" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="51" y1="45" x2="52" y2="40" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="59" y1="45" x2="58" y2="40" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="43" x2="67" y2="38" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="75" y1="46" x2="76" y2="41" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="55" cy="63" rx="3.5" ry="2.5" fill="#c8844c" />
      {/* Smile */}
      <path d="M 42 73 Q 55 84 68 73" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 44 74 Q 55 82 66 74" fill="white" />
      {/* Cheeks */}
      <circle cx="34" cy="68" r="8" fill="#e87070" opacity="0.35" />
      <circle cx="76" cy="68" r="8" fill="#e87070" opacity="0.35" />
      {/* ── Neck ── */}
      <rect x="47" y="84" width="16" height="9" rx="4" fill="#d4935a" />
      {/* ── Purple dress ── */}
      <path d="M 18 93 Q 15 100 14 145 L 96 145 Q 95 100 92 93 Q 76 87 55 87 Q 34 87 18 93Z" fill="#8e44ad" stroke="#7d3c98" strokeWidth="1.5" />
      <path d="M 30 93 Q 43 89 55 88 Q 67 89 80 93 Q 67 97 55 98 Q 43 97 30 93Z" fill="#a569bd" opacity="0.5" />
      {/* Collar bow */}
      <path d="M 44 90 L 55 100 L 66 90" fill="white" opacity="0.85" />
      <circle cx="55" cy="100" r="3" fill="#f39c12" />
      {/* ── Left arm with Bible ── */}
      <path d="M 18 98 Q 6 106 5 120 Q 5 130 13 130 Q 16 118 22 108Z" fill="#d4935a" stroke="#c8844c" strokeWidth="1.5" />
      {/* Bible */}
      <rect x="0" y="118" width="22" height="28" rx="3" fill="#8e44ad" stroke="#7d3c98" strokeWidth="1.5" />
      <rect x="2" y="120" width="18" height="24" rx="2" fill="#9b59b6" />
      <line x1="11" y1="120" x2="11" y2="144" stroke="#f39c12" strokeWidth="1.5" />
      <text x="3" y="133" fontSize="7" fill="white" fontWeight="bold">Holy</text>
      <text x="3" y="141" fontSize="7" fill="white" fontWeight="bold">Bible</text>
      {/* ── Right arm ── */}
      <path d="M 92 98 Q 104 106 105 120 Q 105 130 97 130 Q 94 118 88 108Z" fill="#d4935a" stroke="#c8844c" strokeWidth="1.5" />
      {/* ── Legs ── */}
      <rect x="25" y="143" width="22" height="20" rx="6" fill="#d4935a" stroke="#c8844c" strokeWidth="1.5" />
      <rect x="63" y="143" width="22" height="20" rx="6" fill="#d4935a" stroke="#c8844c" strokeWidth="1.5" />
      {/* Shoes */}
      <ellipse cx="36" cy="164" rx="15" ry="7" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      <ellipse cx="74" cy="164" rx="15" ry="7" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" />
      <ellipse cx="32" cy="161" rx="5" ry="2" fill="white" opacity="0.2" />
      <ellipse cx="70" cy="161" rx="5" ry="2" fill="white" opacity="0.2" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   CHARACTER 4 — Noah (Light skin, messy hair, yellow shirt, jumping)
───────────────────────────────────────── */
function Noah() {
  return (
    <svg viewBox="0 0 100 150" className="w-20 md:w-32 drop-shadow-lg">
      {/* ── Messy hair ── */}
      <ellipse cx="50" cy="22" rx="26" ry="18" fill="#5c3317" stroke="#4a2a10" strokeWidth="2" />
      {/* Spiky bits */}
      <ellipse cx="34" cy="14" rx="8" ry="10" fill="#5c3317" stroke="#4a2a10" strokeWidth="1.5" transform="rotate(-15 34 14)" />
      <ellipse cx="66" cy="14" rx="8" ry="10" fill="#5c3317" stroke="#4a2a10" strokeWidth="1.5" transform="rotate(15 66 14)" />
      <ellipse cx="50" cy="10" rx="8" ry="11" fill="#5c3317" stroke="#4a2a10" strokeWidth="1.5" />
      {/* ── Head ── */}
      <ellipse cx="50" cy="47" rx="26" ry="27" fill="#f5c99a" stroke="#d4a070" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="24" cy="47" rx="6.5" ry="8" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <ellipse cx="76" cy="47" rx="6.5" ry="8" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      {/* ── Eyes ── */}
      <ellipse cx="39" cy="43" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="40" cy="45" r="5.5" fill="#2c1a00" />
      <circle cx="42" cy="43" r="2" fill="white" />
      <ellipse cx="61" cy="43" rx="8" ry="9" fill="white" stroke="#1a0800" strokeWidth="1.5" />
      <circle cx="62" cy="45" r="5.5" fill="#2c1a00" />
      <circle cx="64" cy="43" r="2" fill="white" />
      {/* Eyebrows (raised — excited) */}
      <path d="M 32 36 Q 40 31 47 34" stroke="#3d1f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 53 34 Q 60 31 68 36" stroke="#3d1f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="50" cy="53" rx="4" ry="3" fill="#d4a070" />
      {/* Open laugh */}
      <path d="M 36 63 Q 50 76 64 63" fill="#e07050" stroke="#c05030" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 38 65 Q 50 74 62 65" fill="white" />
      {/* Cheeks */}
      <circle cx="30" cy="59" r="7.5" fill="#ffaaaa" opacity="0.45" />
      <circle cx="70" cy="59" r="7.5" fill="#ffaaaa" opacity="0.45" />
      {/* ── Neck ── */}
      <rect x="43" y="72" width="14" height="9" rx="4" fill="#e8b580" />
      {/* ── Yellow shirt ── */}
      <path d="M 14 81 Q 11 88 10 130 L 90 130 Q 89 88 86 81 Q 72 75 50 75 Q 28 75 14 81Z" fill="#f1c40f" stroke="#d4ac0d" strokeWidth="1.5" />
      <path d="M 26 81 Q 39 77 50 76 Q 61 77 74 81 Q 61 85 50 86 Q 39 85 26 81Z" fill="#f7dc6f" opacity="0.6" />
      {/* Collar */}
      <path d="M 40 77 L 50 87 L 60 77" fill="white" opacity="0.8" />
      {/* ── Both arms up (jumping excited) ── */}
      <path d="M 14 86 Q 0 76 -2 60 Q 0 52 8 54 Q 10 68 18 78Z" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <path d="M 86 86 Q 100 76 102 60 Q 100 52 92 54 Q 90 68 82 78Z" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      {/* Hands */}
      <circle cx="0" cy="55" r="7" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      <circle cx="100" cy="55" r="7" fill="#e8b580" stroke="#d4a070" strokeWidth="1.5" />
      {/* ── Shorts ── */}
      <path d="M 14 128 Q 12 140 14 150 L 46 150 Q 48 140 50 128Z" fill="#27ae60" stroke="#1e8449" strokeWidth="1.5" />
      <path d="M 86 128 Q 88 140 86 150 L 54 150 Q 52 140 50 128Z" fill="#27ae60" stroke="#1e8449" strokeWidth="1.5" />
      {/* Shoes — mid air (jumping) */}
      <ellipse cx="28" cy="150" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" transform="rotate(-15 28 150)" />
      <ellipse cx="72" cy="150" rx="14" ry="6" fill="#1a0800" stroke="#0d0300" strokeWidth="1.5" transform="rotate(15 72 150)" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   BOOK STACK
───────────────────────────────────────── */
function BookStack() {
  return (
    <svg viewBox="0 0 130 155" className="w-28 md:w-40 drop-shadow-xl">
      {/* Back book — pink */}
      <rect x="12" y="36" width="104" height="118" rx="8" fill="#c0392b" stroke="#a93226" strokeWidth="2" />
      <rect x="14" y="38" width="100" height="114" rx="7" fill="#e74c3c" />
      <rect x="14" y="38" width="12" height="114" rx="4" fill="#c0392b" />
      <text x="32" y="62" fontSize="8" fill="white" fontWeight="bold" opacity="0.9">Ages 13-19</text>
      <text x="32" y="78" fontSize="11" fill="white" fontWeight="900">Little</text>
      <text x="32" y="92" fontSize="11" fill="white" fontWeight="900">Disciples</text>
      {/* Middle book — blue */}
      <rect x="6" y="24" width="104" height="118" rx="8" fill="#1565c0" stroke="#0d47a1" strokeWidth="2" />
      <rect x="8" y="26" width="100" height="114" rx="7" fill="#1976d2" />
      <rect x="8" y="26" width="12" height="114" rx="4" fill="#1565c0" />
      <text x="26" y="48" fontSize="8" fill="white" fontWeight="bold" opacity="0.9">Ages 10-12</text>
      <text x="26" y="64" fontSize="11" fill="white" fontWeight="900">Little</text>
      <text x="26" y="78" fontSize="11" fill="white" fontWeight="900">Disciples</text>
      {/* Front book — green */}
      <rect x="0" y="12" width="104" height="118" rx="8" fill="#1b5e20" stroke="#145214" strokeWidth="2" />
      <rect x="2" y="14" width="100" height="114" rx="7" fill="#2e7d32" />
      <rect x="2" y="14" width="12" height="114" rx="4" fill="#1b5e20" />
      {/* Crown on front */}
      <circle cx="52" cy="42" r="20" fill="#f9a825" stroke="#f57f17" strokeWidth="2" />
      <text x="40" y="49" fontSize="20" fill="white">👑</text>
      <text x="20" y="72" fontSize="12" fill="white" fontWeight="900">Little</text>
      <text x="14" y="86" fontSize="12" fill="white" fontWeight="900">Disciples</text>
      <text x="18" y="100" fontSize="8" fill="#a5d6a7" fontWeight="bold">Weeks 1–3</text>
      <line x1="18" y1="104" x2="85" y2="104" stroke="#a5d6a7" strokeWidth="1" opacity="0.7" />
      <text x="18" y="114" fontSize="7" fill="#c8e6c9" opacity="0.8">A Global Curriculum</text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   WEEK PREVIEW CARD
───────────────────────────────────────── */
function WeekCard({ week, title, color }: { week: string; title: string; color: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className={`${color} text-white text-center py-1.5 text-xs font-black tracking-widest`}>{week}</div>
      <div className="p-3">
        <p className="text-gray-800 text-xs font-bold leading-snug mb-2">{title}</p>
        <div className="space-y-1 mb-2">
          <div className="h-1.5 bg-gray-100 rounded w-full" />
          <div className="h-1.5 bg-gray-100 rounded w-4/5" />
          <div className="h-1.5 bg-gray-100 rounded w-3/5" />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-orange-50 rounded p-1 text-center text-xs text-orange-700 font-bold">📖 Teach</div>
          <div className="bg-blue-50 rounded p-1 text-center text-xs text-blue-700 font-bold">✏️ Work</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-400 font-sans overflow-x-hidden">

      {/* Top banner */}
      <div className="bg-purple-800 text-white text-center py-2 px-4 text-xs font-black tracking-widest">
        ★&nbsp;&nbsp;3 FULL WEEKS OF COMPLETE LESSONS&nbsp;&nbsp;★
      </div>

      {/* ═══ HERO — 2 columns on desktop ═══ */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-10 pt-8 pb-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

          {/* ──────── LEFT COLUMN ──────── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Logo row */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-purple-800 rounded-3xl flex flex-col items-center justify-center shadow-2xl">
                  <span className="text-yellow-300 text-3xl md:text-4xl leading-none">👑</span>
                  <span className="text-white text-base md:text-xl font-black leading-none mt-1">LD</span>
                </div>
                <span className="sparkle absolute -top-3 -right-3 text-yellow-300 text-xl">✦</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-purple-900 leading-none tracking-tight">
                  Little<br />Disciples
                </h1>
                <span className="inline-block bg-green-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full mt-2 shadow">
                  Weeks 1–3 Starter Pack
                </span>
                <p className="text-purple-800 text-xs md:text-sm font-semibold mt-1">
                  A Global Children's Curriculum System
                </p>
              </div>
            </div>

            {/* ── CHARACTERS on grass ── */}
            <div className="relative">
              {/* Floating sparkles */}
              <span className="sparkle absolute top-2 left-1/4 text-yellow-300 text-2xl z-10">★</span>
              <span className="sparkle absolute top-0 right-1/4 text-orange-300 text-lg z-10" style={{ animationDelay: "0.7s" }}>✦</span>
              <span className="sparkle absolute top-8 left-8 text-pink-300 text-base z-10" style={{ animationDelay: "1.3s" }}>★</span>

              {/* Characters row */}
              <div className="flex items-end justify-around pt-6 pb-0">
                <div className="kid-float" style={{ animationDelay: "0s" }}>
                  <Amara />
                </div>
                <div className="kid-jump" style={{ animationDelay: "0.4s" }}>
                  <Noah />
                </div>
                <div className="kid-float-2" style={{ animationDelay: "0.8s" }}>
                  <Marcus />
                </div>
                <div className="kid-sway hidden md:block" style={{ animationDelay: "0.2s" }}>
                  <Sofia />
                </div>
              </div>

              {/* Green grass ground */}
              <div className="h-5 bg-green-500 rounded-b-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-green-400 opacity-40 rounded-b-2xl" style={{ clipPath: "ellipse(55% 60% at 50% 100%)" }} />
              </div>
            </div>

            {/* Age group tags */}
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Ages 0–4",   bg: "bg-orange-500" },
                { label: "Ages 5–9",   bg: "bg-green-600" },
                { label: "Ages 10–12", bg: "bg-blue-600" },
                { label: "Ages 13–19", bg: "bg-pink-600" },
              ].map((g) => (
                <span key={g.label} className={`${g.bg} text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                  {g.label}
                </span>
              ))}
            </div>

            {/* Feature icons */}
            <div className="grid grid-cols-4 gap-2">
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

            <p className="text-purple-900 text-xs md:text-sm font-black tracking-wide text-center">
              Walking with Jesus Every Day
            </p>
          </div>

          {/* ──────── RIGHT COLUMN ──────── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Book + badges */}
            <div className="flex gap-4 items-start">
              <div className="kid-float-2 flex-shrink-0">
                <BookStack />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="bg-purple-800 text-white rounded-2xl p-4 shadow-lg text-center">
                  <p className="text-xs md:text-sm font-black leading-snug">
                    EVERYTHING YOU NEED TO<br />TEACH WITH CONFIDENCE ✓
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: "🎬", label: "Videos & Songs",   bg: "bg-orange-500" },
                    { icon: "⚡", label: "Instant Access",   bg: "bg-green-600" },
                    { icon: "🖨️", label: "Print Ready PDFs", bg: "bg-blue-600" },
                    { icon: "📱", label: "Easy to Use",      bg: "bg-pink-600" },
                  ].map((b) => (
                    <div key={b.label} className={`${b.bg} text-white rounded-xl p-2.5 text-center shadow`}>
                      <div className="text-xl">{b.icon}</div>
                      <div className="text-xs font-bold mt-0.5 leading-tight">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's inside */}
            <div className="bg-white rounded-2xl p-4 shadow">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">What&apos;s Inside Each Week</p>
              <div className="space-y-2">
                {[
                  { color: "bg-orange-500", label: "Teaching Sheet — Memory Verse + Bible Teaching" },
                  { color: "bg-green-600",  label: "Video & Song — Engaging Visual Content" },
                  { color: "bg-blue-600",   label: "Workbook — Activities & Life Application" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`${item.color} w-3 h-3 rounded-full flex-shrink-0`} />
                    <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Login — right column */}
            <Link
              href="/login"
              className="block bg-purple-800 hover:bg-purple-900 active:scale-95 text-white font-black py-5 rounded-2xl text-lg md:text-xl shadow-xl transition-all duration-150 text-center"
            >
              👩‍🏫 Teacher Login
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM STRIP ═══ */}
      <div className="bg-white px-4 md:px-10 py-8 mt-2">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-1 md:gap-3 flex-wrap mb-3">
            {[
              { word: "TEACH",  color: "text-orange-500", delay: "0s" },
              { word: "•",      color: "text-gray-300",   delay: "" },
              { word: "ENGAGE", color: "text-green-600",  delay: "0.2s" },
              { word: "•",      color: "text-gray-300",   delay: "" },
              { word: "EQUIP",  color: "text-blue-600",   delay: "0.4s" },
              { word: "•",      color: "text-gray-300",   delay: "" },
              { word: "IMPACT", color: "text-pink-600",   delay: "0.6s" },
            ].map((item, i) => (
              <span
                key={i}
                className={`font-black text-2xl md:text-4xl ${item.color} ${item.delay ? "kid-float" : ""}`}
                style={item.delay ? { animationDelay: item.delay, display: "inline-block" } : {}}
              >
                {item.word}
              </span>
            ))}
          </div>
          <p className="text-gray-600 text-sm md:text-base font-semibold max-w-lg mx-auto">
            Help children grow in faith and live like little disciples of Jesus!
          </p>
        </div>
      </div>

    </main>
  );
}
