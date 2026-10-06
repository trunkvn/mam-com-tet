import Blossom from "./Blossom";
import Branch from "./Branch";
import styles from "./Hero.module.css";

const STATS = [
  { value: 8, label: "Dishes" },
  { value: 3, label: "Regions" },
  { value: 5, label: "Fruits" },
  { value: 1, label: "Midnight" },
];

const MARQUEE = [
  "Bánh chưng",
  "Giò lụa",
  "Gà luộc",
  "Nem rán",
  "Canh măng",
  "Xôi gấc",
  "Dưa hành",
  "Mứt gừng",
  "Thịt kho",
  "Canh khổ qua",
];

function Badge() {
  return (
    <div className={styles.badge} aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none">
        <defs>
          <path
            id="hero-badge-circle"
            d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"
          />
        </defs>
        <circle cx="100" cy="100" r="96" stroke="currentColor" strokeOpacity=".5" />
        <circle cx="100" cy="100" r="58" stroke="currentColor" strokeOpacity=".5" />
        <text
          fontFamily="var(--display)"
          fontSize="15"
          fontWeight="800"
          letterSpacing="4"
          fill="currentColor"
        >
          <textPath href="#hero-badge-circle">
            MỘT MÂM · MỘT NHÀ · MỘT NĂM · MỘT MÂM · MỘT NHÀ · MỘT NĂM ·
          </textPath>
        </text>
        <g
          transform="translate(100 100) scale(2.1)"
          stroke="currentColor"
          strokeWidth="1.1"
        >
          <Blossom />
        </g>
      </svg>
    </div>
  );
}

function Marquee() {
  // The list is rendered twice so translating by -50% loops seamlessly.
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[0, 1].map((copy) =>
          MARQUEE.map((name) => <span key={`${copy}-${name}`}>{name}</span>),
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className={styles.poster} id="top" aria-labelledby="hero-title">
      <div className={styles.frieze} aria-hidden="true" />
      <Branch side="left" />
      <Branch side="right" />
      <div className={`${styles.couplet} ${styles.coupletL}`} aria-hidden="true">
        <span lang="vi">Thịt mỡ, dưa hành, câu đối đỏ</span>
      </div>
      <div className={`${styles.couplet} ${styles.coupletR}`} aria-hidden="true">
        <span lang="vi">Cây nêu, tràng pháo, bánh chưng xanh</span>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          Tết Nguyên Đán{" "}
          <span lang="en">The Vietnamese Lunar New Year</span>
        </p>
        <Badge />
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.t2}>Mâm Cơm</span>
          <span className={styles.t1}>Tết</span>
        </h1>
        <p className={styles.titleEn} lang="en">
          “The Tết feast tray”
        </p>

        <div className={styles.row}>
          <p className={styles.lede} lang="en">
            Before the visits and the red envelopes comes the tray. Families
            offer it to their ancestors first, then eat it together. Scroll
            down and set one, dish by dish.
          </p>
          <dl className={styles.qty}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          {/* <a className={styles.btn} href="#tray">
            Set the tray ↓
          </a> */}
        </div>
      </div>

      <Marquee />
      <div className={styles.frieze} aria-hidden="true" />
    </header>
  );
}
