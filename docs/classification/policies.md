---
sidebar_position: 3
title: Chính sách phân loại
description: Chính sách phân loại kết hợp các điều kiện nhận diện để gắn mức bảo mật và loại tài liệu cho file.
---

Chính sách phân loại là nơi bạn mô tả "tài liệu như thế nào thì gắn nhãn gì". Mỗi chính sách áp dụng cho một đơn vị và gồm nhiều **điều kiện**; mỗi điều kiện dùng một kỹ thuật nhận diện và gắn kết quả vào mức bảo mật, loại tài liệu hoặc cả hai. Bạn quản lý chính sách tại **Phân loại › Chính sách phân loại**.

Chính sách chỉ định nghĩa cách gắn nhãn. Phạm vi thư mục cần quét được cấu hình riêng tại [Nguồn dữ liệu](../data/sources.md).

## Tạo chính sách

Bấm **Chính sách mới**. Ở phần **Thông tin chung**, đặt tên, chọn đơn vị áp dụng và chọn chế độ OCR. Sau đó thêm các điều kiện ở phần **Điều kiện phân loại**, rồi bấm **Lưu & đẩy xuống agent**.

Chính sách mới luôn ở trạng thái **tắt** để bạn rà soát trước khi áp dụng. Khi đã sẵn sàng, bật công tắc **Kích hoạt**. Đơn vị áp dụng không thể thay đổi khi chính sách đang bật.

## Kỹ thuật nhận diện

Mỗi điều kiện dùng một trong các kỹ thuật dưới đây. Agent đánh giá đồng thời mọi điều kiện trên cùng một bộ tín hiệu của file.

| Kỹ thuật | Cách hoạt động | Phù hợp khi |
|---|---|---|
| Từ khóa / Regex | Khớp khi tìm thấy bất kỳ từ, cụm từ hoặc mẫu regex nào trong danh sách. | Tài liệu có dấu hiệu rõ ràng như "MẬT", "bảng lương", số căn cước. |
| Ngữ nghĩa (ML) | So khớp ý nghĩa nội dung với các câu mô tả mẫu, kể cả khi diễn đạt khác. | Nhận diện loại tài liệu theo chủ đề, ví dụ hợp đồng lao động. |
| Từ điển có trọng số | Cộng trọng số các thuật ngữ xuất hiện rồi so với ngưỡng. | Một từ đơn lẻ chưa đủ kết luận nhưng nhiều từ cùng xuất hiện thì đủ. |
| Hybrid | Kết hợp nhiều điều kiện con theo quy tắc "Tất cả", "Bất kỳ" hoặc "Ít nhất N". | Cần nhiều tín hiệu cùng lúc, ví dụ vừa có số căn cước vừa có cụm "hợp đồng lao động". |
| Dấu mộc | Nhận diện con dấu đỏ trên bản scan và hình ảnh, với ngưỡng độ tin cậy. | Hồ sơ giấy đã số hoá, công văn có đóng dấu. Mỗi chính sách có tối đa một điều kiện dấu mộc. |

Trong một điều kiện Từ khóa / Regex, các bộ khớp có quan hệ **HOẶC**: khớp một giá trị là đủ. Để bắt buộc nhiều tín hiệu cùng xuất hiện, hãy dùng **Hybrid** với tổ hợp **Tất cả điều kiện**.

Mỗi điều kiện có thể đặt một **Tên điều kiện** dễ hiểu, ví dụ "CCCD trong hồ sơ nhân sự". Tên này hiển thị trong Nhật ký phân loại và báo cáo thay cho mã quy tắc, giúp người xem hiểu ngay vì sao file bị gắn nhãn.

## Chọn kỹ thuật cho cả chính sách

Mục **Kỹ thuật phân loại** cho phép bật hoặc tắt từng kỹ thuật trong phạm vi một chính sách. Mặc định mọi kỹ thuật đều bật. Khi bạn bỏ chọn một kỹ thuật, các điều kiện thuộc kỹ thuật đó vẫn được lưu nhưng **không chạy** và hiển thị mờ, để bạn bật lại khi cần. Cần bật ít nhất một kỹ thuật.

Tính năng này hữu ích khi bạn muốn so sánh kết quả giữa các kỹ thuật, hoặc khi quy chế của tổ chức chỉ chấp nhận phân loại theo một phương pháp nhất định.

## Chế độ OCR

| Chế độ | Cách chạy |
|---|---|
| OCR cục bộ | Trích xuất văn bản và nhận diện dấu mộc chạy hoàn toàn trên máy trạm. |
| OCR hybrid | Chạy cục bộ trước, chỉ dùng AssistOCR khi ảnh hoặc bản scan không đọc được. |
| OCR máy chủ | AssistOCR chạy trước; nếu máy chủ OCR lỗi thì quay về xử lý cục bộ. |

Chế độ hybrid và máy chủ cần cấu hình AssistOCR tại **Hệ thống › Nhà cung cấp phân loại**. Nếu không dùng AssistOCR, hãy chọn OCR cục bộ.

## Phiên bản và đồng bộ

Mỗi lần lưu, chính sách được nâng phiên bản và đẩy xuống agent của các máy thuộc đơn vị. Trong ít phút, các máy trực tuyến sẽ nhận bản mới và phân loại lại tài liệu theo điều kiện mới.

Một đơn vị có thể có **nhiều chính sách đang bật**; agent nhận bản gộp điều kiện của tất cả. Để xem chính xác những gì agent của một đơn vị đang nhận, chọn đơn vị trong bộ lọc rồi bấm **Xem chính sách hiệu lực**. Màn hình này cũng cho biết đơn vị đang dùng chính sách riêng hay kế thừa từ công ty con.

## Nhập và xuất JSON

Tab **JSON** trong trình soạn chính sách cho phép xuất toàn bộ chính sách, gồm thông tin chung và các điều kiện, để lưu trữ hoặc chuyển sang hệ thống khác. Bạn cũng có thể dán hoặc **Nhập file** JSON rồi bấm **Áp dụng vào form** để tạo chính sách từ một bản có sẵn.

## Gợi ý điều kiện bằng AI

Quản trị hệ thống có thể dùng tab **Gợi ý AI** để mô tả chính sách bằng lời hoặc tải lên một tài liệu mẫu; hệ thống đề xuất các điều kiện để bạn sửa rồi bấm **Áp dụng vào điều kiện**. Gợi ý được tạo bởi mô hình chạy trên server của bạn, tài liệu mẫu không rời khỏi hệ thống. Khi mô hình chưa sẵn sàng, hệ thống vẫn tạo điều kiện từ văn bản trích xuất bằng phương pháp heuristic. Luôn rà soát điều kiện đề xuất trước khi lưu.
