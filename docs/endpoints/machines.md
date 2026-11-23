---
sidebar_position: 2
title: Máy trạm
description: Trang Máy trạm liệt kê toàn bộ máy đã đăng ký cùng đơn vị, trạng thái kết nối và thời điểm liên lạc gần nhất.
---

Khi cần biết agent trên một máy có đang hoạt động hay không, hãy mở **Thiết bị & Agent › Máy trạm** trước. Trang liệt kê các máy đã cài agent và đăng ký với server, cùng đơn vị, địa chỉ IP, người đang đăng nhập và thời điểm kết nối gần nhất.

## Trạng thái kết nối

Cột trạng thái hiện một trong ba giá trị dưới đây. Bộ lọc phía trên danh sách gọi chúng là **Đang hoạt động**, **Mất kết nối** và **Đã thu hồi**.

| Trạng thái | Ý nghĩa |
|---|---|
| `active` | Đang hoạt động: agent báo trạng thái đều đặn về server. |
| `offline` | Mất kết nối: server không nhận được tín hiệu từ agent quá ngưỡng offline. |
| `revoked` | Đã thu hồi: máy đã bị ngắt khỏi hệ thống nhưng vẫn nằm trong danh sách. |

Khi có chính sách mới chưa tới máy, ô thống kê **Chờ đồng bộ policy** và một dòng cảnh báo cho biết số máy đang chờ. Agent đang hoạt động tải bản mới về trong vài phút.

Phía trên danh sách là các ô thống kê tổng số máy, số máy đang hoạt động, số máy mất kết nối và số máy đang chờ đồng bộ chính sách.

![Trang Máy trạm](/img/console/endpoints.png)

## Chi tiết máy

Bấm vào tên máy để mở bảng chi tiết bên phải: **Địa chỉ IP**, **Người đăng nhập**, **Đơn vị**, **Tác nhân** (phiên bản agent), **HĐH**, **Kết nối gần nhất**, **Fingerprint** và **Windows SID**. Bên dưới là mục **Sự kiện bảo vệ agent**, liệt kê những lần gỡ agent bị từ chối và những lần agent dừng bất thường trên máy đó.

Máy có sự kiện bảo vệ trong 7 ngày qua được đánh dấu bằng biểu tượng khiên trước tên máy, và bộ lọc **Sự kiện bảo vệ** giúp lọc riêng những máy này. Xem [Mật khẩu gỡ agent](./uninstall-password.md#theo-dõi-trên-console).

## Thao tác quản trị

Quản trị hệ thống dùng được cả ba thao tác dưới đây. Quản lý đơn vị chỉ dùng được **Chuyển đơn vị**, khi cả máy lẫn đơn vị đích nằm trong phạm vi của mình, và không thấy hai nút còn lại. Nếu một thao tác không thực hiện được, Console hiển thị lý do cụ thể do server trả về.

**Chuyển đơn vị** đổi phòng ban của máy sau khi đã đăng ký, ví dụ khi nhân viên chuyển công tác. Máy sẽ dùng chính sách phân loại của đơn vị mới. Chính sách Agent thì vẫn đi theo bộ cài cũ. Nếu cần cấu hình vận hành của đơn vị mới, hãy cài lại bằng bộ cài của đơn vị đó.

**Tạo lại khóa** cấp khóa API mới cho agent và vô hiệu hóa khóa cũ ngay lập tức. Khóa mới chỉ hiển thị một lần, nên hãy sao chép ngay.

**Thu hồi** ngắt máy khỏi hệ thống: agent ngừng báo cáo và tài khoản Console gắn với máy bị xóa. Hãy thu hồi máy khi máy bị thanh lý hoặc đã gỡ agent.

## Agent tự bảo vệ và tự khởi động lại

Agent chạy dưới dạng dịch vụ Windows tên `nextdlp`. Người dùng thông thường không dừng, gỡ hoặc sửa được dịch vụ. Chỉ tài khoản có quyền quản trị trên máy mới làm được, và khi đã đặt [mật khẩu gỡ agent](./uninstall-password.md) thì tài khoản đó cũng không dừng hay gỡ được agent. Khi dịch vụ dừng bất thường hoặc một phần xử lý bị treo, Windows tự khởi động lại dịch vụ theo cấu hình trong bộ cài.

:::tip[Máy mất kết nối?]

Kiểm tra dịch vụ Windows `nextdlp` trên máy đó bằng lệnh `Get-Service nextdlp` và khởi động lại nếu đang dừng. Một máy mất kết nối mà không rõ lý do cũng có thể là dấu hiệu agent đã bị gỡ, như nêu ở [Mật khẩu gỡ agent](./uninstall-password.md#giới-hạn). Xem thêm [Xử lý sự cố](../operations/troubleshooting.md).

:::
