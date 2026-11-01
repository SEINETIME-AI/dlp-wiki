---
sidebar_position: 3
title: Giấy phép
description: Nhận và kích hoạt file giấy phép, số máy được dùng, thời hạn, ân hạn và gia hạn.
---

Giấy phép (license) cho biết tổ chức của bạn được dùng NextDLP trên bao nhiêu máy trạm và tới ngày nào. Giấy phép là một file `.lic`, và Quản trị hệ thống tải file này lên Console để kích hoạt.

Với bản cài mới, hãy kích hoạt giấy phép trước khi cài agent. Khi chưa có giấy phép, Console vẫn đăng nhập và cấu hình được, nhưng chưa máy trạm nào kết nối được về server.

## Bước 1. Nhận file giấy phép

Đội hỗ trợ NextDLP gửi file `.lic` qua email hoặc kênh hỗ trợ khi bạn mua, gia hạn hoặc dùng thử NextDLP. Hãy lưu nguyên file ở nơi an toàn và không mở hay sửa file bằng trình soạn thảo, vì file đã bị sửa sẽ không kích hoạt được.

## Bước 2. Tải file lên Console

Đăng nhập Console bằng tài khoản Quản trị hệ thống, mở **Báo cáo & quản trị › Hệ thống › Giấy phép & phiên bản**, bấm **Kích hoạt license** rồi chọn file `.lic`. Giấy phép mới có hiệu lực ngay, không cần khởi động lại server.

![Mục Giấy phép & phiên bản](/img/console/system-license.png)

## Bước 3. Kiểm tra kết quả

Console hiện thông báo **Đã kích hoạt license**. Hãy đối chiếu tên khách hàng, số máy và ngày hết hạn với hợp đồng. Mỗi lần kích hoạt được ghi vào bảng **Lịch sử kích hoạt** bên dưới.

Nếu file không hợp lệ, Console giữ nguyên giấy phép đang dùng và cho biết lý do.

| Thông báo | Cách xử lý |
|---|---|
| File không phải license hợp lệ hoặc đã bị sửa. | Tải lại file gốc từ email. Nếu vẫn lỗi, liên hệ đội hỗ trợ NextDLP. |
| File license này đã hết hạn. | Liên hệ đội hỗ trợ NextDLP để nhận file mới. |
| File này cũ hơn license đang dùng. | Dùng file mới nhất bạn nhận được. |

## Số máy trong giấy phép

Mỗi máy trạm đã cài agent chiếm một chỗ trong giấy phép. Máy đang tắt hoặc mất kết nối vẫn được tính cho tới khi bạn **Thu hồi** máy đó ở trang [Máy trạm](../endpoints/machines.md). Cài lại agent trên cùng một máy không tính thêm chỗ, còn thu hồi một máy thì trả lại chỗ ngay.

Khi đã dùng hết số máy, máy mới cài agent sẽ không kết nối được về server. Máy đó xuất hiện trong bảng **Máy đang chờ chỗ trống** của mục Giấy phép & phiên bản, kèm tên máy, đơn vị, địa chỉ IP và lần thử gần nhất. Console cũng hiện banner vàng và báo trên chuông thông báo, mỗi máy tối đa một lần mỗi ngày.

![Máy đang chờ chỗ trống](/img/console/system-license-waiting.png)

Agent trên máy đang chờ tự thử kết nối lại. Khi có chỗ trống, do bạn thu hồi một máy không còn dùng hoặc kích hoạt giấy phép có nhiều máy hơn, máy đó tự kết nối trong khoảng nửa phút mà không cần cài lại.

Kích hoạt một giấy phép có ít máy hơn số máy đang dùng không làm máy nào ngừng hoạt động. Chỉ các máy cài thêm sau đó mới phải chờ chỗ trống.

## Thời hạn và ân hạn

Mục Giấy phép & phiên bản cho biết trạng thái giấy phép, ngày hết hạn và số ngày còn lại.

| Trạng thái | Khi nào | NextDLP hoạt động |
|---|---|---|
| Còn hạn | Còn hơn 30 ngày tới ngày hết hạn. | Bình thường. |
| Sắp hết hạn | Còn 30 ngày trở xuống. | Bình thường. Banner vàng nhắc gia hạn. |
| Đã hết hạn | Đã qua ngày hết hạn, đang trong thời gian ân hạn. | Bình thường. Banner đỏ nhắc gia hạn. |
| Đã khóa | Đã hết thời gian ân hạn. | Agent ngừng phân loại, Console chỉ còn mục Giấy phép. |

Ân hạn là khoảng thời gian sau ngày hết hạn mà NextDLP vẫn hoạt động đầy đủ, để tổ chức kịp hoàn tất thủ tục gia hạn. Giấy phép chính thức thường có 30 ngày ân hạn, tùy hợp đồng. Giấy phép dùng thử không có ân hạn và chuyển sang Đã khóa ngay khi hết hạn.

## Khi giấy phép bị khóa

Khi hết ân hạn, NextDLP dừng cho tới khi có giấy phép mới. Agent trên các máy trạm vẫn chạy và vẫn liên lạc với server nhưng ngừng phân loại. Các tệp mới hoặc vừa sửa được ghi lại để phân loại sau. Trên Console, mọi trang chỉ còn màn hình Giấy phép để bạn kích hoạt file mới. Dữ liệu, cấu hình và lịch sử phân loại được giữ nguyên.

![Giấy phép đã khóa](/img/console/system-license-locked.png)

## Gia hạn và nâng gói

Gia hạn, nâng số máy hay chuyển từ dùng thử sang chính thức đều làm cùng một cách: nhận file `.lic` mới rồi kích hoạt như các bước ở đầu trang. Giấy phép mới có hiệu lực ngay, kể cả khi giấy phép đang bị khóa. Các máy đã cài giữ nguyên, và agent phân loại tiếp các tệp đang chờ trong khoảng nửa phút sau khi kích hoạt.
