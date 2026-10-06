import BiHeading from "../ui/BiHeading";
import Fruits from "./Fruits";
import { FRUIT_REGIONS } from "./data";
import styles from "./FruitsSection.module.css";

export default function FruitsSection() {
  return (
    <section className={styles.paper} id="fruits" aria-labelledby="fr-title">
      <div className="wrap">
        <Fruits
          regions={FRUIT_REGIONS}
          head={
            <>
              <p className="kick">
                Mâm ngũ quả <span lang="en">The five-fruit tray</span>
              </p>
              <BiHeading id="fr-title" en="Five fruits, three regions.">
                Năm quả, <em>ba miền.</em>
              </BiHeading>
              <p className={styles.intro} lang="en">
                A stand of five fruits sits on the altar beside the dishes. Five is often read as
                the five elements, or as the five blessings: wealth, rank, long life, health and
                peace. Which fruit goes on depends on where you live, and families improvise freely.
              </p>
            </>
          }
        />
      </div>
    </section>
  );
}
