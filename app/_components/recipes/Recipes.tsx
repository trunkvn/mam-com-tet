"use client";

import Image from "next/image";
import { useState } from "react";
import DishArt from "../dishes/DishArt";
import RegionToggle from "../ui/RegionToggle";
import type { Ingredient, Recipe, RecipeId } from "./data";
import styles from "./Recipes.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One recipe at a time, picked with a switch. Ingredients can be ticked off as a shopping list;
 * the ticks are kept while you move between dishes.
 */
export default function Recipes({ recipes }: { recipes: Recipe[] }) {
  const [id, setId] = useState<RecipeId>(recipes[0].id);
  const [got, setGot] = useState<Record<string, boolean>>({});
  const r = recipes.find((x) => x.id === id) ?? recipes[0];

  const toggle = (key: string) => setGot((g) => ({ ...g, [key]: !g[key] }));
  const keyOf = (group: string, i: number) => `${r.id}:${group}:${i}`;

  const all = [...r.ingredients, ...(r.also?.items ?? [])];
  const have = all.filter((_, n) => {
    const inMain = n < r.ingredients.length;
    return got[keyOf(inMain ? "main" : "also", inMain ? n : n - r.ingredients.length)];
  }).length;

  const list = (items: Ingredient[], group: string) => (
    <ul className={styles.items}>
      {items.map((it, i) => (
        <li key={keyOf(group, i)}>
          <label className={styles.check}>
            <input type="checkbox" checked={!!got[keyOf(group, i)]} onChange={() => toggle(keyOf(group, i))} />
            <span className={styles.box} aria-hidden="true" />
            <span className={styles.txt}>
              <span className={styles.item}>{it.item}</span>
              {it.swap && <span className={styles.swap} lang="en">{it.swap}</span>}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className={styles.picker}>
        <RegionToggle
          label="Choose a dish to cook"
          options={recipes.map((x) => ({ id: x.id, label: x.label }))}
          value={id}
          onChange={setId}
        />
        <p className={styles.plan} lang="en">
          Plan it: start the thịt kho first, since it is mostly waiting, poach the gà luộc while it
          simmers, and fry the nem rán last so they reach the table crisp.
        </p>
      </div>

      {/* keyed by dish so the card settles in again each time it changes */}
      <article className={styles.recipe} key={r.id} aria-live="polite">
        <div className={styles.side}>
          <div className={styles.window}>
            {r.photo ? (
              <Image
                src={r.photo.src}
                alt={r.photo.alt}
                fill
                sizes="(max-width: 899px) 80vw, 340px"
              />
            ) : (
              <div className={styles.drawing}>
                <DishArt art={r.art} />
              </div>
            )}
          </div>
          <dl className={styles.meta} lang="en">
            {r.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
         {/* <a className={styles.go} href="#tray" lang="en">
            {r.onTray} <span aria-hidden="true">↑</span>
          </a> */}
        </div>

        <div className={styles.main}>
          <h3 lang="vi">{r.vi}</h3>
          <p className={styles.say} lang="en">say “{r.say}”</p>
          <p className={styles.en} lang="en">{r.en}</p>
          <p className={styles.intro} lang="en">{r.intro}</p>

          <div className={styles.cols} lang="en">
            <div>
              <h4 className={styles.head}>
                <span>You will need</span>
                <em>{pad(have)} / {pad(all.length)} ticked</em>
              </h4>
              {list(r.ingredients, "main")}
              {r.also && (
                <>
                  <h5 className={styles.sub}>{r.also.title}</h5>
                  {list(r.also.items, "also")}
                </>
              )}
            </div>
            <div>
              <h4 className={styles.head}>
                <span>Method</span>
              </h4>
              <ol className={styles.steps}>
                {r.steps.map((s, i) => (
                  <li key={i}>
                    <span className={styles.no}>{pad(i + 1)}</span>
                    <p>{s}</p>
                  </li>
                ))}
              </ol>
              <ul className={styles.tips} aria-label="Good to know">
                {r.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {r.note && (
            <p className={styles.note} lang="en">
              <b>Not the traditional way.</b> {r.note}
            </p>
          )}
        </div>
      </article>
    </>
  );
}
