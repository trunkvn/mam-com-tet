"use client";

// ============================================================================
// BƯỚC 4: chọn thẻ thì HÀNG CŨNG CUỘN TỚI THẺ ĐÓ.
//
// So với Step3.tsx, bước này thêm:
//   ⬇ 1. useRef: một "tay nắm" để JS điều khiển được thẻ <ol> (cuộn nó)
//   ⬇ 2. bốn hàm: padLeft, cards, scrollTarget, focusCard
//   ⬇ 3. hai nút mũi tên
//   ⬇ 4. phím ← →
//   ⬇ 5. onClick của thẻ gọi focusCard thay vì setActive
// Chưa có: tự đổi active khi cuộn tay (bước 5), chống giật (bước 6),
//          thanh tiến độ (bước 7), kéo chuột (bước 8).
// ============================================================================

import { useRef, useState } from "react"; // ⬇ 1. thêm useRef
import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css";
import row from "./Step2.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Step4({ days }: { days: Day[] }) {
  // ⬇ 1. REF. Giống state ở chỗ "nhớ" được giá trị, khác ở chỗ đổi nó KHÔNG làm vẽ lại.
  // Ở đây ta dùng nó như một dây nối tới phần tử <ol> thật trong trang:
  //   rowRef.current  = thẻ <ol> (hoặc null nếu chưa hiện ra)
  // Gắn dây bằng ref={rowRef} ở <ol> bên dưới.
  const rowRef = useRef<HTMLOListElement>(null);

  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));

  // ⬇ 2a. Lấy danh sách các thẻ (<li>) trong hàng, dạng mảng để dùng được [i].
  //   children = các phần tử con trực tiếp của <ol> = các <li>.
  //   `?? []` : nếu rowRef.current là null thì dùng mảng rỗng, tránh lỗi.
  const cards = () => Array.from(rowRef.current?.children ?? []) as HTMLElement[];

  // ⬇ 2b. Thẻ đầu tiên đang cách mép trái hàng bao nhiêu px khi hàng chưa cuộn?
  //   Đó chính là phần padding trái đã học ở bước 2 (có thể 24px hay 210px tùy màn hình).
  //
  //   Vì sao không đọc thẳng từ CSS? Vì giá trị CSS là max(...)/calc(...), một số
  //   trình duyệt trả về dạng CHỮ chứ không phải số. Nên ta ĐO bằng mắt thường:
  //
  //   getBoundingClientRect().left = tọa độ mép trái của phần tử TRÊN MÀN HÌNH.
  //   (thẻ đầu).left - (hàng).left = khoảng cách giữa hai mép trái đang nhìn thấy.
  //   Nếu hàng ĐÃ cuộn sang trái một đoạn scrollLeft, thẻ đầu bị đẩy lùi đúng đoạn đó,
  //   nên cộng scrollLeft vào để quy về trạng thái chưa cuộn.
  const padLeft = () => {
    const row = rowRef.current;
    const first = row?.firstElementChild as HTMLElement | null | undefined;
    if (!row || !first) return 0;
    return row.scrollLeft + first.getBoundingClientRect().left - row.getBoundingClientRect().left;
  };
  // ⬇ 2c. "Muốn thẻ số i nằm đúng chỗ thì phải cuộn tới scrollLeft bằng bao nhiêu?"
  //
  //   Ví dụ: padLeft = 24, thẻ i hiện cách mép trái hàng 500px, hàng đang ở scrollLeft = 100.
  //     vị trí thẻ trong "trang cuộn" = 100 + 500 = 600   (đo từ đầu hàng chưa cuộn)
  //     muốn thẻ nằm cách mép 24px     -> cuộn tới 600 - 24 = 576
  const scrollTarget = (i: number) => {
    const row = rowRef.current;
    const card = cards()[i];
    if (!row || !card) return 0;
    const left = row.scrollLeft + (card.getBoundingClientRect().left - row.getBoundingClientRect().left) - padLeft();
    // Kẹp trong [0, tối đa]. Thẻ cuối không thể cuộn quá đuôi hàng:
    //   scrollWidth = tổng bề rộng nội dung, clientWidth = bề rộng khung nhìn thấy
    //   -> scrollWidth - clientWidth = giá trị scrollLeft lớn nhất có thể có
    return Math.min(Math.max(left, 0), row.scrollWidth - row.clientWidth);
  };

  // ⬇ 2d. HÀM TRUNG TÂM: chọn thẻ i VÀ cuộn tới nó. Mọi cách chọn thẻ đều gọi hàm này.
  const focusCard = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    // Kẹp i trong [0, số thẻ - 1]: bấm "Next" ở thẻ cuối cũng không bị lỗi
    const index = Math.min(Math.max(i, 0), days.length - 1);
    // Người dùng bật "giảm chuyển động" trong hệ điều hành thì nhảy thẳng, không trượt
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(index); // (a) đổi viền vàng sang thẻ mới
    row.scrollTo({ left: scrollTarget(index), behavior: reduce ? "auto" : "smooth" }); // (b) cuộn tới
  };

  return (
    <>
      {/* ⬇ 3. Hai nút mũi tên (CSS có sẵn: styles.controls / styles.arrows) */}
      <div className={`wrap ${styles.controls}`}>
        <div className={styles.arrows} role="group" aria-label="Choose a day">
          <button
            type="button"
            onClick={() => focusCard(active - 1)} // lùi một thẻ
            disabled={active === 0} // đang ở thẻ đầu thì khóa nút
            aria-label="Previous day"
          >
            <svg viewBox="0 0 16 16">
              <path d="M10 2 4 8l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => focusCard(active + 1)} // tiến một thẻ
            disabled={active === days.length - 1} // đang ở thẻ cuối thì khóa nút
            aria-label="Next day"
          >
            <svg viewBox="0 0 16 16">
              <path d="M6 2l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <ol
        className={row.row}
        ref={rowRef} // ⬇ 1. nối dây: từ giờ rowRef.current chính là thẻ <ol> này
        // ⬇ 4. Phím mũi tên. tabIndex={0} cho <ol> nhận được focus bàn phím (bấm Tab tới nó).
        tabIndex={0}
        aria-label="Five days of Tết. Drag, or use the arrow keys, to move between them"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            focusCard(active + 1);
            e.preventDefault(); // chặn trình duyệt tự cuộn theo phím, tránh cuộn hai lần
          }
          if (e.key === "ArrowLeft") {
            focusCard(active - 1);
            e.preventDefault();
          }
        }}
      >
        {days.map((d, i) => (
          <li
            key={d.n}
            // ⬇ 5. Click thẻ: thay `setActive(i)` của bước 3 bằng focusCard(i)
            //    -> vừa đổi viền vàng, vừa cuộn thẻ về đúng vị trí.
            onClick={() => focusCard(i)}
          >
            <article
              className={`${styles.day} ${i === active ? styles.active : ""}`}
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
    </>
  );
}
