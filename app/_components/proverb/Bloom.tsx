import Blossom from "../hero/Blossom";
import styles from "./Bloom.module.css";

// A low tray of food at the bottom; a single thread of steam climbs far above it and opens into a
// blossom. Nothing is labelled: the proverb next to it does the talking.

const STEAM = "M200 246C176 214 226 196 200 164C176 134 226 112 202 88";

// petals that let go of the blossom and drift down toward the tray: [start x, delay, size]
const PETALS: [number, number, number][] = [
  [186, 0, 5],
  [214, 3.4, 4],
  [196, 6.8, 3.5],
];

export default function Bloom() {
  return (
    <svg
      className={styles.bloom}
      viewBox="0 0 400 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        {/* the steam is strongest at the tray and thins out as it climbs */}
        <linearGradient id="bloom-steam" gradientUnits="userSpaceOnUse" x1="0" y1="250" x2="0" y2="84">
          <stop offset="0" stopColor="#f0be6b" stopOpacity=".9" />
          <stop offset="1" stopColor="#f0be6b" stopOpacity=".25" />
        </linearGradient>
      </defs>

      {/* faint rings around the blossom */}
      <g className={styles.halo} strokeWidth="1.2">
        <circle cx="200" cy="70" r="74" strokeDasharray="2 9" strokeOpacity=".4" />
        <circle cx="200" cy="70" r="52" strokeOpacity=".14" />
      </g>

      {/* the steam: a faint line, and dashes travelling up it */}
      <path d={STEAM} stroke="url(#bloom-steam)" strokeOpacity=".35" strokeWidth="1.2" />
      <path className={styles.flow} d={STEAM} stroke="url(#bloom-steam)" strokeWidth="1.8" />

      {/* the blossom */}
      <g transform="translate(200 66)">
        <g className={styles.flower}>
          <g transform="scale(2.1)" strokeWidth="0.75" fill="currentColor" fillOpacity=".1">
            <Blossom />
          </g>
        </g>
      </g>

      {/* petals drifting down */}
      {PETALS.map(([x, delay, r], i) => (
        <circle
          key={i}
          className={styles.petal}
          cx={x}
          cy="70"
          r={r}
          fill="currentColor"
          fillOpacity=".5"
          stroke="none"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* the tray, low and wide */}
      <g>
        <ellipse cx="200" cy="268" rx="118" ry="17" fill="currentColor" fillOpacity=".1" />
        <ellipse cx="200" cy="268" rx="96" ry="11" strokeOpacity=".5" />
        <path d="M150 262c0-14 16-18 26-18s26 4 26 18M212 262c0-12 12-16 20-16s20 4 20 16" fill="currentColor" fillOpacity=".16" />
        <path d="M184 238v6" strokeOpacity=".6" />
      </g>
    </svg>
  );
}
