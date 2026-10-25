---
sidebar_position: 2
title: Kiến trúc & khái niệm
description: Tổng quan luồng dữ liệu từ máy trạm đến DLP và các thuật ngữ được dùng xuyên suốt tài liệu.
---

Trang này mô tả một tài liệu đi qua NextDLP như thế nào, từ lúc được lưu trên máy trạm cho đến khi DLP dùng nhãn của nó, và giải thích các thuật ngữ bạn sẽ gặp trong Console.

## Luồng hoạt động

### 1. Phát hiện

Agent theo dõi liên tục các thư mục được khai báo trong **Nguồn dữ liệu**. Khi có file mới hoặc file vừa thay đổi, agent tự đưa file vào hàng đợi phân loại. Bạn không cần đặt lịch quét.

### 2. Trích xuất và phân loại

Agent đọc nội dung file, chạy OCR với ảnh và bản scan, rồi áp dụng các điều kiện trong **Chính sách phân loại** của đơn vị. Kết quả là một mức bảo mật và một hoặc nhiều loại tài liệu.

### 3. Ghi nhãn và báo cáo

Agent ghi nhãn vào thuộc tính của file (với tài liệu Office và PDF), đồng thời gửi kết quả về server. Kết quả hiển thị tại **Kiểm kê dữ liệu** và **Nhật ký phân loại**, kèm giải thích vì sao file được gắn nhãn như vậy.

### 4. Thực thi

Khi file được gửi hoặc sao chép, DLP của tổ chức tra cứu nhãn từ server NextDLP và áp dụng hành động tương ứng. Xem [Kết nối DLP](../integrations/dlp.md).

## Mô hình hai tầng nhãn

Mỗi tài liệu có hai loại nhãn độc lập với nhau. **Mức bảo mật** trả lời câu hỏi "tài liệu này nhạy cảm đến đâu", và mỗi tài liệu chỉ có một mức. **Loại tài liệu** trả lời câu hỏi "tài liệu này thuộc nghiệp vụ nào", và một tài liệu có thể thuộc nhiều loại cùng lúc, ví dụ vừa là Hợp đồng vừa là Nhân sự.

Khi một file khớp nhiều điều kiện, agent chọn **mức bảo mật cao nhất** trong số các điều kiện đã khớp, và gộp **tất cả loại tài liệu** đã khớp. Nếu không có điều kiện nào về mức bảo mật khớp, tài liệu ở trạng thái **Chưa gắn nhãn** thay vì bị mặc định là công khai.

## Thuật ngữ

| Thuật ngữ | Ý nghĩa |
|---|---|
| Đơn vị | Một nút trong Cơ cấu tổ chức: Công ty con, Ban chuyên môn hoặc Phòng ban. |
| Mức bảo mật | Độ nhạy của tài liệu. Thang mức do quản trị viên sắp xếp, mức trên cùng là mật nhất. |
| Loại tài liệu | Nhóm nghiệp vụ của tài liệu, có thể phân cấp cha con, ví dụ Tài chính › Báo cáo quý. |
| Chưa gắn nhãn | Tài liệu đã được quét nhưng không khớp điều kiện mức bảo mật nào, hoặc không đọc được nội dung. |
| Chính sách phân loại | Tập điều kiện quyết định file được gắn nhãn gì, áp dụng theo đơn vị. |
| Chính sách Agent | Cấu hình vận hành của agent như chu kỳ báo trạng thái, kích thước file tối đa và thời gian lưu offline. |
| Bộ cài Agent | Gói cài đặt gắn sẵn đơn vị và chính sách. Máy cài từ gói này tự đăng ký với server. |
| Nguồn dữ liệu | Thư mục cục bộ hoặc thư mục chia sẻ SMB/NAS mà agent giám sát. |
| Enroll | Quá trình một máy trạm đăng ký với server sau khi cài agent. |

## Chính sách phân loại và Chính sách Agent khác nhau thế nào

Hai khái niệm này dễ nhầm. **Chính sách phân loại** quyết định *file được gắn nhãn gì*, và được áp dụng theo đơn vị. **Chính sách Agent** quyết định *agent chạy ra sao trên máy*, và đi theo bộ cài mà máy đã dùng để cài đặt.
