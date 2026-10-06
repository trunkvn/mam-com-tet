import Blossom from "../hero/Blossom";
import FruitArt from "./FruitArt";
import type { Fruit } from "./data";
import styles from "./Orbit.module.css";

/**
 * The five fruits of the chosen region, each on a small round plate, circling a blossom. The ring
 * turns slowly; the plates turn the other way, so every fruit stays upright.
 */
export default function Orbit({ fruits }: { fruits: Fruit[] }) {
  return (
    <div className={styles.orbit} aria-hidden="true">
      <svg className={styles.rings} viewBox="-200 -200 400 400" fill="none" stroke="currentColor">
        <circle r="186" strokeWidth="1" strokeDasharray="2 9" strokeOpacity=".5" />
        <circle r="138" strokeWidth="1.2" strokeOpacity=".28" />
        <circle r="78" strokeWidth="1" strokeOpacity=".2" />
      </svg>

      <div className={styles.centre}>
        <svg viewBox="-60 -60 120 120" fill="none" stroke="currentColor" strokeWidth="1.4">
          <g className={styles.bloom}>
            <g transform="scale(2.2)" strokeWidth="0.7" fill="currentColor" fillOpacity=".1">
              <Blossom />
            </g>
          </g>
        </svg>
      </div>

      {/* keyed by the first fruit so the plates pop in again when the region changes */}
      <div className={styles.ring} key={fruits[0].id}>
        {fruits.map((f, i) => {
          const a = ((i * 72 - 90) * Math.PI) / 180;
          return (
            <div
              key={f.id}
              className={styles.plate}
              style={{
                left: `${(50 + 36 * Math.cos(a)).toFixed(2)}%`,
                top: `${(50 + 36 * Math.sin(a)).toFixed(2)}%`,
                animationDelay: `0s, ${(i * 0.08).toFixed(2)}s`,
              }}
            >
              <FruitArt id={f.id} scale={f.scale * 0.9} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
