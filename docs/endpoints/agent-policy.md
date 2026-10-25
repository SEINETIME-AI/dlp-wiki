---
sidebar_position: 3
title: Chính sách Agent
description: Chính sách Agent điều chỉnh cách agent vận hành theo từng loại máy và được chọn khi tạo bộ cài cho đơn vị.
---

Chính sách Agent là mẫu cấu hình vận hành của agent: bao lâu báo trạng thái một lần, file lớn đến đâu thì bỏ qua, giữ dữ liệu bao lâu khi mất mạng. Bạn tạo chính sách tại **Thiết bị & Agent › Chính sách Agent**, rồi chọn nó khi tạo [Bộ cài Agent](./packages.md).

Chính sách Agent khác với chính sách phân loại. Nó không quyết định file được gắn nhãn gì, mà chỉ quyết định agent chạy ra sao trên máy.

![Trang Chính sách Agent](/img/console/agent-policies.png)

## Tham số cấu hình

| Tham số | Ý nghĩa |
|---|---|
| Heartbeat (giây) | Chu kỳ agent báo trạng thái và kiểm tra chính sách mới. Tối thiểu 15 giây. |
| File tối đa (MB) | File lớn hơn ngưỡng sẽ không được phân loại. Mặc định 250 MB, hợp lệ từ 1 đến 2048 MB. |
| Offline cache (ngày) | Thời gian agent giữ kết quả chờ gửi khi không kết nối được server. |

## Gợi ý cấu hình

Với **máy văn phòng** luôn nối mạng nội bộ, giá trị mặc định là phù hợp. Với **laptop công tác** thường làm việc bên ngoài, hãy tăng Offline cache lên khoảng 14 ngày để kết quả phân loại không bị mất trước khi máy quay lại mạng nội bộ. Với **máy cấu hình yếu**, giảm File tối đa để agent không phải xử lý những file quá lớn.

## Chính sách đi theo bộ cài

Một máy dùng chính sách Agent của bộ cài mà nó được cài từ đó, kể cả khi máy được chuyển sang đơn vị khác. Muốn đổi cấu hình cho một nhóm máy, hãy sửa chính sách Agent tương ứng: các máy sẽ nhận giá trị mới ở lần báo trạng thái kế tiếp.

Giá trị mặc định cho toàn hệ thống như ngưỡng offline được thiết lập tại **Hệ thống › Cấu hình Agent mặc định**.
