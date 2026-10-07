import BiHeading from "../ui/BiHeading";
import { TRAY_REGIONS } from "../dishes/data";
import Embers from "./Embers";
import Incense from "./Incense";
import styles from "./Setting.module.css";
import ProverbFigure from "../proverb/ProverbFigure";
import { PHRASES } from "../speech/phrases";
import Spring from "../proverb/Spring";
import Tray from "./Tray";

export default function Setting() {
  return (
    <section className={styles.setting} id="tray" aria-labelledby="set-title">
      <Embers />
      <div className={`wrap ${styles.content}`}>
        <div className={styles.headRow}>
          <div className={styles.head}>
            <p className="kick">
              Dọn mâm <span lang="en">Setting the tray</span>
            </p>
            <BiHeading id="set-title" en="Eight dishes, one at a time.">
              Tám món, <em>từng món một.</em>
            </BiHeading>
            <p className={`dim ${styles.intro}`} lang="en">
              Most Vietnamese homes keep an altar to the ancestors (bàn thờ). On
              the thirtieth night the family lays a tray there, offers it, then
              eats it together. Pick a region and keep scrolling: each dish goes
              down in turn.
            </p>
            <p className={`dim ${styles.legend}`} lang="en">
              Italic lines are our own telling, not tradition. “Often read as”
              marks a meaning people commonly give, which varies by family.
              Pronunciations are approximate (northern accent, tones not shown).
            </p>
          </div>
          <Incense />
        </div>
        <Tray regions={TRAY_REGIONS} />
        <div className={styles.thanks}>
          <ProverbFigure
            art={<Spring />}
            vi={PHRASES.gratitude}
            say="oo-ung nook nyuh nwon"
            en="When you drink the water, remember the spring."
            cap="Tục ngữ · a Vietnamese proverb, on gratitude to those who came before"
            ours="The tray is offered first and eaten after. Same thought: nothing on the table is only ours."
          />
        </div>
      </div>
    </section>
  );
}
