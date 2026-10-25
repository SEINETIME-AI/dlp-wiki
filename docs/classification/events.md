---
sidebar_position: 4
title: Nhật ký phân loại
description: Nhật ký phân loại ghi lại mọi sự kiện từ máy trạm, kèm giải thích vì sao một file được gắn nhãn như vậy.
---

Nhật ký phân loại ghi lại mọi lần agent phân loại, phát hiện thay đổi hoặc gắn lại nhãn cho một file. Đây là nơi trả lời câu hỏi thường gặp nhất của người dùng: "vì sao file này bị gắn nhãn Mật?". Nhật ký nằm tại **Giám sát › Nhật ký phân loại**.

## Loại sự kiện

| Loại sự kiện | Ý nghĩa |
|---|---|
| Phân loại | File được gắn nhãn lần đầu, hoặc được gắn lại do nội dung hay chính sách thay đổi. |
| Xóa/di chuyển | File bị xoá hoặc di chuyển ra khỏi nguồn dữ liệu. |
| Can thiệp nhãn | Agent phát hiện nhãn ghi trong file bị thay đổi bằng tay. |
| Gắn lại nhãn | Agent khôi phục nhãn đúng sau khi phát hiện can thiệp. |

Bạn có thể lọc theo khoảng thời gian, máy, đơn vị và nhãn. Khi có tệp mới được phân loại, Console hiện thông báo nhỏ ở góc màn hình; bấm vào để mở sự kiện.

## Đọc giải thích của một sự kiện

Bấm vào một sự kiện để mở **Chi tiết sự kiện**. Phần đầu cho biết thông tin máy trạm, đường dẫn, chủ sở hữu file và nhãn cuối cùng. Phần giải thích chia theo từng khía cạnh: các quy tắc bảo mật đã chạy và quy tắc nào khớp, quyết định mức bảo mật cuối cùng, loại tài liệu, điểm phân tích ngữ nghĩa, kết quả nhận diện dấu mộc, lý do không đọc được nội dung nếu có, và phiên bản chính sách mà agent đã dùng.

Nếu bạn đặt **Tên điều kiện** khi soạn chính sách, tên đó hiển thị ở đây thay cho mã quy tắc.

Khi nhiều file có cùng nội dung, agent tái sử dụng kết quả phân loại trước đó. Những sự kiện này ghi chú rằng kết quả được lấy lại; hãy mở sự kiện phân loại đầu tiên của nội dung đó để xem lý do chi tiết.

## Xuất nhật ký

Bấm **Xuất CSV** hoặc **Xuất PDF** để tải nhật ký trong khoảng thời gian đã lọc. Mỗi dòng gồm thời gian, máy, IP, đơn vị, chủ sở hữu file, đường dẫn, nhãn, quy tắc đã khớp và đoạn nội dung khớp đã được che bớt. Toàn bộ nội dung file không bao giờ được xuất.

:::info Nhật ký không thể sửa

Nhật ký phân loại là bất biến và chỉ được ghi thêm, để bảo đảm giá trị kiểm toán. Để điều chỉnh nhãn của một tài liệu, hãy dùng [Kiểm kê dữ liệu & đổi nhãn](../data/inventory.md).

:::
