---
sidebar_position: 2
# Hidden until tested on a real deployment; remove to publish again.
draft: true
title: REST API
description: REST API cho phép tự động hoá các tác vụ quản trị như quản lý máy trạm, chính sách và xuất báo cáo.
---

Mọi thao tác trên Console đều đi qua REST API, nên bạn có thể tự động hoá chúng bằng script hoặc tích hợp với hệ thống khác. API phục vụ tại `http://<server>/api` (qua cổng 80) và `http://<server>:9090/api`.

## Xác thực

Gọi `POST /api/auth/login` với tài khoản Console để nhận token, sau đó gửi token trong header `Authorization` ở mọi yêu cầu tiếp theo.

```http
POST /api/auth/login
Content-Type: application/json

{ "username": "admin", "password": "<mật khẩu>" }
```

```http
GET /api/machines
Authorization: Bearer <token>
```

Quyền của token giống quyền của tài khoản trên Console: một Quản lý đơn vị chỉ thấy dữ liệu trong phạm vi đơn vị của mình. Với các script chạy định kỳ, hãy tạo một tài khoản riêng thay vì dùng tài khoản `admin`.

## Quy ước chung

Yêu cầu và phản hồi dùng JSON, trừ các endpoint xuất CSV. Thời gian theo định dạng RFC 3339. Lỗi trả về dạng `{"error": "nội dung lỗi"}`; lỗi xác thực trả mã `401`. Kích thước yêu cầu tối đa 4 MB, và mỗi địa chỉ IP được gọi tối đa 600 yêu cầu mỗi phút.

`GET /health` không cần xác thực và cho biết server cùng các dịch vụ phụ thuộc đã sẵn sàng hay chưa; phù hợp để giám sát.

## Tài nguyên chính

| Tài nguyên | Đường dẫn |
|---|---|
| Cơ cấu tổ chức | `/api/org-units` |
| Máy trạm | `/api/machines` |
| Nguồn dữ liệu | `/api/data-sources` |
| Bộ cài Agent | `/api/agent-packages` |
| Chính sách phân loại | `/api/policies` |
| Chính sách Agent | `/api/agent-policies` |
| Kiểm kê tài liệu | `/api/documents` |
| Nhật ký phân loại | `/api/agent-events` |
| Yêu cầu đổi nhãn | `/api/label-change-requests` |
| DLP client | `/api/dlp-clients` |
| Báo cáo | `/api/reports/...` |

Tài liệu tham chiếu đầy đủ của từng endpoint sẽ được bổ sung trong các phiên bản tới.
