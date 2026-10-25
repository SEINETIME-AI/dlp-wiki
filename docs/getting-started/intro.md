---
sidebar_position: 1
title: Giới thiệu NextDLP
description: NextDLP tự động phân loại và gắn nhãn tài liệu trên máy trạm dựa trên nội dung và ngữ cảnh nghiệp vụ, rồi cung cấp nhãn đó cho hệ thống DLP mà tổ chức đang sử dụng.
---

NextDLP tự động phân loại và gắn nhãn tài liệu trên máy trạm dựa trên nội dung và ngữ cảnh nghiệp vụ, rồi cung cấp nhãn đó cho hệ thống DLP mà tổ chức đang sử dụng.

## NextDLP làm gì

Phần lớn sự cố rò rỉ dữ liệu không đến từ việc thiếu công cụ chặn, mà từ việc công cụ chặn không biết tài liệu nào thực sự quan trọng. NextDLP giải quyết đúng chỗ đó. Agent cài trên máy trạm đọc nội dung của từng tài liệu, kể cả bản scan, rồi gắn hai tầng nhãn: **mức bảo mật** cho biết tài liệu nhạy cảm đến đâu, và **loại tài liệu** cho biết tài liệu thuộc nghiệp vụ nào như Tài chính, Nhân sự hay Pháp lý.

Nhãn được lưu trên server NextDLP và ghi thẳng vào thuộc tính của file. Khi người dùng gửi hoặc sao chép file, hệ thống DLP của bạn dựa vào nhãn này để quyết định cho phép, cảnh báo hay chặn.

## Điểm khác biệt

**Phân loại theo nội dung thật.** NextDLP kết hợp nhiều kỹ thuật trong cùng một chính sách: từ khoá, biểu thức chính quy, từ điển có trọng số, phân tích ngữ nghĩa bằng mô hình học máy và nhận diện dấu mộc. Bạn chọn kỹ thuật phù hợp với từng loại tài liệu thay vì phải viết một quy tắc khổng lồ.

**Đọc được tài liệu scan.** OCR và nhận diện con dấu chạy ngay trên máy trạm, phù hợp với hồ sơ giấy đã số hoá của ngân hàng và cơ quan nhà nước.

**Biết dữ liệu nhạy cảm đang nằm ở đâu.** Trang Kiểm kê dữ liệu cho biết từng tài liệu đã quét, nhãn hiện tại, máy và đơn vị chứa nó, kèm báo cáo xuất CSV và PDF.

**Chạy hoàn toàn trong hạ tầng của bạn.** Server, cơ sở dữ liệu và các mô hình đều chạy on-premises. Nội dung tài liệu không rời khỏi mạng nội bộ.

## Phạm vi sản phẩm

NextDLP không thay thế DLP. Việc thực thi như chặn email hay chặn sao chép USB vẫn do DLP hiện có đảm nhận, dựa trên nhãn mà NextDLP cung cấp. Báo cáo của NextDLP tập trung vào kiểm kê và nhãn phân loại, không bao gồm các sự kiện vi phạm do DLP ghi nhận.

![Trang Tổng quan của Console](/img/console/dashboard.png)

## Thành phần hệ thống

| Thành phần | Vai trò |
|---|---|
| Console | Giao diện web để quản trị cơ cấu tổ chức, chính sách, máy trạm, kiểm kê và báo cáo. |
| Server | Cung cấp API, lưu nhãn, đóng gói bộ cài và đồng bộ chính sách xuống agent. Chạy bằng Docker. |
| Agent Windows | Theo dõi thư mục, trích xuất nội dung, áp dụng chính sách phân loại, ghi nhãn vào file và gửi kết quả về server. |
| AssistOCR (tùy chọn) | Dịch vụ OCR tự host, hỗ trợ ảnh và bản scan khó đọc. |

## Đọc tiếp

Nếu bạn mới bắt đầu, hãy đọc [Kiến trúc & khái niệm](./concepts.md) để nắm các thuật ngữ, sau đó làm theo [Cài đặt & kết nối](./install.md) và [Phân loại tài liệu đầu tiên](./quickstart.md).
