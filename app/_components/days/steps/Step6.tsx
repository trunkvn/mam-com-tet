"use client";

// ============================================================================
// BƯỚC 6: sửa lỗi nhấp nháy bằng một "KHÓA THỜI GIAN".
//
// Lỗi ở bước 5: khi hàng đang TỰ trượt tới thẻ bạn vừa chọn, onScroll vẫn chạy
// và đặt active về thẻ "gần nhất lúc đó" (thẻ cũ), ghi đè lựa chọn của bạn.
//
// Cách sửa: onScroll cần phân biệt được hai tình huống
//   (a) NGƯỜI DÙNG đang cuộn  -> được đổi active theo thẻ gần nhất
//   (b) MÌNH đang tự trượt     -> KHÔNG được đụng vào active
//
// So với Step5.tsx, bước này thêm (tìm các dấu ⬇):
//   ⬇ 1. hai hằng số thời gian
//   ⬇ 2. một ref `lockUntil`: "khóa đến mấy giờ"
//   ⬇ 3. focusCard đặt khóa trước khi trượt
//   ⬇ 4. onScroll kiểm tra khóa
// ============================================================================

import { useRef, useState } from "react";
import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css";
import row from "./Step2.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

// ⬇ 1. Hai con số (đơn vị mili giây).
// LOCK_MS: khóa ban đầu khi bắt đầu trượt. Phải đủ dài để phủ khoảng trễ từ lúc gọi
//          scrollTo tới lúc sự kiện scroll ĐẦU TIÊN bắn ra (vài chục ms).
// LOCK_RENEW_MS: mỗi lần có sự kiện scroll trong lúc khóa, GIA HẠN thêm chừng này.
//          Sự kiện scroll bắn mỗi khung hình (~16ms) nên 150ms là thừa để khóa không hở.
const LOCK_MS = 300;
const LOCK_RENEW_MS = 150;

export default function Step6({ days }: { days: Day[] }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));

  // ⬇ 2. Khóa lưu dưới dạng MỘT MỐC THỜI GIAN: "khóa cho tới thời điểm này".
  //   0 = đã hết khóa từ rất lâu (năm 1970).
  //   Date.now() = số mili giây từ 1970 tới bây giờ. Mốc nào lớn hơn Date.now() là còn khóa.
  //
  //   Vì sao dùng useRef mà không dùng useState?
  //   Đổi state làm React vẽ lại giao diện. Mà ta chỉ cần "nhớ" mốc này để onScroll
  //   đọc lại, giao diện không đổi gì cả. Ref nhớ được mà không gây vẽ lại.
  const lockUntil = useRef(0);

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

  const nearestCard = () => {
    const row = rowRef.current;
    if (!row) return 0;
    const edge = row.getBoundingClientRect().left + padLeft();
    let best = 0;
    let bestDist = Infinity;
    cards().forEach((c, i) => {
      const dist = Math.abs(c.getBoundingClientRect().left - edge);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    return best;
  };

  const focusCard = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    const index = Math.min(Math.max(i, 0), days.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ⬇ 3. ĐẶT KHÓA: từ giờ tới 300ms nữa, onScroll không được đổi active.
    //   Đặt khóa TRƯỚC khi gọi scrollTo, để sự kiện scroll đầu tiên đã gặp khóa.
    lockUntil.current = Date.now() + LOCK_MS;
    setActive(index);
    row.scrollTo({ left: scrollTarget(index), behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    // ⬇ 4. KIỂM TRA KHÓA
    const now = Date.now();
    if (now <= lockUntil.current) {
      // Còn khóa -> đây là MÌNH đang trượt, không phải người dùng.
      // Gia hạn khóa thêm 150ms (vì vẫn đang có sự kiện scroll = vẫn đang trượt)...
      lockUntil.current = now + LOCK_RENEW_MS;
      // ...và BỎ QUA, không đụng vào active.
      return;
    }
    // Hết khóa -> là người dùng tự cuộn. Làm như bước 5.
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
        onScroll={onScroll}
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
// DÒNG THỜI GIAN khi bấm "Next" (giả sử bấm lúc t = 0)
//
//   t=0     focusCard: lockUntil = 300, setActive(2), scrollTo(...) -> bắt đầu trượt
//   t=16    scroll #1: 16 <= 300 (còn khóa)  -> lockUntil = 166, bỏ qua
//   t=32    scroll #2: 32 <= 166             -> lockUntil = 182, bỏ qua
//   ...     (mỗi khung hình đều gia hạn, khóa luôn đi trước thời điểm hiện tại)
//   t=400   scroll cuối cùng: lockUntil = 550, bỏ qua. Trượt xong, không còn sự kiện.
//   t=550   khóa tự hết hạn. Lần cuộn tay kế tiếp của người dùng lại được xử lý.
//
// Điểm hay: không cần biết trước cú trượt kéo dài bao lâu. Khóa tự "đi theo"
// cú trượt và tự hết ngay sau khi nó dừng.
//
// Chưa hoàn hảo: nếu người dùng đặt tay cuộn đúng trong ~150ms sau khi trượt xong,
// lần cuộn đó bị bỏ qua. Không đáng kể, và đổi lại code đơn giản.
// ============================================================================
