---
sidebar_position: 4
title: Nhật ký phân loại
description: Nhật ký phân loại ghi lại mọi sự kiện phân loại tệp từ máy trạm, kèm giải thích vì sao một tệp được gắn nhãn như vậy.
---

Khi người dùng hỏi "vì sao tệp này bị gắn nhãn Mật?", câu trả lời nằm trong Nhật ký phân loại. Nhật ký ghi lại từng lần agent phân loại, phát hiện thay đổi hoặc gắn lại nhãn cho một tệp, và nằm tại **Giám sát › Nhật ký phân loại**.

## Loại sự kiện

| Loại sự kiện | Ý nghĩa |
|---|---|
| Phân loại | Tệp được gắn nhãn lần đầu, hoặc được gắn lại do nội dung hay chính sách thay đổi. |
| Xóa/di chuyển | Tệp bị xóa hoặc di chuyển ra khỏi nguồn dữ liệu. |
| Can thiệp nhãn | Agent phát hiện nhãn ghi trong tệp bị thay đổi bằng tay. |
| Gắn lại nhãn | Agent khôi phục nhãn đúng sau khi phát hiện can thiệp. |

Sự kiện **Gỡ agent bị từ chối** và **Agent dừng bất thường** gắn với máy chứ không với tệp, nên nằm trên trang [Máy trạm](../endpoints/machines.md#chi-tiết-máy).

Bạn có thể lọc theo khoảng thời gian, máy, đơn vị và nhãn. Khi có tệp mới được phân loại, Console hiện thông báo nhỏ ở góc màn hình. Bấm vào thông báo để mở sự kiện.

![Trang Nhật ký phân loại](/img/console/events.png)

## Đọc giải thích của một sự kiện

Bấm vào một sự kiện để mở **Chi tiết sự kiện**. Phần đầu cho biết thông tin máy trạm, đường dẫn, chủ sở hữu tệp và nhãn cuối cùng. Phần giải thích chia theo từng khía cạnh: các quy tắc bảo mật đã chạy và quy tắc nào khớp, quyết định mức bảo mật cuối cùng, loại tài liệu, điểm phân tích ngữ nghĩa, kết quả nhận diện dấu mộc (độ tin cậy, chữ đọc được trên dấu, và tên tìm thấy trên dấu hay quanh dấu nếu điều kiện có nêu tên trên dấu), lý do không đọc được nội dung nếu có, và phiên bản chính sách mà agent đã dùng.

![Chi tiết sự kiện và phần giải thích](/img/console/events-detail.png)

Nếu agent chưa đọc hết nội dung của tệp, phần giải thích mở đầu bằng cảnh báo **Tài liệu chưa được phân tích đầy đủ** kèm lý do, hoặc **Chỉ kiểm tra thông tin của tệp, chưa đọc nội dung** khi agent không mở nội dung. Nhãn của những tệp này chỉ dựa trên phần đã đọc. Cách xử lý có ở [Tệp lớn & mức phân tích](../data/large-files.md).

Với tệp nén như zip hay rar, phần giải thích liệt kê riêng từng tệp bên trong cùng nhãn và lý do của nó, tệp mật nhất đứng đầu, và cho biết mức của tệp nén được lấy từ tệp nào. Các tệp không đọc được, ví dụ có mật khẩu, được liệt kê theo tên cùng lý do. Ảnh và PDF scan nằm trong tệp nén không được OCR, nên xuất hiện ở đây với lý do "Ảnh hoặc định dạng không đọc được". Xem [Xem từng tệp bên trong tệp nén](../data/large-files.md#xem-từng-tệp-bên-trong-tệp-nén).

Nếu bạn đặt **Tên điều kiện** khi soạn chính sách, tên đó hiển thị ở đây thay cho mã quy tắc.

Khi nhiều tệp có cùng nội dung, agent dùng lại kết quả phân loại trước đó. Sự kiện của các tệp đó hiển thị sẵn lý do của tệp gốc, kèm tên của tệp gốc có cùng nội dung.

## Xuất nhật ký

Bấm **Xuất CSV** hoặc **Xuất PDF** để tải nhật ký trong khoảng thời gian đã lọc. Mỗi dòng gồm thời gian, máy, IP, đơn vị, chủ sở hữu tệp, đường dẫn, nhãn, quy tắc đã khớp và đoạn nội dung khớp đã được che bớt. Nhật ký xuất ra không kèm nội dung đầy đủ của tệp.

:::info[Nhật ký không thể sửa]

Sự kiện đã ghi vào Nhật ký phân loại không sửa được, và nhật ký chỉ được ghi thêm, để bảo đảm giá trị kiểm toán. Để điều chỉnh nhãn của một tài liệu, hãy dùng [Kiểm kê dữ liệu & đổi nhãn](../data/inventory.md).

:::

## Kiểm toán hoạt động gắn nhãn

Mỗi lần nhãn của một tài liệu được gắn hoặc thay đổi đều để lại dấu vết, nhưng không ở cùng một chỗ. Bảng sau cho biết tra ở đâu khi cần trả lời "nhãn của tài liệu này do đâu mà có, đổi khi nào và vì sao".

| Hoạt động | Nơi tra cứu | Ghi nhận |
|---|---|---|
| Agent tự gắn nhãn | Nhật ký phân loại, sự kiện **Phân loại** | Thời gian, máy, đường dẫn, nhãn, điều kiện đã khớp và phiên bản chính sách. |
| Nhãn trong tệp bị sửa tay | Nhật ký phân loại, sự kiện **Can thiệp nhãn** và **Gắn lại nhãn** | Máy, đường dẫn và nhãn agent đã khôi phục. Xem [Nhãn ghi trong tệp](./file-labels.md#bảo-vệ-nhãn-khỏi-sửa-tay). |
| Người dùng máy trạm đề nghị đổi nhãn | **Kiểm kê dữ liệu › Yêu cầu đổi nhãn** | Người gửi, nhãn hiện tại, nhãn đề xuất, lý do và trạng thái Chờ duyệt, Đã duyệt hoặc Từ chối. |
| Quản trị hệ thống hoặc Quản lý đơn vị đổi nhãn trực tiếp | **Kiểm kê dữ liệu**, trạng thái **Admin ghi đè** | Những tài liệu đang mang nhãn được điều chỉnh bằng tay. |
| Nhãn bị hạ mức bảo mật khi phân loại lại hoặc khi rà soát | **Báo cáo › Xuất CSV hạ cấp nhãn** | Mức cũ, mức mới, thời điểm, nguồn thay đổi và lý do. |

Server hiện giữ toàn bộ sự kiện phân loại và chưa tự xóa sự kiện cũ. Để lưu hồ sơ kiểm toán ngoài hệ thống, hãy xuất nhật ký định kỳ bằng **Xuất CSV** hoặc **Xuất PDF**.

Dấu vết kiểm toán hiện có hai giới hạn. Khi nhãn được đổi trực tiếp tại Kiểm kê dữ liệu, Console chưa ghi lại tài khoản nào đã đổi, và lần đổi đó chưa có trong **Xuất CSV hạ cấp nhãn**. Console cũng chưa có nhật ký riêng cho thao tác quản trị, như sửa chính sách hay quản lý tài khoản. Với chính sách, mỗi sự kiện phân loại ghi phiên bản chính sách mà agent đã dùng, nên bạn biết nhãn được quyết định theo bản nào.
