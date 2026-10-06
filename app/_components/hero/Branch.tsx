import Blossom from "./Blossom";
import styles from "./Hero.module.css";

// x, y, scale, rotation of each blossom along the branch.
const FLOWERS = [
  [142, 16, 0.62, 12],
  [222, 60, 0.55, -18],
  [240, 108, 0.42, 30],
  [208, 184, 0.7, 0],
];

const BUDS = [
  [98, 34],
  [186, 70],
  [152, 88],
];

// A single thin gold branch of peach/apricot blossom that hangs from a top corner.
// The right-hand copy is mirrored in CSS.
export default function Branch({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`${styles.branch} ${side === "left" ? styles.branchL : styles.branchR}`}
      viewBox="0 0 260 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M-4 10C60 14 112 36 150 76C178 106 196 142 206 172" />
      <path d="M70 22C92 8 118 6 140 14" />
      <path d="M118 52C148 42 186 44 218 58" />
      <path d="M176 104C194 96 218 96 238 106" />
      {BUDS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" fillOpacity=".5" />
      ))}
      {FLOWERS.map(([x, y, s, r]) => (
        <g
          key={`${x}-${y}`}
          transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
          strokeWidth={1.2 / s}
          fill="currentColor"
          fillOpacity=".08"
        >
          <Blossom />
        </g>
      ))}
    </svg>
  );
}
