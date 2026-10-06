import BiHeading from "../ui/BiHeading";
import Envelopes from "./Envelopes";
import GuestBranch from "./GuestBranch";
import { TIPS } from "./data";
import styles from "./GuestSection.module.css";

export default function GuestSection() {
  return (
    <section className={styles.guest} id="invited" aria-labelledby="guest-title">
      <div className="wrap">
        <p className="kick">
          Nếu bạn được mời <span lang="en">If you are invited</span>
        </p>
        <BiHeading id="guest-title" en="Invited for Tết? Open an envelope.">
Được mời ăn Tết? <em>Mở một bao lì xì.</em>
</BiHeading>
        {/* `lead` is the anchor for the branch: it sits beside the intro and hangs down into the
            gap above the envelopes */}
        <div className={styles.lead}>
          <p className={`dim ${styles.intro}`} lang="en">
            Tết is a family holiday, so an invitation is an honour. Here are six common courtesies for
            a guest. Families and regions differ, so treat them as courtesies, not rules. Tap an
            envelope to read what is inside.
          </p>
          <GuestBranch />
        </div>
        <Envelopes tips={TIPS} />
      </div>
    </section>
  );
}
