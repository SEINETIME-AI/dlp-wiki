---
sidebar_position: 1
title: Bộ cài Agent
description: Bộ cài Agent được tạo theo từng đơn vị và gắn sẵn chính sách, giúp triển khai hàng loạt mà không cần cấu hình trên từng máy.
---

Bộ cài Agent là cách duy nhất để đưa máy trạm vào NextDLP. Mỗi bộ cài được tạo cho một đơn vị và gắn sẵn chính sách Agent cùng địa chỉ server, nên máy cài từ bộ này tự đăng ký đúng phòng ban mà không cần cấu hình gì trên máy. Bạn quản lý bộ cài tại **Thiết bị & Agent › Bộ cài Agent**.

## Tạo bộ cài

Mật khẩu gỡ agent phải được đặt trước khi tạo hoặc tạo lại bất kỳ bộ cài nào, để máy được bảo vệ ngay từ lúc cài. Khi chưa có mật khẩu, trang hiện cảnh báo; Quản trị hệ thống đặt mật khẩu ngay tại đó, còn Quản lý đơn vị cần nhờ một Quản trị hệ thống. Xem [Mật khẩu gỡ agent](./uninstall-password.md#đặt-hoặc-đổi-mật-khẩu).

Bấm **Tạo bộ cài mới** và điền các thông tin sau.

| Trường | Ý nghĩa |
|---|---|
| Công ty con / Ban chuyên môn | Chọn phạm vi cấp 2 trước để lọc danh sách đơn vị. |
| Phòng ban | Đơn vị lá mà các máy cài từ bộ này sẽ thuộc về. Với Ban chuyên môn, bộ cài gắn thẳng vào ban. |
| Chính sách Agent | Mẫu cấu hình vận hành của agent, xem [Chính sách Agent](./agent-policy.md). |
| Quota đăng ký | Số máy tối đa được đăng ký bằng bộ cài này tại một thời điểm. Máy bị thu hồi trả lại chỗ cho máy khác. |
| Agent server | Địa chỉ IP của máy chủ NextDLP mà agent sẽ kết nối về. |

Chính sách phân loại không cần gắn vào bộ cài: agent tự nhận chính sách đang bật của đơn vị mỗi khi kết nối.

![Hộp thoại Tạo bộ cài Agent](/img/console/agent-deployment-create.png)

:::warning[Agent server phải là IP mà máy trạm truy cập được]

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

Mỗi dòng có các thao tác **Tải bộ cài**, **Tạo lại**, **Thu hồi** và **Xóa**. Quản trị hệ thống thao tác trên mọi bộ cài; Quản lý đơn vị tạo bộ cài và dùng đủ bốn thao tác này với bộ cài của các đơn vị trong phạm vi của mình.

Cột **Máy đang dùng** cho biết bao nhiêu máy đang gắn với bộ cài này so với quota, ví dụ 2/50. Một máy được tính khi đã đăng ký bằng bộ cài và chưa bị thu hồi, kể cả lúc máy đang tắt. Cài lại agent trên cùng một máy không tính thêm, còn thu hồi một máy thì trả lại một chỗ trong quota.

**Tạo lại** cấp cho bộ cài một mã đăng ký mới và đóng gói lại tệp cài đặt với chính sách Agent và [mật khẩu gỡ agent](./uninstall-password.md) hiện hành; nếu mật khẩu cũ đã bị lộ, đây là cách để các tệp cài đặt đã phát ra không còn dùng được. Từ lúc đó tệp cài đặt cũ không đăng ký được máy mới nữa, nên hãy dùng thao tác này khi tệp cài đặt đã bị gửi nhầm ra ngoài hoặc khi muốn các máy cài sau dùng cấu hình mới. Sau khi tạo lại, hãy tải bộ cài về lần nữa và dùng tệp mới cho các máy cài sau. Các máy đã cài vẫn hoạt động bình thường và con số ở cột Máy đang dùng không thay đổi.

![Danh sách bộ cài Agent](/img/console/agent-deployment.png)

## Nội dung gói tải về

**Tải bộ cài** trả về một tệp zip gồm ba thành phần. Tệp `.msi` dùng để cài lần đầu. Script `Reinstall-NextDLP.ps1` dùng để cài lại hoặc thay bộ cài trên máy đã có agent; script tự gỡ bản cũ, cài bản trong thư mục và khởi động dịch vụ. Tệp `README-INSTALL.txt` tóm tắt hai cách cài này.

Mọi bộ cài mang sẵn dạng băm một chiều của [mật khẩu gỡ agent](./uninstall-password.md), nên máy được bảo vệ ngay từ lúc cài; không thể lấy lại mật khẩu từ bộ cài. Nếu sau đó bạn đổi mật khẩu, bộ cài đã tạo vẫn mang mật khẩu cũ và máy cài từ đó chuyển sang mật khẩu mới sau lần đồng bộ đầu tiên. Script `Reinstall-NextDLP.ps1` gỡ hẳn bản cũ trước khi cài bản mới, và bước gỡ đó cần mật khẩu, nên hãy thêm tham số `-UninstallPassword` với mật khẩu này.

Cách cài chi tiết có tại [Cài đặt & kết nối](../getting-started/install.md#phần-3-cài-agent-lên-máy-trạm).

## Sau khi cài

Agent tự gửi về hostname, mã thiết bị, hệ điều hành và người dùng đang đăng nhập. Đơn vị của máy lấy từ cấu hình nhúng trong gói; Quản trị hệ thống vẫn có thể chuyển máy sang đơn vị khác sau đó tại trang [Máy trạm](./machines.md).
