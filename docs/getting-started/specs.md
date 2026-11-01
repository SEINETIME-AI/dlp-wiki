---
sidebar_position: 6
title: Thông số kỹ thuật
description: Các mô hình AI NextDLP sử dụng, chính sách mô hình, định dạng tệp hỗ trợ, giới hạn xử lý và tài nguyên máy trạm của phiên bản 1.0.0.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Trang này tổng hợp các thông số của **NextDLP 1.0.0**: mô hình AI nào chạy ở đâu, agent đọc được những định dạng nào, đọc đến đâu và cần tài nguyên gì. Chúng tôi sẽ tiếp tục tối ưu ở các bản sau và cập nhật trang này cùng mỗi [bản phát hành](/releases).

## Mô hình AI

NextDLP dùng bốn mô hình, mỗi mô hình một việc. Ba mô hình đầu chạy trên máy trạm, cùng agent; mô hình thứ tư chạy trên server và chỉ phục vụ quản trị viên khi soạn chính sách.

<Cards>
  <Card title="Phân tích ngữ nghĩa" tag="Máy trạm">
    <strong>paraphrase-multilingual-MiniLM-L12-v2</strong> (Sentence-Transformers), chạy bằng ONNX Runtime trên CPU. Đa ngôn ngữ, gồm tiếng Việt; so nội dung tài liệu với mô tả loại tài liệu do quản trị viên viết.
  </Card>
  <Card title="Đọc chữ (OCR)" tag="Máy trạm">
    <strong>Tesseract</strong> với dữ liệu tiếng Việt và tiếng Anh. Đọc chữ trên ảnh và trên trang scan của PDF.
  </Card>
  <Card title="Dấu mộc và chữ ký" tag="Máy trạm">
    <strong>YOLOv8n</strong> do NextDLP huấn luyện riêng, nhận diện hai loại đối tượng: dấu mộc và chữ ký. Chạy trên mọi ảnh và trang scan, kể cả khi đã đạt giới hạn số trang OCR.
  </Card>
  <Card title="Gợi ý AI" tag="Server">
    <strong>Qwen2.5 1.5B</strong> chạy qua Ollama trên server, bằng CPU. Chỉ dùng cho tab Gợi ý AI khi soạn chính sách; không tham gia phân loại tệp trên máy trạm.
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
| Tệp nén | .zip, .rar, .7z, .tar, .gz, .tgz, .bz2, .xz, .zst | Từng tài liệu bên trong, kể cả tệp nén lồng nhau |
| Định dạng khác | Video, ảnh đĩa, bản sao lưu, Office đời cũ (.doc, .xls, .ppt)... | Thông tin tệp (tên, đường dẫn, kích thước, ngày tháng) |

Nhãn được ghi ngược vào tệp Office (.docx, .xlsx, .pptx) và PDF dưới dạng thuộc tính tài liệu, để hệ thống DLP đọc được ngay cả khi không kết nối tới server.

## Giới hạn xử lý

Phần lớn giới hạn đi theo **Mức quét** bạn chọn trong [Chính sách Agent](../endpoints/agent-policy.md#mức-quét):

| Giới hạn | Nhẹ | Chuẩn | Sâu |
|---|---|---|---|
| Đọc toàn bộ tệp đến | 50 MB | 250 MB | 2 GB |
| Số trang scan được OCR mỗi tệp | 20 | 100 | 500 |
| Thời gian tối đa cho một tệp | 10 phút | 30 phút | 60 phút |
| Dung lượng đọc bên trong một tệp nén | 100 MB | 250 MB | 1 GB |
| Số tầng tệp nén lồng nhau | 1 | 2 | 2 |

Các giới hạn sau áp dụng cho mọi mức:

| Hạng mục | Giới hạn |
|---|---|
| Tệp lớn | Tệp trên 20 MB được đọc theo từng phần, nên bộ nhớ không tăng theo kích thước tệp. Mỗi máy đọc một tệp lớn tại một thời điểm; tệp nhỏ vẫn được xử lý song song. |
| Tệp nén | Tối đa 1.000 tệp bên trong; tài liệu bên trong lớn hơn 20 MB không được đọc. Tệp nén có tỷ lệ nén bất thường bị từ chối để bảo vệ máy. |
| Phân tích ngữ nghĩa | Văn bản đến 256 KB được phân tích toàn bộ. Văn bản dài hơn được phân tích trên 8 đoạn mẫu trải đều từ đầu đến cuối; từ khoá, biểu thức và từ điển vẫn kiểm tra toàn bộ nội dung. |
| Gợi ý AI từ tệp mẫu | Mô hình đọc khoảng 4.500 ký tự đầu của tệp mẫu (một đến hai trang); tệp tải lên tối đa 10 MB. |

Tệp vượt giới hạn không bị bỏ qua: chúng vẫn được gắn nhãn từ phần đã đọc, kèm lý do, và mặc định được gắn ít nhất **Chờ rà soát**. Xem [Tệp lớn & mức phân tích](../data/large-files.md).

## Tài nguyên trên máy trạm

| Hạng mục | Thông số |
|---|---|
| Hệ điều hành | Windows 64-bit, chạy dưới dạng dịch vụ `nextdlp` |
| Dung lượng cài đặt | Khoảng 700 MB: chương trình khoảng 180 MB, mô hình và dữ liệu OCR khoảng 500 MB |
| Bộ nhớ | Khuyến nghị máy có từ 8 GB RAM. Máy ít bộ nhớ nên dùng Mức quét Nhẹ. |
| Số luồng xử lý | Số lõi CPU trừ một, tối thiểu 1 và tối đa 4 |
| Ưu tiên | Chạy ở chế độ nền của Windows, nhường CPU, ổ đĩa và bộ nhớ cho ứng dụng của người dùng |
| Giới hạn CPU | Theo Chính sách Agent; tính trên phần CPU của riêng agent |
| Khi máy thiếu bộ nhớ | Agent tạm dừng giữa các tệp và giữa các đoạn của một tệp cho tới khi Windows báo bộ nhớ đủ trở lại |

