---
sidebar_position: 2
title: Người dùng & phân quyền
description: Tài khoản Console được phân theo vai trò, mỗi vai trò có phạm vi thao tác giới hạn theo đơn vị.
---

Mỗi người dùng Console có một vai trò và một phạm vi đơn vị. Vai trò quyết định người đó làm được gì; phạm vi quyết định họ làm được ở đâu. Bạn quản lý tài khoản tại **Báo cáo & quản trị › Người dùng & phân quyền**.

## Vai trò

| Vai trò | Cách tạo | Phạm vi và quyền chính |
|---|---|---|
| Quản trị hệ thống | Tài khoản `admin` có sẵn khi cài; Quản trị hệ thống tạo thêm | Toàn hệ thống. Cấu hình mọi thứ, đổi nhãn tài liệu trực tiếp. |
| Quản lý đơn vị | Quản trị hệ thống tạo | Các đơn vị được gán. Duyệt yêu cầu đổi nhãn, đổi nhãn trực tiếp trong phạm vi của mình. |
| Người dùng máy trạm | Tự tạo khi máy enroll | Tài liệu trên máy của mình. Xem nhãn và gửi yêu cầu đổi nhãn. |

## Thêm quản trị viên hoặc quản lý

Bấm **Thêm quản trị / quản lý**, nhập thông tin, chọn vai trò và chọn **Phạm vi đơn vị** bằng các ô đánh dấu. Một quản lý có thể phụ trách nhiều công ty con, ban hoặc phòng ban. Mật khẩu tối thiểu 12 ký tự, và bạn có thể bắt người dùng đổi mật khẩu ở lần đăng nhập đầu.

## Tài khoản máy trạm

Người dùng máy trạm không được tạo tay. Khi một máy enroll, hệ thống tự tạo một tài khoản Console với **tên đăng nhập là hostname của máy**, gắn một một với máy đó. Người dùng phải đổi mật khẩu ở lần đăng nhập đầu tiên. Khi máy bị thu hồi, tài khoản cũng bị xoá.

Quản trị viên không tạo mới được tài khoản loại này, nhưng có thể đổi phạm vi, khoá tài khoản hoặc đặt lại mật khẩu.

## Các thao tác trên tài khoản

**Đặt lại mật khẩu** cấp một mật khẩu tạm và bắt người dùng đổi ở lần đăng nhập kế tiếp; dùng khi người dùng quên mật khẩu hoặc tài khoản bị khoá do nhập sai nhiều lần. **Khóa tài khoản** ngăn người dùng đăng nhập cho tới khi được mở khoá. **Thu hồi tất cả phiên** làm mọi phiên đăng nhập đang mở của người dùng mất hiệu lực ngay lập tức.

## Chính sách đăng nhập

Độ dài mật khẩu tối thiểu và số lần nhập sai trước khi khoá tài khoản được cấu hình tại **Hệ thống › Bảo mật đăng nhập**. Xem [Hệ thống](../admin/system.md).
