"use client";

import Rich from "../ui/Rich";
import { useState, type ReactNode } from "react";
import type { RegionId } from "../dishes/data";
import RegionToggle from "../ui/RegionToggle";
import FruitArt from "./FruitArt";
import Orbit from "./Orbit";
import type { FruitRegion } from "./data";
import styles from "./Fruits.module.css";

/** The five windows, with a region switch. */
export default function Fruits({
  regions,
  head,
}: {
  regions: FruitRegion[];
  /** The section heading, intro etc. (server-rendered), shown beside the orbit. */
  head: ReactNode;
}) {
  const [regionId, setRegionId] = useState<RegionId>(regions[0].id);
  const region = regions.find((r) => r.id === regionId) ?? regions[0];

  return (
    <>
      <div className={styles.headRow}>
        <div>
          {head}
          <div className={styles.picker}>
            <RegionToggle
              label="Choose a regional stand of fruit"
              options={regions}
              value={regionId}
              onChange={setRegionId}
            />
            <p className={styles.how} lang="en"><Rich>{region.how}</Rich></p>
          </div>
        </div>
        <Orbit fruits={region.fruits} />
      </div>

      {/* keyed by region so the windows rise again when the region changes */}
      <div className={styles.arches} key={region.id} aria-live="polite">
        {region.fruits.map((f, i) => (
          <article className={styles.arch} key={f.id}>
            <div className={styles.window}>
              <small>{i + 1} / {region.fruits.length}</small>
              <FruitArt id={f.id} scale={f.scale} />
            </div>
            <h3 lang="vi">{f.vi}</h3>
            <p className={styles.say} lang="en">say “{f.say}”</p>
            <em lang="en">{f.en}</em>
            <p className={styles.tag} lang="en"><Rich>{f.tag}</Rich></p>
            <p className={styles.body} lang="en"><Rich>{f.body}</Rich></p>
          </article>
        ))}
      </div>

      <div className={styles.lead}>
        <p className={styles.pun} lang="vi">{region.lead}</p>
        <p className={styles.punNote} lang="en"><Rich>{region.leadNote}</Rich></p>
      </div>
    </>
  );
}
