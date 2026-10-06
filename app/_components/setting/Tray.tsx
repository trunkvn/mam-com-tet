"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import DishArt from "../dishes/DishArt";
import type { Dish, Region, RegionId } from "../dishes/data";
import RegionToggle from "../ui/RegionToggle";
import Sun from "./Sun";
import styles from "./Setting.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

// Circumference of the progress ring (r = 48 in a 100-unit viewBox).
const RING = 301.6;

// One dish in the centre, the rest evenly around the ring, clockwise from the top.
// Every region has this many dishes. [left %, top %, width %]
const COUNT = 8;
const SLOTS: [number, number, number][] = [
  [50, 50, 27],
  ...Array.from({ length: COUNT - 1 }, (_, i): [number, number, number] => {
    const angle = ((-90 + (i * 360) / (COUNT - 1)) * Math.PI) / 180;
    return [50 + 34 * Math.cos(angle), 50 + 34 * Math.sin(angle), 21];
  }),
];

// Decorative rings and a zigzag rim for the tray (1000-unit viewBox).
const RIM = (() => {
  let d = "M";
  for (let k = 0; k < 72; k++) {
    const a = (k / 72) * Math.PI * 2;
    const r = k % 2 ? 462 : 478;
    d += `${k ? "L" : ""}${(500 + r * Math.cos(a)).toFixed(1)} ${(500 + r * Math.sin(a)).toFixed(1)}`;
  }
  return `${d}Z`;
})();

const VESSEL = { dia: "Plate · đĩa", bat: "Bowl · bát" } as const;

/** The small caps line above a dish name: which vessel it is in, and where it sits. */
function stepMeta(dishes: Dish[], i: number) {
  const d = dishes[i];
  const first = i === 0 ? " · set first, in the centre" : "";
  if (d.vessel) {
    const same = dishes.filter((x) => x.vessel === d.vessel);
    return `${VESSEL[d.vessel]} · ${same.indexOf(d) + 1} of ${same.length}${first}`;
  }
  return i === 0 ? "Set first, in the centre" : `On the ring · dish ${i + 1} of ${dishes.length}`;
}

/**
 * Sticky tray on the left that gets set dish by dish while the steps scroll on the right.
 * `active` is the index of the step crossing the middle of the viewport; one extra
 * step after the last dish (offering the tray) has index `dishes.length`.
 */
