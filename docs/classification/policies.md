---
sidebar_position: 3
title: Chính sách phân loại
description: Chính sách phân loại kết hợp các điều kiện nhận diện để gắn mức bảo mật và loại tài liệu cho tệp.
---

Chính sách phân loại là nơi bạn mô tả "tài liệu như thế nào thì gắn nhãn gì". Mỗi chính sách áp dụng cho một đơn vị và gồm nhiều **điều kiện**; mỗi điều kiện dùng một kỹ thuật nhận diện và gắn kết quả vào mức bảo mật, loại tài liệu hoặc cả hai. Bạn quản lý chính sách tại **Phân loại › Chính sách phân loại**.

Chính sách chỉ định nghĩa cách gắn nhãn. Phạm vi thư mục cần quét được cấu hình riêng tại [Nguồn dữ liệu](../data/sources.md).

![Danh sách chính sách phân loại](/img/console/policies.png)

## Tạo chính sách

Bấm **Chính sách mới**. Trình soạn chính sách có bốn tab: **Thông tin chung**, **Điều kiện phân loại**, **Gợi ý AI** và **JSON**. Ở tab Thông tin chung, nhập tên, chọn công ty con hoặc ban chuyên môn, chọn phòng ban áp dụng và chế độ OCR. Sau đó thêm các điều kiện ở tab Điều kiện phân loại, rồi bấm **Tạo chính sách**. Khi sửa một chính sách đã có, nút này là **Lưu & đẩy xuống agent**.

![Tab Thông tin chung](/img/console/policies-create.png)

Công tắc **Kích hoạt** mặc định bật, nên chính sách có hiệu lực ngay khi tạo. Tắt công tắc nếu bạn muốn lưu bản chưa áp dụng. Đơn vị áp dụng không thể thay đổi khi chính sách đang bật.

## Kỹ thuật nhận diện

Mỗi điều kiện dùng một trong các kỹ thuật dưới đây. Agent đánh giá đồng thời mọi điều kiện trên cùng một bộ tín hiệu của tệp.

