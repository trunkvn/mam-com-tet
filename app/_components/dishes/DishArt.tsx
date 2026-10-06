import type { DishArtKey } from "./data";

/** One dish drawing from the shared sprite. Colour follows the parent's `color`. */
export default function DishArt({ art }: { art: DishArtKey }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <use href={`#a-${art}`} />
    </svg>
  );
}
