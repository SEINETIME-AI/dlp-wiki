---
sidebar_position: 2
title: Kiểm kê dữ liệu & đổi nhãn
description: Kiểm kê dữ liệu cho biết toàn bộ tài liệu đã được quét cùng nhãn hiện tại, và là nơi điều chỉnh nhãn khi cần.
---

Kiểm kê dữ liệu là danh mục mọi tài liệu mà agent đã quét, cùng nhãn hiện tại của từng tài liệu. Đây là nơi quản lý trả lời câu hỏi "dữ liệu mật của chúng ta đang nằm ở đâu", và cũng là nơi duy nhất để điều chỉnh nhãn khi agent gắn chưa đúng. Trang nằm tại **Dữ liệu › Kiểm kê dữ liệu**.

## Tra cứu tài liệu

Tab **Kiểm kê** liệt kê tài liệu kèm định dạng, nhãn bảo mật, loại tài liệu, máy nguồn và nguồn dữ liệu. Bạn có thể tìm theo tên hoặc đường dẫn, lọc theo nguồn và nhãn, hoặc chỉ xem tài liệu **Nhạy cảm**. Bộ lọc **Mức phân tích → Chưa phân tích đầy đủ** chỉ giữ lại những tài liệu mà agent chưa đọc hết nội dung, ví dụ tệp rất lớn, bản scan dài hoặc tệp có mật khẩu; xem [Tệp lớn & mức phân tích](./large-files.md).

![Trang Kiểm kê dữ liệu](/img/console/documents.png)

Bấm vào một tài liệu để mở **Chi tiết tài liệu**, gồm nhãn hiện tại, trạng thái, lịch sử nhãn và phần **Vì sao tài liệu có nhãn này?**. Nếu tài liệu chưa được phân tích đầy đủ, phần này hiển thị cảnh báo kèm lý do và, khi biết, dung lượng đã đọc trên tổng dung lượng của tệp.

![Chi tiết tài liệu với nút Cập nhật nhãn](/img/console/documents-detail.png)

| Trạng thái | Ý nghĩa |
|---|---|
| Đã phân loại | Nhãn do agent gắn tự động. |
| Chờ rà soát | Tài liệu cần người rà soát trước khi chốt nhãn. |
| Admin ghi đè | Nhãn đã được Quản trị viên hoặc Quản lý điều chỉnh bằng tay. |
| Đã xóa/di chuyển | File không còn trong thư mục giám sát. Nhãn cuối cùng vẫn được giữ để kiểm kê. |

## Đổi nhãn tài liệu

Cách đổi nhãn phụ thuộc vào vai trò của bạn.

**Quản trị hệ thống và Quản lý đơn vị** bấm **Cập nhật nhãn** trong chi tiết tài liệu. Nhãn mới có hiệu lực ngay, không cần duyệt, và được đồng bộ xuống agent để ghi vào file.

**Người dùng máy trạm** bấm **Yêu cầu đổi nhãn**, chọn nhãn đề xuất và ghi lý do. Yêu cầu chờ Quản lý hoặc Quản trị viên duyệt trước khi có hiệu lực.

## Duyệt yêu cầu đổi nhãn

Tab **Yêu cầu đổi nhãn** có hai phần. **Yêu cầu đang nhận** dành cho người duyệt, mặc định hiện các yêu cầu đang chờ trong phạm vi đơn vị của bạn; mỗi yêu cầu hiển thị tài liệu, nhãn hiện tại, nhãn đề xuất và lý do, kèm nút **Phê duyệt** và **Từ chối**. **Yêu cầu của tôi** cho người gửi theo dõi trạng thái các yêu cầu mình đã gửi: Chờ duyệt, Đã duyệt hoặc Từ chối.

Sau khi được duyệt, nhãn mới được áp dụng trên server và agent của máy chứa file sẽ đồng bộ ở lần kết nối kế tiếp.

## Đọc tiếp

Để biết vì sao một tài liệu được gắn nhãn như vậy, xem [Nhật ký phân loại](../classification/events.md). Để xử lý những tài liệu chưa được đọc hết, xem [Tệp lớn & mức phân tích](./large-files.md).
