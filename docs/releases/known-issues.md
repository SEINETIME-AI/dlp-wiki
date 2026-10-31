---
sidebar_position: 4
title: Lỗi đã biết
description: Các lỗi còn tồn tại trong phiên bản hiện tại và cách xử lý tạm thời.
---

Trang này liệt kê những hạn chế đã biết của phiên bản hiện tại, cùng cách xử lý tạm thời nếu có. Danh sách được cập nhật theo từng bản phát hành.

## Triển khai và vận hành

### Server không tự chạy lại sau khi khởi động lại máy chủ

Với gói cài đặt V1, sau khi máy chủ hoặc Docker khởi động lại, các dịch vụ NextDLP không tự chạy. Agent vẫn tự kết nối lại khi server hoạt động trở lại.

**Cách xử lý:** mở PowerShell trong thư mục cài đặt và chạy `docker compose -f docker-compose.deploy.yml up -d`. Đã khắc phục trong [bản tiếp theo](./next.md).

### Cổng tra nhãn cho DLP chưa được mở

Dịch vụ `LabelLookupService` chạy bên trong server nhưng gói cài đặt chưa mở cổng của nó ra mạng nội bộ, và chưa có màn hình quản lý DLP client trên Console.

**Cách xử lý:** dùng cách đọc nhãn ghi trong file (xem [Kết nối DLP](../integrations/dlp.md)), hoặc liên hệ đội hỗ trợ để được hướng dẫn mở cổng. DLP client được tạo qua REST API.

### Script cài đặt có thể bị PowerShell chặn

**Cách xử lý:** chạy `powershell -ExecutionPolicy Bypass -File .\docker\load-and-start.ps1`.

## Phân loại

### Một số định dạng chưa được đọc đầy đủ

File Word định dạng cũ `.doc` chưa được hỗ trợ. Với bảng tính Excel, giá trị nhập dưới dạng số (ví dụ số căn cước gõ thẳng vào ô) chưa được đọc, nên các điều kiện dựa trên những giá trị này có thể không khớp.

**Cách xử lý:** lưu tài liệu `.doc` sang `.docx`. Với Excel, định dạng ô chứa mã số dưới dạng văn bản.

### File lớn trên 20 MB được phân tích giới hạn

Với gói cài đặt V1, kỹ thuật phân tích ngữ nghĩa không chạy cho file trên 20 MB, file PDF scan lớn chỉ được đọc lớp văn bản, và file lớn hơn ngưỡng "File tối đa" bị bỏ qua mà không hiện trên Console.

**Cách xử lý:** dùng điều kiện từ khoá, từ điển hoặc Hybrid cho các loại tài liệu thường có dung lượng lớn. Bản tiếp theo thay cơ chế này bằng Mức quét và cảnh báo "chưa phân tích đầy đủ", xem [Tệp lớn & mức phân tích](../data/large-files.md).

### Tài liệu chưa phân tích đầy đủ có thể mang nhãn thấp

Từ bản tiếp theo, tài liệu vượt giới hạn của Mức quét được gắn nhãn theo phần đã đọc. PDF và tài liệu Office lớn hơn ngưỡng đọc toàn bộ chỉ được đánh giá theo thông tin tệp, nên nhãn của chúng có thể thấp hơn thực tế.

**Cách xử lý:** định kỳ lọc Kiểm kê dữ liệu theo **Mức phân tích → Chưa phân tích đầy đủ** và rà soát, hoặc chọn Mức quét Sâu cho máy chủ tệp.

### OCR có thể mất dấu tiếng Việt ở chữ in hoa

Trên bản scan, cụm in hoa như "TUYỆT MẬT" có thể được đọc thành "TUYET MAT".

**Cách xử lý:** khi soạn điều kiện từ khoá cho tài liệu scan, thêm cả dạng không dấu của cụm từ.

### Nhận diện dấu mộc

Dấu mộc hình chữ nhật có thể không được nhận diện, và tiêu đề, logo hoặc vòng tròn màu đỏ đôi khi bị nhận nhầm là dấu.

**Cách xử lý:** kết hợp điều kiện dấu mộc với từ khoá trong một điều kiện Hybrid khi cần độ chính xác cao.

## Nhãn và đổi nhãn

### Đổi tên file làm mất liên kết với nhãn đã duyệt

Khi một file được đổi tên, hệ thống coi đó là tài liệu mới. Nhãn đã được quản lý điều chỉnh, lịch sử và yêu cầu đổi nhãn của tên cũ không đi theo file.

### Nhãn điều chỉnh bằng tay có thể bị ghi đè khi file được sửa

Khi một file đã được điều chỉnh nhãn bằng tay, sau đó lại được sửa nội dung, agent phân loại lại và có thể ghi nhãn tự động vào file, trong khi Console vẫn hiển thị nhãn đã điều chỉnh.

**Cách xử lý:** nếu tài liệu đó thường xuyên bị gắn sai, hãy điều chỉnh điều kiện trong chính sách phân loại thay vì sửa nhãn từng file.

### Không ghi được nhãn khi file đang mở

Nếu file đang được mở trong Word hoặc Excel lúc agent ghi nhãn, nhãn có thể chỉ hiển thị trên Console mà chưa được ghi vào file.

**Cách xử lý:** đóng file; nhãn sẽ được ghi ở lần file được lưu hoặc quét lại.
