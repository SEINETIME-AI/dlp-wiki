---
sidebar_position: 4
# Hidden for now; remove to publish again.
draft: true
title: Lộ trình phát triển
description: Những tính năng đang được phát triển cho các phiên bản sau 1.0.0.
---

Trang này liệt kê các hướng phát triển dự kiến cho các phiên bản sau 1.0.0, trong đó các thay đổi lớn sẽ thuộc phiên bản 2.0.0. Nội dung và thứ tự ưu tiên có thể thay đổi theo phản hồi của khách hàng. Chúng tôi sẽ cập nhật trang này khi từng hạng mục được xác nhận. Khi một hạng mục hoàn thành, nó được chuyển sang trang ghi chú của phiên bản chứa nó.

## Phân loại chính xác hơn

**Mở rộng định dạng.** Hỗ trợ định dạng Word cũ `.doc` và đọc đầy đủ các ô số trong bảng tính Excel.

**Nhận diện con dấu theo hình (dấu mẫu).** Quản trị viên tải lên ảnh mẫu con dấu của từng đơn vị; agent so con dấu tìm thấy với dấu mẫu bằng đặc trưng ảnh thay vì đọc chữ trên vòng dấu, nên dấu mực nhạt, dấu đóng đè chữ, con dấu quốc huy và dấu chữ nước ngoài được xử lý như nhau. Đọc chữ trên dấu và khối ký tên quanh dấu (có từ 1.1.0) vẫn là tín hiệu phụ.

**Cải thiện nhận diện dấu mộc** với dấu hình chữ nhật, con dấu cơ quan nhà nước, và giảm báo động nhầm với tiêu đề, logo hoặc khối chữ ký số màu đỏ. Console cảnh báo khi từ khoá dấu mộc chỉ gồm từ chung hoặc ngưỡng đặt quá thấp để đọc chữ.

## Nhãn bền vững hơn

**Nhãn đi theo file khi đổi tên.** Giữ nguyên nhãn đã duyệt, lịch sử và yêu cầu đổi nhãn khi file được đổi tên hoặc di chuyển.

**Bảo vệ nhãn đã duyệt.** Nhãn do quản lý điều chỉnh được giữ nguyên khi file được sửa và phân loại lại.

## Vận hành và tích hợp

**Dịch vụ tra nhãn cho DLP mở sẵn** trong gói cài đặt, cùng màn hình quản lý DLP client trên Console.

**Tài liệu tham chiếu REST API** đầy đủ cho từng endpoint.

## Trợ lý tài liệu

**Trợ lý hỏi đáp trên trang tài liệu** trả lời câu hỏi về cài đặt và sử dụng, kèm liên kết tới trang nguồn.
