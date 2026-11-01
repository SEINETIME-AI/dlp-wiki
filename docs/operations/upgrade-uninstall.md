---
sidebar_position: 2
title: Nâng cấp & gỡ cài đặt
description: Quy trình sao lưu, nâng cấp server, cài lại agent và gỡ hệ thống một cách an toàn.
---

Trang này hướng dẫn các thao tác bảo trì: sao lưu dữ liệu, nâng cấp server, cài lại agent, và gỡ NextDLP khỏi máy trạm hoặc máy chủ. Mọi lệnh trên máy chủ được chạy trong PowerShell, tại thư mục cài đặt server, ví dụ `C:\nextdlp`.

## Sao lưu dữ liệu

Toàn bộ cấu hình, nhãn và nhật ký nằm trong cơ sở dữ liệu PostgreSQL của server. Hãy sao lưu trước mỗi lần nâng cấp hoặc gỡ cài đặt:

```powershell
docker compose -f docker-compose.deploy.yml exec -T postgres pg_dump -U postgres dlp > nextdlp-backup.sql
```

Lưu file `nextdlp-backup.sql` ở nơi an toàn, ngoài máy chủ.

## Nâng cấp server

### Bước 1. Sao lưu

Thực hiện sao lưu như mục trên.

### Bước 2. Giải nén bản mới vào đúng thư mục cũ

Giải nén gói `dlp-stack-deploy-<phiên bản>.zip` của phiên bản mới **đè lên thư mục cài đặt hiện tại**, ví dụ `C:\nextdlp`. Giữ nguyên file `.env` và thư mục `certs` trong thư mục đó: chúng chứa cấu hình bảo mật và chứng chỉ của server. Dữ liệu và mật khẩu được giữ nguyên sau khi nâng cấp.

:::warning[Giữ nguyên tên thư mục]

Docker gắn dữ liệu của hệ thống với tên thư mục cài đặt. Nếu giải nén bản mới sang một thư mục có tên khác, server mới sẽ khởi động với cơ sở dữ liệu trống và bạn sẽ không thấy dữ liệu cũ.

:::

### Bước 3. Khởi động bản mới

```powershell
.\docker\load-and-start.ps1
```

Server tự cập nhật cấu trúc cơ sở dữ liệu khi khởi động. Đăng nhập Console và kiểm tra phiên bản tại **Hệ thống › Giấy phép & phiên bản**.

### Bước 4. Cập nhật agent nếu cần

Nếu ghi chú phát hành yêu cầu cập nhật agent, hãy **Tạo lại** bộ cài của từng đơn vị trên Console, tải bộ cài mới và cài lại agent như mục dưới đây.

## Cài lại hoặc cập nhật agent

Trên máy trạm, giải nén bộ cài mới, mở PowerShell với quyền quản trị trong thư mục đó và chạy:

```powershell
.\Reinstall-NextDLP.ps1 -CleanState:$false
```

Script tự gỡ mọi bản NextDLP cũ, cài file `.msi` trong thư mục và khởi động dịch vụ. Tuỳ chọn `-CleanState:$false` giữ lại dữ liệu cục bộ của agent, nên máy giữ nguyên danh tính trên Console và không phải quét lại từ đầu. Bỏ tuỳ chọn này chỉ khi bạn muốn máy đăng ký lại hoàn toàn mới.

## Gỡ agent khỏi máy trạm

### Bước 1. Gỡ chương trình

Trên máy trạm, mở **Settings › Apps › Installed apps**, tìm **NextDLP** và chọn **Uninstall**. Bạn cũng có thể dùng lệnh trong PowerShell quyền quản trị:

```powershell
Get-Package -Name "NextDLP*" | Uninstall-Package
```

### Bước 2. Xoá dữ liệu cục bộ (tuỳ chọn)

Thư mục `C:\ProgramData\DlpExtension` chứa dữ liệu cục bộ của agent và vẫn còn sau khi gỡ. Xoá thư mục này nếu máy sẽ không dùng NextDLP nữa.

### Bước 3. Thu hồi máy trên Console

Vào **Thiết bị & Agent › Máy trạm**, chọn máy và bấm **Thu hồi**. Tài khoản Console gắn với máy cũng bị xoá theo. Lịch sử phân loại của máy vẫn được giữ trong Kiểm kê và Nhật ký.

:::info[Nhãn trong file vẫn còn]

Gỡ agent không xoá các nhãn đã ghi vào thuộc tính của file. DLP vẫn đọc được các nhãn này cho đến khi file được sửa bởi một công cụ xoá thuộc tính.

:::

## Gỡ server

Dừng toàn bộ dịch vụ nhưng **giữ lại dữ liệu**, ví dụ để chuyển sang máy chủ khác:

```powershell
docker compose -f docker-compose.deploy.yml down
```

Gỡ hoàn toàn, **xoá cả dữ liệu**:

```powershell
docker compose -f docker-compose.deploy.yml down -v
docker image rm dlp-server:local dlp-dashboard:local
```

:::danger[Không thể khôi phục]

Tuỳ chọn `-v` xoá toàn bộ cơ sở dữ liệu gồm cấu hình, nhãn và nhật ký. Hãy sao lưu trước khi thực hiện.

:::

Sau khi gỡ server, các agent còn cài trên máy trạm sẽ không kết nối được và chuyển sang chế độ offline. Hãy gỡ agent khỏi máy trạm trước khi gỡ server.
