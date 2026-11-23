---
sidebar_position: 1
title: Giới thiệu NextDLP
description: NextDLP tự động phân loại và gắn nhãn tài liệu trên máy trạm dựa trên nội dung, rồi cung cấp nhãn đó cho hệ thống DLP mà tổ chức đang sử dụng.
---

Hệ thống DLP chặn được tệp gửi ra ngoài, nhưng chỉ chặn đúng khi biết tệp nào quan trọng. Phần lớn tài liệu lại không mang dấu hiệu nào để DLP nhận ra. Một bảng lương được scan thành PDF, có chữ ký và dấu đỏ của công ty, với nhiều hệ thống DLP chỉ là một tệp ảnh như mọi tệp ảnh khác, và có thể đi qua email mà không bị chặn.

NextDLP lấp chỗ trống đó. Agent cài trên máy trạm đọc nội dung của từng tài liệu, kể cả bản scan, rồi gắn hai tầng nhãn: **mức bảo mật** cho biết tài liệu nhạy cảm đến đâu, và **loại tài liệu** cho biết nó thuộc nghiệp vụ nào, như Tài chính, Nhân sự hay Pháp lý. Nhãn được lưu trên server NextDLP và ghi vào thuộc tính của tệp Office và PDF. Khi người dùng gửi hoặc sao chép tệp, hệ thống DLP của bạn đọc nhãn này để quyết định cho phép, cảnh báo hay chặn.

## Cách NextDLP phân loại

Một chính sách phân loại kết hợp được nhiều kỹ thuật: từ khóa, biểu thức chính quy, từ điển có trọng số, phân tích ngữ nghĩa bằng mô hình học máy và nhận diện dấu mộc. Mỗi loại tài liệu dùng kỹ thuật hợp với nó. Ví dụ, hợp đồng thường nhận ra qua từ khóa và mẫu số hiệu, còn công văn scan thì qua con dấu.

Với bản scan và ảnh chụp, agent đọc chữ bằng OCR và dò con dấu ngay trên máy trạm. Loại hồ sơ này phổ biến ở ngân hàng và cơ quan nhà nước, nơi giấy tờ được số hóa từ bản giấy.

Kết quả tập trung về trang Kiểm kê dữ liệu trên Console: từng tài liệu đã quét, nhãn hiện tại, máy và đơn vị đang giữ nó. Từ đó bạn xuất báo cáo ra CSV hoặc PDF.

Server, cơ sở dữ liệu và các mô hình đều chạy trong hạ tầng của tổ chức, và nội dung tài liệu không rời khỏi mạng nội bộ. Agent gửi gì về server và qua cổng nào được nêu ở [Luồng dữ liệu & bảo mật](./data-flow.md).

## Phạm vi sản phẩm

NextDLP không thay thế DLP. Việc thực thi như chặn email hay chặn sao chép USB vẫn do DLP hiện có đảm nhận, dựa trên nhãn mà NextDLP cung cấp. Báo cáo của NextDLP tập trung vào kiểm kê và nhãn phân loại, không bao gồm các sự kiện vi phạm do DLP ghi nhận.

![Trang Tổng quan của Console](/img/console/dashboard.png)

## Đọc tiếp

Nếu bạn mới bắt đầu, hãy đọc [Kiến trúc & khái niệm](./concepts.md) để nắm các thuật ngữ, sau đó làm theo [Cài đặt & kết nối](./install.md) và [Phân loại tài liệu đầu tiên](./quickstart.md). Các thành phần của hệ thống và sơ đồ kết nối giữa chúng có tại [Luồng dữ liệu & bảo mật](./data-flow.md#thành-phần).
