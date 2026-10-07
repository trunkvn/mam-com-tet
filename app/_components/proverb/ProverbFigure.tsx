import type { ReactNode } from "react";
import Speak from "../speech/Speak";
import styles from "./Proverb.module.css";

/** A drawing on one side and a proverb on the other, in the page's usual three languages of help:
 *  the proverb, how to say it, what it means, and a line of the page's own. */
export default function ProverbFigure({
  art,
  vi,
  say,
  en,
  cap,
  ours,
}: {
  art: ReactNode;
  vi: string;
  say: string;
  en: string;
  cap: string;
  ours: string;
}) {
  return (
    <figure className={styles.fig}>
      {art}
      <div className={styles.text}>
        <blockquote lang="vi">
          <p className={styles.vi}>{vi}</p>
        </blockquote>
        <p className={styles.say} lang="en">say “{say}” <Speak text={vi} /></p>
        <p className={styles.en} lang="en">{en}</p>
        <figcaption className={styles.cap} lang="en">{cap}</figcaption>
        <p className={styles.ours} lang="en">{ours}</p>
      </div>
    </figure>
  );
}
