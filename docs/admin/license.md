---
sidebar_position: 3
title: Giấy phép
description: Kích hoạt, theo dõi và gia hạn giấy phép NextDLP, cùng những gì xảy ra khi giấy phép sắp hết hạn hoặc đã hết hạn.
---

Giấy phép (license) cho biết tổ chức của bạn được dùng NextDLP trên bao nhiêu máy trạm và tới ngày nào. Seinetime gửi giấy phép dưới dạng một file `.lic`. Quản trị hệ thống tải file này lên Console để kích hoạt, giống cách nhập key cho phần mềm diệt virus bản doanh nghiệp.

File giấy phép được Seinetime ký số. Nội dung file không đọc được bằng trình soạn thảo, và một file đã bị sửa dù chỉ một ký tự sẽ bị Console từ chối. NextDLP luôn kích hoạt bằng file, không cần kết nối internet, nên dùng được cả trong mạng kín.

## Xem giấy phép

Mở **Báo cáo & quản trị › Hệ thống › Giấy phép & phiên bản**. Chỉ Quản trị hệ thống truy cập được mục này.

| Thông tin | Ý nghĩa |
|---|---|
| Trạng thái | Tình trạng hiện tại của giấy phép, xem bảng ở mục dưới. |
| Khách hàng | Tên và mã tổ chức ghi trong giấy phép. |
| Loại giấy phép | **Chính thức** hoặc **Dùng thử**. |
| Số máy | Số máy đang dùng trên số máy tối đa, ví dụ `312 / 500 máy`. |
| Hết hạn | Ngày cuối cùng giấy phép còn hiệu lực, hoặc **Vĩnh viễn**. |
| Còn lại | Số ngày tới khi hết hạn. |
| Hết ân hạn | Thời điểm kết thúc ân hạn, nếu giấy phép có ân hạn. |
| Phiên bản console, Phiên bản agent đang chạy | Phiên bản server và số máy theo từng phiên bản agent. |

Bên dưới là **Lịch sử kích hoạt**, ghi lại mỗi lần kích hoạt: thời điểm, người thực hiện, khách hàng, loại giấy phép, số máy và ngày hết hạn.

## Kích hoạt giấy phép

### Bước 1. Nhận file từ Seinetime

Seinetime gửi file `.lic` qua email hoặc kênh hỗ trợ. Hãy lưu file ở nơi an toàn, vì đây là bằng chứng quyền sử dụng của tổ chức.

### Bước 2. Tải file lên Console

Tại mục **Giấy phép & phiên bản**, bấm **Kích hoạt license** rồi chọn file `.lic`. Giấy phép mới có hiệu lực ngay, không cần khởi động lại server.

### Bước 3. Kiểm tra kết quả

Console hiện thông báo **Đã kích hoạt license**. Kiểm tra lại tên khách hàng, số máy và ngày hết hạn có khớp với hợp đồng hay không.

Nếu file không hợp lệ, Console giữ nguyên giấy phép đang dùng và cho biết lý do.

| Thông báo | Nguyên nhân | Cách xử lý |
|---|---|---|
| File không phải license hợp lệ hoặc đã bị sửa. | File bị hỏng khi gửi, bị mở và lưu lại bằng trình soạn thảo, hoặc không phải file do Seinetime phát hành. | Tải lại file gốc từ email. Nếu vẫn lỗi, liên hệ Seinetime. |
| File license này đã hết hạn. | Ngày hết hạn trong file đã qua. | Liên hệ Seinetime để nhận file mới. |
| File này cũ hơn license đang dùng nên không được kích hoạt. | File được phát hành trước giấy phép đang dùng, ví dụ file của kỳ trước. | Dùng file mới nhất Seinetime đã gửi. |

## Trạng thái giấy phép

