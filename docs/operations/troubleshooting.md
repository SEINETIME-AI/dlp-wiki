---
sidebar_position: 1
title: Xử lý sự cố
description: Các sự cố thường gặp khi triển khai và vận hành, cùng hướng xử lý tương ứng.
---

Phần lớn sự cố khi triển khai NextDLP thuộc một trong ba nhóm: server không chạy, agent không kết nối được, hoặc agent chạy nhưng không phân loại. Hãy xác định nhóm trước, rồi tra bảng tương ứng.

## Server

| Triệu chứng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Không mở được Console sau khi khởi động lại máy chủ | Docker chưa khởi động cùng Windows. | Bật tự khởi động của Docker (Docker Desktop: *Start Docker Desktop when you sign in*). Nếu dịch vụ vẫn chưa chạy, mở PowerShell trong thư mục cài đặt và chạy `docker compose -f docker-compose.deploy.yml up -d`. |
| Trình duyệt cảnh báo chứng chỉ khi mở Console | Server dùng chứng chỉ riêng do script cài đặt tạo. | Chọn **Advanced** rồi **Continue**. |
| Script cài đặt báo không được phép chạy | Chính sách thực thi PowerShell chặn script. | Chạy `powershell -ExecutionPolicy Bypass -File .\docker\load-and-start.ps1`. |
| Một dịch vụ không ở trạng thái `healthy` | Dịch vụ khởi động lỗi hoặc thiếu tài nguyên. | Xem log bằng `docker compose -f docker-compose.deploy.yml logs <tên-dịch-vụ>`. |
| Cổng 80 đã bị chiếm | Máy chủ có web server khác như IIS. | Dừng dịch vụ đang dùng cổng 80 rồi khởi động lại NextDLP. |

## Agent không kết nối

| Triệu chứng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Cài xong nhưng máy không xuất hiện trên Console | Ô Agent server của bộ cài để trống hoặc là `localhost`. | Tạo lại bộ cài với IP máy chủ đúng, rồi cài lại bằng `Reinstall-NextDLP.ps1`. |
| Cài xong nhưng máy không xuất hiện trên Console | Tường lửa chặn cổng 9091 giữa máy trạm và máy chủ. | Mở cổng 9091 trên máy chủ. Kiểm tra bằng `Test-NetConnection 10.0.0.5 -Port 9091` từ máy trạm. |
| Máy báo Mất kết nối | Dịch vụ agent đã dừng. | Chạy `Get-Service nextdlp` trên máy; nếu dừng, chạy `Start-Service nextdlp`. |
| Máy báo Mất kết nối sau khi đổi IP máy chủ | Agent vẫn kết nối về IP cũ. | Tạo lại bộ cài với IP mới và cài lại agent. |

## Agent chạy nhưng không phân loại

| Triệu chứng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Không có tài liệu nào trong Kiểm kê | Đơn vị của máy chưa có nguồn dữ liệu, hoặc chính sách chưa được kích hoạt. | Kiểm tra [Nguồn dữ liệu](../data/sources.md) và công tắc Kích hoạt của [Chính sách phân loại](../classification/policies.md). |
| Máy ở trạng thái Chờ đồng bộ policy lâu | Agent chưa tải phiên bản chính sách mới. | Đợi vài phút khi máy trực tuyến; nếu vẫn vậy, khởi động lại dịch vụ `nextdlp`. |
| Một file cụ thể không xuất hiện trong Kiểm kê | File nằm ngoài nguồn dữ liệu, hoặc đuôi file hay thư mục của nó bị loại trừ. | Kiểm tra Include / Exclude của nguồn dữ liệu. |
| File có cảnh báo "chưa được phân tích đầy đủ" | File lớn hơn Mức quét hoặc Kích thước tối đa của nguồn, bản scan quá dài, hoặc file không phải tài liệu. | Xem lý do trong chi tiết tài liệu và làm theo [Tệp lớn & mức phân tích](../data/large-files.md). |
| Người dùng phản ánh máy chậm khi agent quét | Máy cấu hình thấp đang quét nhiều tài liệu lần đầu. | Chọn Mức quét **Nhẹ** trong chính sách Agent của nhóm máy đó. |
| File ở trạng thái Chưa gắn nhãn | Không điều kiện mức bảo mật nào khớp, hoặc file đặt mật khẩu, hỏng hay không có lớp văn bản. | Mở sự kiện trong Nhật ký phân loại để xem lý do. |
| File bị gắn nhãn khác mong đợi | Một điều kiện khác cũng khớp, và agent chọn mức mật nhất. | Mở sự kiện trong Nhật ký phân loại để xem điều kiện nào đã khớp, rồi dùng **Xem chính sách hiệu lực** để rà soát. |
| AssistOCR báo lỗi trạng thái | Sai URL hoặc lỗi mạng nội bộ. | Kiểm tra URL tại Hệ thống › Nhà cung cấp phân loại. |

## Khi cần liên hệ hỗ trợ

Hãy gửi kèm tên máy, thời điểm xảy ra sự cố, ảnh chụp màn hình Console và, nếu có, log của dịch vụ server liên quan. Thông tin phiên bản có tại **Hệ thống › Giấy phép & phiên bản**.
