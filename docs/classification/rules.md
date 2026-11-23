---
sidebar_position: 2
title: Quy tắc nhận diện
description: Thư viện mẫu biểu thức chính quy dùng chung, để chọn lại khi soạn chính sách phân loại.
---

Số căn cước, số điện thoại hay số tài khoản ngân hàng là dữ liệu có cấu trúc, nên nhận ra được bằng **mẫu biểu thức chính quy**. Thay vì viết lại biểu thức mỗi lần soạn chính sách, bạn lưu nó vào thư viện Quy tắc nhận diện một lần rồi chọn lại khi cần. Thư viện nằm tại **Phân loại › Quy tắc nhận diện**.

## Sử dụng thư viện

Thư viện có sẵn các mẫu **Hệ thống** do NextDLP cung cấp, và các mẫu **Tự tạo** của tổ chức bạn. Bạn có thể nhân bản một mẫu hệ thống để tùy chỉnh, hoặc bấm **Tạo mẫu RE2** để tạo mẫu mới. Mỗi mẫu gắn với một phạm vi: một phòng ban cụ thể, hoặc **Tất cả đơn vị** để dùng chung.

Trước khi lưu, hãy nhập dữ liệu mẫu vào ô **Chuỗi thử nghiệm** để kiểm tra biểu thức khớp đúng những gì bạn muốn.

![Thư viện Quy tắc nhận diện](/img/console/detection-rules.png)

```text
# Ví dụ: số căn cước công dân 12 chữ số
\b\d{12}\b
```

## Thư viện và chính sách độc lập với nhau

Agent chỉ chạy những quy tắc đã được đưa vào **Chính sách phân loại**. Thư viện chỉ là bảng chọn nhanh: khi bạn chọn một mẫu trong chính sách, biểu thức được sao chép vào chính sách. Sửa mẫu trong thư viện sau đó **không** làm thay đổi các chính sách đã lưu.

Thư viện chỉ chứa biểu thức chính quy. Từ khóa, từ điển và các điều kiện khác được cấu hình trực tiếp trong chính sách.

## Nhận diện thông tin riêng của tổ chức

Thông tin nhân viên, khách hàng, dự án hay thuật ngữ nghiệp vụ có định dạng riêng ở mỗi tổ chức, nên mẫu có sẵn chỉ là điểm khởi đầu. Thư viện có mẫu **Mã nhân viên** theo dạng NV hoặc EMP kèm số, còn lại bạn tự xây mẫu bằng hai kỹ thuật, tùy theo thông tin có định dạng cố định hay không.

| Thông tin | Kỹ thuật | Ví dụ |
|---|---|---|
| Mã nhân viên | Mẫu biểu thức trong thư viện | `\bNV\d{6}\b`: chữ NV và 6 chữ số. |
| Mã khách hàng | Mẫu biểu thức, kết hợp từ khóa ngữ cảnh bằng Hybrid | `\bKH\d{8}\b` cùng từ khóa "khách hàng" hoặc "mã KH". |
| Mã dự án, mã hợp đồng | Mẫu biểu thức trong thư viện | `\bDA-\d{4}-\d{3}\b`: DA, năm và số thứ tự. |
| Thuật ngữ nghiệp vụ, tên dự án, tên hệ thống nội bộ | Từ điển có trọng số trong chính sách | Mỗi thuật ngữ trọng số 0,5, ngưỡng kích hoạt 1: tài liệu cần ít nhất hai thuật ngữ khác nhau. |

Các biểu thức trên chỉ là ví dụ. Hãy thay bằng định dạng mã thực tế của tổ chức.

Mã ngắn dễ trùng ngẫu nhiên: một dãy 6 chữ số có thể là mã nhân viên, cũng có thể là số tiền. Hãy giữ tiền tố như `NV` trong biểu thức, hoặc dùng Hybrid để đòi thêm từ khóa ngữ cảnh.

Một bảng danh sách khách hàng chứa nhiều mã, còn một công văn thường chỉ nhắc một mã. Ô **Số lần ≥** phân biệt hai trường hợp này. Xem [Ngưỡng trước khi gắn nhãn](./policies.md#ngưỡng-trước-khi-gắn-nhãn).

Từ khóa không phân biệt chữ hoa, chữ thường nhưng phân biệt dấu tiếng Việt, và không chấp nhận lỗi gõ. Nếu tài liệu có thể viết không dấu, hãy thêm cả hai dạng, ví dụ "khách hàng" và "khach hang". Để bắt nội dung cùng ý nhưng diễn đạt khác, dùng kỹ thuật Ngữ nghĩa (ML).

## Về cú pháp RE2

Biểu thức trong thư viện viết theo cú pháp RE2. Cú pháp này bảo đảm thời gian chạy tỉ lệ với độ dài văn bản, nên một biểu thức viết sai không làm treo agent. Đổi lại, nó không hỗ trợ một số tính năng như lookahead (`(?=...)`) hay backreference (`\1`). Console báo lỗi nếu biểu thức không hợp lệ.
