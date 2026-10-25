---
sidebar_position: 1
title: Cơ cấu tổ chức
description: Cơ cấu tổ chức gồm tối đa ba cấp và là nền tảng để gắn máy trạm, chính sách cũng như phạm vi phân quyền.
---

Cơ cấu tổ chức là nền tảng của mọi cấu hình khác trong NextDLP. Máy trạm thuộc về một đơn vị, chính sách phân loại áp dụng theo đơn vị, và quản lý chỉ thao tác được trong đơn vị mình phụ trách. Bạn quản lý cơ cấu tại **Tổ chức › Cơ cấu tổ chức**.

## Mô hình ba cấp

Đứng đầu là **Tổng công ty**. Bên dưới có hai loại đơn vị trực thuộc. **Công ty con** là pháp nhân trực thuộc và có thể có các **Phòng ban** riêng. **Ban chuyên môn** trực thuộc trực tiếp Tổng công ty và không có cấp con, nên bộ cài và nguồn dữ liệu của ban được gắn thẳng vào ban.

```text
Tổng công ty
├─ Công ty con
│   └─ Phòng ban
└─ Ban chuyên môn
```

Tên Tổng công ty được cấu hình tại **Hệ thống › Thông tin chung**. Cơ cấu được quản lý trực tiếp trong Console và không cần AD hay LDAP.

## Tạo đơn vị

Bấm **Tạo đơn vị**, chọn loại đơn vị, nhập tên và mã đơn vị. **Mã đơn vị** chỉ gồm chữ thường, số và dấu gạch, được gợi ý tự động theo tên, và **không thể đổi sau khi tạo**. Chỉ Quản trị hệ thống được tạo Công ty con và Ban chuyên môn; Quản lý đơn vị chỉ tạo được phòng ban trong công ty con mình phụ trách.

Trang có hai cách xem: **Cây phân cấp** để thao tác nhanh và **Sơ đồ tổ chức** để trình bày. Bấm vào một đơn vị để xem chi tiết gồm phòng ban, máy trạm và chính sách đang áp dụng. Bạn có thể xuất toàn bộ cơ cấu ra CSV.

![Cây phân cấp của Cơ cấu tổ chức](/img/console/organization.png)

## Chính sách kế thừa

Một phòng ban chưa có chính sách phân loại riêng sẽ **kế thừa** chính sách đang bật của công ty con cấp trên. Console hiển thị nhãn "Kế thừa · tên chính sách" cho các phòng ban này. Khi phòng ban có chính sách riêng, chính sách riêng **thay thế hoàn toàn** chính sách của công ty con, không gộp với nhau.

:::warning Đơn vị chưa có chính sách

Đơn vị không có chính sách riêng và cũng không kế thừa được từ cấp trên thì các máy trạm thuộc đơn vị đó sẽ không được phân loại. Console cảnh báo những đơn vị này ở trang Chính sách phân loại.

:::

## Chuyển và xoá đơn vị

Một phòng ban có thể được chuyển sang công ty con khác bằng thao tác **Chuyển phòng ban**. Để xoá đơn vị, bạn cần nhập lại mã đơn vị để xác nhận. Hệ thống không cho xoá khi đơn vị vẫn còn phòng ban trực thuộc, máy trạm, chính sách, mẫu regex, người dùng được phân quyền, bộ cài hoặc nguồn dữ liệu, và sẽ liệt kê cụ thể những mục cần chuyển hoặc xoá trước.
