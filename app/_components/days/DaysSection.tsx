import BiHeading from "../ui/BiHeading";
import Days from "./Days";
import { DAYS } from "./data";
import styles from "./DaysSection.module.css";

export default function DaysSection() {
  return (
    <section className={styles.days} id="days" aria-labelledby="days-title">
      <div className="wrap">
        <p className="kick">
          Mâm theo ngày <span lang="en">From the 23rd to the 7th</span>
        </p>
        <BiHeading id="days-title" en="The tray changes, day by day.">
          Mâm đổi, <em>ngày qua ngày.</em>
        </BiHeading>
        <p className={`dim ${styles.intro}`} lang="en">
          One tray is not set once and left. It is laid for the Kitchen Gods,
          for the last night of the year, for the first morning, and finally
          cleared away. Dates are lunar, and families differ; where sources
          disagree, the card says so.
        </p>
      </div>
      <Days days={DAYS} />
    </section>
  );
}
