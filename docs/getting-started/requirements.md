---
sidebar_position: 3
title: Yêu cầu hệ thống
description: Những gì cần chuẩn bị về máy chủ, máy trạm và mạng trước khi cài đặt NextDLP.
---

Chuẩn bị đủ các mục dưới đây trước khi cài sẽ giúp quá trình triển khai diễn ra trong khoảng 15 phút.

## Máy chủ

Server NextDLP chạy dưới dạng các container Docker. Máy chủ cần có **Docker và Docker Compose v2** đang chạy, cùng **PowerShell** để chạy script cài đặt. Trên Windows, Docker Desktop đáp ứng cả hai yêu cầu này.

Máy chủ nên có **địa chỉ IP cố định** trong mạng nội bộ, vì mọi agent sẽ kết nối về địa chỉ này. Nếu IP máy chủ thay đổi, bạn phải tạo lại bộ cài cho các máy trạm.

Server không bắt buộc phải có internet. Với máy chủ không có internet, hãy dùng bản offline đầy đủ của gói cài đặt (xem [Cài đặt & kết nối](./install.md)).

## Máy trạm

Agent chạy trên **Windows 64-bit** dưới dạng dịch vụ Windows tên `nextdlp`. Người cài cần có **quyền quản trị** trên máy.

Agent tiêu tốn tài nguyên chủ yếu khi phân loại file lớn hoặc chạy OCR trên bản scan. Bạn có thể giới hạn kích thước file được quét bằng [Chính sách Agent](../endpoints/agent-policy.md) hoặc trong cấu hình [Nguồn dữ liệu](../data/sources.md).

## Trình duyệt

Console là ứng dụng web, dùng tốt trên phiên bản mới của Microsoft Edge, Google Chrome hoặc Firefox.

## Cổng mạng

Server mở các cổng dưới đây. Chỉ cổng 80, 9090 và 9091 cần truy cập được từ mạng nội bộ; cơ sở dữ liệu và bộ nhớ đệm chỉ dùng bên trong máy chủ.

| Cổng | Dịch vụ | Ai cần truy cập |
|---|---|---|
| 80 | Console và `/api` | Quản trị viên, người dùng Console, máy trạm |
| 9090 | HTTP API | Hệ thống tích hợp |
| 9091 | gRPC cho agent | Máy trạm |
| 5432, 6379 | PostgreSQL và Redis | Chỉ nội bộ máy chủ |

:::warning Lưu ý

Máy trạm phải kết nối được tới server qua cổng **80** và **9091**. Hãy mở hai cổng này trên tường lửa của máy chủ trước khi cài agent.

:::
