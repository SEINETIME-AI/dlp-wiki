---
sidebar_position: 6
title: Thông số kỹ thuật
description: Các mô hình AI NextDLP sử dụng, chính sách mô hình, định dạng tệp hỗ trợ, giới hạn xử lý và tài nguyên máy trạm.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Trang này tổng hợp các thông số của NextDLP: mô hình AI nào chạy ở đâu, agent đọc được những định dạng nào, đọc đến đâu và cần tài nguyên gì. Chúng tôi sẽ tiếp tục tối ưu ở các bản sau và cập nhật trang này cùng mỗi [bản phát hành](/releases).

## Mô hình AI

NextDLP dùng bốn mô hình, mỗi mô hình một việc. Ba mô hình đầu chạy trên máy trạm, cùng agent; mô hình thứ tư chạy trên server và chỉ phục vụ quản trị viên khi soạn chính sách. Khi chính sách phân loại cho phép, một phần việc của ba mô hình đầu được chuyển cho AssistOCR; xem [Khi máy trạm nhờ AssistOCR](#khi-máy-trạm-nhờ-assistocr).

<Cards>
  <Card title="Phân tích ngữ nghĩa" tag="Máy trạm">
    Mô hình ngôn ngữ đa ngữ, hỗ trợ tiếng Việt, chạy bằng CPU của máy trạm. So nội dung tài liệu với mô tả loại tài liệu do quản trị viên viết. Mô hình chỉ được nạp khi máy còn đủ bộ nhớ trống, và được giải phóng sau 15 phút không có tệp cần phân tích.
  </Card>
  <Card title="Đọc chữ (OCR)" tag="Máy trạm">
    Bộ nhận dạng chữ cho tiếng Việt và tiếng Anh. Đọc chữ trên ảnh và trên trang scan của PDF.
  </Card>
  <Card title="Dấu mộc và chữ ký" tag="Máy trạm">
    Mô hình thị giác máy tính do NextDLP huấn luyện riêng, nhận diện hai loại đối tượng: dấu mộc và chữ ký. Chạy trên mọi ảnh và mọi trang PDF, kể cả trang có chữ (để bắt dấu mộc dạng hình vẽ) và kể cả khi đã hết số trang OCR. Ảnh nhỏ hơn 150×150 điểm ảnh, như logo hay biểu tượng, được bỏ qua.
  </Card>
  <Card title="Gợi ý AI" tag="Server">
    Mô hình ngôn ngữ cỡ nhỏ chạy trên server, bằng CPU. Chỉ dùng cho tab Gợi ý AI khi soạn chính sách; không tham gia phân loại tệp trên máy trạm.
  </Card>
</Cards>

Ngoài các mô hình, phần lớn quyết định phân loại đến từ các quy tắc bạn soạn: từ khoá, biểu thức chính quy, từ điển có trọng số và quy tắc Hybrid. Những quy tắc này chạy trực tiếp trên toàn bộ nội dung đã đọc, không cần mô hình.

## Chính sách mô hình

**Mọi mô hình chạy trong hạ tầng của bạn.** Mô hình trên máy trạm nằm trong bộ cài agent, mô hình Gợi ý AI nằm trong gói server. Nội dung tài liệu không được gửi tới dịch vụ AI bên ngoài, và hệ thống không cần kết nối internet để phân loại.

**Không học từ dữ liệu của bạn.** Các mô hình được dùng nguyên như khi phát hành. NextDLP không huấn luyện lại, không tinh chỉnh và không thu thập tài liệu của khách hàng để cải thiện mô hình.

**Phiên bản mô hình cố định theo bản phát hành.** Mỗi bản NextDLP đi kèm đúng một bộ mô hình đã được kiểm thử cùng các quy tắc phân loại. Khi mô hình thay đổi, thay đổi đó được ghi trong ghi chú phát hành, và bạn nhận nó bằng cách nâng cấp như mọi thành phần khác.

**AI chỉ đề xuất, con người quyết định.** Gợi ý AI tạo bản nháp điều kiện để quản trị viên xem và sửa; không điều kiện nào có hiệu lực cho tới khi quản trị viên lưu chính sách. Trên máy trạm, mỗi nhãn đều kèm phần giải thích quy tắc hay mô hình nào đã quyết định.

## Định dạng tệp

| Nhóm | Định dạng | Agent đọc gì |
|---|---|---|
| Văn bản | .txt, .log, .csv, .json, .xml, .yaml, .yml, .md | Toàn bộ nội dung |
| Office | .docx, .xlsx, .pptx | Nội dung văn bản, ô bảng tính, trang trình chiếu, và ảnh nhúng bên trong |
| PDF | .pdf | Lớp chữ; trang scan được đọc bằng OCR và dò dấu mộc |
| Ảnh | PNG, JPEG, BMP, TIFF, GIF | OCR và dò dấu mộc |
| Tệp nén | .zip, .rar, .7z, .tar, .gz, .tgz, .bz2, .tbz2, .xz, .txz, .zst | Từng tài liệu bên trong, kể cả tệp nén lồng nhau |
| Định dạng khác | Video, ảnh đĩa, bản sao lưu, Office đời cũ (.doc, .xls, .ppt)... | Thông tin tệp (tên, đường dẫn, kích thước, ngày tháng) |

Nhãn được ghi ngược vào tệp Office (.docx, .xlsx, .pptx) và PDF dưới dạng thuộc tính tài liệu, để hệ thống DLP đọc được ngay cả khi không kết nối tới server. Xem [Nhãn ghi trong tệp](../classification/file-labels.md).

## Giới hạn xử lý

### Agent đọc một tệp như thế nào

Không có ngưỡng dung lượng cố định nào quyết định agent đọc nguyên tệp hay đọc từng phần. Trước khi đọc, mỗi tệp giữ chỗ trong **ngân sách bộ nhớ** của agent, khoảng bốn lần dung lượng của tệp (xem [Tài nguyên trên máy trạm](#tài-nguyên-trên-máy-trạm)). Ngân sách còn chỗ thì tệp được đọc nguyên; không còn chỗ thì cách đọc tùy định dạng. "Ngưỡng đọc toàn bộ" là dòng **Đọc toàn bộ tệp đến** trong bảng [Giới hạn theo Mức quét](#giới-hạn-theo-mức-quét) bên dưới (50 MB, 250 MB hoặc 2 GB).

| Trường hợp | Agent làm gì |
|---|---|
| Chưa vượt ngưỡng đọc toàn bộ, ngân sách bộ nhớ còn chỗ | Đọc toàn bộ nội dung. Ảnh và trang scan trong PDF được OCR tới giới hạn số trang của Mức quét, và được dò dấu mộc. |
| Chưa vượt ngưỡng đọc toàn bộ, ngân sách bộ nhớ không còn chỗ | **Tệp văn bản trên 5 MB:** đọc hết theo từng đoạn 5 MB, không bỏ sót nội dung.<br/>**PDF đến 64 MB:** chờ tới lượt để được đọc nguyên, hoặc gửi trang scan cho AssistOCR nếu chính sách cho phép.<br/>**PDF trên 64 MB, hoặc PDF đã chờ quá lâu:** đọc theo từng đoạn. Chữ có sẵn trong tệp (PDF xuất từ Word, Excel…) được đọc hết; trang scan được dò dấu mộc nhưng **không được đọc chữ (OCR)**, và tệp được đánh dấu đọc chưa hết.<br/>**Office, ảnh và tệp văn bản nhỏ:** chờ tới lượt rồi được đọc nguyên. |
| Vượt ngưỡng đọc toàn bộ | **Tệp văn bản:** chỉ đọc phần đầu và phần cuối, tổng cộng bằng ngưỡng đó.<br/>**PDF, Office, ảnh và định dạng khác:** không đọc nội dung, chỉ đánh giá theo thông tin tệp (tên, đường dẫn, kích thước, ngày tháng).<br/>Tệp được đánh dấu đọc chưa hết. |

**Tệp nén** không áp dụng bảng trên theo kích thước của chính tệp nén. Agent mở tệp nén và phân loại từng tài liệu bên trong (mỗi tài liệu tối đa 20 MB), trong giới hạn dung lượng giải nén và số tầng lồng nhau của Mức quét. Xem [Tệp lớn & mức phân tích](../data/large-files.md#xem-từng-tệp-bên-trong-tệp-nén).

Không tệp nào phải chờ mãi. Tệp chưa đủ chỗ được thử lại sau mỗi 10 giây; sau 30 lần chờ, hoặc khi không còn tệp nào khác đang đọc, tệp được đọc ngay dù vượt ngân sách.

Tệp đọc chưa hết không bị bỏ qua: tệp vẫn được gắn nhãn từ phần đã đọc, Console ghi rõ phần nào chưa đọc và vì sao, và mặc định tệp được gắn ít nhất **Chờ rà soát**. Xem [Tệp lớn & mức phân tích](../data/large-files.md).

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
| Tệp nén | Mở tối đa 1.000 tệp bên trong. Tài liệu bên trong lớn hơn 20 MB không được đọc. Khi đã giải nén đủ dung lượng của Mức quét, agent dừng; phần còn lại không được đọc và tệp được đánh dấu đọc chưa hết. |
| Tệp Office bất thường | Tệp .docx, .xlsx, .pptx có một phần bên trong phình lớn gấp hơn 100 lần khi giải nén (zip bomb) sẽ dừng đọc để bảo vệ máy. |
| Phân tích ngữ nghĩa | Văn bản được chia thành các đoạn khoảng 128 token, hai đoạn liền nhau chung 32 token. Mỗi tài liệu được chấm tối đa 128 đoạn, khoảng 16.000 token, rải đều từ đầu đến cuối; văn bản trên 256 KB được lấy mẫu từ 8 phần trải đều trước khi chia đoạn. Điểm của một loại tài liệu là trung bình của 3 đoạn khớp nhất, nên một đoạn lạc đề không làm luật khớp. Với tài liệu dài hơn mức này, Console ghi rõ phân tích ngữ nghĩa chỉ dựa trên mẫu; từ khoá, biểu thức và từ điển vẫn kiểm tra toàn bộ nội dung đã đọc. |
| Gợi ý AI từ tệp mẫu | Mô hình đọc khoảng 4.500 ký tự đầu của tệp mẫu (một đến hai trang); tệp tải lên tối đa 10 MB. |

### Ví dụ với Mức quét Chuẩn

**Hợp đồng .docx 2 MB có ảnh chụp con dấu.** Agent đọc toàn bộ chữ, OCR ảnh nhúng và dò dấu mộc trên ảnh. Tệp được đọc đầy đủ.

**Hồ sơ PDF scan 80 trang, 15 MB.** Tệp cần khoảng 60 MB trong ngân sách bộ nhớ, nên trên hầu hết máy được đọc nguyên ngay: mọi trang được OCR (dưới giới hạn 100 trang) và dò dấu mộc. Tệp được đọc đầy đủ.

**Báo cáo PDF scan 300 trang, 60 MB.** Khi ngân sách còn khoảng 240 MB, agent đọc nguyên tệp, OCR 100 trang đầu và dò dấu mộc trên cả 300 trang. Tệp được đánh dấu đọc chưa hết vì 200 trang chưa được OCR, và gắn ít nhất Chờ rà soát. Khi ngân sách không đủ, tệp chờ tới lượt, hoặc trang scan được gửi cho AssistOCR nếu chính sách cho phép.

**Tệp nhật ký .log 600 MB.** Tệp vượt 250 MB nên agent chỉ đọc 250 MB, gồm phần đầu và phần cuối tệp. Tệp được đánh dấu đọc chưa hết.

**Tệp .zip 400 MB chứa 50 tài liệu.** Agent mở từng tài liệu bên trong, bỏ qua tài liệu lớn hơn 20 MB, và dừng khi đã giải nén đủ 250 MB. Console liệt kê từng tài liệu chưa đọc kèm lý do.

**Video .mp4 2 GB.** Agent không đọc nội dung, chỉ đánh giá theo tên, đường dẫn, kích thước và ngày tháng.

## Tài nguyên trên máy trạm

| Hạng mục | Thông số |
|---|---|
| Hệ điều hành | Windows 64-bit, chạy dưới dạng dịch vụ `nextdlp` |
| Dung lượng cài đặt | Khoảng 450 MB: chương trình agent khoảng 190 MB, các mô hình AI và dữ liệu OCR khoảng 250 MB. Dữ liệu nội bộ và nhật ký cần thêm một ít, tăng theo số tệp được theo dõi. |
| Bộ nhớ | Khuyến nghị máy có từ 8 GB RAM. Agent dùng tối đa **20% phần bộ nhớ đang trống** của máy, cộng với phần agent đang giữ để ngân sách không co lại chỉ vì agent đang làm việc. Ngân sách không dưới 256 MB, để agent vẫn tiến dù máy đầy, và không vượt mức trần theo cỡ RAM ở bảng dưới. Mô hình ngữ nghĩa cần khoảng 360 MB lúc nạp và 265 MB khi đã nạp, nên chỉ được nạp khi ngân sách đủ chỗ. |
| Số tệp xử lý cùng lúc | Số luồng CPU của máy trừ một, tối thiểu 1, và không vượt mức theo cỡ RAM ở bảng dưới. Ví dụ máy 2 luồng xử lý 1 tệp mỗi lúc; máy 8 luồng với 16 GB RAM xử lý 3 tệp. Tệp từ 20 MB trở lên cần nhiều thời gian, nên số tệp lớn đọc cùng lúc ít hơn số trên một tệp (tối thiểu 1), để tệp nhỏ không phải chờ sau tệp lớn. |
| Ưu tiên | Chạy ở chế độ nền của Windows, nhường CPU, ổ đĩa và bộ nhớ cho ứng dụng của người dùng |
| Giới hạn CPU | Agent dùng tối đa **20% phần CPU mà các chương trình khác để trống**, và luôn được ít nhất 2% CPU của máy để hàng đợi vẫn tiến. Ví dụ khi người dùng đang dùng 90% CPU, agent dùng khoảng 2%; khi máy rảnh, agent dùng tới 20%. Agent kiểm tra mỗi 10 giây; khi vượt mức, agent tạm dừng trước tệp tiếp theo và giữa các đoạn, các trang và các ảnh của tệp đang đọc, cho tới khi CPU giảm xuống. |
| Khi máy thiếu bộ nhớ | Tệp không đủ chỗ trong ngân sách chờ tới lượt, như mô tả ở [Agent đọc một tệp như thế nào](#agent-đọc-một-tệp-như-thế-nào). Khi agent vượt ngân sách quá 30 giây, các bộ OCR và bộ dò dấu mộc dư được giải phóng, chỉ giữ một bộ mỗi loại. Mô hình ngữ nghĩa được giữ trong lúc còn tệp cần nó, trừ khi Windows báo bộ nhớ sắp cạn. Khi Windows báo bộ nhớ sắp cạn, agent không nhận tệp mới và tạm dừng giữa chừng tệp đang đọc cho tới khi máy thoáng trở lại. |
| Khi máy rảnh | Không có tệp nào cần xử lý trong 3 phút thì bộ OCR và bộ dò dấu mộc được giải phóng; trong 15 phút thì mô hình ngữ nghĩa được giải phóng. Chúng được nạp lại trong vài giây khi có tệp mới. |
| Kết nối mạng | Agent kết nối tới server qua cổng 9091 (gRPC), chỉ cần chiều từ máy trạm tới server. Khi mất mạng, agent vẫn phân loại theo chính sách đã lưu; sự kiện chưa gửi được giữ trên máy và gửi bù khi có mạng lại. |

### Theo cỡ RAM của máy

Mỗi máy tự chọn cấu hình bộ nhớ theo tổng RAM của nó; quản trị viên không cần cấu hình. Cấu hình này đặt mức trần, còn ngân sách bộ nhớ quyết định agent dùng bao nhiêu tại mỗi thời điểm. Trang [Máy trạm](../endpoints/machines.md) hiển thị RAM và cấu hình của từng máy, ví dụ "8 GB · Nhẹ".

| RAM của máy | Cấu hình | Số tệp xử lý cùng lúc tối đa | Bộ OCR và bộ dò dấu mộc | Phiên mô hình ngữ nghĩa | Ngân sách bộ nhớ tối đa |
|---|---|---|---|---|---|
| Dưới 12 GB | Nhẹ | 2 | 1 mỗi loại | 1 | 1 GB |
| Từ 12 GB đến dưới 24 GB | Chuẩn | 3 | 2 mỗi loại | 1 | 2 GB |
| Từ 24 GB | Đầy đủ | 4 | 4 mỗi loại | 2 | 4 GB |

Cấu hình bộ nhớ độc lập với **Mức quét**: Mức quét quyết định một tệp được đọc kỹ đến đâu, còn cấu hình bộ nhớ quyết định agent giữ được bao nhiêu thứ trong bộ nhớ cùng lúc.

## Khi máy trạm nhờ AssistOCR

Khi chính sách phân loại dùng chế độ OCR **hybrid** hoặc **máy chủ** và AssistOCR đang trả lời, agent chuyển một phần việc cho AssistOCR. Với chế độ OCR cục bộ, mọi việc luôn làm trên máy trạm.

| Việc | Khi nào AssistOCR làm thay |
|---|---|
| Đọc chữ và dò dấu mộc trên bản scan | Theo chế độ OCR của chính sách, xem [Chế độ OCR](../classification/policies.md#chế-độ-ocr). Ngoài ra, khi máy thiếu bộ nhớ cho tệp hoặc agent vừa phải chờ vì giới hạn CPU, trang scan của ảnh và PDF được gửi thẳng cho AssistOCR thay vì chờ trên máy. |
| Phân tích ngữ nghĩa | Luật ngữ nghĩa vẫn được chấm trên máy trạm. Điểm nằm sát ngưỡng của luật được AssistOCR chấm lại bằng mô hình lớn hơn. Máy chưa nạp được mô hình ngữ nghĩa vì thiếu bộ nhớ thì AssistOCR chấm toàn bộ luật ngữ nghĩa, theo ngưỡng chung của AssistOCR thay vì ngưỡng riêng của từng luật. Việc này cần AssistOCR có bật phân tích ngữ nghĩa; nếu không, các luật đó chưa được chấm cho tới khi máy đủ bộ nhớ. |

Chữ trong tài liệu Office và tệp văn bản luôn được đọc trên máy trạm. Nếu AssistOCR không trả lời, tệp được đọc trên máy ở lượt sau, và agent chờ 5 phút trước khi nhờ AssistOCR thay cho các tệp khác.

