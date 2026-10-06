import Blossom from "../hero/Blossom";
import styles from "./GuestSection.module.css";

// x, y, scale, rotation of each blossom along the branch.
const FLOWERS = [
  [352, 58, 1.1, 14],
  [286, 128, 0.9, -20],
  [388, 168, 0.75, 28],
  [250, 238, 1.15, 0],
  [318, 292, 0.8, -12],
];

const BUDS = [
  [410, 28],
  [330, 98],
  [272, 190],
  [236, 302],
];

// Petals that let go of the branch and drift down. [start x, start y, delay (s), duration (s)]
const PETALS: [number, number, number, number][] = [
  [352, 74, 0, 9],
  [286, 142, 3.2, 10],
  [250, 252, 6, 9.5],
  [318, 304, 1.6, 11],
  [388, 180, 7.8, 10.5],
];

// A large gold branch of blossom that hangs into the empty space beside the intro text.
// It sways from the top-right corner, the flowers breathe, and petals drift off now and then.
export default function GuestBranch() {
  return (
    <svg
      className={styles.branch}
      viewBox="0 0 460 380"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* dotted ring behind the branch, turning very slowly like the incense halo */}
      <g className={styles.halo}>
        <circle cx="300" cy="190" r="150" strokeDasharray="2 9" strokeOpacity=".5" />
        <circle cx="300" cy="190" r="118" strokeOpacity=".2" />
      </g>

      {/* everything on the branch moves together, hinged at the corner it hangs from */}
      <g className={styles.sway}>
        <path d="M466 -6C402 14 338 60 296 128C262 184 248 248 250 326" />
        <path d="M380 36C400 30 420 32 436 42" />
        <path d="M312 108C340 96 372 100 396 116" />
        <path d="M272 176C292 170 312 172 330 182" />

        {BUDS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fill="currentColor" fillOpacity=".5" />
        ))}

        {FLOWERS.map(([x, y, s, r], i) => (
          // outer <g> places the flower; the inner one is free to animate without losing that
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
            <g
              className={styles.bloom}
              style={{ animationDelay: `${-i * 1.3}s` }}
              strokeWidth={1.2 / s}
              fill="currentColor"
              fillOpacity=".08"
            >
              <Blossom />
            </g>
          </g>
        ))}
      </g>

      {PETALS.map(([x, y, delay, dur], i) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <ellipse
            className={styles.petal}
            rx="7"
            ry="4.5"
            fill="currentColor"
            fillOpacity=".25"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              // alternate which way the petal drifts so they do not all fall in a line
              "--drift": i % 2 ? "26px" : "-34px",
            } as React.CSSProperties}
          />
        </g>
      ))}
    </svg>
  );
}
