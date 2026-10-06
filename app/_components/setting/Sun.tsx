import styles from "./Sun.module.css";

// A Đông Sơn bronze-drum sun: a many-pointed star at the centre inside rings of dots and zigzags.
// Drawn in the page's gold line and kept very faint; it sits concentric with the tray.
const POINTS = 14;
const STAR = (() => {
  let d = "M";
  for (let k = 0; k < POINTS * 2; k++) {
    const a = (k / (POINTS * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = k % 2 ? 118 : 215;
    d += `${k ? "L" : ""}${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
  }
  return `${d}Z`;
})();

const ZIGZAG = (() => {
  const n = 84;
  let d = "M";
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2;
    const r = k % 2 ? 392 : 412;
    d += `${k ? "L" : ""}${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
  }
  return `${d}Z`;
})();

const DOTS = Array.from({ length: 48 }, (_, k) => {
  const a = (k / 48) * Math.PI * 2;
  return { x: (285 * Math.cos(a)).toFixed(1), y: (285 * Math.sin(a)).toFixed(1) };
});

export default function Sun() {
  return (
    <svg
      className={styles.sun}
      viewBox="-500 -500 1000 1000"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <g className={styles.turn}>
        <circle r="62" />
        <circle r="84" strokeDasharray="2 8" />
        <path d={STAR} strokeLinejoin="round" />
        <circle r="245" />
        <circle r="326" />
        <circle r="342" strokeDasharray="1 7" />
        <path d={ZIGZAG} strokeLinejoin="round" />
        <circle r="470" />
        <circle r="488" strokeDasharray="2 9" />
        {DOTS.map((p) => (
          <circle key={`${p.x}${p.y}`} cx={p.x} cy={p.y} r="2.4" fill="currentColor" stroke="none" />
        ))}
      </g>
    </svg>
  );
}
