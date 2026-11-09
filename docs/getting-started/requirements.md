---
sidebar_position: 3
title: Yêu cầu hệ thống
description: Những gì cần chuẩn bị về máy chủ, máy trạm và mạng trước khi cài đặt NextDLP.
---

Chuẩn bị đủ các mục dưới đây trước khi cài sẽ giúp quá trình triển khai diễn ra trong khoảng 15 phút.

## Máy chủ

Server NextDLP chạy dưới dạng các container Docker. Máy chủ cần có **Docker và Docker Compose v2** đang chạy, cùng **PowerShell** để chạy script cài đặt. Trên Windows, Docker Desktop đáp ứng cả hai yêu cầu này.

Máy chủ nên có **địa chỉ IP cố định** trong mạng nội bộ, vì mọi agent sẽ kết nối về địa chỉ này. Nếu IP máy chủ thay đổi, bạn phải tạo lại bộ cài cho các máy trạm.

Gói cài đặt thường cần internet khi cài lần đầu. Với máy chủ không có internet, hãy dùng bản offline đầy đủ của gói cài đặt (xem [Cài đặt & kết nối](./install.md)).

## Máy trạm

Agent chạy trên **Windows 64-bit** dưới dạng dịch vụ Windows tên `nextdlp`. Người cài cần có **quyền quản trị** trên máy.

Khuyến nghị máy trạm có từ **8 GB RAM** và khoảng **450 MB** dung lượng trống cho chương trình và các mô hình. Agent chạy ở chế độ nền của Windows và nhường tài nguyên cho ứng dụng của người dùng. Nó tốn tài nguyên nhiều nhất khi phân loại tệp lớn hoặc đọc chữ trên bản scan. Bạn chọn mức đọc tài liệu cho từng loại máy bằng **Mức quét** trong [Chính sách Agent](../endpoints/agent-policy.md), và giới hạn dung lượng theo thư mục trong [Nguồn dữ liệu](../data/sources.md).

## Trình duyệt

Console là ứng dụng web, dùng tốt trên phiên bản mới của Microsoft Edge, Google Chrome hoặc Firefox.

## Cổng mạng

Server mở các cổng dưới đây. Chỉ cổng 80, 443, 9090, 9091 và, khi cài gói GPU, 9092 cần truy cập được từ mạng nội bộ; cơ sở dữ liệu và bộ nhớ đệm chỉ dùng bên trong máy chủ. Console chạy qua HTTPS ở cổng 443, và cổng 80 chỉ chuyển hướng sang HTTPS. Dữ liệu đi qua từng cổng và các khuyến nghị bảo vệ kết nối có tại [Luồng dữ liệu & bảo mật](./data-flow.md).

| Cổng | Dịch vụ | Ai cần truy cập |
|---|---|---|
| 80 | Chuyển hướng sang HTTPS | Quản trị viên, người dùng Console |
| 443 | Console và `/api` qua HTTPS | Quản trị viên, người dùng Console |
| 9090 | HTTP API | Hệ thống tích hợp |
| 9091 | gRPC cho agent | Máy trạm |
| 9092 | Tải bản scan lên kho tạm của gói GPU AssistOCR (chỉ khi cài gói GPU) | Máy trạm |
| 5432, 6379 | PostgreSQL và Redis | Chỉ nội bộ máy chủ |

:::warning[Lưu ý]

Máy trạm và người dùng Console phải kết nối được tới server qua cổng **443** và **9091**. Hãy mở các cổng này trên tường lửa của máy chủ trước khi cài agent, ví dụ bằng lệnh PowerShell quyền quản trị:

```powershell
New-NetFirewallRule -DisplayName "NextDLP" -Direction Inbound -Protocol TCP -LocalPort 443,9091 -Action Allow
```

Khi cài gói GPU AssistOCR, mở thêm cổng **9092** cho máy trạm.

:::

Thông số chi tiết về mô hình, định dạng tệp và giới hạn xử lý có tại [Thông số kỹ thuật](./specs.md).
