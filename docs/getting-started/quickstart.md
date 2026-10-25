---
sidebar_position: 5
title: Phân loại tài liệu đầu tiên
description: Từ lúc agent đã kết nối đến lúc thấy tài liệu đầu tiên được gắn nhãn, qua một ví dụ cụ thể.
---

Sau khi cài xong, agent đã kết nối nhưng chưa làm gì cả. Để agent bắt đầu gắn nhãn, đơn vị của máy cần hai thứ: **nguồn dữ liệu** cho agent biết phải theo dõi thư mục nào, và **chính sách phân loại đang bật** cho agent biết phải gắn nhãn gì.

Trang này đi qua một ví dụ đơn giản: mọi tài liệu trong thư mục `C:\HoSo` có chứa cụm "bảng lương" sẽ được gắn mức bảo mật Mật và loại tài liệu Nhân sự.

### Bước 1. Kiểm tra bộ nhãn

Vào **Phân loại › Mức bảo mật & loại tài liệu**. Ở tab **Mức bảo mật**, xem thang mức có sẵn và đổi tên hiển thị nếu cần. Ở tab **Loại tài liệu**, bấm **Loại tài liệu mới** và tạo loại "Nhân sự". Xem [Mức bảo mật & loại tài liệu](../classification/taxonomy.md).

### Bước 2. Khai báo nguồn dữ liệu

Vào **Dữ liệu › Nguồn dữ liệu** và bấm **Thêm nguồn dữ liệu**. Đặt tên dễ nhận biết như "Hồ sơ phòng Nhân sự", chọn loại thư mục cục bộ, chọn phòng ban của máy trạm làm owner, nhập đường dẫn `C:\HoSo` và thêm các đuôi file cần quét như `.docx`, `.xlsx`, `.pdf`. Bấm **Tạo nguồn**.

Mọi máy thuộc phòng ban đã chọn sẽ nhận nguồn này và bắt đầu theo dõi thư mục. Xem [Nguồn dữ liệu](../data/sources.md).

### Bước 3. Tạo chính sách phân loại

Vào **Phân loại › Chính sách phân loại** và bấm **Chính sách mới**. Ở phần **Thông tin chung**, đặt tên chính sách và chọn đơn vị áp dụng.

Chuyển sang phần **Điều kiện phân loại**, bấm **Thêm điều kiện**, chọn kỹ thuật **Từ khóa / Regex** và nhập từ khoá "bảng lương". Ở mục **Gắn kết quả phân loại**, chọn mức bảo mật và loại tài liệu "Nhân sự", rồi bấm **Lưu điều kiện**.

### Bước 4. Bật và đẩy chính sách xuống agent

Chính sách mới luôn ở trạng thái tắt để bạn rà soát trước. Bật công tắc **Kích hoạt**, rồi bấm **Lưu & đẩy xuống agent**. Trang Máy trạm có thể hiện trạng thái **Chờ đồng bộ policy** trong ít phút trước khi agent nhận bản mới.

### Bước 5. Kiểm tra kết quả

Trên máy trạm, lưu một file Word có cụm "bảng lương" vào `C:\HoSo`. Sau khoảng một phút, mở **Dữ liệu › Kiểm kê dữ liệu**: file xuất hiện với nhãn vừa cấu hình. Mở **Giám sát › Nhật ký phân loại** để xem sự kiện phân loại và lý do file được gắn nhãn.

:::tip Không thấy file?

Hãy kiểm tra ba điều: máy trạm đang **Trực tuyến**, đuôi file nằm trong danh sách đuôi cần quét của nguồn dữ liệu, và chính sách đã được **Kích hoạt** cho đúng đơn vị của máy.

:::

## Bước tiếp theo

Khi đã quen với luồng cơ bản, hãy đọc [Chính sách phân loại](../classification/policies.md) để kết hợp nhiều kỹ thuật nhận diện như từ điển, phân tích ngữ nghĩa, Hybrid và dấu mộc.
