---
sidebar_position: 0
title: Ghi chú phát hành
sidebar_label: Tổng quan
description: Danh sách các phiên bản NextDLP, cách đánh số phiên bản và nơi đọc thay đổi của từng bản cập nhật.
---

Mỗi bản cập nhật của NextDLP có một trang ghi chú riêng trong mục này, cho biết có gì mới, những gì đã được sửa và cần lưu ý gì khi nâng cấp. Phiên bản mới nhất luôn nằm trên cùng.

## Các phiên bản

| Phiên bản | Ngày phát hành | Trạng thái | Nội dung chính |
|---|---|---|---|
| [1.1.0](./1.1.0.md) | Chưa phát hành | Sắp phát hành | Xử lý tệp lớn và tệp nén, Mức quét, agent chạy nền, Console dùng HTTPS |
| [1.0.0](./1.0.0.md) | 20/10/2026 | Bản hiện hành | Phiên bản đầu tiên, đi cùng bản dùng thử |

Những hạn chế còn tồn tại của bản hiện hành được liệt kê tại [Lỗi đã biết](./known-issues.md). Các hướng phát triển sau đó có tại [Lộ trình phát triển](./roadmap.md).

## Cách đánh số phiên bản

NextDLP đánh số phiên bản theo dạng **MAJOR.MINOR.PATCH**, giống phần lớn phần mềm doanh nghiệp.

<dl>
  <dt><strong>MAJOR</strong>, ví dụ 1.0.0 lên 2.0.0</dt>
  <dd>Thay đổi lớn về kiến trúc hoặc cách vận hành. Nâng cấp có thể cần thêm bước chuẩn bị; trang ghi chú của bản đó sẽ có mục hướng dẫn riêng.</dd>
  <dt><strong>MINOR</strong>, ví dụ 1.0.0 lên 1.1.0</dt>
  <dd>Tính năng mới và cải tiến. Dữ liệu, chính sách và cấu hình hiện có được giữ nguyên khi nâng cấp.</dd>
  <dt><strong>PATCH</strong>, ví dụ 1.1.0 lên 1.1.1</dt>
  <dd>Chỉ sửa lỗi, không thay đổi cách sử dụng. Nên cập nhật sớm.</dd>
</dl>

Mỗi gói cài đặt gồm server, Console và bộ cài agent của cùng một phiên bản. Hãy cài agent từ bộ cài tạo trên server đang chạy, để agent và server luôn cùng phiên bản.

## Nâng cấp

Để chuyển lên phiên bản mới, làm theo [Nâng cấp & gỡ cài đặt](../operations/upgrade-uninstall.md), rồi đọc mục **Lưu ý khi nâng cấp** trong trang ghi chú của phiên bản đó trước khi cài lại agent trên máy trạm.
