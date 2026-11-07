---
sidebar_position: 3
title: Câu hỏi thường gặp
description: Giải đáp nhanh cho những câu hỏi được quan tâm nhiều nhất.
---

### NextDLP có thay thế DLP hiện tại không?

Không. NextDLP gắn nhãn cho tài liệu, còn DLP của bạn dựa vào nhãn đó để chặn hoặc cho phép.

### Dữ liệu có rời khỏi hệ thống của tôi không?

Không. Server, cơ sở dữ liệu và các mô hình đều chạy trong hạ tầng của bạn. Tính năng gợi ý điều kiện bằng AI trong Console cũng dùng mô hình chạy trên server nội bộ.

### Có bắt buộc dùng AD hay LDAP không?

Không. Cơ cấu tổ chức và tài khoản được quản lý trực tiếp trong Console.

### NextDLP đọc được tài liệu scan không?

Có. OCR và nhận diện dấu mộc chạy ngay trên máy trạm. AssistOCR tự host là tuỳ chọn cho ảnh và bản scan khó đọc.

### Agent có làm chậm máy không?

Agent quét ở chế độ nền của Windows, nên Word, Excel và các ứng dụng khác của người dùng luôn được ưu tiên. Agent chừa lại ít nhất một luồng CPU, tự giới hạn ở 20% tổng CPU của máy, chỉ đọc một tệp lớn mỗi lúc và tạm dừng khi Windows báo sắp hết bộ nhớ. Với máy cấu hình yếu, chọn Mức quét **Nhẹ** trong [Chính sách Agent](../endpoints/agent-policy.md#hiệu-năng--tài-nguyên-máy).

### Agent có bỏ qua file quá lớn không?

Không. Mọi file trong phạm vi quét đều xuất hiện trong Kiểm kê dữ liệu. File quá lớn, bản scan quá dài hay video được gắn nhãn theo phần đã đọc hoặc theo thông tin của tệp, kèm cảnh báo "chưa được phân tích đầy đủ". Xem [Tệp lớn & mức phân tích](../data/large-files.md).

### Có cần đặt lịch quét không?

Không. Agent theo dõi thư mục liên tục và tự phân loại file mới hoặc file vừa thay đổi.

### Vì sao một tài liệu ở trạng thái "Chưa gắn nhãn"?

Vì không có điều kiện mức bảo mật nào khớp với nội dung của nó, hoặc vì agent không đọc được nội dung, ví dụ file đặt mật khẩu. NextDLP không tự coi tài liệu đó là công khai. Mở sự kiện trong [Nhật ký phân loại](../classification/events.md) để xem lý do.

### Vì sao file này bị gắn nhãn Mật?

Mở sự kiện của file trong [Nhật ký phân loại](../classification/events.md). Phần giải thích cho biết điều kiện nào đã khớp và vì sao mức bảo mật được quyết định như vậy.

### Người dùng có tự sửa nhãn được không?

Không trực tiếp. Người dùng máy trạm gửi yêu cầu đổi nhãn trong Kiểm kê dữ liệu; Quản lý đơn vị hoặc Quản trị viên duyệt thì nhãn mới có hiệu lực. Xem [Kiểm kê dữ liệu & đổi nhãn](../data/inventory.md).

### Có đổi nhãn nhiều tài liệu hoặc cả thư mục cùng lúc được không?

Chưa. Đổi nhãn bằng tay được thực hiện cho từng tài liệu trong Kiểm kê dữ liệu. Để gắn nhãn hàng loạt, hãy tạo điều kiện trong chính sách phân loại: agent tự phân loại lại mọi tệp trong [Nguồn dữ liệu](../data/sources.md) khi chính sách thay đổi.

### Có add-in cho Word, Excel và PowerPoint không?

Không. Agent ghi nhãn vào thuộc tính của tệp Office và PDF, và người dùng xem nhãn ngay trong ứng dụng tại **File › Info › Properties › Advanced Properties**, tab **Custom**. Việc đổi nhãn được thực hiện trên Console. Xem [Nhãn ghi trong tệp](../classification/file-labels.md).

### NextDLP có gắn nhãn email không?

Không. NextDLP phân loại tệp trên máy trạm và thư mục chia sẻ, không phân loại nội dung email. Khi một tệp Office hoặc PDF đã có nhãn được đính kèm vào email, nhãn đi cùng tệp đính kèm và hệ thống DLP đọc được nhãn đó.

### NextDLP có phân loại bản vẽ kỹ thuật và sơ đồ không?

Có, với bản vẽ và sơ đồ ở dạng PDF hoặc ảnh. Agent đọc chữ bằng OCR, dò dấu mộc, rồi phân loại theo từ khoá như ký hiệu bản vẽ, tên công trình, hoặc theo mô tả ngữ nghĩa. Tệp bản vẽ gốc như AutoCAD (`.dwg`, `.dxf`) hay Visio (`.vsdx`) chưa được đọc nội dung; agent chỉ đánh giá chúng theo thông tin tệp như tên, đường dẫn, kích thước và ngày tháng. Xem [Thông số kỹ thuật](../getting-started/specs.md#định-dạng-tệp).

### Từ khoá có bắt được khi gõ sai hoặc viết không dấu không?

Không. Từ khoá không phân biệt chữ hoa, chữ thường nhưng phải khớp đúng từng chữ, kể cả dấu tiếng Việt. Hãy thêm các biến thể thường gặp vào danh sách từ khoá, hoặc dùng biểu thức chính quy. Để nhận ra nội dung cùng ý nhưng diễn đạt khác, dùng kỹ thuật Ngữ nghĩa (ML). Xem [Nhận diện thông tin riêng của tổ chức](../classification/rules.md#nhận-diện-thông-tin-riêng-của-tổ-chức).

### Sửa chính sách có cần cài lại agent không?

Không. Khi bạn lưu chính sách, server đẩy phiên bản mới xuống agent và agent tự phân loại lại tài liệu trong vài phút.

### Một máy có thể thuộc nhiều đơn vị không?

Không. Mỗi máy thuộc một đơn vị. Bạn có thể chuyển máy sang đơn vị khác tại trang [Máy trạm](../endpoints/machines.md).
