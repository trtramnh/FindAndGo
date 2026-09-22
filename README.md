# FIND&GO

Landing page tiếng Việt cho nền tảng khám phá địa điểm FIND&GO, phát triển bởi SEEKERS. Thư mục ban đầu trống; dự án được tạo bằng React 19 và Vite 7, không thêm router, backend hay thư viện giao diện.

## Chạy dự án

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```sh
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị, mặc định http://127.0.0.1:5173.

```sh
npm run build
npm run preview
```

Build tĩnh nằm trong `dist/`. Chỉ có trang `/`; điều hướng dùng anchor tới các section thật. Không có route đăng nhập giả.

## Thiết kế tham chiếu

Đã đọc `landing-page.html`, `landing-page.ts`, `landing-page.css`, `landing-page.host.css`, toàn bộ `landing-dashboard-preview/`, global styles, khai báo font, routing và dependencies trong bản checkout tại `D:/Study/AWS/Snaptics-Client/client`. Trang cây thư mục GitHub không tải được qua công cụ duyệt web; [CSS gốc trên GitHub](https://raw.githubusercontent.com/DatNguyenSE/Snaptics-Client/main/client/src/app/features/landing-page/landing-page.css) truy cập được và đã được đối chiếu.

Giữ thứ tự section, shell 1200px, nội dung hero 820px, khung browser 980px, thanh điều hướng dạng pill, chữ nền lớn, dot grid, glow, marquee 28 giây, thông báo nổi 5/6/7 giây, thẻ bo tròn 28px, khoảng cách ba cột 22px, phần About hai cột và CTA bo 32px. Dashboard được viết mới bằng React theo nội dung khám phá địa điểm. Font headline và line-height được điều chỉnh nhẹ để dấu tiếng Việt không chồng nhau. Màu cam đậm hơn được dùng dưới chữ trắng nhỏ để dễ đọc. Các nhóm thẻ chuyển thành một cột ở 960px; bản demo chuyển sang bố cục nhỏ gọn riêng, không scale cả trang.

## Tương tác

- Tìm kiếm không phân biệt dấu, chọn mục đích, khoảng cách minh họa, ngân sách/người, số người, Wi-Fi, ổ cắm; bộ lọc kết hợp bằng điều kiện AND.
- Lọc ngân sách dựa trên **giá cao nhất** của khoảng giá mẫu. “Dưới 70.000đ” chỉ hiển thị khoảng giá có mức trên nhỏ hơn 70.000đ.
- “Thử tìm ngay” áp dụng ví dụ học nhóm 4 người, dưới 70.000đ, Wi-Fi và ổ cắm.
- Yêu thích lưu trong localStorage của trình duyệt; vẫn dùng được trong phiên nếu lưu lâu dài bị chặn.
- Dialog chi tiết, trạng thái không có kết quả, xóa bộ lọc, menu di động, đóng bằng Escape/click ngoài, navigation và focus bàn phím.
- Hỗ trợ `prefers-reduced-motion`, tên truy cập cho các điều khiển, ảnh dự phòng và phím tắt chuyển đến nội dung chính.

## Kiểm tra

```sh
npm test
```

Playwright dùng Google Chrome đã cài (`channel: chrome`), tự khởi động Vite nếu cần. Nếu máy chưa có Chrome: `npx playwright install chrome`. Trên hệ điều hành khác Windows, đổi `npm.cmd` thành `npm` trong `playwright.config.js`.

```sh
node scripts/capture.mjs
```

Chạy lệnh chụp khi dev server đang ở cổng 5173. Ảnh được ghi vào `artifacts/` ở các chiều rộng 1440, 1024, 768, 390 và 375px. Kết quả kiểm tra cuối cùng được ghi trong `docs/verification.md`.

## Các file tạo mới

- `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `.gitignore`: cấu hình và điểm vào.
- `src/main.jsx`, `src/App.jsx`: khởi tạo, ghép trang và thông báo đăng nhập chưa khả dụng.
- `src/components/Header.jsx`, `Hero.jsx`: điều hướng, hero và marquee.
- `src/components/ProductPreview.jsx`: giao diện demo, tìm kiếm, bộ lọc, yêu thích, chi tiết.
- `src/components/LandingSections.jsx`: Features, HowItWorks, About, FinalCta, Footer.
- `src/components/ui.jsx`: wordmark, SVG icon, ảnh dự phòng và dialog dùng chung.
- `src/data/venues.js`: dữ liệu địa điểm mẫu và hàm chuẩn hóa tìm kiếm.
- `src/styles/global.css`, `landing.css`, `preview.css`, `sections.css`: token, bố cục, breakpoint và animation.
- `public/favicon.svg`, `public/assets/`: favicon, ảnh địa điểm, ảnh dự phòng và font cục bộ.
- `playwright.config.js`, `tests/landing.spec.js`, `scripts/capture.mjs`: kiểm tra trình duyệt và chụp ảnh.
- `README.md`, `docs/`: hướng dẫn, nguồn tài nguyên và kết quả xác minh.

## Phạm vi MVP

Toàn bộ địa điểm, hình ảnh, giá, sức chứa, tiện ích và vùng khoảng cách là **dữ liệu minh họa**, không phải dữ liệu địa điểm đã xác minh. Không dùng vị trí thật, bản đồ, API, đặt chỗ, đánh giá hay số người dùng giả. Các preview trong phần ba bước là hình minh họa HTML/CSS. Đăng nhập và hồ sơ chưa triển khai; bấm sẽ hiển thị giải thích rõ ràng. Liên hệ dẫn tới footer có thông báo chưa công bố thông tin liên hệ. Wordmark chữ và ghim vị trí là logo tạm thời. `findandgo.app` chỉ là chữ trang trí trong khung browser.
