---
sidebar_position: 2.5
title: Luồng dữ liệu & bảo mật
description: Các thành phần của NextDLP chạy ở đâu, kết nối qua cổng nào, và dữ liệu nào rời khỏi máy trạm.
---

import {DataFlowDiagram} from '@site/src/components/DataFlowDiagram';

Trang này dành cho bộ phận an toàn thông tin khi đánh giá NextDLP. Trang trả lời ba câu hỏi: các thành phần chạy ở đâu, chúng kết nối với nhau qua cổng nào, và dữ liệu nào rời khỏi máy trạm.

Mọi thành phần đều chạy trong mạng nội bộ của tổ chức. NextDLP không gửi dữ liệu ra internet và không cần internet để phân loại.

## Thành phần

<DataFlowDiagram />

| Thành phần | Chạy ở đâu | Vai trò |
|---|---|---|
| Agent NextDLP | Mỗi máy trạm Windows, dưới dạng dịch vụ `nextdlp` | Đọc và phân loại tệp ngay trên máy: trích xuất văn bản, OCR, dò dấu mộc, phân tích ngữ nghĩa. Ghi nhãn vào tệp và gửi kết quả về server. |
| Server NextDLP | Máy chủ nội bộ, các container Docker | Cung cấp API, lưu nhãn và sự kiện trong PostgreSQL, đồng bộ chính sách xuống agent, đóng gói bộ cài. |
| Console | Cùng máy chủ | Giao diện quản trị qua HTTPS. |
| Mô hình Gợi ý AI | Cùng máy chủ, chạy bằng CPU | Đề xuất điều kiện khi quản trị viên soạn chính sách. Không tham gia phân loại tệp. |
| Gói GPU AssistOCR (tuỳ chọn) | Máy chủ có GPU, cài cùng server | Đọc ảnh và bản scan, đọc tài liệu mẫu cho Gợi ý AI, chấm lại luật ngữ nghĩa. Xem [AssistOCR](../admin/system.md#assistocr). |

## Cổng và mã hoá

Agent luôn chủ động kết nối từ máy trạm tới server; server không mở kết nối vào máy trạm.

| Cổng | Dùng cho | Chiều kết nối | Mã hoá |
|---|---|---|---|
| 443 | Console và `/api` | Trình duyệt → server | HTTPS, TLS 1.2 hoặc 1.3 |
| 80 | Chuyển hướng sang cổng 443 | Trình duyệt → server | Không có dữ liệu |
| 9090 | API cho hệ thống tích hợp | Hệ thống tích hợp → server | HTTPS |
| 9091 | Agent gửi kết quả và nhận chính sách | Máy trạm → server | Chưa mã hoá TLS |
| 9092 | Agent tải bản scan lên kho tạm của gói GPU | Máy trạm → server | Chưa mã hoá TLS |
| 5432, 6379 và các cổng của gói GPU | Cơ sở dữ liệu, bộ nhớ đệm, gói GPU | Chỉ bên trong máy chủ | Không mở ra mạng |

:::warning[Kênh của agent chưa mã hoá TLS]

Cổng 9091 và 9092 hiện chạy không mã hoá TLS. Mỗi máy trạm xác thực với server bằng khoá API riêng, và mỗi lần tải bản scan dùng một đường dẫn ký sẵn cho đúng tệp đó. Hãy chỉ cho phép hai cổng này từ dải mạng của máy trạm, bằng tường lửa của máy chủ hoặc VLAN.

:::

## Dữ liệu nào rời máy trạm

| Dữ liệu | Gửi tới | Khi nào | Lưu ở đâu |
|---|---|---|---|
| Kết quả phân loại: đường dẫn, tên và chủ sở hữu tệp, mức bảo mật, loại tài liệu, điều kiện đã khớp, mã băm SHA-256 của nội dung, mức phân tích | Server, cổng 9091 | Mỗi lần một tệp được phân loại | Cơ sở dữ liệu của server; hiện được giữ toàn bộ |
| Bằng chứng khớp: từ khoá đã khớp; giá trị khớp biểu thức chính quy được che, chỉ giữ vài ký tự đầu và cuối; tối đa 5 mẫu cho mỗi bộ khớp. Chữ đọc được trên con dấu, tối đa 300 ký tự mỗi dấu | Server, cổng 9091 | Cùng kết quả phân loại | Cơ sở dữ liệu của server |
| Trạng thái máy: tên máy, địa chỉ IP, người đang đăng nhập, phiên bản agent và Windows, dung lượng RAM, trạng thái nguồn dữ liệu | Server, cổng 9091 | Mỗi chu kỳ báo trạng thái | Cơ sở dữ liệu của server |
| Toàn bộ tệp ảnh, hoặc tệp PDF có trang scan | Kho tạm của gói GPU, cổng 9092 | Chỉ khi chính sách dùng chế độ OCR hybrid hoặc máy chủ và gói GPU đang chạy; xem [Chế độ OCR](../classification/policies.md#chế-độ-ocr) | Kho tạm tự xoá tệp sau 1 ngày. Server không lưu chữ đọc được; chữ được trả về agent để phân loại |
| Tối đa 8 đoạn văn bản, mỗi đoạn 4.000 byte, của một tài liệu | Server, chuyển tiếp tới gói GPU | Chỉ khi chính sách cho phép dùng gói GPU, và điểm ngữ nghĩa sát ngưỡng hoặc máy trạm không nạp được mô hình ngữ nghĩa | Không lưu; server chỉ chuyển tiếp |

Những gì **không** rời máy trạm:

- toàn văn tài liệu Office và tệp văn bản, ngoài các đoạn ở dòng cuối của bảng trên;
- mọi nội dung tệp khi chính sách dùng chế độ OCR cục bộ;
- các tệp nằm ngoài [Nguồn dữ liệu](../data/sources.md).

Nhật ký phân loại và các tệp xuất trên Console không bao giờ chứa toàn bộ nội dung tệp.

## Dữ liệu từ server xuống máy trạm

| Dữ liệu | Ghi chú |
|---|---|
| Chính sách phân loại, chính sách Agent, nguồn dữ liệu | Agent kiểm tra định kỳ và tải về khi có phiên bản mới. |
| Mật khẩu thư mục chia sẻ SMB/NAS | Được mã hoá trên server; trên máy trạm, agent lưu nó bằng cơ chế mã hoá DPAPI của Windows. |
| Nhãn do Quản trị viên hoặc Quản lý điều chỉnh | Agent ghi nhãn vào tệp; xem [Nhãn ghi trong tệp](../classification/file-labels.md). |

## Dữ liệu lưu trên máy trạm

Agent lưu dữ liệu của mình trong `C:\ProgramData\DlpExtension`, gồm cơ sở dữ liệu cục bộ (danh sách tệp, kết quả phân loại, sự kiện chờ gửi), nhật ký và các mô hình. Chỉ nhóm Administrators của máy được ghi vào thư mục này. Khoá API của máy được mã hoá bằng DPAPI của Windows. Khi mất kết nối, sự kiện chưa gửi được giữ trên máy trong số ngày **Offline cache** của [Chính sách Agent](../endpoints/agent-policy.md).

Ngoài ra, nhãn được ghi vào thuộc tính của tệp Office và PDF để đi cùng tệp; xem [Nhãn ghi trong tệp](../classification/file-labels.md).

## Mô hình AI

Mọi mô hình chạy trong hạ tầng của tổ chức, không học từ dữ liệu của bạn và không gửi nội dung tới dịch vụ AI bên ngoài. Xem [Chính sách mô hình](./specs.md#chính-sách-mô-hình).