| Trạng thái | Khi nào | Ảnh hưởng |
|---|---|---|
| Chưa kích hoạt | Server mới cài, chưa có giấy phép. | Đăng nhập và cấu hình bình thường, nhưng chưa cài được agent lên máy nào. |
| Chuyển tiếp | Hệ thống đã dùng NextDLP từ trước khi có giấy phép, vừa nâng cấp lên bản mới và chưa kích hoạt. | Dùng bình thường, không giới hạn số máy, trong 30 ngày. |
| Còn hạn | Còn hơn 30 ngày tới ngày hết hạn. | Dùng bình thường trong giới hạn số máy. |
| Sắp hết hạn | Còn 30 ngày trở xuống. | Dùng bình thường. Console nhắc gia hạn. |
| Đã hết hạn (ân hạn) | Đã qua ngày hết hạn, còn trong thời gian ân hạn (thường là 14 ngày). | Dùng bình thường. Console hiện cảnh báo đỏ. |
| Đã khóa | Hết ân hạn, hoặc hết 30 ngày chuyển tiếp mà chưa kích hoạt. | Vẫn bảo vệ, ngừng thay đổi. Xem mục dưới. |

Khi giấy phép chưa kích hoạt, sắp hết hạn, đã hết hạn hoặc đang chuyển tiếp, Quản trị hệ thống thấy một banner ở đầu mọi trang. Bấm **Xem giấy phép** trên banner để mở mục Giấy phép & phiên bản.

## Khi giấy phép bị khóa

NextDLP là phần mềm bảo vệ dữ liệu, nên không bao giờ tự tắt khi giấy phép hết hạn. Các agent đã cài tiếp tục phân loại và gắn nhãn theo chính sách hiện có. Bạn vẫn xem được Tổng quan, Báo cáo, Nhật ký phân loại và Kiểm kê dữ liệu.

Những thay đổi cấu hình thì bị chặn cho tới khi gia hạn: tạo hoặc sửa chính sách phân loại, chính sách Agent, quy tắc nhận diện, mẫu regex và nguồn dữ liệu; kích hoạt một chính sách; tạo hoặc tạo lại bộ cài Agent; thêm máy mới. Vì không tạo được bộ cài mới, agent cũng không được nâng cấp lên phiên bản mới.

Một số thao tác vẫn được phép để bạn dọn dẹp hệ thống: xóa, thu hồi máy, thu hồi bộ cài, tắt một chính sách, quản lý người dùng, cơ cấu tổ chức và cài đặt hệ thống. Kích hoạt giấy phép mới luôn được phép.

Khi một thao tác bị chặn, Console báo *"License đã hết hạn nên không thể thực hiện thay đổi này"*.

## Cách đếm số máy

Mỗi máy trạm đã cài agent chiếm một chỗ trong giấy phép. Máy tắt lâu ngày hoặc đang **Mất kết nối** vẫn được tính, cho tới khi được thu hồi. Cài lại agent trên cùng một máy không tính thêm chỗ.

Khi đã dùng hết số máy, máy mới cài agent sẽ không kết nối được về server, và Console báo *"Đã dùng hết số máy trong license"*. Để lấy lại chỗ, hãy **Thu hồi** những máy đã thanh lý hoặc đã gỡ agent tại trang [Máy trạm](../endpoints/machines.md). Nếu cần thêm máy, hãy liên hệ Seinetime để nâng gói.

## Gia hạn và nâng gói

Gia hạn, nâng số máy hay chuyển từ dùng thử sang chính thức đều làm cùng một cách: Seinetime gửi file `.lic` mới, bạn kích hoạt như ở mục trên. Giấy phép mới thay giấy phép cũ ngay lập tức và trạng thái trở về **Còn hạn**. Các máy đã cài giữ nguyên, không cần cài lại agent.

## Dùng thử

Để dùng thử NextDLP, hãy liên hệ bộ phận kinh doanh của Seinetime. Giấy phép dùng thử cho phép 10 máy trong 30 ngày và không có ân hạn: hết 30 ngày, hệ thống chuyển sang **Đã khóa** ngay. Khi mua bản chính thức, chỉ cần kích hoạt giấy phép mới; dữ liệu và các máy đã cài trong thời gian dùng thử được giữ nguyên.

## Đọc tiếp

Các cấu hình khác của nền tảng có tại [Hệ thống](./system.md). Để thu hồi máy và trả lại chỗ trong giấy phép, xem [Máy trạm](../endpoints/machines.md). Khi nâng cấp từ bản chưa có giấy phép, xem [Nâng cấp & gỡ cài đặt](../operations/upgrade-uninstall.md).
