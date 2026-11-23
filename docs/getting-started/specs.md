---
sidebar_position: 6
title: Thông số kỹ thuật
description: Các mô hình AI NextDLP sử dụng, chính sách mô hình, định dạng tệp hỗ trợ, giới hạn xử lý và tài nguyên máy trạm.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Các con số trên trang này là giới hạn và mặc định của bản đang phát hành: agent đọc được định dạng nào, đọc đến đâu, và cần bao nhiêu tài nguyên của máy trạm. Khi một con số thay đổi, thay đổi đó được ghi trong [ghi chú phát hành](/releases).

## Mô hình AI

NextDLP dùng bốn mô hình, mỗi mô hình một việc. Ba mô hình đầu chạy trên máy trạm cùng agent. Mô hình thứ tư chạy trên server và chỉ phục vụ việc soạn chính sách. Khi chính sách phân loại cho phép, một phần việc của ba mô hình đầu được chuyển cho AssistOCR, xem [Khi máy trạm nhờ AssistOCR](#khi-máy-trạm-nhờ-assistocr).

<Cards>
  <Card title="Phân tích ngữ nghĩa" tag="Máy trạm">
    Mô hình ngôn ngữ đa ngữ, hỗ trợ tiếng Việt, chạy bằng CPU của máy trạm. So nội dung tài liệu với mô tả loại tài liệu bạn viết trong chính sách. Mô hình chỉ được nạp khi máy còn đủ bộ nhớ trống, và được giải phóng sau 15 phút không có tệp cần phân tích.
  </Card>
  <Card title="Đọc chữ (OCR)" tag="Máy trạm">
    Bộ nhận dạng chữ cho tiếng Việt và tiếng Anh. Đọc chữ trên ảnh và trên trang scan của PDF.
  </Card>
  <Card title="Dấu mộc và chữ ký" tag="Máy trạm">
    Mô hình thị giác máy tính do NextDLP huấn luyện riêng, nhận diện hai loại đối tượng: dấu mộc và chữ ký. Chạy trên ảnh và trên từng trang PDF, kể cả trang có chữ (để bắt dấu mộc dạng hình vẽ) và kể cả khi đã hết số trang OCR. Ảnh nhỏ hơn 150×150 điểm ảnh, như logo hay biểu tượng, được bỏ qua.
  </Card>
  <Card title="Gợi ý AI" tag="Server">
    Mô hình ngôn ngữ cỡ nhỏ chạy trên server, bằng CPU. Chỉ dùng cho tab Gợi ý AI khi soạn chính sách, không tham gia phân loại tệp trên máy trạm.
  </Card>
</Cards>

Ngoài các mô hình, phần lớn quyết định phân loại đến từ các quy tắc bạn soạn: từ khóa, biểu thức chính quy, từ điển có trọng số và quy tắc Hybrid. Những quy tắc này chạy trực tiếp trên toàn bộ nội dung đã đọc, không cần mô hình.

Gói GPU AssistOCR, nếu được cài, chạy thêm trên máy chủ GPU một mô hình đọc tài liệu và một mô hình nhìn hình vẽ cho điều kiện [Bản vẽ kỹ thuật](../classification/policies.md#bản-vẽ-kỹ-thuật).

## Chính sách mô hình

Các mô hình đều chạy trong hạ tầng của bạn. Mô hình trên máy trạm nằm trong bộ cài agent. Mô hình Gợi ý AI thuộc gói server: gói thường tải mô hình khi cài lần đầu, còn bản offline có sẵn. Nội dung tài liệu không được gửi tới dịch vụ AI bên ngoài, và hệ thống không cần kết nối internet để phân loại.

NextDLP không học từ dữ liệu của bạn. Các mô hình được dùng nguyên như khi phát hành: không huấn luyện lại, không tinh chỉnh, và không thu thập tài liệu của khách hàng để cải thiện mô hình.

Mỗi bản NextDLP đi kèm đúng một bộ mô hình đã được kiểm thử cùng các quy tắc phân loại. Khi mô hình thay đổi, thay đổi đó được ghi trong ghi chú phát hành, và bạn nhận nó bằng cách nâng cấp như các thành phần khác.

Người quyết định điều kiện là bạn. Gợi ý AI chỉ tạo bản nháp để bạn xem và sửa, và không điều kiện nào có hiệu lực cho tới khi chính sách được lưu. Trên máy trạm, agent gắn nhãn theo các điều kiện đã lưu, kèm giải thích quy tắc hay mô hình nào đã quyết định.

## Định dạng tệp

| Nhóm | Định dạng | Agent đọc gì |
|---|---|---|
| Văn bản | .txt, .log, .csv, .json, .xml, .yaml, .yml, .md | Toàn bộ nội dung |
| Office | .docx, .xlsx, .pptx | Nội dung văn bản, ô bảng tính, trang trình chiếu, và ảnh nhúng bên trong |
| PDF | .pdf | Lớp chữ; trang scan được đọc bằng OCR và dò dấu mộc |
| Ảnh | PNG, JPEG, BMP, TIFF, GIF | OCR và dò dấu mộc |
| Tệp nén | .zip, .rar, .7z, .tar, .gz, .tgz, .bz2, .tbz2, .xz, .txz, .zst | Từng tài liệu bên trong, kể cả tệp nén lồng nhau |
| Bản vẽ AutoCAD | .dwg, .dxf | Chữ trong bản vẽ và cấu trúc của bản vẽ (tên lớp, tên block). Nhãn không ghi vào tệp. |
| Định dạng khác | Video, ảnh đĩa, bản sao lưu, Office đời cũ (.doc, .xls, .ppt)... | Thông tin tệp (tên, đường dẫn, kích thước, ngày tháng) |

Nhãn được ghi ngược vào tệp Office (.docx, .xlsx, .pptx) và PDF dưới dạng thuộc tính tài liệu, để hệ thống DLP đọc được nhãn mà không cần kết nối tới server. Xem [Nhãn ghi trong tệp](../classification/file-labels.md).

Với bản vẽ AutoCAD, agent đọc tiêu đề, khung tên, ghi chú, bảng và thông tin gắn với đối tượng trong bản vẽ. Chữ viết bằng font tiếng Việt cũ (TCVN3, VNI) được chuyển sang Unicode. Sau phần chữ, agent ghi thêm cấu trúc của bản vẽ, mỗi dòng một thông tin, như `LAYER DIEN` hay `INSERT MBA x3` (block MBA được chèn ba lần). Nhờ vậy một bản vẽ ít chữ vẫn khớp được điều kiện từ khóa hoặc từ điển viết theo tên lớp và tên block.

## Giới hạn xử lý

### Agent đọc một tệp như thế nào

Hai yếu tố quyết định cách đọc một tệp: ngưỡng của Mức quét và bộ nhớ còn trống. Trước khi đọc, mỗi tệp giữ chỗ trong **hạn mức bộ nhớ** của agent, khoảng bốn lần dung lượng của tệp (xem [Tài nguyên trên máy trạm](#tài-nguyên-trên-máy-trạm)). "Ngưỡng đọc toàn bộ" dưới đây là dòng **Đọc toàn bộ tệp đến** của bảng [Giới hạn theo Mức quét](#giới-hạn-theo-mức-quét): 50 MB, 250 MB hoặc 2 GB.

Tệp chưa vượt ngưỡng, và hạn mức còn chỗ, thì được đọc toàn bộ. Ảnh và trang scan trong PDF được OCR tới giới hạn số trang của Mức quét, và được dò dấu mộc.

Tệp chưa vượt ngưỡng nhưng hạn mức không còn chỗ thì cách đọc tùy định dạng:

| Định dạng | Agent làm gì |
|---|---|
| Tệp văn bản trên 5 MB | Đọc hết theo từng đoạn 5 MB. |
| PDF đến 64 MB | Chờ tới lượt để được đọc nguyên, hoặc gửi trang scan cho AssistOCR nếu chính sách cho phép. |
| PDF trên 64 MB, hoặc PDF đã chờ quá lâu | Đọc theo từng đoạn. Chữ có sẵn trong tệp được đọc hết. Trang scan được dò dấu mộc nhưng không được OCR, và tệp được đánh dấu đọc chưa hết. |
| Office, ảnh và tệp văn bản nhỏ | Chờ tới lượt rồi được đọc nguyên. |

Tệp vượt ngưỡng đọc toàn bộ được đánh dấu đọc chưa hết. Nếu là tệp văn bản, agent chỉ đọc phần đầu và phần cuối, tổng cộng bằng ngưỡng đó. Với PDF, Office, ảnh và định dạng khác, agent không đọc nội dung mà chỉ đánh giá theo thông tin tệp: tên, đường dẫn, kích thước, ngày tháng.

Tệp nén không theo các quy tắc trên dựa vào kích thước của chính nó. Agent mở tệp nén và phân loại từng tài liệu bên trong, mỗi tài liệu tối đa 20 MB, trong giới hạn dung lượng giải nén và số tầng lồng nhau của Mức quét. Xem [Tệp lớn & mức phân tích](../data/large-files.md#xem-từng-tệp-bên-trong-tệp-nén).

Tệp chưa đủ chỗ được thử lại sau mỗi 10 giây. Sau 30 lần chờ, hoặc khi không còn tệp nào khác đang đọc, tệp được đọc ngay dù vượt hạn mức.

Tệp đọc chưa hết vẫn được gắn nhãn từ phần đã đọc. Console ghi rõ phần nào chưa đọc và vì sao, và mặc định tệp được gắn ít nhất **Chờ rà soát**. Xem [Tệp lớn & mức phân tích](../data/large-files.md).

### Giới hạn theo Mức quét

Phần lớn giới hạn đi theo **Mức quét** bạn chọn trong [Chính sách Agent](../endpoints/agent-policy.md#mức-quét):

| Giới hạn | Nhẹ | Chuẩn | Sâu |
|---|---|---|---|
| Đọc toàn bộ tệp đến | 50 MB | 250 MB | 2 GB |
| Số trang scan hoặc ảnh được OCR mỗi tệp | 20 | 100 | 500 |
| Thời gian tối đa cho một tệp | 10 phút | 30 phút | 60 phút |
| Dung lượng giải nén tối đa trong một tệp nén | 100 MB | 250 MB | 1 GB |
| Số tầng tệp nén lồng nhau được mở | 1 | 2 | 2 |

Thời gian agent tạm dừng vì giới hạn CPU hoặc vì máy thiếu bộ nhớ không tính vào **Thời gian tối đa cho một tệp**. Trên máy bận, tệp được đọc chậm hơn nhưng không bị cắt ngang, nên nhãn không phụ thuộc vào việc máy đang bận hay rảnh.

### Giới hạn chung

| Hạng mục | Giới hạn |
|---|---|
| Tệp nén | Mở tối đa 1.000 tệp bên trong. Tài liệu bên trong lớn hơn 20 MB không được đọc. |
| Tệp Office bất thường | Dừng đọc khi một phần bên trong phình lớn gấp hơn 100 lần lúc giải nén. |
| Phân tích ngữ nghĩa | Tối đa 128 đoạn cho mỗi tài liệu, mỗi đoạn khoảng 128 token. |
| Gợi ý AI từ tệp mẫu | Đọc khoảng 4.500 ký tự đầu của tệp mẫu, tức một đến hai trang. Tệp tải lên tối đa 10 MB. |
| Bản vẽ AutoCAD | Bước chuyển đổi một tệp .dwg tối đa 120 giây. |

Với tệp nén, khi đã giải nén đủ dung lượng của Mức quét thì agent dừng. Phần còn lại không được đọc và tệp được đánh dấu đọc chưa hết. Giới hạn 100 lần của tệp Office là để bảo vệ máy trước những tệp được nén với tỷ lệ bất thường.

Để phân tích ngữ nghĩa, văn bản được chia thành các đoạn khoảng 128 token (đơn vị từ của mô hình), hai đoạn liền nhau chung 32 token. Mỗi tài liệu được đánh giá tối đa 128 đoạn, khoảng 16.000 token, rải đều từ đầu đến cuối. Văn bản trên 256 KB được lấy mẫu từ 8 phần trải đều trước khi chia đoạn. Điểm của một loại tài liệu là trung bình của 3 đoạn khớp nhất, nên một đoạn lạc đề không làm điều kiện khớp. Với tài liệu dài hơn mức này, Console ghi rõ phân tích ngữ nghĩa chỉ dựa trên mẫu. Từ khóa, biểu thức và từ điển vẫn kiểm tra toàn bộ nội dung đã đọc.

Với tệp .dwg, khi bước chuyển đổi quá giờ hoặc tệp hỏng, tệp ở trạng thái Chưa gắn nhãn kèm lý do lỗi đọc. Bản vẽ giữ chỗ trong hạn mức bộ nhớ gấp 30 lần dung lượng tệp, so với 4 lần của các định dạng khác, nên bản vẽ rất lớn có thể chờ tới lượt khi máy bận.

### Ví dụ với Mức quét Chuẩn

| Tệp | Agent làm gì |
|---|---|
| Hợp đồng .docx 2 MB có ảnh chụp con dấu | Đọc toàn bộ chữ, OCR ảnh nhúng và dò dấu mộc trên ảnh. Tệp được đọc đầy đủ. |
| Hồ sơ PDF scan 80 trang, 15 MB | Tệp cần khoảng 60 MB trong hạn mức bộ nhớ, nên trên hầu hết máy được đọc nguyên ngay. Cả 80 trang được OCR và dò dấu mộc. Tệp được đọc đầy đủ. |
| Báo cáo PDF scan 300 trang, 60 MB | Khi hạn mức còn khoảng 240 MB, agent đọc nguyên tệp, OCR 100 trang đầu và dò dấu mộc trên cả 300 trang. Tệp được đánh dấu đọc chưa hết vì 200 trang chưa được OCR, và gắn ít nhất Chờ rà soát. Khi hạn mức không đủ, tệp chờ tới lượt, hoặc trang scan được gửi cho AssistOCR nếu chính sách cho phép. |
| Tệp nhật ký .log 600 MB | Tệp vượt 250 MB nên agent chỉ đọc 250 MB, gồm phần đầu và phần cuối tệp. Tệp được đánh dấu đọc chưa hết. |
| Tệp .zip 400 MB chứa 50 tài liệu | Agent mở từng tài liệu bên trong, bỏ qua tài liệu lớn hơn 20 MB, và dừng khi đã giải nén đủ 250 MB. Console liệt kê từng tài liệu chưa đọc kèm lý do. |
| Video .mp4 2 GB | Agent không đọc nội dung, chỉ đánh giá theo tên, đường dẫn, kích thước và ngày tháng. |

## Tài nguyên trên máy trạm

| Hạng mục | Thông số |
|---|---|
| Hệ điều hành | Windows 64-bit, chạy dưới dạng dịch vụ `nextdlp` |
| Dung lượng cài đặt | Khoảng 450 MB: chương trình agent khoảng 190 MB, các mô hình AI và dữ liệu OCR khoảng 250 MB |
| Bộ nhớ | Khuyến nghị máy có từ 8 GB RAM |
| Ưu tiên | Chạy ở chế độ nền của Windows, nhường CPU, ổ đĩa và bộ nhớ cho ứng dụng của người dùng |
| Kết nối mạng | Tới server qua cổng 9091 (gRPC), chỉ cần chiều từ máy trạm tới server |

Dữ liệu nội bộ và nhật ký của agent cần thêm một ít dung lượng, tăng theo số tệp được theo dõi. Khi mất mạng, agent vẫn phân loại theo chính sách đã lưu. Sự kiện chưa gửi được giữ trên máy và gửi bù khi có mạng lại.

### Bộ nhớ

Agent dùng tối đa **20% phần bộ nhớ đang trống** của máy, cộng với phần agent đang giữ, để hạn mức không co lại chỉ vì agent đang làm việc. Hạn mức không dưới 256 MB, để agent vẫn xử lý được khi máy đầy, và không vượt mức trần theo cỡ RAM ở bảng dưới. Mô hình ngữ nghĩa cần khoảng 360 MB lúc nạp và 265 MB khi đã nạp, nên chỉ được nạp khi hạn mức đủ chỗ.

Tệp không đủ chỗ trong hạn mức thì chờ tới lượt, như mô tả ở [Agent đọc một tệp như thế nào](#agent-đọc-một-tệp-như-thế-nào). Khi agent vượt hạn mức quá 30 giây, các bộ OCR và bộ dò dấu mộc dư được giải phóng, chỉ giữ một bộ mỗi loại. Mô hình ngữ nghĩa được giữ trong lúc còn tệp cần nó. Khi Windows báo bộ nhớ sắp cạn, agent giải phóng cả mô hình ngữ nghĩa, không nhận tệp mới và tạm dừng giữa chừng tệp đang đọc cho tới khi máy có lại bộ nhớ trống.

Khi không có tệp nào cần xử lý trong 3 phút, bộ OCR và bộ dò dấu mộc được giải phóng. Sau 15 phút, mô hình ngữ nghĩa cũng được giải phóng. Chúng được nạp lại khi có tệp mới.

### CPU và số tệp xử lý cùng lúc

Agent dùng tối đa **20% phần CPU mà các chương trình khác để trống**, và được ít nhất 2% CPU của máy để hàng đợi vẫn được xử lý. Ví dụ khi người dùng đang dùng 90% CPU, agent dùng khoảng 2%. Khi máy rảnh, agent dùng tới 20%. Agent kiểm tra mỗi 10 giây. Khi vượt mức, agent tạm dừng trước tệp tiếp theo và giữa các đoạn, các trang và các ảnh của tệp đang đọc, cho tới khi CPU giảm xuống.

Số tệp xử lý cùng lúc bằng số luồng CPU của máy trừ một, tối thiểu 1, và không vượt mức theo cỡ RAM ở bảng dưới. Ví dụ máy 2 luồng xử lý 1 tệp mỗi lúc, còn máy 8 luồng với 16 GB RAM xử lý 3 tệp. Tệp từ 20 MB trở lên được coi là tệp lớn và mất nhiều thời gian đọc. Số tệp lớn đọc cùng lúc bằng số tệp xử lý cùng lúc trừ một, tối thiểu 1, nên còn ít nhất một chỗ cho tệp nhỏ và chúng không phải chờ sau tệp lớn.

### Theo cỡ RAM của máy

Mỗi máy tự chọn cấu hình bộ nhớ theo tổng RAM của nó, bạn không cần cấu hình. Cấu hình này đặt mức trần, còn hạn mức bộ nhớ quyết định agent dùng bao nhiêu tại mỗi thời điểm. Trang [Máy trạm](../endpoints/machines.md) hiển thị RAM và cấu hình của từng máy, ví dụ "8 GB · Nhẹ".

| RAM của máy | Cấu hình | Số tệp xử lý cùng lúc tối đa | Bộ OCR và bộ dò dấu mộc | Phiên mô hình ngữ nghĩa | Hạn mức bộ nhớ tối đa |
|---|---|---|---|---|---|
| Dưới 12 GB | Nhẹ | 2 | 1 mỗi loại | 1 | 1 GB |
| Từ 12 GB đến dưới 24 GB | Chuẩn | 3 | 2 mỗi loại | 1 | 2 GB |
| Từ 24 GB | Đầy đủ | 4 | 4 mỗi loại | 2 | 4 GB |

Cấu hình bộ nhớ độc lập với **Mức quét**. Mức quét quyết định một tệp được đọc kỹ đến đâu, còn cấu hình bộ nhớ quyết định agent giữ được bao nhiêu thứ trong bộ nhớ cùng lúc.

## Khi máy trạm nhờ AssistOCR

Khi chính sách phân loại dùng chế độ OCR **hybrid** hoặc **máy chủ** và AssistOCR đang trả lời, agent chuyển một phần việc cho AssistOCR. Với chế độ OCR cục bộ, agent làm hết trên máy trạm.

Việc đọc chữ và dò dấu mộc trên bản scan được chuyển theo chế độ OCR của chính sách, xem [Chế độ OCR](../classification/policies.md#chế-độ-ocr). Ngoài ra, khi máy thiếu bộ nhớ cho tệp hoặc agent vừa phải chờ vì giới hạn CPU, trang scan của ảnh và PDF được gửi thẳng cho AssistOCR thay vì chờ trên máy. Điều kiện [Bản vẽ kỹ thuật](../classification/policies.md#bản-vẽ-kỹ-thuật) thì chỉ AssistOCR đánh giá được.

Điều kiện ngữ nghĩa vẫn được đánh giá trên máy trạm. Điểm nằm sát ngưỡng được AssistOCR đánh giá lại bằng mô hình lớn hơn. Máy chưa nạp được mô hình ngữ nghĩa vì thiếu bộ nhớ thì AssistOCR đánh giá toàn bộ điều kiện ngữ nghĩa, theo ngưỡng chung của AssistOCR thay vì ngưỡng riêng của từng điều kiện. Việc này cần AssistOCR có bật phân tích ngữ nghĩa. Nếu không, các điều kiện đó chưa được đánh giá cho tới khi máy đủ bộ nhớ.

Chữ trong tài liệu Office và tệp văn bản được đọc trên máy trạm ở cả ba chế độ. Nếu AssistOCR không trả lời, tệp được đọc trên máy ở lượt sau, và agent chờ 5 phút trước khi nhờ AssistOCR thay cho các tệp khác.

Khi AssistOCR đang bận hoặc đã hết quota trong ngày, agent gắn nhãn tệp theo phần tự đọc được rồi hỏi lại AssistOCR sau đó. Với tệp đang chờ gói GPU xem hình, chi tiết sự kiện ghi lý do **Đang chờ kiểm tra hình ảnh**. Sau một số lần hỏi lại mà vẫn chưa có kết quả, nhãn từ phần agent tự đọc được giữ nguyên.
