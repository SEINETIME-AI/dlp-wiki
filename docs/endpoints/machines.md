---
sidebar_position: 2
title: Máy trạm
description: Trang Máy trạm liệt kê toàn bộ máy đã đăng ký cùng đơn vị, trạng thái kết nối và thời điểm liên lạc gần nhất.
---

Trang **Thiết bị & Agent › Máy trạm** liệt kê mọi máy đã cài agent và đăng ký với server, cùng đơn vị, địa chỉ IP, người đang đăng nhập và thời điểm kết nối gần nhất. Đây là nơi đầu tiên cần xem khi muốn biết agent trên một máy có đang hoạt động hay không.

## Trạng thái kết nối

| Trạng thái | Ý nghĩa |
|---|---|
| Trực tuyến | Agent báo trạng thái đều đặn về server. |
| Mất kết nối | Server không nhận được tín hiệu từ agent quá ngưỡng offline. |
| Chờ đồng bộ policy | Có chính sách mới; agent sẽ tải về trong vài phút khi đang trực tuyến. |

Phía trên danh sách là các ô thống kê tổng số máy, số máy đang hoạt động, số máy mất kết nối và số máy đang chờ đồng bộ chính sách.

![Trang Máy trạm](/img/console/endpoints.png)

## Thao tác quản trị

**Chuyển đơn vị** đổi phòng ban của máy sau khi đã đăng ký, ví dụ khi nhân viên chuyển công tác. Máy sẽ dùng chính sách phân loại của đơn vị mới. Lưu ý rằng chính sách Agent vẫn đi theo bộ cài cũ; nếu cần cấu hình vận hành của đơn vị mới, hãy cài lại bằng bộ cài của đơn vị đó.

**Tạo lại khóa** cấp khóa API mới cho agent và vô hiệu hóa khóa cũ ngay lập tức. Khóa mới chỉ hiển thị một lần, nên hãy sao chép ngay.

**Thu hồi** ngắt máy khỏi hệ thống: agent ngừng báo cáo và tài khoản Console gắn với máy bị xóa. Hãy thu hồi máy khi máy bị thanh lý hoặc đã gỡ agent.

## Agent tự bảo vệ và tự khởi động lại

Agent chạy dưới dạng dịch vụ Windows tên `nextdlp`. Người dùng thông thường không dừng, gỡ hoặc sửa được dịch vụ; chỉ tài khoản có quyền quản trị trên máy mới làm được. Khi dịch vụ dừng bất thường hoặc một phần xử lý bị treo, Windows tự khởi động lại dịch vụ theo cấu hình trong bộ cài.

:::tip[Máy mất kết nối?]

Kiểm tra dịch vụ Windows `nextdlp` trên máy đó bằng lệnh `Get-Service nextdlp` và khởi động lại nếu đang dừng. Một máy mất kết nối mà không rõ lý do cũng có thể là dấu hiệu agent đã bị gỡ; xem [Mật khẩu gỡ agent](./uninstall-password.md). Xem thêm [Xử lý sự cố](../operations/troubleshooting.md).

:::
