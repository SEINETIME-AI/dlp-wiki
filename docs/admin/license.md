---
sidebar_position: 3
title: Giấy phép
description: Nhận file giấy phép từ Seinetime và kích hoạt trên Console.
---

Giấy phép (license) cho biết tổ chức của bạn được dùng NextDLP trên bao nhiêu máy trạm và tới ngày nào. Seinetime gửi giấy phép dưới dạng một file `.lic`, và Quản trị hệ thống tải file này lên Console để kích hoạt.

## Bước 1. Nhận file giấy phép

Seinetime gửi file `.lic` qua email hoặc kênh hỗ trợ khi bạn mua, gia hạn hoặc dùng thử NextDLP. Hãy lưu nguyên file ở nơi an toàn và không mở hay sửa file bằng trình soạn thảo, vì file đã bị sửa sẽ không kích hoạt được.

## Bước 2. Tải file lên Console

Đăng nhập Console bằng tài khoản Quản trị hệ thống, mở **Báo cáo & quản trị › Hệ thống › Giấy phép & phiên bản**, bấm **Kích hoạt license** rồi chọn file `.lic`. Giấy phép mới có hiệu lực ngay, không cần khởi động lại server.

![Mục Giấy phép & phiên bản](/img/console/system-license.png)

## Bước 3. Kiểm tra kết quả

Console hiện thông báo **Đã kích hoạt license**. Hãy đối chiếu tên khách hàng, số máy và ngày hết hạn với hợp đồng. Mỗi lần kích hoạt được ghi vào bảng **Lịch sử kích hoạt** bên dưới.

Nếu file không hợp lệ, Console giữ nguyên giấy phép đang dùng và cho biết lý do.

| Thông báo | Cách xử lý |
|---|---|
| File không phải license hợp lệ hoặc đã bị sửa. | Tải lại file gốc từ email. Nếu vẫn lỗi, liên hệ Seinetime. |
| File license này đã hết hạn. | Liên hệ Seinetime để nhận file mới. |
| File này cũ hơn license đang dùng nên không được kích hoạt. | Dùng file mới nhất Seinetime đã gửi. |

Khi gia hạn hoặc nâng số máy, bạn làm lại đúng các bước trên với file mới.
