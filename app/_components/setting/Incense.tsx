import styles from "./Incense.module.css";

// Three joss sticks in a burner, smoke drifting up. Same gold line as the rest of the page.
// [base x, base y, tip x, tip y]
const STICKS: [number, number, number, number][] = [
  [137, 297, 124, 178],
  [160, 295, 160, 150],
  [183, 297, 196, 172],
];

// One wavering smoke line per stick, drawn from the tip upwards.
const SMOKE = [
  "M124 176C110 150 140 136 126 108C112 80 140 66 128 36C122 20 130 10 126 0",
  "M160 148C146 122 176 108 162 80C148 52 176 38 164 12",
  "M196 170C182 146 212 130 198 102C184 74 212 60 200 30C196 16 202 8 198 0",
];

export default function Incense() {
  return (
    <svg
      className={styles.incense}
      viewBox="0 0 320 380"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        {/* smoke is strongest at the tip and fades out as it climbs */}
        <linearGradient id="incense-smoke" gradientUnits="userSpaceOnUse" x1="0" y1="180" x2="0" y2="0">
          <stop offset="0" stopColor="#f0be6b" stopOpacity=".95" />
          <stop offset="1" stopColor="#f0be6b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* slow-turning halo behind the burner */}
      <g className={styles.halo} strokeWidth="1.2">
        <circle cx="160" cy="190" r="150" strokeDasharray="2 9" strokeOpacity=".4" />
        <circle cx="160" cy="190" r="118" strokeOpacity=".16" />
      </g>

      {/* smoke: a faint static line plus dashes that travel along it */}
      {SMOKE.map((d, i) => (
        <g key={i} className={`${styles.smoke} ${styles[`s${i}`]}`}>
          <path d={d} stroke="url(#incense-smoke)" strokeWidth="1.2" strokeOpacity=".3" />
          <path className={styles.flow} d={d} stroke="url(#incense-smoke)" strokeWidth="1.8" />
        </g>
      ))}

      {/* burner */}
      <g strokeWidth="1.6">
        <ellipse cx="160" cy="300" rx="80" ry="12" fill="currentColor" fillOpacity=".18" />
        <path d="M80 300C80 335 112 352 160 352S240 335 240 300" fill="currentColor" fillOpacity=".08" />
        <path d="M130 352v10h60v-10" />
        <path d="M96 322Q160 340 224 322" strokeOpacity=".5" />
        <path d="M104 336Q160 352 216 336" strokeOpacity=".3" />
      </g>

      {/* sticks and glowing tips */}
      <g strokeWidth="1.8">
        {STICKS.map(([bx, by, tx, ty], i) => (
          <line key={i} x1={bx} y1={by} x2={tx} y2={ty} />
        ))}
      </g>
      {STICKS.map(([, , tx, ty], i) => (
        <g key={i} className={`${styles.ember} ${styles[`e${i}`]}`}>
          <circle cx={tx} cy={ty} r="7" fill="#f0be6b" fillOpacity=".18" stroke="none" />
          <circle cx={tx} cy={ty} r="2.8" fill="#f7d9a0" stroke="none" />
        </g>
      ))}
    </svg>
  );
}
