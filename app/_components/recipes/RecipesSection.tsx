import BiHeading from "../ui/BiHeading";
import Cooking from "./Cooking";
import Recipes from "./Recipes";
import { RECIPES } from "./data";
import styles from "./RecipesSection.module.css";

export default function RecipesSection() {
  return (
    <section className={styles.cook} id="cook" aria-labelledby="cook-title">
      <div className="wrap">
        {/* the heading on the left, a pot simmering on the right */}
        <div className={styles.head}>
          <div>
            <p className="kick">
              Thử làm tại nhà <span lang="en">Try it at home</span>
            </p>
            <BiHeading id="cook-title" en="Into the kitchen: three dishes to try.">
              Vào bếp, <em>thử ba món.</em>
            </BiHeading>
            <p className={`dim ${styles.intro}`} lang="en">
              You do not need a whole Vietnamese market to bring a little of the tray to your own
              table. These three dishes work in an ordinary kitchen anywhere. Each one says what to
              buy, and what to use if you cannot find it.
            </p>
          </div>
          <Cooking />
        </div>
        <Recipes recipes={RECIPES} />
        <p className={styles.foot} lang="en">
          Adapted, in our own words, from the cooks listed under “Try it at home” at the bottom of
          the page. Where they differ we picked one version, and none of it has been cooked in our
          own kitchen, so taste as you go. Take care with hot oil and hot sugar.
        </p>
      </div>
    </section>
  );
}
