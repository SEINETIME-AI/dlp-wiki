---
sidebar_position: 3
title: Yêu cầu hệ thống
description: Những gì cần chuẩn bị về máy chủ, máy trạm và mạng trước khi cài đặt NextDLP.
---

Trước khi cài, bạn cần một máy chủ chạy được Docker, các máy trạm Windows 64-bit, và một số cổng mạng mở giữa hai bên.

## Máy chủ

Server NextDLP chạy dưới dạng các container Docker, trên Windows hoặc Linux. Trên Windows, máy chủ cần **Docker Desktop** và **PowerShell** để chạy script cài đặt. Trên Linux (x86_64), máy chủ cần **Docker Engine** cùng Compose plugin. Các bản Linux đã hỗ trợ là Ubuntu 22.04 và 24.04, Debian 12, RHEL và Rocky 9.

Máy chủ nên có **địa chỉ IP cố định** trong mạng nội bộ, vì các agent kết nối về địa chỉ này. Nếu IP máy chủ thay đổi, bạn phải tạo lại bộ cài cho các máy trạm.

Gói cài đặt thường cần internet khi cài lần đầu. Với máy chủ không có internet, hãy dùng bản offline đầy đủ của gói cài đặt (xem [Cài đặt & kết nối](./install.md)).

### Máy chủ có GPU (tùy chọn)

Gói GPU AssistOCR cần một card NVIDIA từ 16 GB bộ nhớ, đã cài driver. Trên Linux cần thêm NVIDIA Container Toolkit. Lần khởi động đầu tiên tải máy chủ mô hình và các mô hình về, khoảng 35 GB, nên máy chủ cần internet ở bước này kể cả khi bạn dùng bản offline của gói cài đặt.

## Máy trạm

Agent chạy trên **Windows 64-bit** dưới dạng dịch vụ Windows tên `nextdlp`. Người cài cần có **quyền quản trị** trên máy.

Khuyến nghị máy trạm có từ **8 GB RAM** và khoảng **450 MB** dung lượng trống cho chương trình và các mô hình. Agent chạy ở chế độ nền của Windows và nhường tài nguyên cho ứng dụng của người dùng. Nó tốn tài nguyên nhiều nhất khi phân loại tệp lớn hoặc đọc chữ trên bản scan. Bạn chọn mức đọc tài liệu cho từng loại máy bằng **Mức quét** trong [Chính sách Agent](../endpoints/agent-policy.md), và giới hạn dung lượng theo thư mục trong [Nguồn dữ liệu](../data/sources.md).

## Trình duyệt

Console là ứng dụng web, dùng tốt trên phiên bản mới của Microsoft Edge, Google Chrome hoặc Firefox.

## Cổng mạng

Server mở các cổng dưới đây. Chỉ cổng 80, 443, 9090, 9091 và, khi cài gói GPU, 9092 cần truy cập được từ mạng nội bộ. Cơ sở dữ liệu và bộ nhớ đệm chỉ dùng bên trong máy chủ. Dữ liệu đi qua từng cổng và các khuyến nghị bảo vệ kết nối có tại [Luồng dữ liệu & bảo mật](./data-flow.md).

| Cổng | Dịch vụ | Ai cần truy cập |
|---|---|---|
| 80 | Chuyển hướng sang HTTPS | Quản trị hệ thống, người dùng Console |
| 443 | Console và `/api` qua HTTPS | Quản trị hệ thống, người dùng Console |
| 9090 | API cho hệ thống tích hợp, qua HTTPS | Hệ thống tích hợp |
| 9091 | gRPC cho agent | Máy trạm |
| 9092 | Tải bản scan và bản vẽ lên kho tạm của gói GPU AssistOCR (chỉ khi cài gói GPU) | Máy trạm |
| 5432, 6379 | PostgreSQL và Redis | Chỉ nội bộ máy chủ |

:::warning[Lưu ý]

Máy trạm và người dùng Console phải kết nối được tới server qua cổng **443** và **9091**. Khi cài gói GPU AssistOCR, máy trạm cần thêm cổng **9092**. Hãy mở các cổng này trên tường lửa của máy chủ trước khi cài agent. Lệnh mở cổng có ở [Bước 4 của Cài đặt & kết nối](./install.md#bước-4-mở-cổng-trên-tường-lửa).

:::

Thông số chi tiết về mô hình, định dạng tệp và giới hạn xử lý có tại [Thông số kỹ thuật](./specs.md).
