// ============================================================================
// BƯỚC 1: chỉ VẼ THẺ. Chưa có cuộn ngang, chưa có "thẻ active", chưa có tương tác.
//
// Mục tiêu của bước này: hiểu cách một mảng dữ liệu (`days`) biến thành giao diện.
// Không có useState, useRef, useEffect nào cả, nên đây là một component thường
// (server component), không cần dòng "use client".
// ============================================================================

import DayIcon from "../DayIcon"; // vẽ icon (cá chép, mâm, bát...) theo tên
import type { Day } from "../data"; // kiểu dữ liệu của MỘT ngày (xem data.ts)
import styles from "../Days.module.css"; // tái dùng CSS thật để thẻ trông giống bản cuối

// Hàm nhỏ: 1 -> "01", 5 -> "05". Dùng để hiện "01 / 05" ở góc thẻ.
// padStart(2, "0") = nếu chuỗi ngắn hơn 2 ký tự thì thêm số 0 vào đầu.
const pad = (n: number) => String(n).padStart(2, "0");

// Component nhận vào `days`: một MẢNG các ngày. Page truyền DAYS từ data.ts vào đây.
export default function Step1({ days }: { days: Day[] }) {
  return (
    // <ol> = danh sách có thứ tự (ngày 1, 2, 3...). Mỗi ngày là một <li>.
    // Ở bước này chưa gắn class `styles.hs`, nên các thẻ xếp DỌC từ trên xuống.
    // Bước 2 sẽ thêm class đó để chuyển thành hàng cuộn NGANG.
    <ol style={{ listStyle: "none", padding: 0, display: "grid", gap: "1.1rem" }}>
      {/*
        days.map(...) = với MỖI phần tử `d` trong mảng, trả về MỘT <li>.
        `d` là một ngày (ví dụ ngày 23 tháng Chạp), `i` là vị trí của nó (0, 1, 2...).
      */}
      {days.map((d, i) => (
        // `key` bắt buộc khi render danh sách: giúp React phân biệt các <li> với nhau.
        // d.n (số ngày: "23", "30"...) là duy nhất nên dùng làm key.
        <li key={d.n}>
          {/* <article> = một khối nội dung tự đứng riêng được: hợp với một "thẻ" */}
          <article className={styles.day}>
            {/* Dòng đầu thẻ: tên tháng bên trái, số thứ tự bên phải */}
            <p className={styles.m}>
              <span>{d.month}</span>
              {/* i bắt đầu từ 0 nên +1; days.length là tổng số thẻ -> "01 / 05" */}
              <span>
                {pad(i + 1)} / {pad(days.length)}
              </span>
            </p>

            {/* Con số to của ngày */}
            <div className={styles.n}>{d.n}</div>

            {/* Icon: truyền `name` (ví dụ "carp"), DayIcon tự chọn hình tương ứng */}
            <div className={styles.ic}>
              <DayIcon name={d.icon} />
            </div>

            {/*
              `a && b` trong JSX: nếu `a` đúng thì hiện `b`, nếu sai thì không hiện gì.
              `varies` là trường tùy chọn (có dấu ? trong type Day): chỉ vài ngày mới có.
            */}
            {d.varies && (
              <p className={styles.tag} lang="en">
                Date varies
              </p>
            )}

            {/* lang="vi" / lang="en": báo cho trình đọc màn hình đọc đúng giọng */}
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

            {/*
              `chips` là một mảng chuỗi (món trên mâm), nên lại dùng .map() một lần nữa:
              mỗi món -> một <li>. Ở đây món ăn (c) là duy nhất nên dùng luôn làm key.
            */}
            <ul className={styles.chips} lang="en" aria-label="On the tray">
              {d.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            {/* `note` cũng là trường tùy chọn: có thì hiện, không có thì thôi */}
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
