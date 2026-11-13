---
sidebar_position: 2
title: Người dùng & phân quyền
description: Tài khoản Console được phân theo vai trò, mỗi vai trò có phạm vi thao tác giới hạn theo đơn vị.
---

Mỗi người dùng Console có một vai trò và một phạm vi đơn vị. Vai trò quyết định người đó làm được gì; phạm vi quyết định họ làm được ở đâu. Bạn quản lý tài khoản tại **Báo cáo & quản trị › Người dùng & phân quyền**.

![Trang Người dùng & phân quyền](/img/console/access-control.png)

## Vai trò

| Vai trò | Cách tạo | Phạm vi và quyền chính |
|---|---|---|
| Quản trị hệ thống | Tài khoản `admin` có sẵn khi cài; Quản trị hệ thống tạo thêm | Toàn hệ thống. Cấu hình mọi thứ, đổi nhãn tài liệu trực tiếp. |
| Quản lý đơn vị | Quản trị hệ thống tạo | Các đơn vị được gán và mọi đơn vị cấp dưới của chúng. Duyệt yêu cầu đổi nhãn, đổi nhãn trực tiếp, quản lý chính sách, nguồn dữ liệu và bộ cài trong phạm vi của mình. |
| Người dùng máy trạm | Tự tạo khi máy đăng ký | Tài liệu trên máy của mình. Xem nhãn và gửi yêu cầu đổi nhãn. |

## Phạm vi của Quản lý đơn vị

Phạm vi của một Quản lý đơn vị gồm các đơn vị được gán và mọi đơn vị nằm dưới chúng. Một quản lý được gán một Công ty con sẽ thấy máy trạm, tài liệu, nhật ký phân loại, báo cáo và thông báo của tất cả phòng ban thuộc công ty đó, và không thấy gì của công ty con hay ban khác. Quản lý chưa được gán đơn vị nào thì không thấy dữ liệu nào.

Trong phạm vi của mình, Quản lý đơn vị tạo và sửa chính sách phân loại, quy tắc nhận diện, chính sách Agent, nguồn dữ liệu và bộ cài Agent. Chính sách Agent và quy tắc nhận diện có thể được đặt dùng chung cho mọi đơn vị; những mục dùng chung đó Quản lý đơn vị chỉ xem được, chỉ Quản trị hệ thống sửa. Với máy trạm, Quản lý đơn vị xem được danh sách máy trong phạm vi của mình; còn chuyển đơn vị, thu hồi máy và tạo lại khóa API của agent tại trang [Máy trạm](../endpoints/machines.md) là thao tác của Quản trị hệ thống.

Console chỉ hiện những nút mà tài khoản đang đăng nhập được phép dùng. Khi một thao tác bị từ chối, Console hiển thị lý do cụ thể do server trả về, ví dụ "Bạn không có quyền thực hiện thao tác này."

## Thêm Quản trị hệ thống hoặc Quản lý đơn vị

Bấm **Thêm quản trị / quản lý**, nhập thông tin, chọn vai trò và chọn **Phạm vi đơn vị** bằng các ô đánh dấu. Một quản lý có thể phụ trách nhiều công ty con, ban hoặc phòng ban. Mật khẩu tối thiểu 12 ký tự, và bạn có thể yêu cầu người dùng đổi mật khẩu ở lần đăng nhập đầu.

## Tài khoản máy trạm

Người dùng máy trạm không được tạo tay. Khi một máy đăng ký, hệ thống tự tạo một tài khoản Console với **tên đăng nhập là hostname của máy**, mỗi tài khoản gắn với đúng một máy. Người dùng phải đổi mật khẩu ở lần đăng nhập đầu tiên. Khi máy bị thu hồi, tài khoản cũng bị xóa.

Quản trị hệ thống không tạo mới được tài khoản loại này, nhưng có thể đổi phạm vi, khóa tài khoản hoặc đặt lại mật khẩu. Quản lý đơn vị làm được các thao tác này với tài khoản người dùng máy trạm trong phạm vi của mình.

## Các thao tác trên tài khoản

**Đặt lại mật khẩu** cấp một mật khẩu tạm và yêu cầu người dùng đổi ở lần đăng nhập kế tiếp; dùng khi người dùng quên mật khẩu hoặc tài khoản bị khóa do nhập sai nhiều lần. **Khóa tài khoản** ngăn người dùng đăng nhập Console cho tới khi được mở khóa. Với tài khoản máy trạm, agent trên máy vẫn chạy bình thường, và tài khoản chỉ đăng nhập lại được khi bạn mở khóa trên Console. **Thu hồi tất cả phiên** làm mọi phiên đăng nhập đang mở của người dùng mất hiệu lực ngay lập tức.

## Chính sách đăng nhập

Độ dài mật khẩu tối thiểu và số lần nhập sai trước khi khóa tài khoản được cấu hình tại **Hệ thống › Bảo mật đăng nhập**. Xem [Hệ thống](../admin/system.md).
