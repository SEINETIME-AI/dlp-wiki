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

## Nhận diện thông tin riêng của tổ chức

Thông tin nhân viên, khách hàng, dự án hay thuật ngữ nghiệp vụ có định dạng riêng ở mỗi tổ chức, nên NextDLP không có mẫu dựng sẵn cho chúng. Bạn tự xây mẫu bằng hai kỹ thuật, tùy theo thông tin có định dạng cố định hay không.

| Thông tin | Kỹ thuật | Ví dụ |
|---|---|---|
| Mã nhân viên | Mẫu RE2 trong thư viện | `\bNV\d{6}\b`: chữ NV và 6 chữ số. |
| Mã khách hàng | Mẫu RE2, kết hợp từ khoá ngữ cảnh bằng Hybrid | `\bKH\d{8}\b` cùng từ khoá "khách hàng" hoặc "mã KH". |
| Mã dự án, mã hợp đồng | Mẫu RE2 trong thư viện | `\bDA-\d{4}-\d{3}\b`: DA, năm và số thứ tự. |
| Thuật ngữ nghiệp vụ, tên dự án, tên hệ thống nội bộ | Từ điển có trọng số trong chính sách | Mỗi thuật ngữ trọng số 0,5, ngưỡng kích hoạt 1: tài liệu cần ít nhất hai thuật ngữ khác nhau. |

Các biểu thức trên chỉ là ví dụ; hãy thay bằng định dạng mã thực tế của tổ chức và thử với **Chuỗi thử nghiệm** trước khi lưu. Khi lưu mẫu vào thư viện, chọn phạm vi là phòng ban sở hữu loại thông tin đó, hoặc **Tất cả đơn vị** nếu cả tổ chức dùng chung.

Một số điểm giúp mẫu chính xác hơn:

- **Mã ngắn dễ trùng ngẫu nhiên.** Một dãy 6 chữ số có thể là mã nhân viên, cũng có thể là số tiền. Hãy giữ tiền tố như `NV` trong biểu thức, hoặc dùng Hybrid để đòi thêm từ khoá ngữ cảnh.
- **Đặt số lần tối thiểu cho danh sách.** Một bảng danh sách khách hàng chứa nhiều mã, còn một công văn thường chỉ nhắc một mã. Ô **Số lần ≥** phân biệt hai trường hợp này; xem [Ngưỡng trước khi gắn nhãn](./policies.md#ngưỡng-trước-khi-gắn-nhãn).
- **Từ khoá phải khớp đúng chữ.** Từ khoá không phân biệt chữ hoa, chữ thường nhưng phân biệt dấu tiếng Việt, và không chấp nhận lỗi gõ. Nếu tài liệu có thể viết không dấu, hãy thêm cả hai dạng, ví dụ "khách hàng" và "khach hang". Để bắt nội dung cùng ý nhưng diễn đạt khác, dùng kỹ thuật Ngữ nghĩa (ML).

## Về cú pháp RE2

RE2 là cú pháp biểu thức chính quy bảo đảm thời gian chạy tuyến tính, nên một biểu thức viết sai không thể làm treo agent. Đổi lại, RE2 không hỗ trợ một số tính năng như lookahead (`(?=...)`) hay backreference (`\1`). Console sẽ báo lỗi nếu biểu thức không hợp lệ.
