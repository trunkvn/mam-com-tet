"use client";
// ^ DÒNG MỚI #1. Từ bước này component có state, mà state chỉ chạy trong trình duyệt.
//   Next.js mặc định chạy component trên server (không có state, không có onClick).
//   Ghi "use client" ở đầu file = báo "file này chạy ở trình duyệt".

// ============================================================================
// BƯỚC 3: thêm khái niệm "THẺ ACTIVE" (thẻ đang được chọn).
//
// So với Step2.tsx, bước này thêm 4 thứ (tìm các dấu ⬇ bên dưới):
//   ⬇ 1. import useState
//   ⬇ 2. một biến state `active`
//   ⬇ 3. gắn class `styles.active` cho đúng thẻ
//   ⬇ 4. onClick để đổi `active` (tạm thời, bước 4 sẽ thay)
// CSS không cần viết thêm: class `.active` đã có sẵn trong Days.module.css.
// ============================================================================

import { useState } from "react"; // ⬇ 1. công cụ của React để "nhớ" một giá trị giữa các lần vẽ
import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css";
import row from "./Step2.module.css"; // dùng lại hàng cuộn của bước 2

const pad = (n: number) => String(n).padStart(2, "0");

export default function Step3({ days }: { days: Day[] }) {
  // ⬇ 2. STATE. `useState` trả về một cặp: [giá trị hiện tại, hàm để đổi giá trị].
  //
  //   active    = chỉ số (0, 1, 2...) của thẻ đang được chọn
  //   setActive = hàm đổi nó. Gọi setActive(3) -> React vẽ lại component với active = 3
  //
  // Giá trị ban đầu: vị trí của thẻ có `hot: true` (nửa đêm giao thừa).
  //   days.findIndex((d) => d.hot) -> tìm vị trí thẻ đầu tiên có hot; không thấy thì ra -1
  //   Math.max(0, ...)            -> nếu ra -1 thì lấy 0 (thẻ đầu tiên)
  // Viết `() => ...` thay vì viết thẳng giá trị: React chỉ tính MỘT lần lúc đầu,
  // không tính lại ở mỗi lần vẽ lại.
  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));

  return (
    <ol className={row.row}>
      {days.map((d, i) => (
        <li
          key={d.n}
          // ⬇ 4. Click vào thẻ -> thẻ thứ i trở thành thẻ active.
          //    Chỉ đổi số `active`, chưa cuộn gì cả. Bước 4 sẽ thay bằng hàm vừa chọn vừa cuộn.
          onClick={() => setActive(i)}
        >
          <article
            // ⬇ 3. Gắn class theo điều kiện.
            //   `i === active` là đúng/sai: thẻ này có phải thẻ đang chọn không?
            //   Đúng -> thêm styles.active (viền vàng, số đặc, sáng hơn)
            //   Sai  -> thêm chuỗi rỗng "" (không thêm gì)
            className={`${styles.day} ${i === active ? styles.active : ""}`}
            // aria-current báo cho trình đọc màn hình biết thẻ nào đang được chọn
            aria-current={i === active}
          >
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