export default function Tray({ regions }: { regions: Region[] }) {
  const [regionId, setRegionId] = useState<RegionId>(regions[0].id);
  const region = regions.find((r) => r.id === regionId) ?? regions[0];
  const dishes = region.dishes;
  const total = dishes.length;
  const done = total; // index of the closing step
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Every region has the same number of dishes, so the step elements (and the observer
  // watching them) stay in place and only their content swaps. Start the new tray from the top.
  const pickRegion = (id: RegionId) => {
    setRegionId(id);
    setActive(0);
    setHover(null);
    setPinned(null);
  };

  // Photo preview: shown while a plate is hovered or focused, or after it is tapped (pinned).
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  // A pinned preview closes on a tap elsewhere, or Escape.
  useEffect(() => {
    if (pinned === null) return;
    const away = (e: PointerEvent) => {
      if (!(e.target as Element).closest("[data-plate]")) setPinned(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setPinned(null);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [pinned]);

  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;
    const steps = root.querySelectorAll("[data-i]");
    // A step is "current" while it crosses a thin band of the viewport: the middle on desktop,
    // and below the pinned tray strip (top 46%) on small screens.
    const narrow = window.matchMedia("(max-width: 899px)");
    let io: IntersectionObserver | undefined;
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
          }
        },
        { rootMargin: narrow.matches ? "-68% 0px -26% 0px" : "-42% 0px -42% 0px" },
      );
      steps.forEach((el) => io?.observe(el));
    };
    observe();
    narrow.addEventListener("change", observe);
    return () => {
      narrow.removeEventListener("change", observe);
      io?.disconnect();
    };
  }, []);

  const current = dishes[active];
  const caption = current
    ? { n: `${pad(active + 1)} / ${pad(total)}`, t: `${current.vi} · ${current.en}` }
    : { n: "00:00", t: "Giao thừa · the tray is offered" };
  const progress = Math.min(active + 1, total) / total;

  // Like a lazy Susan: the ring turns so the dish being set always sits at the top, where it
  // drops in. Dish k of the ring (1..total-1) is at slot k-1 steps clockwise from the top, so
  // the turn runs one way only and never has to spin back when scrolling forward.
  const ringDish = Math.min(Math.max(active, 1), total - 1);
  const turn = -((ringDish - 1) * 360) / (total - 1);

  const placed = (i: number) => i <= active || active === done;
  const peek = hover ?? pinned;
  const peekDish = peek !== null && placed(peek) ? dishes[peek] : undefined;

  const renderSlot = (i: number) => {
    const d = dishes[i];
    const [x, y, w] = SLOTS[i];
    const cls = [
      styles.slot,
      placed(i) ? styles.on : "",
      i === active ? styles.cur : "",
      peekDish && peek === i ? styles.peeked : "",
    ].join(" ");
    return (
      <div
        key={i}
        className={cls}
        style={{ left: `${x.toFixed(2)}%`, top: `${y.toFixed(2)}%`, width: `${w}%` }}
      >
        {d.photo ? (
          <button
            type="button"
            data-plate
            className={`${styles.plate} ${styles.plateBtn}`}
            disabled={!placed(i)}
            aria-pressed={pinned === i}
            aria-label={`${d.vi}, ${d.en}: show a photo`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
            onFocus={(e) => e.currentTarget.matches(":focus-visible") && setHover(i)}
            onBlur={() => setHover(null)}
            onClick={() => setPinned((p) => (p === i ? null : i))}
          >
            <DishArt art={d.art} />
          </button>
        ) : (
          <div className={styles.plate}>
            <DishArt art={d.art} />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.picker}>
        <RegionToggle
          label="Choose a regional tray"
          options={regions}
          value={regionId}
          onChange={pickRegion}
        />
        <p className={`dim ${styles.note}`} lang="en">{region.note}</p>
      </div>
      <div className={styles.grid}>
        <div className={styles.stage}>
          <div className={styles.tray}>
            <Sun />
            {/* warm light behind the tray that grows as more dishes are set */}
            <div className={styles.glow} style={{ opacity: 0.3 + 0.7 * progress }} />
            <div className={styles.disc} />
            <svg className={styles.art} viewBox="0 0 1000 1000" fill="none" stroke="currentColor" aria-hidden="true">
              <g strokeOpacity=".4" strokeWidth="1.4">
                <circle cx="500" cy="500" r="478" />
                <circle cx="500" cy="500" r="452" />
                <circle cx="500" cy="500" r="330" />
                <circle cx="500" cy="500" r="300" strokeDasharray="2 9" />
              </g>
              <path d={RIM} strokeOpacity=".4" strokeWidth="1.2" />
            </svg>
            <svg className={styles.prog} viewBox="0 0 100 100" aria-hidden="true">
              <circle className={styles.trk} cx="50" cy="50" r="48" />
              <circle
                className={styles.bar}
                cx="50"
                cy="50"
                r="48"
                style={{ strokeDashoffset: (RING * (1 - progress)).toFixed(1) }}
              />
            </svg>
            {/* the centre dish stays put; only the ring of seven turns */}
            {renderSlot(0)}
            <div className={styles.ring} style={{ "--turn": `${turn.toFixed(2)}deg` } as CSSProperties}>
              {dishes.map((_, i) => (i === 0 ? null : renderSlot(i)))}
            </div>

            {/* photo preview: sits over the middle of the tray and never takes the pointer */}
            <div className={styles.peek} data-show={peekDish?.photo ? "" : undefined} aria-hidden="true">
              <div className={styles.peekFrame}>
                {dishes.map((d, i) =>
                  d.photo ? (
                    <Image
                      key={`${regionId}-${d.id}`}
                      className={peek === i ? styles.peekOn : ""}
                      src={d.photo.src}
                      alt={peek === i ? d.photo.alt : ""}
                      fill
                      sizes="(max-width: 899px) 140px, 260px"
                    />
                  ) : null,
                )}
                <p className={styles.peekName}>
                  <b lang="vi">{peekDish?.vi}</b>
                  <span lang="en">{peekDish?.en}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cap} aria-live="polite">
            <b>{caption.n}</b>
            <span>{caption.t}</span>
          </div>
          {dishes.some((d) => d.photo) && (
            <p className={styles.hint} lang="en">
              Hover or tap a dish on the tray to see it.
            </p>
          )}
        </div>

        <div className={styles.steps} ref={stepsRef}>
          {dishes.map((d, i) => (
            <article key={i} className={`${styles.step} ${i === active ? styles.act : ""}`} data-i={i}>
              <span className={styles.stepNo}>{pad(i + 1)}</span>
              <p className={styles.stepMeta} lang="en">{stepMeta(dishes, i)}</p>
              <h3 lang="vi">{d.vi}</h3>
              <p className={styles.say} lang="en">say “{d.say}”</p>
              <p className={styles.en} lang="en">{d.en}</p>
              <p className={styles.q} lang="en">“{d.quote}”</p>
              <p className={styles.txt} lang="en">{d.body}</p>
              <dl className={styles.facts} lang="en">
                {d.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}

          <article
            className={`${styles.step} ${styles.stepEnd} ${active === done ? styles.act : ""}`}
            data-i={done}
          >
            <span className={styles.stepNo}>00:00</span>
            <p className={styles.stepMeta} lang="en">Giao thừa · the thirtieth night</p>
            <h3 lang="vi">Cúng rồi cùng ăn.</h3>
            <p className={styles.en} lang="en">“Offered, then shared.”</p>
            <ol className={styles.rite} lang="en">
              <li>
                <b>Cúng <i>say “koong”</i></b>
                <span>
                  At midnight the family lights incense and offers the tray at the ancestral altar,
                  inviting the ancestors to the first meal of the year.
                </span>
              </li>
              <li>
                <b>Hạ lễ <i>say “hah leh”</i></b>
                <span>
                  Once the incense has burned down (how long varies by family), the rite is
                  reported complete and the tray is taken down.
                </span>
              </li>
              <li>
                <b>Thụ lộc <i>say “too lohk”</i></b>
                <span>
                  The family then eats the food together. Lộc means blessing, so the offering is
                  shared, not thrown away.
                </span>
              </li>
            </ol>
            <p className={styles.txt} lang="en">Details differ from home to home.</p>

            {region.beside.length > 0 && (
              <div className={styles.beside} lang="en">
                <p className={styles.besideHead}>Beside the tray · not counted in the four and four</p>
                <ul>
                  {region.beside.map((b) => (
                    <li key={b.vi}>
                      <i><DishArt art={b.art} /></i>
                      <span>
                        <b>{b.vi}</b> <em>say “{b.say}”</em>
                        <small>{b.note}</small>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={styles.besideFoot}>Dipping sauces also sit beside the tray.</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
