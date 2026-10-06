import Bloom from "./Bloom";
import Bridge from "./Bridge";
import ProverbFigure from "./ProverbFigure";
import styles from "./Proverb.module.css";

export default function Proverb() {
  return (
    <section className={styles.band} aria-label="A proverb about greeting guests">
      <div className="wrap">
        <ProverbFigure
          art={<Bloom />}
          vi="Lời chào cao hơn mâm cỗ."
          say="luh-ee chow · kow hurn · muhm kaw"
          en="A greeting is worth more than a feast."
          cap="Tục ngữ · a Vietnamese proverb, on welcoming guests"
          ours="Bring the fruit, by all means. But say hello first."
        />
        <Bridge />
      </div>
    </section>
  );
}
