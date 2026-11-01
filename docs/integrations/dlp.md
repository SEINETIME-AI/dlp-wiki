---
sidebar_position: 1
# Hidden until tested on a real deployment; remove to publish again.
draft: true
title: Kết nối DLP
description: DLP đọc nhãn mà NextDLP ghi vào file, hoặc tra cứu nhãn qua dịch vụ gRPC LabelLookupService, rồi áp dụng hành động theo quy định của tổ chức.
---

NextDLP gắn nhãn, còn DLP của tổ chức thực thi. Có hai cách để DLP biết nhãn của một file, và bạn có thể dùng một hoặc cả hai.

## Cách 1. Đọc nhãn ghi trong file

Khi phân loại tài liệu Office (`.docx`, `.xlsx`, `.pptx`) và PDF, agent ghi nhãn vào thuộc tính tuỳ chỉnh của file. Nhãn đi theo file khi file được sao chép, gửi email hay đưa lên cloud, nên DLP đọc được ngay cả khi không kết nối tới server NextDLP.

| Thuộc tính | Nội dung |
|---|---|
| `NextDLP_Secrecy` | Mã mức bảo mật, ví dụ `secret`. Không có thuộc tính này nghĩa là tài liệu chưa gắn nhãn. |
| `NextDLP_Domains` | Mã các loại tài liệu, gồm cả loại cha. |
| `NextDLP_ClassifiedAt` | Thời điểm phân loại. |

Hầu hết sản phẩm DLP hỗ trợ quy tắc dựa trên thuộc tính tài liệu (document properties). Hãy tạo quy tắc so khớp giá trị `NextDLP_Secrecy` với các mã mức bảo mật trong [bộ nhãn](../classification/taxonomy.md) của bạn.

## Cách 2. Tra cứu nhãn qua gRPC

Với các định dạng không ghi được thuộc tính, hoặc khi DLP cần nhãn mới nhất từ server, DLP gọi dịch vụ `LabelLookupService` của NextDLP.

### Bước 1. Tạo DLP client

Mỗi hệ thống DLP cần một client riêng và một khoá API. Tạo client bằng REST API với tài khoản Quản trị hệ thống:

```http
POST /api/dlp-clients
Authorization: Bearer <token>
Content-Type: application/json

{ "name": "DLP văn phòng Hà Nội" }
```

Phản hồi chứa trường `api_key`. Khoá chỉ hiển thị **một lần**, hãy lưu lại ngay. Dùng `GET /api/dlp-clients` để liệt kê và `POST /api/dlp-clients/{id}/revoke` để thu hồi client. Cách lấy token có tại [REST API](./api.md).

### Bước 2. Gọi dịch vụ tra nhãn

DLP gửi khoá API trong metadata `x-api-key` của mỗi lời gọi gRPC.

```protobuf
service LabelLookupService {
  rpc Lookup(LookupRequest) returns (LookupResponse);
  rpc LookupBatch(stream LookupRequest) returns (stream LookupResponse);
}

message LookupRequest {
  string doc_id = 1;        // tuỳ chọn
  string content_hash = 2;  // bắt buộc: SHA-256 của nội dung file
}

message LookupResponse {
  bool found = 1;
  string secrecy_label = 2;
  repeated string domain_label = 3;
}
```

Dùng `Lookup` cho từng file và `LookupBatch` khi cần tra số lượng lớn qua một luồng duy nhất. Trường `found` bằng `false` khi file chưa được NextDLP phân loại, hoặc khi nội dung file đã thay đổi so với lần phân loại gần nhất. Trong trường hợp đó, DLP nên áp dụng hành động mặc định theo quy chế của tổ chức.

:::warning[Cổng dịch vụ tra nhãn]

Dịch vụ tra nhãn chạy trên một cổng riêng của server, và trong gói cài đặt hiện tại cổng này chưa được mở ra ngoài. Hãy liên hệ đội hỗ trợ NextDLP để được hướng dẫn mở cổng khi tích hợp.

:::

## Ánh xạ nhãn sang hành động

Bảng dưới đây là ví dụ tham khảo; hãy điều chỉnh theo quy chế bảo mật của tổ chức.

| Mức bảo mật | Hành động gợi ý |
|---|---|
| Công khai | Cho phép |
| Nội bộ | Cho phép trong nội bộ, cảnh báo khi gửi ra ngoài |
| Mật | Yêu cầu nhập lý do khi gửi ra ngoài |
| Tuyệt mật | Chặn gửi ra ngoài và sao chép ra thiết bị ngoài |
| Chưa gắn nhãn | Theo chính sách mặc định của tổ chức |
