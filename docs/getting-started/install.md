---
sidebar_position: 4
title: Cài đặt & kết nối
description: Hướng dẫn dựng server, cài agent lên máy trạm đầu tiên và kiểm tra kết nối. Thời gian dự kiến khoảng 15 phút.
---

import DownloadCard from '@site/src/components/DownloadCard';

Hướng dẫn này đưa bạn từ một máy chủ trống đến lúc máy trạm đầu tiên xuất hiện trên Console. Hãy kiểm tra [Yêu cầu hệ thống](./requirements.md) trước khi bắt đầu.

Trong các ví dụ dưới đây, `10.0.0.5` là địa chỉ IP của máy chủ NextDLP. Hãy thay bằng IP thật của bạn.

## Phần 1. Cài server

### Bước 1. Chuẩn bị gói cài đặt

Server được phân phối dưới dạng một file `dlp-stack-deploy-<phiên bản>.zip`, ví dụ `dlp-stack-deploy-1.0.0.zip`, chứa sẵn Docker image của Console và API, nên máy chủ không cần đăng nhập registry nào. Khi cài, gói tải PostgreSQL, Redis, nginx và Tika từ Docker Hub một lần, nên máy chủ cần có internet ở bước này. Với máy chủ không có internet, hãy liên hệ đội hỗ trợ NextDLP để nhận **bản offline đầy đủ** đã kèm sẵn các image này.

<DownloadCard />

Sau khi tải, bạn có thể đối chiếu mã SHA-256 của file bằng lệnh `Get-FileHash .\dlp-stack-deploy-1.0.0.zip` để chắc chắn file không bị hỏng trong quá trình tải: kết quả phải trùng với mã SHA-256 ghi trên ô tải ở trên.

Giải nén gói vào một thư mục cố định, ví dụ `C:\nextdlp`. Hãy giữ nguyên thư mục này trong suốt thời gian sử dụng, vì Docker gắn dữ liệu của hệ thống với tên thư mục.

### Bước 2. Khởi động server

Mở PowerShell **với quyền quản trị** trong thư mục vừa giải nén và chạy:

```powershell
Get-ChildItem -Recurse *.ps1 | Unblock-File
.\docker\load-and-start.ps1
```

Lệnh đầu tiên gỡ đánh dấu "tải từ internet" của Windows trên các script, để PowerShell cho phép chạy chúng.

Với bản offline đầy đủ trên máy chủ không có internet, thêm tuỳ chọn `-SkipPull`:

```powershell
.\docker\load-and-start.ps1 -SkipPull
```

Script nạp các image, khởi động toàn bộ dịch vụ và in ra địa chỉ truy cập khi xong.

:::tip[Script bị chặn?]

Nếu PowerShell báo không cho phép chạy script, hãy chạy lại bằng lệnh `powershell -ExecutionPolicy Bypass -File .\docker\load-and-start.ps1`.

:::

### Bước 3. Kiểm tra dịch vụ

Chạy lệnh sau và đảm bảo mọi dịch vụ ở trạng thái `running` hoặc `healthy`:

```powershell
docker compose -f docker-compose.deploy.yml ps
```

### Bước 4. Đăng nhập Console

Mở trình duyệt tới `https://10.0.0.5`. Lần đầu truy cập, trình duyệt cảnh báo về chứng chỉ vì server dùng chứng chỉ riêng do script cài đặt tạo ra; chọn **Advanced** rồi **Continue** để vào Console. Đăng nhập bằng tài khoản quản trị mặc định **admin / admin**.

![Màn hình đăng nhập Console](/img/console/login.png)

:::danger[Bắt buộc]

Console yêu cầu đặt mật khẩu mới ngay ở lần đăng nhập đầu tiên. Mật khẩu mới cần tối thiểu 12 ký tự. Sau này, bạn đổi mật khẩu bằng cách bấm vào tên tài khoản ở góc trên bên phải và chọn **Đổi mật khẩu**.

:::

## Phần 2. Chuẩn bị Console

Trước khi tạo bộ cài, Console cần có ít nhất một đơn vị và một chính sách Agent.

### Bước 5. Tạo đơn vị

Vào **Tổ chức › Cơ cấu tổ chức** và tạo một **Công ty con** (rồi thêm **Phòng ban** bên dưới) hoặc một **Ban chuyên môn**. Bộ cài luôn được gắn với một đơn vị lá: phòng ban của công ty con, hoặc chính ban chuyên môn. Xem [Cơ cấu tổ chức](../organization/org.md).

![Trang Cơ cấu tổ chức](/img/console/organization.png)

### Bước 6. Tạo chính sách Agent

Vào **Thiết bị & Agent › Chính sách Agent** và bấm **Chính sách Agent mới**. Giữ các giá trị mặc định là đủ cho lần đầu. Xem [Chính sách Agent](../endpoints/agent-policy.md).

![Trang Chính sách Agent](/img/console/agent-policies.png)

## Phần 3. Cài agent lên máy trạm

### Bước 7. Tạo bộ cài cho đơn vị

Vào **Thiết bị & Agent › Bộ cài Agent** và bấm **Tạo bộ cài mới**. Chọn Công ty con hoặc Ban chuyên môn, chọn phòng ban sẽ triển khai, chọn chính sách Agent vừa tạo, rồi nhập IP máy chủ vào ô **Agent server**.

![Hộp thoại Tạo bộ cài Agent, ô Agent server điền IP máy chủ](/img/console/agent-deployment-create.png)

:::warning[Không để trống ô Agent server]

Nếu để trống, agent sẽ kết nối về `localhost`, tức là chỉ hoạt động khi cài trên chính máy chủ. Máy trạm khác sẽ không bao giờ xuất hiện trên Console.

:::

### Bước 8. Tải và cài bộ cài

Khi bộ cài chuyển sang trạng thái **Sẵn sàng**, bấm **Tải bộ cài** để nhận một file zip. Chép file này sang máy trạm, giải nén, rồi chạy file `.msi` và chấp nhận hộp thoại quyền quản trị.

![Danh sách bộ cài ở trạng thái Sẵn sàng](/img/console/agent-deployment.png)

Muốn cài không cần thao tác, mở PowerShell với quyền quản trị trong thư mục đã giải nén và chạy:

```powershell
msiexec /i .\<tên-file>.msi /qn
Start-Service nextdlp
```

Vì bộ cài là file MSI chuẩn, bạn có thể dùng cùng lệnh này với công cụ phân phối phần mềm của tổ chức để cài hàng loạt.

### Bước 9. Kiểm tra kết nối

Trong vòng một phút, máy trạm xuất hiện tại **Thiết bị & Agent › Máy trạm** với trạng thái **Trực tuyến**, và số máy đã đăng ký của bộ cài tăng thêm một. Hệ thống cũng tự tạo một tài khoản Console cho máy này, xem [Người dùng & phân quyền](../organization/users.md).

![Máy trạm đã đăng ký ở trạng thái hoạt động](/img/console/endpoints.png)

Nếu máy không xuất hiện, xem [Xử lý sự cố](../operations/troubleshooting.md).

## Bước tiếp theo

Agent đã chạy nhưng chưa phân loại gì cho đến khi đơn vị có chính sách phân loại và nguồn dữ liệu. Làm tiếp theo [Phân loại tài liệu đầu tiên](./quickstart.md).
