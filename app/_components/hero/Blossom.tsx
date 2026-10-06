// Five-petal blossom drawn as overlapping circles around a small centre.
// Renders bare shapes so the parent <g> decides position, size and stroke.
const PETALS = Array.from({ length: 5 }, (_, i) => {
  const angle = ((i * 72 - 90) * Math.PI) / 180;
  return {
    cx: (9 * Math.cos(angle)).toFixed(1),
    cy: (9 * Math.sin(angle)).toFixed(1),
  };
});

export default function Blossom() {
  return (
    <>
      {PETALS.map((p) => (
        <circle key={`${p.cx}${p.cy}`} cx={p.cx} cy={p.cy} r="9.5" />
      ))}
      <circle r="3.4" />
    </>
  );
}
