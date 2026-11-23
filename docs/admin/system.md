---
sidebar_position: 2
title: Hệ thống
description: Trang Hệ thống tập trung cấu hình nền tảng, gói GPU AssistOCR, thông báo vận hành và giấy phép.
---

Những thiết lập áp dụng cho cả hệ thống, chứ không riêng đơn vị nào, nằm ở **Báo cáo & quản trị › Hệ thống**. Chỉ Quản trị hệ thống truy cập được trang này.

![Trang Hệ thống](/img/console/system.png)

## Các khu vực cấu hình

| Khu vực | Nội dung |
|---|---|
| Thông tin chung | Tên tổ chức (hiển thị là cấp Tổng công ty trong Cơ cấu tổ chức), múi giờ và ngôn ngữ giao diện. |
| Cấu hình Agent mặc định | Heartbeat, ngưỡng offline và kênh phát hành. Mật khẩu gỡ agent đặt tại trang Bộ cài Agent, xem [Mật khẩu gỡ agent](../endpoints/uninstall-password.md). Thiết lập theo nhóm máy nằm ở Chính sách Agent. |
| Nhà cung cấp phân loại | Trạng thái của gói GPU AssistOCR và quota tài liệu gửi lên mỗi ngày. Xem [AssistOCR](#assistocr). |
| Thông báo vận hành | Cho biết loại thông báo nào đang bật: trạng thái gói cài, máy mất kết nối, đồng bộ chính sách, yêu cầu đổi nhãn và popup tệp mới được phân loại. Mục này chỉ để xem. |
| Giấy phép & phiên bản | Trạng thái giấy phép, số máy đã dùng, kích hoạt giấy phép mới và phiên bản đang chạy. Xem [Giấy phép](./license.md). |

Server hiện chưa tự xóa dữ liệu cũ và chưa tự sao lưu. Hãy sao lưu cơ sở dữ liệu theo quy trình của tổ chức.

## AssistOCR

AssistOCR là gói GPU tự cài trong mạng nội bộ, và là tùy chọn. Ở chế độ OCR hybrid hoặc máy chủ, gói này đọc ảnh, bản scan và chữ trên dấu mộc thay cho agent, và đọc tốt hơn OCR trên máy trạm với bản scan chất lượng thấp. Gói cũng xem hình cho điều kiện Bản vẽ kỹ thuật, và đọc tài liệu mẫu khi bạn dùng Gợi ý AI.

Với điều kiện ngữ nghĩa, AssistOCR đánh giá lại những điểm sát ngưỡng, và đánh giá thay cho máy trạm không nạp được mô hình ngữ nghĩa. Xem [Khi máy trạm nhờ AssistOCR](../getting-started/specs.md#khi-máy-trạm-nhờ-assistocr).

Địa chỉ của AssistOCR được đặt khi cài server cùng gói GPU, không nhập trên Console. Mục **Nhà cung cấp phân loại** cho biết tình trạng của gói:

| Thông tin | Ý nghĩa |
|---|---|
| Trạng thái | **Hoạt động** khi gói GPU trả lời và còn chỗ xử lý. **Đang bận** khi mọi chỗ xử lý đang dùng hoặc có tệp đang chờ. **Chưa sẵn sàng** khi gói chưa cài, chưa chạy hoặc mô hình đang tải. Lúc đó agent vẫn đọc tệp bằng OCR trên máy. Rê chuột vào trạng thái để xem số tệp đang xử lý và đang chờ, số tài liệu đã đọc trong ngày và số lần dùng lại kết quả cũ. |
| Quota mỗi ngày | Số tài liệu agent gửi lên GPU để đọc mỗi ngày; quá mức thì agent tự đọc trên máy. 0 là không giới hạn. Đổi giá trị rồi bấm **Lưu cấu hình**. |

Nếu không dùng AssistOCR, hãy chọn chế độ **OCR cục bộ** trong các chính sách phân loại.
