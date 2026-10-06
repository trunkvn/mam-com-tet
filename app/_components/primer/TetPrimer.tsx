import Rich from "../ui/Rich";
import styles from "./TetPrimer.module.css";

const POINTS = [
  {
    title: "Feast of the First Morning",
    body: "Tết Nguyên Đán is the biggest holiday in Vietnam: a few days of family, food and visits, with preparations starting from the 23rd of the twelfth lunar month.",
  },
  {
    title: "A date that moves",
    body: "It follows the lunar calendar, so it lands somewhere between late January and about 20 February each year.",
  },
  {
    title: "A tray for the ancestors",
    body: "Most homes keep an altar to the ancestors (bàn thờ). At Tết the family lays a tray of food there to offer first, then sits down and eats it together.",
  },
];

export default function TetPrimer() {
  return (
    <section className={styles.primer} id="tet" aria-labelledby="tet-title">
      <div className="wrap">
        <p className="kick">
          Tết là gì <span lang="en">What is Tết?</span>
        </p>
        <h2 id="tet-title" className={styles.title} lang="vi">
          Tết Nguyên Đán, trong ba dòng.
        </h2>
        <p className="enline" lang="en">
          “The Vietnamese Lunar New Year, in three lines.”
        </p>
        <ol className={styles.points} lang="en">
          {POINTS.map((p, i) => (
            <li key={p.title}>
              <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p><Rich>{p.body}</Rich></p>
            </li>
          ))}
        </ol>
        <p className={styles.foot} lang="en">
          Say it: <em>tet</em>, as in “bet”. The two red banners above are a famous Tết couplet:
          “Fatty pork, pickled onions, red banners; the new-year pole, strings of firecrackers,
          green sticky-rice cakes.”
        </p>
      </div>
    </section>
  );
}
