---
sidebar_position: 3
title: Câu hỏi thường gặp
description: Giải đáp nhanh cho những câu hỏi được quan tâm nhiều nhất.
---

### NextDLP có thay thế DLP hiện tại không?

Không. NextDLP gắn nhãn cho tài liệu, còn DLP của bạn dựa vào nhãn đó để chặn hoặc cho phép. Xem [Kết nối DLP](../integrations/dlp.md).

### Dữ liệu có rời khỏi hệ thống của tôi không?

Không. Server, cơ sở dữ liệu và các mô hình đều chạy trong hạ tầng của bạn. Tính năng gợi ý điều kiện bằng AI trong Console cũng dùng mô hình chạy trên server nội bộ.

### Có bắt buộc dùng AD hay LDAP không?

Không. Cơ cấu tổ chức và tài khoản được quản lý trực tiếp trong Console.

### NextDLP đọc được tài liệu scan không?

Có. OCR và nhận diện dấu mộc chạy ngay trên máy trạm. AssistOCR tự host là tuỳ chọn cho ảnh và bản scan khó đọc.

### Agent có làm chậm máy không?

Agent chủ yếu dùng tài nguyên khi phân loại file mới hoặc file vừa sửa, và tốn nhiều hơn với file lớn hoặc bản scan cần OCR. Bạn giới hạn kích thước file được quét trong [Chính sách Agent](../endpoints/agent-policy.md) và [Nguồn dữ liệu](../data/sources.md).

### Có cần đặt lịch quét không?

Không. Agent theo dõi thư mục liên tục và tự phân loại file mới hoặc file vừa thay đổi.

### Vì sao một tài liệu ở trạng thái "Chưa gắn nhãn"?

Vì không có điều kiện mức bảo mật nào khớp với nội dung của nó, hoặc vì agent không đọc được nội dung, ví dụ file đặt mật khẩu. NextDLP không tự coi tài liệu đó là công khai. Mở sự kiện trong [Nhật ký phân loại](../classification/events.md) để xem lý do.

### Vì sao file này bị gắn nhãn Mật?

Mở sự kiện của file trong [Nhật ký phân loại](../classification/events.md). Phần giải thích cho biết điều kiện nào đã khớp và vì sao mức bảo mật được quyết định như vậy.

### Người dùng có tự sửa nhãn được không?

Không trực tiếp. Người dùng máy trạm gửi yêu cầu đổi nhãn trong Kiểm kê dữ liệu; Quản lý đơn vị hoặc Quản trị viên duyệt thì nhãn mới có hiệu lực. Xem [Kiểm kê dữ liệu & đổi nhãn](../data/inventory.md).

### Sửa chính sách có cần cài lại agent không?

Không. Khi bạn lưu chính sách, server đẩy phiên bản mới xuống agent và agent tự phân loại lại tài liệu trong vài phút.

### Một máy có thể thuộc nhiều đơn vị không?

Không. Mỗi máy thuộc một đơn vị. Bạn có thể chuyển máy sang đơn vị khác tại trang [Máy trạm](../endpoints/machines.md).
