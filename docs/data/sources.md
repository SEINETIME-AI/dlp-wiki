---
sidebar_position: 1
title: Nguồn dữ liệu
description: Nguồn dữ liệu xác định những thư mục cục bộ hoặc SMB/NAS mà agent giám sát và phân loại.
---

Nguồn dữ liệu cho agent biết phải theo dõi thư mục nào. Agent không quét toàn bộ ổ đĩa; nó chỉ phân loại những file nằm trong các nguồn được gán cho đơn vị của máy. Bạn quản lý nguồn tại **Dữ liệu › Nguồn dữ liệu**.

## Cách hoạt động

Mọi máy thuộc đơn vị sở hữu một nguồn sẽ nhận nguồn đó và theo dõi thư mục liên tục. Khi có file mới hoặc file thay đổi, agent tự đưa file vào hàng đợi phân loại. Bạn không cần đặt lịch quét.

## Tạo nguồn

Bấm **Thêm nguồn dữ liệu** và điền các phần sau.

| Trường | Ý nghĩa |
|---|---|
| Tên nguồn dữ liệu | Tên hiển thị trên Console, ví dụ "Ổ C – Nội quy công ty A". |
| Loại nguồn | Thư mục cục bộ trên máy trạm, hoặc thư mục chia sẻ SMB/NAS dạng `\\server\share`. |
| Owner / Phòng ban | Một hoặc nhiều phòng ban, hoặc **Tất cả phòng ban** của một công ty con. Chọn nhiều phòng sẽ tạo một nguồn cho mỗi phòng. |
| Include / Exclude extensions | Đuôi file cần quét, có sẵn preset, và đuôi cần bỏ qua như `.tmp`, `.exe`, `.dll`. |
| Include / Exclude paths | Thư mục con cần quét và thư mục cần bỏ qua như archive hoặc temp. |
| Kích thước tối đa | File lớn hơn ngưỡng sẽ được bỏ qua khi phân loại. |

:::tip Thu hẹp phạm vi quét

Hãy khai báo ít nhất một đuôi file hoặc thư mục cần quét. Không nên chọn cả ổ đĩa như `C:\` làm gốc, vì agent sẽ phải duyệt cả các thư mục hệ thống.

:::

## Thư mục chia sẻ SMB/NAS

Với nguồn mạng, bạn cần nhập **tên đăng nhập** dạng `DOMAIN\user` hoặc `user@domain` và **mật khẩu** của thư mục chia sẻ. Mật khẩu được mã hoá trên server và bắt buộc nhập khi tạo nguồn; khi sửa nguồn, để trống để giữ mật khẩu cũ.

Để tránh nhiều máy cùng quét một thư mục chia sẻ, nguồn mạng cần chỉ định một **Máy quét**. Chỉ máy này quét thư mục; hãy chọn một máy luôn bật như máy chủ hoặc máy phòng IT. Cột **Kết nối** cho biết máy quét có truy cập được thư mục không.

| Trạng thái kết nối | Ý nghĩa |
|---|---|
| Kết nối tốt | Máy quét đọc được thư mục chia sẻ. |
| Sai tên đăng nhập hoặc mật khẩu | Kiểm tra lại thông tin đăng nhập của share. |
| Không kết nối được máy chủ hoặc thư mục chia sẻ | Kiểm tra đường dẫn và mạng giữa máy quét và NAS. |
| Mất kết nối, đang thử lại | Agent sẽ tự thử lại. |
| Máy quét offline | Máy quét đang tắt hoặc mất kết nối với server. |

## Sửa và xoá nguồn

Khi bạn sửa hoặc xoá một nguồn, các agent thuộc đơn vị sở hữu sẽ đồng bộ lại cấu hình. Với nguồn bị xoá, agent ngừng theo dõi đường dẫn đó; các tài liệu đã kiểm kê từ nguồn vẫn được giữ lại trong Kiểm kê dữ liệu.
