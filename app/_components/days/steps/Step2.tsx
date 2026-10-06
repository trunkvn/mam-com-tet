// ============================================================================
// BƯỚC 2: giống bước 1, chỉ khác ĐÚNG MỘT CHỖ: <ol> được gắn class `row`.
// Class này nằm trong Step2.module.css (đọc file đó để hiểu từng dòng CSS).
//
// So với Step1.tsx:
//   - bỏ style={{...}} xếp dọc tạm thời của <ol>
//   - thêm className={row.row}
// Các thẻ (<article>) bên trong giữ nguyên.
// ============================================================================

import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css"; // CSS của TỪNG THẺ (viền, chữ, màu...)
import row from "./Step2.module.css"; // CSS của HÀNG CUỘN (bước 2: mới)

const pad = (n: number) => String(n).padStart(2, "0");

export default function Step2({ days }: { days: Day[] }) {
  return (
    // ⬇ ĐIỂM MỚI duy nhất của bước 2.
    // `row.row` nghĩa là: lấy class `.row` từ file Step2.module.css.
    // (CSS Modules đổi tên class thành chuỗi riêng để không đụng class của file khác.)
    <ol className={row.row}>
      {days.map((d, i) => (
        <li key={d.n}>
          <article className={styles.day}>
            <p className={styles.m}>
              <span>{d.month}</span>
              <span>
                {pad(i + 1)} / {pad(days.length)}
              </span>
            </p>
            <div className={styles.n}>{d.n}</div>
            <div className={styles.ic}>
              <DayIcon name={d.icon} />
            </div>
            {d.varies && (
              <p className={styles.tag} lang="en">
                Date varies
              </p>
            )}
            <h3 lang="vi">{d.vi}</h3>
            <p className={styles.say} lang="en">
              say “{d.say}”
            </p>
            <p className={styles.en} lang="en">
              {d.en}
            </p>
            <p className={styles.body} lang="en">
              {d.body}
            </p>
            <ul className={styles.chips} lang="en" aria-label="On the tray">
              {d.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {d.note && (
              <p className={styles.note} lang="en">
                {d.note}
              </p>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
