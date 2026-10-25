---
sidebar_position: 1
title: Báo cáo
description: Báo cáo tổng hợp kết quả phân loại theo thời gian và theo đơn vị, dựa trên dữ liệu kiểm kê và nhãn của NextDLP.
---

NextDLP có hai nơi xem số liệu. Trang **Tổng quan** là màn hình đầu tiên sau khi đăng nhập, cho cái nhìn nhanh về số tài liệu đã phân loại, dữ liệu nhạy cảm, số máy đang hoạt động, số yêu cầu cần duyệt và xu hướng phân loại. Trang **Báo cáo & quản trị › Báo cáo** đi sâu hơn và cho phép xuất dữ liệu.

![Trang Tổng quan](/img/console/dashboard.png)

## Nội dung trang Báo cáo

Trang hiển thị số tệp đã kiểm kê, lượng dữ liệu nhạy cảm, số nhóm nhãn và số đơn vị có dữ liệu, cùng hai biểu đồ: **Phân bổ nhãn bảo mật** và **Dữ liệu theo đơn vị**.

![Trang Báo cáo](/img/console/reports.png)

Chọn **Khoảng thời gian báo cáo** để giới hạn số liệu, biểu đồ và mọi tệp xuất trên trang. Tài liệu được tính theo lần phân loại gần nhất; để trống để lấy toàn bộ.

Báo cáo và tệp xuất chỉ bao gồm dữ liệu trong phạm vi đơn vị của người đang xem. Một Quản lý đơn vị chỉ thấy số liệu của các đơn vị mình phụ trách.

## Xuất dữ liệu

| Tệp xuất | Nội dung |
|---|---|
| Xuất CSV theo nhãn | Số tệp theo từng mức bảo mật. |
| Xuất CSV theo đơn vị | Phân bổ dữ liệu theo phòng ban. |
| Xuất CSV chờ rà soát | Các tệp đang ở trạng thái Chờ rà soát. |
| Xuất CSV hạ cấp nhãn | Các trường hợp nhãn bị hạ mức bảo mật, dùng để kiểm soát việc đổi nhãn. |
| Xuất CSV nhật ký phân loại | Chi tiết từng sự kiện phân loại trong khoảng thời gian đã chọn. |
| Xuất báo cáo PDF | Báo cáo chi tiết sự kiện phân loại kèm phần tổng hợp, phù hợp để trình lãnh đạo hoặc lưu hồ sơ. |

Các tệp xuất về sự kiện gồm thời gian, máy, IP, đơn vị, chủ sở hữu tệp, đường dẫn, mức bảo mật, loại tài liệu, quy tắc đã khớp và đoạn nội dung khớp đã được che bớt. Toàn bộ nội dung tệp không bao giờ được xuất.

:::info Phạm vi báo cáo

Báo cáo dựa trên kiểm kê và nhãn phân loại của NextDLP. Các sự kiện vi phạm do DLP ghi nhận, như email bị chặn, nằm trong báo cáo của hệ thống DLP.

:::
