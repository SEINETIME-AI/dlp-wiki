---
sidebar_position: 2.5
title: Luồng dữ liệu & bảo mật
description: Agent gửi gì về server, qua cổng nào, và phần nào của kết nối chưa được mã hóa.
---

import {DataFlowDiagram} from '@site/src/components/DataFlowDiagram';

Trước khi cho cài agent, bộ phận an toàn thông tin thường hỏi ba điều: agent gửi gì về server, đi qua cổng nào, và dữ liệu có rời khỏi mạng nội bộ không.

Không. Mọi thành phần chạy trong mạng nội bộ của tổ chức, và NextDLP không cần internet để phân loại. Agent đọc và phân loại tệp ngay trên máy trạm, rồi gửi về server kết quả phân loại kèm bằng chứng khớp, tức là các từ khóa đã khớp và chữ đọc được trên con dấu. Nội dung tệp chỉ rời máy trạm trong hai trường hợp, và cả hai đều do chính sách phân loại bật: bản scan gửi lên gói GPU để đọc chữ, và vài đoạn văn bản ngắn gửi lên để đánh giá lại điều kiện ngữ nghĩa.

:::warning[Kết nối của agent không được mã hóa]

Agent trao đổi với server qua cổng 9091 và 9092 ở dạng rõ. Ai nghe được đoạn mạng giữa máy trạm và máy chủ đều đọc được kết quả phân loại, bản scan gửi lên gói GPU và khóa API của máy. Hãy mã hóa đoạn mạng này ở tầng mạng, ví dụ bằng IPsec, theo mục [Khuyến nghị bảo vệ kết nối](#khuyến-nghị-bảo-vệ-kết-nối).

:::

## Thành phần

<DataFlowDiagram />

| Thành phần | Chạy ở đâu | Vai trò |
|---|---|---|
| Agent NextDLP | Mỗi máy trạm Windows, dưới dạng dịch vụ `nextdlp` | Đọc và phân loại tệp ngay trên máy: trích xuất văn bản, OCR, dò dấu mộc, phân tích ngữ nghĩa. Ghi nhãn vào tệp và gửi kết quả về server. |
| Server NextDLP | Máy chủ nội bộ, các container Docker | Cung cấp API, lưu nhãn và sự kiện trong cơ sở dữ liệu, đồng bộ chính sách xuống agent, đóng gói bộ cài. |
| Console | Cùng máy chủ | Giao diện quản trị qua HTTPS. |
| Mô hình Gợi ý AI | Cùng máy chủ, chạy bằng CPU | Đề xuất điều kiện khi bạn soạn chính sách. Không tham gia phân loại tệp. |
| Gói GPU AssistOCR (tùy chọn) | Máy chủ có GPU, cài cùng server | Đọc ảnh và bản scan, đọc tài liệu mẫu cho Gợi ý AI, đánh giá lại điều kiện ngữ nghĩa. Xem [AssistOCR](../admin/system.md#assistocr). |

## Cổng kết nối

Agent luôn chủ động kết nối từ máy trạm tới server; server không mở kết nối vào máy trạm. Mỗi máy trạm xác thực với server bằng khóa API riêng, và mỗi lần tải bản scan dùng một đường dẫn ký sẵn cho đúng tệp đó.

| Cổng | Dùng cho | Chiều kết nối |
|---|---|---|
| 443 | Console và `/api` qua HTTPS | Trình duyệt → server |
| 80 | Chuyển hướng sang cổng 443 | Trình duyệt → server |
| 9090 | API cho hệ thống tích hợp | Hệ thống tích hợp → server |
| 9091 | Agent gửi kết quả và nhận chính sách | Máy trạm → server |
| 9092 | Agent tải bản scan lên kho tạm của gói GPU (chỉ khi cài gói GPU) | Máy trạm → server |
| 5432, 6379 và các cổng của gói GPU | Cơ sở dữ liệu, bộ nhớ đệm, gói GPU | Chỉ bên trong máy chủ, không mở ra mạng |

Cổng 443 và 9090 dùng TLS, với chứng chỉ do script cài đặt tạo trên máy chủ. Cổng 9091 và 9092 không có lớp mã hóa nào của NextDLP, nên mọi thứ kể ở hai mục [Dữ liệu nào rời máy trạm](#dữ-liệu-nào-rời-máy-trạm) và [Dữ liệu từ server xuống máy trạm](#dữ-liệu-từ-server-xuống-máy-trạm) đi trên mạng nội bộ ở dạng rõ. Khóa API chỉ giúp server nhận đúng máy; nó không chống được nghe lén.

## Khuyến nghị bảo vệ kết nối

Việc đầu tiên là mã hóa lưu lượng giữa máy trạm và máy chủ ở tầng mạng. Nếu tổ chức dùng Active Directory, cách gọn nhất là áp một chính sách IPsec qua Group Policy; agent không cần cấu hình gì thêm.

Tiếp theo là thu hẹp đường tới server. Đặt máy chủ NextDLP trong một vùng mạng riêng, ví dụ một VLAN dành cho máy chủ, tách khỏi mạng của người dùng và khách. Trên tường lửa của máy chủ, mở từng cổng cho đúng nguồn: 9091 và 9092 cho dải mạng của máy trạm, 443 cho máy dùng Console, 9090 cho hệ thống tích hợp. Trên switch, bật Dynamic ARP Inspection và port security để chống giả mạo trong mạng LAN.

Với thư mục chia sẻ SMB/NAS mà NextDLP quét, cấp một tài khoản riêng chỉ có quyền đọc. Khi máy bị thanh lý hoặc nghi lộ khóa API, dùng **Tạo lại khóa** hoặc **Thu hồi** tại [Máy trạm](../endpoints/machines.md).

## Dữ liệu nào rời máy trạm

| Dữ liệu | Gửi tới | Khi nào |
|---|---|---|
| Kết quả phân loại | Server, cổng 9091 | Mỗi lần một tệp được phân loại |
| Bằng chứng khớp | Server, cổng 9091 | Cùng kết quả phân loại |
| Trạng thái máy | Server, cổng 9091 | Mỗi chu kỳ báo trạng thái |
| Tệp ảnh, tệp PDF có trang scan | Kho tạm của gói GPU, cổng 9092 | Khi chính sách dùng chế độ OCR hybrid hoặc máy chủ |
| Đoạn văn bản của tài liệu | Server, chuyển tiếp tới gói GPU | Khi chính sách cho phép dùng gói GPU |

Kết quả phân loại gồm đường dẫn, tên và chủ sở hữu tệp, mức bảo mật, loại tài liệu, điều kiện đã khớp, mã băm SHA-256 của nội dung và mức phân tích. Server lưu chúng trong cơ sở dữ liệu và hiện giữ toàn bộ.

Bằng chứng khớp cho biết vì sao tệp có nhãn đó, nên nó mang theo mảnh nội dung. Nó gồm từ khóa đã khớp, tối đa 5 mẫu cho mỗi bộ khớp; giá trị khớp biểu thức chính quy được che, chỉ giữ vài ký tự đầu và cuối. Với con dấu, agent gửi chữ đọc được trên dấu, tối đa 300 ký tự mỗi dấu. Bằng chứng được lưu cùng kết quả phân loại.

Trạng thái máy gồm tên máy, địa chỉ IP, người đang đăng nhập, phiên bản agent và Windows, dung lượng RAM và trạng thái nguồn dữ liệu.

Bản scan là trường hợp duy nhất cả tệp rời máy trạm. Khi chính sách dùng chế độ OCR hybrid hoặc máy chủ và gói GPU đang chạy, toàn bộ tệp ảnh, hoặc tệp PDF có trang scan, được tải lên kho tạm của gói GPU; xem [Chế độ OCR](../classification/policies.md#chế-độ-ocr). Kho tạm tự xóa tệp sau 1 ngày. Server không lưu chữ đọc được mà trả về agent để phân loại.

Đoạn văn bản được gửi khi chính sách cho phép dùng gói GPU, và điểm ngữ nghĩa của tài liệu sát ngưỡng hoặc máy trạm không nạp được mô hình ngữ nghĩa. Mỗi tài liệu gửi tối đa 8 đoạn, mỗi đoạn 4.000 byte. Server chỉ chuyển tiếp, không lưu.

Ngoài hai trường hợp đó, nội dung tệp ở lại máy trạm. Toàn văn tài liệu Office và tệp văn bản không được gửi đi, chế độ OCR cục bộ không gửi nội dung của tệp nào, và tệp nằm ngoài [Nguồn dữ liệu](../data/sources.md) không được gửi đi. Nhật ký phân loại và các tệp xuất trên Console không bao giờ chứa toàn bộ nội dung tệp.

## Dữ liệu từ server xuống máy trạm

| Dữ liệu | Ghi chú |
|---|---|
| Chính sách phân loại, chính sách Agent, nguồn dữ liệu | Agent kiểm tra định kỳ và tải về khi có phiên bản mới. |
| Mật khẩu thư mục chia sẻ SMB/NAS | Được mã hóa trên server; trên máy trạm, agent lưu nó bằng cơ chế mã hóa DPAPI của Windows. |
| Nhãn do Quản trị hệ thống hoặc Quản lý đơn vị điều chỉnh | Agent ghi nhãn vào tệp; xem [Nhãn ghi trong tệp](../classification/file-labels.md). |

## Dữ liệu lưu trên máy trạm

Agent lưu dữ liệu của mình trong `C:\ProgramData\DlpExtension`, gồm cơ sở dữ liệu cục bộ (danh sách tệp, kết quả phân loại, sự kiện chờ gửi), nhật ký và các mô hình. Chỉ nhóm Administrators của máy được ghi vào thư mục này. Khóa API của máy được mã hóa bằng DPAPI của Windows. Khi mất kết nối, sự kiện chưa gửi được giữ trên máy trong số ngày **Offline cache** của [Chính sách Agent](../endpoints/agent-policy.md).

Ngoài ra, nhãn được ghi vào thuộc tính của tệp Office và PDF để đi cùng tệp; xem [Nhãn ghi trong tệp](../classification/file-labels.md).

## Mô hình AI

Mọi mô hình chạy trong hạ tầng của tổ chức, không học từ dữ liệu của bạn và không gửi nội dung tới dịch vụ AI bên ngoài. Xem [Chính sách mô hình](./specs.md#chính-sách-mô-hình).
