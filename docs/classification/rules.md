---
sidebar_position: 2
title: Quy tắc nhận diện
description: Thư viện biểu thức RE2 dùng chung để nhận diện dữ liệu nhạy cảm, giúp soạn chính sách nhanh và nhất quán.
---

Quy tắc nhận diện là thư viện các **mẫu biểu thức chính quy** dùng để nhận ra dữ liệu có cấu trúc như số căn cước, số điện thoại hay số tài khoản ngân hàng. Thay vì viết lại biểu thức mỗi lần soạn chính sách, bạn lưu nó vào thư viện một lần rồi chọn lại khi cần. Thư viện nằm tại **Phân loại › Quy tắc nhận diện**.

## Sử dụng thư viện

Thư viện có sẵn các mẫu **Chính thức** do hệ thống cung cấp, và các mẫu **Tự tạo** của tổ chức bạn. Bạn có thể nhân bản một mẫu hệ thống để tuỳ chỉnh, hoặc bấm **Tạo mẫu RE2** để tạo mẫu mới. Mỗi mẫu gắn với một phạm vi: một phòng ban cụ thể, hoặc **Tất cả đơn vị** để dùng chung.

Trước khi lưu, hãy nhập dữ liệu mẫu vào ô **Chuỗi thử nghiệm** để kiểm tra biểu thức khớp đúng những gì bạn muốn.

![Thư viện Quy tắc nhận diện](/img/console/detection-rules.png)

```text
# Ví dụ: số căn cước công dân 12 chữ số
\b\d{12}\b
```

## Thư viện và chính sách độc lập với nhau

Agent chỉ chạy những quy tắc đã được đưa vào **Chính sách phân loại**. Thư viện chỉ là bảng chọn nhanh: khi bạn chọn một mẫu trong chính sách, biểu thức được sao chép vào chính sách. Sửa mẫu trong thư viện sau đó **không** làm thay đổi các chính sách đã lưu.

Thư viện chỉ chứa biểu thức RE2. Từ khoá, từ điển và các điều kiện khác được cấu hình trực tiếp trong chính sách.

## Về cú pháp RE2

RE2 là cú pháp biểu thức chính quy bảo đảm thời gian chạy tuyến tính, nên một biểu thức viết sai không thể làm treo agent. Đổi lại, RE2 không hỗ trợ một số tính năng như lookahead (`(?=...)`) hay backreference (`\1`). Console sẽ báo lỗi nếu biểu thức không hợp lệ.
