---
sidebar_position: 1
title: Mức bảo mật & loại tài liệu
description: Bộ nhãn dùng chung cho toàn hệ thống, tách biệt mức bảo mật với loại nghiệp vụ của tài liệu.
---

Bộ nhãn, hay taxonomy, là danh sách các nhãn mà chính sách phân loại được phép gắn. Bộ nhãn dùng chung cho toàn hệ thống và được quản lý tại **Phân loại › Mức bảo mật & loại tài liệu**, gồm hai tab: **Mức bảo mật** và **Loại tài liệu**.

## Mức bảo mật

Mức bảo mật là một **thang có thứ tự**, mức trên cùng là mật nhất. Khi một file khớp nhiều điều kiện, agent chọn mức mật nhất theo đúng thứ tự này, vì vậy thứ tự thang quan trọng không kém tên gọi.

Để sắp xếp lại thang, kéo biểu tượng ⠿ ở đầu dòng rồi bấm **Lưu thứ tự**. Hộp xác nhận cho biết thứ tự mới áp dụng cho bao nhiêu máy. Sau khi lưu, agent phân loại lại file theo thứ tự mới; nhãn đã ghi trong từng file chỉ thay đổi khi file đó được quét lại.

![Thang mức bảo mật, kéo ⠿ để đổi thứ tự](/img/console/taxonomy.png)

Để thêm mức mới, bấm **Nhãn mới**, đặt tên, chọn màu và chọn vị trí trong thang bằng trường **Mật hơn nhãn**. Bạn có thể đổi tên hiển thị và màu của mọi mức cho phù hợp với quy chế bảo mật của tổ chức.

Một số nhãn là **nhãn hệ thống**: chúng không thể tắt hoặc xoá vì agent và báo cáo dựa vào chúng. **Pending review** (Chờ rà soát) không thuộc thang mật mà là một trạng thái, dùng cho quy trình duyệt.

### Tài liệu chưa gắn nhãn

Một tài liệu không khớp điều kiện mức bảo mật nào sẽ ở trạng thái **Chưa gắn nhãn**. NextDLP không tự coi tài liệu đó là công khai; nếu muốn một nhóm tài liệu được gắn Công khai, hãy tạo điều kiện gắn đúng mức đó. Tài liệu không đọc được nội dung, ví dụ file đặt mật khẩu hoặc file hỏng, cũng ở trạng thái Chưa gắn nhãn kèm lý do.

## Loại tài liệu

Loại tài liệu mô tả nhóm nghiệp vụ như Tài chính, Nhân sự, Pháp lý hay Hợp đồng. Một tài liệu có thể thuộc nhiều loại cùng lúc.

Loại tài liệu có thể **phân cấp không giới hạn**. Bấm **Thêm loại con** trên một loại để tạo loại con, ví dụ Tài chính › Báo cáo tài chính › Báo cáo quý. Khi một tài liệu được gắn loại con, nhãn ghi vào file bao gồm cả các loại cha của nó, giúp DLP áp dụng quy tắc theo nhóm lớn.

![Cây loại tài liệu](/img/console/taxonomy-doc-types.png)

Mỗi loại có tên, màu và trạng thái **Đang dùng** hoặc **Ngừng dùng**. Một loại còn loại con thì phải ngừng dùng hoặc xoá các loại con trước.

:::tip[Khuyến nghị]

Chuyển nhãn sang trạng thái **Ngừng dùng** thay vì xoá, để giữ nguyên lịch sử phân loại của các tài liệu đã gắn nhãn đó.

:::
