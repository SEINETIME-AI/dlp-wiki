---
sidebar_position: 1
title: Bộ cài Agent
description: Bộ cài Agent được tạo theo từng đơn vị và gắn sẵn chính sách, giúp triển khai hàng loạt mà không cần cấu hình trên từng máy.
---

Bộ cài Agent là cách duy nhất để đưa máy trạm vào NextDLP. Mỗi bộ cài được tạo cho một đơn vị và gắn sẵn chính sách Agent cùng địa chỉ server, nên máy cài từ bộ này tự đăng ký đúng phòng ban mà không cần cấu hình gì trên máy. Bạn quản lý bộ cài tại **Thiết bị & Agent › Bộ cài Agent**.

## Tạo bộ cài

Bấm **Tạo bộ cài mới** và điền các thông tin sau.

| Trường | Ý nghĩa |
|---|---|
| Công ty con / Ban chuyên môn | Chọn phạm vi cấp 2 trước để lọc danh sách đơn vị. |
| Phòng ban | Đơn vị lá mà các máy cài từ bộ này sẽ thuộc về. Với Ban chuyên môn, bộ cài gắn thẳng vào ban. |
| Chính sách Agent | Mẫu cấu hình vận hành của agent, xem [Chính sách Agent](./agent-policy.md). |
| Quota đăng ký | Số máy tối đa được phép đăng ký bằng bộ cài này. |
| Agent server | Địa chỉ IP của máy chủ NextDLP mà agent sẽ kết nối về. |

Chính sách phân loại không cần gắn vào bộ cài: agent tự nhận chính sách đang bật của đơn vị mỗi khi kết nối.

:::warning Agent server phải là IP mà máy trạm truy cập được

Hãy nhập IP nội bộ của máy chủ, ví dụ `10.0.0.5`. Không dùng `localhost` hoặc để trống, vì khi đó agent chỉ hoạt động trên chính máy chủ.

:::

## Vòng đời bộ cài

Sau khi tạo, server đóng gói bộ cài trong nền. Trạng thái của bộ cài cho biết bạn có thể làm gì với nó.

| Trạng thái | Ý nghĩa |
|---|---|
| Đang tạo | Server đang đóng gói bộ cài. Chờ ít phút. |
| Sẵn sàng | Có thể tải về và cài đặt. |
| Thất bại | Quá trình đóng gói gặp lỗi. Hãy tạo lại bộ cài. |
| Hết hạn | Bộ cài không còn dùng được để đăng ký máy mới. |

Mỗi dòng có các thao tác **Tải bộ cài**, **Tạo lại**, **Thu hồi** và **Xóa**. Dùng **Tạo lại** khi cần đóng gói lại với cấu hình mới, ví dụ sau khi đổi IP máy chủ.

## Nội dung gói tải về

**Tải bộ cài** trả về một file zip gồm ba thành phần. File `.msi` dùng để cài lần đầu. Script `Reinstall-NextDLP.ps1` dùng để cài lại hoặc thay bộ cài trên máy đã có agent; script tự gỡ bản cũ, cài bản trong thư mục và khởi động dịch vụ. File `README-INSTALL.txt` tóm tắt hai cách cài này.

Cách cài chi tiết có tại [Cài đặt & kết nối](../getting-started/install.md#phần-3-cài-agent-lên-máy-trạm). Cách cài lại và gỡ agent có tại [Nâng cấp & gỡ cài đặt](../operations/upgrade-uninstall.md).

## Sau khi cài

Agent tự gửi về hostname, mã thiết bị, hệ điều hành và người dùng đang đăng nhập. Đơn vị của máy lấy từ cấu hình nhúng trong gói; quản trị viên vẫn có thể chuyển máy sang đơn vị khác sau đó tại trang [Máy trạm](./machines.md).
