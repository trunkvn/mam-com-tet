// Trang học tạm: mở (đã ẩn) trước đây ở /learn/days; muốn xem lại thì đổi tên thư mục app/_learn thành app/learn để xem từng bước.
// Mỗi lần sang bước mới, chỉ cần đổi component được render ở dưới.
// Xóa cả thư mục app/learn khi học xong.

// import Step1 from "../../_components/days/steps/Step1";
// import Step2 from "../../_components/days/steps/Step2";
// import Step3 from "../../_components/days/steps/Step3";
// import Step4 from "../../_components/days/steps/Step4";
// import Step5 from "../../_components/days/steps/Step5";
// import Step6 from "../../_components/days/steps/Step6";
// import Step7 from "../../_components/days/steps/Step7";
import Step8 from "../../_components/days/steps/Step8";
import { DAYS } from "../../_components/days/data";

export default function LearnDaysPage() {
  return (
    // Không bọc trong `.wrap`: hàng cuộn phải rộng hết màn hình (xem bước 2)
    <main style={{ padding: "3rem 0" }}>
      {/* <Step1 days={DAYS} /> */}
      {/* <Step2 days={DAYS} /> */}
      {/* <Step3 days={DAYS} /> */}
      {/* <Step4 days={DAYS} /> */}
      {/* <Step5 days={DAYS} /> */}
      {/* <Step6 days={DAYS} /> */}
      {/* <Step7 days={DAYS} /> */}
      <Step8 days={DAYS} />
    </main>
  );
}