| Kỹ thuật | Cách hoạt động | Phù hợp khi |
|---|---|---|
| Từ khóa / Regex | Khớp khi tìm thấy bất kỳ từ, cụm từ hoặc mẫu regex nào trong danh sách. | Tài liệu có dấu hiệu rõ ràng như "MẬT", "bảng lương", số căn cước. |
| Ngữ nghĩa (ML) | So khớp ý nghĩa nội dung với các câu mô tả mẫu, kể cả khi diễn đạt khác. | Nhận diện loại tài liệu theo chủ đề, ví dụ hợp đồng lao động. |
| Từ điển có trọng số | Cộng trọng số các thuật ngữ xuất hiện rồi so với ngưỡng. | Một từ đơn lẻ chưa đủ kết luận nhưng nhiều từ cùng xuất hiện thì đủ. |
| Hybrid | Kết hợp nhiều điều kiện con theo quy tắc "Tất cả", "Bất kỳ" hoặc "Ít nhất N". | Cần nhiều tín hiệu cùng lúc, ví dụ vừa có số căn cước vừa có cụm "hợp đồng lao động". |
| Dấu mộc | Nhận diện con dấu đỏ trên bản scan và hình ảnh, với ngưỡng độ tin cậy. Có thể nêu tên trên dấu để chỉ bắt dấu của đúng đơn vị (xem [Tên trên dấu mộc](#tên-trên-dấu-mộc)). | Hồ sơ giấy đã số hóa, công văn có đóng dấu. Mỗi chính sách có tối đa một điều kiện dấu mộc. |
| Bản vẽ kỹ thuật | Gói GPU nhận ra ảnh, bản scan, PDF hay bản vẽ AutoCAD là bản vẽ của ngành nào, kể cả khi gần như không có chữ (xem [Bản vẽ kỹ thuật](#bản-vẽ-kỹ-thuật)). | Bản vẽ điện, kiến trúc, kết cấu cần nhãn riêng mà không có từ khóa để bám vào. Cần gói GPU AssistOCR. |

Trong một điều kiện Từ khóa / Regex, các bộ khớp có quan hệ **HOẶC**: khớp một giá trị là đủ. Để bắt buộc nhiều tín hiệu cùng xuất hiện, hãy dùng **Hybrid** với tổ hợp **Tất cả điều kiện**.

Mỗi điều kiện có thể đặt một **Tên điều kiện** dễ hiểu, ví dụ "CCCD trong hồ sơ nhân sự". Tên này hiển thị trong Nhật ký phân loại và báo cáo thay cho mã quy tắc, giúp người xem hiểu ngay vì sao tệp bị gắn nhãn.

![Hộp thoại Thêm điều kiện phân loại](/img/console/policies-condition.png)

## Tạo loại tài liệu khi đang thêm điều kiện

Quản trị hệ thống có thể tạo loại tài liệu mới ngay trong hộp thoại Thêm điều kiện phân loại, không phải đóng hộp thoại để sang trang [Mức bảo mật & loại tài liệu](./taxonomy.md). Quản lý đơn vị không thấy dòng tạo này và cần nhờ Quản trị hệ thống tạo giúp.

Mở ô **Loại tài liệu** và gõ tên loại cần tìm. Cuối danh sách có dòng **Tạo loại tài liệu “…”** kèm tên bạn vừa gõ. Chọn dòng đó; khi không có loại nào khớp, bạn cũng có thể nhấn Enter.

Hộp thoại **Loại tài liệu mới** điền sẵn tên bạn vừa gõ. Hãy chọn loại cha nếu loại này thuộc một nhánh có sẵn; để trống thì loại mới thành một nhánh gốc. Console tự đặt mã của loại từ tên, và bạn đổi được mã và màu trong **Tùy chọn thêm: mã và màu**. Bấm **Tạo và chọn**: loại mới được chọn ngay cho điều kiện, và các ô bạn đã nhập trong điều kiện được giữ nguyên. Ô **Loại tài liệu đích** ở tab Gợi ý AI cũng dùng được cách này.

Loại tài liệu tạo theo cách này dùng chung cho toàn hệ thống và vẫn còn kể cả khi bạn hủy chính sách đang soạn. Nếu tạo nhầm, hãy ngừng dùng hoặc xóa loại đó tại [Mức bảo mật & loại tài liệu](./taxonomy.md#loại-tài-liệu). Mức bảo mật mới vẫn được tạo tại trang đó, không tạo được từ hộp thoại điều kiện.

## Tên trên dấu mộc

Mặc định điều kiện Dấu mộc khớp với mọi con dấu đủ ngưỡng. Khi bạn chỉ muốn gắn nhãn cho công văn đóng dấu của đúng đơn vị, ví dụ dấu của công ty mình chứ không phải dấu của đối tác trên cùng trang, hãy dùng mục **Tên trên dấu mộc**.

Bấm **Thêm tên trên dấu**, nhập **Tên trên dấu** và các **Từ khóa trên dấu** (3–60 ký tự, nhấn Enter sau mỗi từ khóa), ví dụ tên "Seinetime" với từ khóa `SEINETIME`. Agent đọc chữ trên vòng dấu và so với từ khóa, không phân biệt dấu tiếng Việt và hoa thường, chấp nhận vài ký tự đọc sai. Hãy dùng tên riêng của cơ quan, tổ chức hay cá nhân. Các từ chung như "Công ty", "TNHH", "Cổ phần", "Chi nhánh" có trên hầu hết con dấu nên bị bỏ qua.

Nếu có gói GPU AssistOCR, bạn không cần gõ tay. Bấm **Đọc từ ảnh dấu** và chọn một ảnh hoặc PDF có con dấu: tên đọc được trên dấu được điền sẵn để bạn kiểm tra trước khi lưu. Ảnh không được lưu lại.

Bật **Chỉ áp dụng khi khớp một trong các tên trên dấu này** để điều kiện chỉ khớp khi nhận ra đúng tên. Khi tắt, mọi con dấu vẫn khớp, và tên đọc được chỉ hiện trong giải thích sự kiện.

Khi chữ trên dấu không đọc được, do dấu in nhạt hoặc đóng đè chữ ký, agent tìm tên trong phần chữ ngay quanh con dấu, tức khối ký tên gồm chức danh, tên đơn vị và tên người ký. Tên ở xa như tiêu đề hay dòng "Kính gửi" không được tính. Phần giải thích sự kiện ghi rõ tên tìm thấy **trên dấu** hay **quanh dấu**. Con dấu đọc rõ nhưng ghi đơn vị khác thì không khớp.

Chỉ những con dấu đạt độ tin cậy từ 0,60 trở lên, hoặc từ ngưỡng của điều kiện nếu bạn đặt thấp hơn, mới được đọc chữ, và mỗi tài liệu đọc tối đa 6 con dấu. Con dấu cơ quan nhà nước có quốc huy và mực đỏ nhạt thường khó đọc chữ trên vòng dấu. Khi đó agent dựa vào tên trong khối ký tên, ví dụ "KT. THỦ TƯỚNG" ngay trên con dấu. Nếu khối ký tên không ghi tên cơ quan, hãy kết hợp thêm điều kiện từ khóa bằng Hybrid.

## Bản vẽ kỹ thuật

Nhiều bản vẽ gần như không có chữ để từ khóa bám vào, như một sơ đồ một sợi hay một mặt bằng bố trí ổ cắm. Điều kiện Bản vẽ kỹ thuật giao việc này cho gói GPU AssistOCR: mô hình thị giác nhìn hình và cho biết đây là bản vẽ của ngành nào.

Trong điều kiện, chọn một hoặc nhiều **Ngành bản vẽ**: Điện, Mạng máy tính, Kiến trúc, Kết cấu, Cơ khí, Cấp thoát nước. Khi bản vẽ thuộc một ngành đã chọn với đủ độ tin cậy, agent gắn mức bảo mật và loại tài liệu của điều kiện. **Độ tin cậy tối thiểu** nằm trong phần Nâng cao, và để trống thì dùng mức mặc định của server.

Điều kiện này áp dụng cho ảnh, bản scan, PDF và bản vẽ AutoCAD. Với tệp `.dwg` và `.dxf`, agent tự xét ngành trước, dựa trên tên lớp và tên block trong bản vẽ. Tệp chỉ được gửi lên gói GPU khi phần chữ chưa gắn được nhãn và agent không tự kết luận được ngành.

Có hai điều kiện để dùng được kỹ thuật này. Chính sách phải ở chế độ OCR hybrid hoặc máy chủ, và gói GPU AssistOCR phải đang chạy. Khi gói GPU chưa sẵn sàng, Console vẫn lưu điều kiện, nhưng điều kiện chỉ chạy khi gói GPU bật. Những tệp được gửi lên gói GPU theo điều kiện này được nêu ở [Luồng dữ liệu & bảo mật](../getting-started/data-flow.md#dữ-liệu-nào-rời-máy-trạm).

## Chọn kỹ thuật cho cả chính sách

Mục **Kỹ thuật phân loại** cho phép bật hoặc tắt từng kỹ thuật trong phạm vi một chính sách. Mặc định mọi kỹ thuật đều bật. Khi bạn bỏ chọn một kỹ thuật, các điều kiện thuộc kỹ thuật đó vẫn được lưu nhưng **không chạy** và hiển thị mờ, để bạn bật lại khi cần. Cần bật ít nhất một kỹ thuật.

![Tab Điều kiện phân loại với phần Kỹ thuật phân loại](/img/console/policies-conditions-tab.png)

Tính năng này hữu ích khi bạn muốn so sánh kết quả giữa các kỹ thuật, hoặc khi quy chế của tổ chức chỉ chấp nhận phân loại theo một phương pháp nhất định.

## Ngưỡng trước khi gắn nhãn

Mỗi kỹ thuật có một ngưỡng quyết định khi nào điều kiện đủ mạnh để agent tự gắn nhãn. Ngưỡng giúp tránh gắn nhãn chỉ vì một từ xuất hiện tình cờ, ví dụ một số căn cước duy nhất trong thư mời họp không nên khiến cả tài liệu bị gắn Mật.

| Kỹ thuật | Ngưỡng | Cách hoạt động |
|---|---|---|
| Từ khóa / Regex | **Số lần ≥** của từng bộ khớp | Giá trị phải xuất hiện ít nhất bấy nhiêu lần trong tài liệu. Để trống nghĩa là 1 lần. Agent đếm tối đa 1.000 lần, nên ngưỡng lớn hơn 1.000 không bao giờ đạt. |
| Từ điển có trọng số | **Ngưỡng kích hoạt** | Tổng trọng số các từ xuất hiện phải đạt ngưỡng. Để trống nghĩa là 1,0. Mỗi từ chỉ được tính một lần dù xuất hiện nhiều lần, nên ngưỡng đo **số từ khác nhau**, không đo tần suất. |
| Ngữ nghĩa (ML) | **Ngưỡng tương đồng** | Từ 0 đến 1, mặc định 0,7. Ngưỡng càng cao thì nội dung càng phải gần với câu mô tả. |
| Hybrid | **Ít nhất N điều kiện** | Cần ít nhất N điều kiện con khớp. Chọn **Tất cả điều kiện** khi mọi tín hiệu đều bắt buộc. |
| Dấu mộc | **Ngưỡng tin cậy dấu mộc** | Con dấu phải được nhận diện với độ tin cậy từ ngưỡng này trở lên. Ngưỡng nằm trong phần Nâng cao của điều kiện. |
| Bản vẽ kỹ thuật | **Độ tin cậy tối thiểu** | Từ 0 đến 1. Mô hình phải xếp bản vẽ vào ngành đã chọn với xác suất từ mức này trở lên. Để trống thì dùng mức mặc định của server. |

Ví dụ, để chỉ gắn Mật cho danh sách nhân sự chứ không phải mọi văn bản có nhắc tới một người, đặt **Số lần ≥** là 5 cho bộ khớp regex số căn cước. Một tài liệu có 4 số căn cước sẽ không khớp điều kiện này.

{/* TODO screenshot: hộp thoại Thêm điều kiện, kỹ thuật Từ khóa / Regex, một bộ khớp regex với ô "Số lần ≥" đặt 5 */}

Điều kiện con của Hybrid có thể là từ khóa, mẫu dữ liệu, ngữ nghĩa, từ điển, dấu mộc hoặc bản vẽ kỹ thuật. Mỗi điều kiện con dùng ngưỡng của kỹ thuật tương ứng, rồi tổ hợp Tất cả, Bất kỳ hoặc Ít nhất N quyết định cả điều kiện có khớp hay không.

## Chế độ OCR

| Chế độ | Cách chạy |
|---|---|
| OCR cục bộ | Trích xuất văn bản và nhận diện dấu mộc chạy hoàn toàn trên máy trạm. Toàn văn và bản scan không rời máy; chỉ kết quả phân loại và bằng chứng khớp được gửi về server (xem [Luồng dữ liệu & bảo mật](../getting-started/data-flow.md#dữ-liệu-nào-rời-máy-trạm)). |
| OCR hybrid | Ảnh được gửi cho AssistOCR. PDF được đọc trên máy trước; PDF có trang scan, gần như không có chữ hoặc còn trang scan chưa đọc được gửi tiếp cho AssistOCR. |
| OCR máy chủ | Mọi tệp ảnh và tệp PDF được gửi cho AssistOCR, kể cả PDF đã có lớp chữ. |

Ở cả ba chế độ, chữ trong tài liệu Office và tệp văn bản luôn được đọc trên máy trạm. Ở chế độ hybrid và máy chủ, khi máy trạm thiếu bộ nhớ hoặc đang chạm giới hạn CPU, bản scan cũng được gửi thẳng cho AssistOCR; nếu AssistOCR không trả lời, tệp được đọc trên máy ở lượt sau. Xem [Khi máy trạm nhờ AssistOCR](../getting-started/specs.md#khi-máy-trạm-nhờ-assistocr).

AssistOCR đọc chữ trên tối đa 8 trang đầu của một tệp PDF và tìm dấu mộc trên 2 trang đầu. Khi nhãn dựa vào phần chữ do AssistOCR đọc mà tệp dài hơn số trang đó, tệp được gắn cờ chưa phân tích đầy đủ.

Chế độ hybrid và máy chủ cần gói GPU AssistOCR đang chạy; trạng thái của gói hiển thị tại **Hệ thống › Nhà cung cấp phân loại** (xem [AssistOCR](../admin/system.md#assistocr)). Nếu không dùng AssistOCR, hãy chọn OCR cục bộ.

## Phiên bản và đồng bộ

Mỗi lần lưu, chính sách được nâng phiên bản và đẩy xuống agent của các máy thuộc đơn vị. Trong ít phút, các máy trực tuyến sẽ nhận bản mới và phân loại lại tài liệu theo điều kiện mới.

Một đơn vị có thể có **nhiều chính sách đang bật**; agent nhận bản gộp điều kiện của tất cả. Để xem chính xác những gì agent của một đơn vị đang nhận, chọn đơn vị trong bộ lọc rồi bấm **Xem chính sách hiệu lực**. Màn hình này cũng cho biết đơn vị đang dùng chính sách riêng hay kế thừa từ công ty con.

## Nhập và xuất JSON

Tab **JSON** trong trình soạn chính sách cho phép xuất toàn bộ chính sách, gồm thông tin chung và các điều kiện, để lưu trữ hoặc chuyển sang hệ thống khác. Bạn cũng có thể dán hoặc **Nhập file** JSON rồi bấm **Áp dụng vào form** để tạo chính sách từ một bản có sẵn.

## Gợi ý điều kiện bằng AI

Quản trị hệ thống có thể dùng tab **Gợi ý AI** để mô tả chính sách bằng lời hoặc tải lên một tài liệu mẫu; hệ thống đề xuất các điều kiện để bạn sửa rồi bấm **Áp dụng vào điều kiện**. Gợi ý được tạo bởi mô hình chạy trên server của bạn, tài liệu mẫu không rời khỏi hệ thống. Khi mô hình chưa sẵn sàng, hệ thống vẫn tạo điều kiện từ văn bản trích xuất bằng phương pháp heuristic. Luôn rà soát điều kiện đề xuất trước khi lưu. Xem [Viết mô tả cho Gợi ý AI](./ai-suggest.md) để biết cách viết mô tả và chọn tài liệu mẫu cho kết quả tốt nhất.
