---
sidebar_position: 5
title: Nhãn ghi trong tệp
description: Agent ghi mức bảo mật và loại tài liệu vào thuộc tính của tệp Office và PDF, để nhãn đi cùng tệp khi sao chép, đổi tên, di chuyển hay gửi đi.
---

Sau khi phân loại, agent ghi nhãn vào chính tệp tài liệu, bên cạnh việc gửi kết quả về server. Nhờ vậy nhãn đi cùng tệp tới bất cứ đâu, và hệ thống DLP đọc được nhãn ngay trên máy mà không cần kết nối tới server NextDLP.

## Định dạng được ghi nhãn

| Định dạng | Nơi ghi nhãn |
|---|---|
| Word, Excel, PowerPoint (`.docx`, `.xlsx`, `.pptx`) | Thuộc tính tuỳ chỉnh (Custom properties) của tài liệu. |
| PDF (`.pdf`) | Thuộc tính tài liệu của tệp PDF. |

Các định dạng khác, như Office đời cũ (`.doc`, `.xls`, `.ppt`), ảnh, tệp văn bản và tệp nén, không có chỗ ghi nhãn. Nhãn của chúng chỉ nằm trên server và hiển thị tại [Kiểm kê dữ liệu](../data/inventory.md).

## Các thuộc tính

| Thuộc tính | Nội dung |
|---|---|
| `NextDLP_Secrecy` | Mã mức bảo mật, ví dụ `secret`. |
| `NextDLP_Domains` | Mã các loại tài liệu, gồm cả loại cha, cách nhau bằng dấu phẩy. |
| `NextDLP_ClassifiedAt` | Thời điểm phân loại, theo giờ UTC. |

Mã nhãn là mã bạn đặt trong [Mức bảo mật & loại tài liệu](./taxonomy.md). Tệp không có `NextDLP_Secrecy` là tệp **chưa gắn nhãn**, không phải tệp công khai.

## Xem nhãn trong tệp

Với Word, Excel và PowerPoint, mở tệp, chọn **File › Info › Properties › Advanced Properties**, rồi mở tab **Custom**. Với PDF, mở tệp bằng Adobe Acrobat hoặc Acrobat Reader, chọn **File › Properties**, rồi mở tab **Custom**.

{/* TODO screenshot: tab Custom trong Advanced Properties của Word với ba thuộc tính NextDLP_* */}

Người dùng không cần làm gì với các thuộc tính này. Nếu thấy nhãn chưa đúng, hãy gửi **Yêu cầu đổi nhãn** trong [Kiểm kê dữ liệu & đổi nhãn](../data/inventory.md) thay vì sửa tay.

## Nhãn đi cùng tệp

Vì nhãn nằm trong tệp, nhãn được giữ nguyên khi tệp được:

- sao chép sang thư mục khác, sang USB hoặc thư mục chia sẻ;
- đổi tên hoặc di chuyển;
- đính kèm vào email hoặc tải lên dịch vụ lưu trữ.

NextDLP không ghi nhãn vào bản thân email. Hệ thống DLP đọc nhãn từ thuộc tính của tệp đính kèm.

Một bản sao nằm trong [Nguồn dữ liệu](../data/sources.md) được agent phân loại như một tệp mới; nếu nội dung giống hệt tệp đã phân loại, agent dùng lại kết quả cũ.

:::warning[Nhãn điều chỉnh bằng tay chưa được giữ cố định]

Nhãn do Quản trị viên hoặc Quản lý điều chỉnh bằng tay được ghi vào tệp như mọi nhãn khác. Khi nội dung tệp thay đổi, hoặc khi điều kiện của chính sách phân loại thay đổi, agent phân loại lại tệp theo chính sách và nhãn đã điều chỉnh có thể bị thay. Hãy kiểm tra lại các tài liệu ở trạng thái **Admin ghi đè** sau khi sửa chính sách.

:::

## Khi nhãn thay đổi

Khi chính sách thay đổi hoặc nhãn được điều chỉnh trên Console, agent cập nhật lại các thuộc tính trong tệp. Lần ghi nhãn giữ nguyên chủ sở hữu, quyền truy cập và ngày tạo của tệp; ngày sửa đổi được cập nhật vì nội dung tệp thay đổi.

Nếu tệp đang được một ứng dụng khác mở để sửa, agent bỏ qua lần ghi đó. Nhãn trong tệp được cập nhật ở lần tệp được phân loại lại, ví dụ sau khi người dùng lưu và đóng tệp.

## Khi tệp không được ghi nhãn

Agent không ghi nhãn vào những tệp sau, kể cả khi chúng thuộc định dạng hỗ trợ:

| Trường hợp | Lý do |
|---|---|
| Tệp đặt mật khẩu hoặc mã hoá | Agent không mở được tệp. |
| Tệp có chữ ký số | Ghi thêm thuộc tính sẽ làm mất hiệu lực chữ ký. |
| Tệp hỏng | Agent không đọc được cấu trúc tệp. |

Nhãn của các tệp này vẫn được lưu trên server và hiển thị trong Kiểm kê dữ liệu.

## Bảo vệ nhãn khỏi sửa tay

Thuộc tính trong tệp không được ký số, nên người có quyền sửa tệp có thể sửa hoặc xoá chúng. Với tệp nằm trong nguồn dữ liệu, agent so nhãn trong tệp với nhãn đã phân loại. Khi phát hiện khác biệt, agent ghi lại nhãn đúng vào tệp và ghi hai sự kiện **Can thiệp nhãn** và **Gắn lại nhãn** vào [Nhật ký phân loại](./events.md). Tệp đã ra khỏi nguồn dữ liệu, ví dụ đã chép sang USB, không còn được agent theo dõi.
