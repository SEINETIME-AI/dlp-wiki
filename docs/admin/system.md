---
sidebar_position: 2
title: Hệ thống
description: Trang Hệ thống tập trung cấu hình nền tảng, tích hợp phân loại, bảo mật, lưu trữ và nhật ký quản trị.
---

Trang **Báo cáo & quản trị › Hệ thống** tập trung các cấu hình áp dụng cho toàn bộ nền tảng. Chỉ Quản trị hệ thống truy cập được trang này.

## Các khu vực cấu hình

| Khu vực | Nội dung |
|---|---|
| Thông tin chung | Tên tổ chức (hiển thị là cấp Tổng công ty trong Cơ cấu tổ chức), múi giờ và ngôn ngữ giao diện. |
| Cấu hình Agent mặc định | Heartbeat, ngưỡng offline và kênh phát hành. Thiết lập theo nhóm máy nằm ở Chính sách Agent. |
| Thông báo vận hành | Bật hoặc tắt thông báo về trạng thái gói cài, máy mất kết nối, đồng bộ chính sách, yêu cầu đổi nhãn và popup tệp mới được phân loại. |
| Bảo mật đăng nhập | Độ dài mật khẩu tối thiểu, số lần nhập sai trước khi khoá tài khoản. |
| Lưu trữ và sao lưu | Thời gian lưu sự kiện phân loại và kiểm kê tài liệu, lịch sao lưu, số bản giữ lại. |
| Nhà cung cấp phân loại | Kết nối tới AssistOCR tự host và kiểm tra trạng thái. |
| Nhật ký quản trị | Lịch sử thao tác trên Console như đăng nhập, sửa chính sách, quản lý người dùng. Chỉ đọc. |
| Giấy phép & phiên bản | Phạm vi giấy phép và phiên bản đang chạy. |

## Cấu hình AssistOCR

AssistOCR là dịch vụ OCR tự host trong mạng nội bộ, giúp đọc ảnh và bản scan chất lượng thấp tốt hơn OCR trên máy trạm. Dịch vụ này là tùy chọn.

Để bật, nhập URL dịch vụ, thời gian chờ và quota mỗi ngày, rồi bấm **Lưu cấu hình**. Khi chạy trong mạng riêng, AssistOCR không cần API key. Trạng thái **Hoạt động** cho biết server đã kết nối được dịch vụ.

Nếu không dùng AssistOCR, hãy để trống URL và tắt dịch vụ, đồng thời chọn chế độ **OCR cục bộ** trong các chính sách phân loại.

:::tip Kiểm tra trạng thái báo lỗi?

Hãy xác minh URL và kết nối mạng nội bộ giữa server NextDLP và máy chủ AssistOCR.

:::
