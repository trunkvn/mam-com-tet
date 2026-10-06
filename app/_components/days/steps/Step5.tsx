"use client";

// ============================================================================
// BƯỚC 5: cuộn tay / vuốt thì THẺ ACTIVE ĐI THEO.
//
// Đến bước 4 chỉ có chiều: "chọn thẻ -> cuộn".
// Bước này thêm chiều ngược lại:  "cuộn -> chọn thẻ gần nhất".
//
// So với Step4.tsx, bước này thêm đúng 2 thứ (tìm các dấu ⬇):
//   ⬇ 1. hàm nearestCard(): tìm thẻ đang nằm gần "vị trí chuẩn" nhất
//   ⬇ 2. hàm onScroll: mỗi lần hàng cuộn thì gọi setActive(nearestCard())
//
// ⚠ BƯỚC NÀY CỐ Ý CÒN MỘT LỖI, bước 6 sẽ sửa. Xem phần "Thử để thấy lỗi" ở cuối file.
// ============================================================================

import { useRef, useState } from "react";
import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css";
import row from "./Step2.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Step5({ days }: { days: Day[] }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));

  // ---- Các hàm của bước 4, giữ nguyên --------------------------------------
  const cards = () => Array.from(rowRef.current?.children ?? []) as HTMLElement[];

  const padLeft = () => {
    const row = rowRef.current;
    const first = row?.firstElementChild as HTMLElement | null | undefined;
    if (!row || !first) return 0;
    return row.scrollLeft + first.getBoundingClientRect().left - row.getBoundingClientRect().left;
  };

  const scrollTarget = (i: number) => {
    const row = rowRef.current;
    const card = cards()[i];
    if (!row || !card) return 0;
    const left = row.scrollLeft + (card.getBoundingClientRect().left - row.getBoundingClientRect().left) - padLeft();
    return Math.min(Math.max(left, 0), row.scrollWidth - row.clientWidth);
  };

  const focusCard = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    const index = Math.min(Math.max(i, 0), days.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(index);
    row.scrollTo({ left: scrollTarget(index), behavior: reduce ? "auto" : "smooth" });
  };

  // ---- MỚI ------------------------------------------------------------------

  // ⬇ 1. Thẻ nào đang "gần vị trí chuẩn" nhất? Trả về chỉ số của thẻ đó.
  //
  //   "Vị trí chuẩn" (edge) = chỗ mà mép trái của thẻ nằm khi nó được hít đúng chỗ.
  //     = mép trái của hàng trên màn hình + padLeft (phần lề trái ở bước 2).
  //
  //   Cách tìm: duyệt qua từng thẻ, đo khoảng cách từ mép trái thẻ tới `edge`,
  //   nhớ lại thẻ có khoảng cách NHỎ NHẤT. Đây là thuật toán "tìm giá trị nhỏ nhất"
  //   kinh điển: bắt đầu với khoảng cách = vô cực, thẻ nào nhỏ hơn thì thay thế.
  //
  //   Ví dụ edge = 24, các thẻ đang có mép trái ở 24, 395, 766...
  //     khoảng cách: |24-24| = 0, |395-24| = 371, ...  -> thẻ 0 thắng.
  //   Cuộn thêm 300px thì các thẻ lùi trái 300: -276, 95, 466...
  //     khoảng cách: 300, 71, 442 -> thẻ 1 thắng (95 gần 24 hơn -276).
  const nearestCard = () => {
    const row = rowRef.current;
    if (!row) return 0;
    const edge = row.getBoundingClientRect().left + padLeft();
    let best = 0; // chỉ số thẻ tốt nhất tạm thời
    let bestDist = Infinity; // khoảng cách nhỏ nhất tạm thời (Infinity = vô cực)
    cards().forEach((c, i) => {
      const dist = Math.abs(c.getBoundingClientRect().left - edge); // Math.abs: bỏ dấu âm
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    return best;
  };


  // ⬇ 2. Chạy MỖI LẦN hàng cuộn (gắn vào <ol onScroll={...}> bên dưới).
  //   Khi cuộn, sự kiện này bắn liên tục (hàng chục lần mỗi giây).
  //   setActive với giá trị y hệt giá trị cũ thì React bỏ qua, không vẽ lại,
  //   nên việc gọi liên tục này không tốn kém.
  const onScroll = () => {
    setActive(nearestCard());
  };

  return (
    <>
      <div className={`wrap ${styles.controls}`}>
        <div className={styles.arrows} role="group" aria-label="Choose a day">
          <button
            type="button"
            onClick={() => focusCard(active - 1)}
            disabled={active === 0}
            aria-label="Previous day"
          >
            <svg viewBox="0 0 16 16">
              <path d="M10 2 4 8l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => focusCard(active + 1)}
            disabled={active === days.length - 1}
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
        ref={rowRef}
        onScroll={onScroll} // ⬇ 2. MỚI: mỗi lần cuộn thì chạy onScroll
        tabIndex={0}
        aria-label="Five days of Tết. Drag, or use the arrow keys, to move between them"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            focusCard(active + 1);
            e.preventDefault();
          }
          if (e.key === "ArrowLeft") {
            focusCard(active - 1);
            e.preventDefault();
          }
        }}
      >
        {days.map((d, i) => (
          <li key={d.n} onClick={() => focusCard(i)}>
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

// ============================================================================
// THỬ ĐỂ THẤY LỖI (đây là lý do có bước 6)
//
// Vuốt/cuộn tay: viền vàng đi theo đúng. Phần mới đã chạy.
//
// Nhưng hãy bấm nút "Next" và nhìn kỹ viền vàng. Chuyện xảy ra:
//   1. focusCard(2) gọi setActive(2) -> viền vàng sang thẻ 2
//   2. hàng bắt đầu trượt. Sự kiện scroll đầu tiên bắn, lúc này thẻ gần nhất
//      VẪN LÀ thẻ 1 -> onScroll gọi setActive(1) -> viền vàng QUAY LẠI thẻ 1
//   3. trượt qua nửa đường, thẻ 2 mới thành gần nhất -> viền vàng sang thẻ 2 lần nữa
// => viền vàng nhấp nháy: 1 -> 2 -> 1 -> 2.
//
// Thử click vào thẻ ở xa (ví dụ từ thẻ 1 click thẻ 4): viền vàng sẽ nhảy qua
// các thẻ ở giữa trên đường trượt.
//
// Và một lỗi khác, tùy bề rộng màn hình: thẻ cuối không thể cuộn tới sát mép trái
// (đuôi hàng hết nội dung, xem Math.min ở scrollTarget). Bấm vào thẻ cuối, hàng
// trượt hết cỡ, nhưng thẻ gần vị trí chuẩn nhất có thể là thẻ kế cuối
// -> onScroll đặt active về thẻ kế cuối, trái ý bạn vừa chọn.
//
// Cách sửa ở bước 6: sau khi focusCard, "khóa" onScroll lại cho tới khi hàng
// trượt xong.
// ============================================================================
