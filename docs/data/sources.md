---
sidebar_position: 1
title: Nguồn dữ liệu
description: Nguồn dữ liệu xác định những thư mục cục bộ hoặc SMB/NAS mà agent giám sát và phân loại.
---

Nguồn dữ liệu cho agent biết phải theo dõi thư mục nào. Agent không quét toàn bộ ổ đĩa; nó chỉ phân loại những file nằm trong các nguồn được gán cho đơn vị của máy. Bạn quản lý nguồn tại **Dữ liệu › Nguồn dữ liệu**.

## Cách hoạt động

Mọi máy thuộc đơn vị sở hữu một nguồn sẽ nhận nguồn đó và theo dõi thư mục liên tục. Khi có file mới hoặc file thay đổi, agent tự đưa file vào hàng đợi phân loại. Bạn không cần đặt lịch quét.

![Trang Nguồn dữ liệu](/img/console/data-sources.png)

## Tạo nguồn

Bấm **Thêm nguồn dữ liệu** và điền các phần sau.

![Hộp thoại Thêm nguồn dữ liệu](/img/console/data-sources-create.png)

| Trường | Ý nghĩa |
|---|---|
| Tên nguồn dữ liệu | Tên hiển thị trên Console, ví dụ "Ổ C – Nội quy công ty A". |
| Loại nguồn | Thư mục cục bộ trên máy trạm, hoặc thư mục chia sẻ SMB/NAS dạng `\\server\share`. |
| Owner / Phòng ban | Một hoặc nhiều phòng ban, hoặc **Tất cả phòng ban** của một công ty con. Chọn nhiều phòng sẽ tạo một nguồn cho mỗi phòng. |
| Include / Exclude extensions | Đuôi file cần quét, có sẵn preset, và đuôi cần bỏ qua như `.tmp`, `.exe`, `.dll`. |
| Include / Exclude paths | Thư mục con cần quét và thư mục cần bỏ qua như archive hoặc temp. |
| Kích thước tối đa | Chọn 100 MB, 250 MB, 500 MB, 1 GB hoặc 2 GB (mặc định 500 MB). File lớn hơn ngưỡng không được đọc nội dung nhưng vẫn hiện trong Kiểm kê dữ liệu kèm cảnh báo. |

:::tip[Thu hẹp phạm vi quét]

Hãy khai báo ít nhất một đuôi file hoặc thư mục cần quét. Không nên chọn cả ổ đĩa như `C:\` làm gốc, vì agent sẽ phải duyệt cả các thư mục hệ thống.

:::

## Kích thước tối đa và Mức quét

Từ [bản tiếp theo](../releases/next.md), trường **Kích thước tối đa** chỉ còn các mức cố định 100 MB, 250 MB, 500 MB, 1 GB và 2 GB; lựa chọn "Tùy chỉnh" của phiên bản trước đã được bỏ. Nếu một nguồn đã lưu một giá trị khác từ trước, giá trị đó vẫn được giữ và hiển thị kèm chữ **(đã đặt trước)** cho đến khi bạn chọn một mức mới, nên việc mở nguồn ra sửa các trường khác không làm thay đổi ngưỡng của bạn.

{/* TODO screenshot: hộp thoại sửa nguồn dữ liệu, danh sách "Kích thước tối đa" có một giá trị "(đã đặt trước)" */}

Ngưỡng này làm việc cùng với **Mức quét** trong [Chính sách Agent](../endpoints/agent-policy.md#mức-quét), và mỗi bên quyết định một việc khác nhau.

### Bước 1. Nguồn dữ liệu quyết định tệp có được đọc nội dung không

Tệp lớn hơn Kích thước tối đa của nguồn không được mở ra đọc. Agent vẫn ghi nhận tệp, gắn nhãn dựa trên thông tin của tệp và đưa nó vào Kiểm kê dữ liệu với lý do "lớn hơn giới hạn kích thước của nguồn dữ liệu".

### Bước 2. Mức quét quyết định tệp được đọc kỹ đến đâu

Với tệp nằm trong ngưỡng của nguồn, Mức quét cho biết agent đọc toàn bộ hay chỉ đọc một phần, đọc chữ bao nhiêu trang scan và dành tối đa bao nhiêu thời gian cho tệp.

Ví dụ, một nguồn đặt Kích thước tối đa 1 GB trên máy dùng Mức quét Chuẩn. Tệp 100 MB được đọc toàn bộ. Tệp 600 MB vượt ngưỡng đọc toàn bộ của mức Chuẩn nên được gắn cờ chưa phân tích đầy đủ: nếu là tệp văn bản như `.csv` thì agent đọc phần đầu và phần cuối, còn nếu là PDF hay tài liệu Office thì agent chỉ đánh giá theo thông tin của tệp. Tệp 3 GB vượt ngưỡng của nguồn nên chỉ được ghi nhận theo thông tin của tệp. Muốn tệp lớn trên máy chủ tệp được đọc toàn bộ, hãy tăng cả hai: chọn Mức quét Sâu và đặt Kích thước tối đa của nguồn đủ lớn.

:::note[Đuôi file và thư mục bị loại trừ]

Khác với Kích thước tối đa, những tệp bạn chủ động loại bằng **Exclude extensions** hoặc **Exclude paths** vẫn nằm ngoài phạm vi quét và không xuất hiện trong Kiểm kê dữ liệu.

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

## Đọc tiếp

Để chọn mức đọc tài liệu cho từng loại máy, xem [Chính sách Agent](../endpoints/agent-policy.md). Để tìm những tệp chưa được phân tích đầy đủ, xem [Tệp lớn & mức phân tích](./large-files.md) và [Kiểm kê dữ liệu & đổi nhãn](./inventory.md).
