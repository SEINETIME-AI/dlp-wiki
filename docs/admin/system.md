---
sidebar_position: 2
title: Hệ thống
description: Trang Hệ thống tập trung cấu hình nền tảng, tích hợp phân loại, bảo mật, lưu trữ và giấy phép.
---

Trang **Báo cáo & quản trị › Hệ thống** tập trung các cấu hình áp dụng cho toàn bộ nền tảng. Chỉ Quản trị hệ thống truy cập được trang này.

![Trang Hệ thống](/img/console/system.png)

## Các khu vực cấu hình

| Khu vực | Nội dung |
|---|---|
| Thông tin chung | Tên tổ chức (hiển thị là cấp Tổng công ty trong Cơ cấu tổ chức), múi giờ và ngôn ngữ giao diện. |
| Cấu hình Agent mặc định | Heartbeat, ngưỡng offline và kênh phát hành. Mật khẩu gỡ agent đặt tại trang Bộ cài Agent, xem [Mật khẩu gỡ agent](../endpoints/uninstall-password.md). Thiết lập theo nhóm máy nằm ở Chính sách Agent. |
| Thông báo vận hành | Bật hoặc tắt thông báo về trạng thái gói cài, máy mất kết nối, đồng bộ chính sách, yêu cầu đổi nhãn và popup tệp mới được phân loại. |
| Bảo mật đăng nhập | Độ dài mật khẩu tối thiểu, số lần nhập sai trước khi khóa tài khoản. |
| Lưu trữ và sao lưu | Thời gian lưu sự kiện phân loại và kiểm kê tài liệu, lịch sao lưu, số bản giữ lại. Hiện các giá trị này mới được lưu lại: server chưa tự xóa dữ liệu cũ và chưa tự sao lưu, nên hãy sao lưu cơ sở dữ liệu theo quy trình của tổ chức. |
| Nhà cung cấp phân loại | Trạng thái của gói GPU AssistOCR và quota tài liệu gửi lên mỗi ngày. Xem [AssistOCR](#assistocr). |
| Giấy phép & phiên bản | Trạng thái giấy phép, số máy đã dùng, kích hoạt giấy phép mới và phiên bản đang chạy. Xem [Giấy phép](./license.md). |
| Bản ghi vượt phạm vi | Chỉ Quản trị hệ thống thấy khu vực này. Nó liệt kê chính sách Agent dùng chung, nguồn dữ liệu và quy tắc nhận diện mà người tạo hoặc sửa gần nhất không còn quản lý được vì nằm ngoài phạm vi đơn vị của họ. Danh sách chỉ để xem; bạn mở từng mục ở trang tương ứng để chỉnh. |

## AssistOCR

AssistOCR là gói GPU tự cài trong mạng nội bộ, và là tùy chọn. Gói này:

- đọc ảnh, bản scan và chữ trên dấu mộc cho agent ở chế độ OCR hybrid hoặc máy chủ, tốt hơn OCR trên máy trạm với bản scan chất lượng thấp;
- đọc tài liệu mẫu khi Quản trị hệ thống dùng Gợi ý AI;
- đánh giá lại các điều kiện ngữ nghĩa có điểm sát ngưỡng, và đánh giá thay cho máy trạm không nạp được mô hình ngữ nghĩa.

Địa chỉ của AssistOCR được đặt khi cài server cùng gói GPU, không nhập trên Console. Mục **Nhà cung cấp phân loại** cho biết tình trạng của gói:

| Thông tin | Ý nghĩa |
|---|---|
| Trạng thái | **Hoạt động** khi server nhận được trả lời từ gói GPU. **Chưa sẵn sàng** khi gói chưa cài, chưa chạy hoặc model đang tải; lúc đó agent vẫn đọc tệp bằng OCR trên máy. |
| Model | Model đọc tài liệu đang chạy và gói cấu hình của nó. |
| Chấm lại rule ngữ nghĩa trên GPU | **Đang chạy** khi model ngữ nghĩa của gói GPU đã bật. Xem [Khi máy trạm nhờ AssistOCR](../getting-started/specs.md#khi-máy-trạm-nhờ-assistocr). |
| Quota mỗi ngày | Số tài liệu agent gửi lên GPU để đọc mỗi ngày; quá mức thì agent tự đọc trên máy. 0 là không giới hạn. Đổi giá trị rồi bấm **Lưu cấu hình**. |

Nếu không dùng AssistOCR, hãy chọn chế độ **OCR cục bộ** trong các chính sách phân loại.
