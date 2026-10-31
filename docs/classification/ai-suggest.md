---
sidebar_position: 3.5
title: Viết mô tả cho Gợi ý AI
description: Cách viết mô tả và chọn tài liệu mẫu để tab Gợi ý AI đề xuất đúng điều kiện ngay từ lần đầu, kèm các mẫu câu đã được kiểm chứng.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Tab **Gợi ý AI** trong trình soạn chính sách biến một đoạn mô tả, hoặc một tài liệu mẫu, thành các điều kiện phân loại để bạn rà soát rồi áp dụng. Gợi ý được tạo bởi một mô hình ngôn ngữ nhỏ chạy ngay trên server của bạn, nên tài liệu mẫu không rời khỏi hệ thống. Đổi lại, mô hình này làm tốt nhất khi được giao một việc rõ ràng: nói đúng nhãn cần gắn và đúng những dấu hiệu cần tìm. Trang này tổng hợp cách viết đã được thử trên nhiều tình huống thực tế để bạn có kết quả tốt ngay từ lần đầu.

![Tab Gợi ý AI với nhãn đích đã chọn, mô tả theo mẫu và ba điều kiện đề xuất](/img/console/policies-ai-suggest.png)

## Quy trình được khuyến nghị

### Bước 1. Chọn nhãn đích trước khi viết

Ở đầu tab, chọn **Nhãn bảo mật đích** và **Loại tài liệu đích**. Đây là cách chắc chắn nhất để mọi điều kiện đề xuất gắn đúng nhãn. Nếu để **Tự suy / bất kỳ**, mô hình phải tự đoán và thường chọn sai loại tài liệu, ví dụ gắn loại Tài chính cho một mô tả không liên quan đến tài chính.

### Bước 2. Mô tả dấu hiệu, không mô tả mục đích

Viết những gì xuất hiện **bên trong tài liệu**: cụm từ đặc trưng, loại số định danh, con dấu. Đặt mỗi cụm từ trong dấu ngoặc kép và ngăn cách bằng dấu chấm phẩy. Một câu mô tả mục đích như "bảo vệ tài liệu quan trọng của phòng nhân sự" không cho mô hình biết phải tìm chữ gì, nên kết quả sẽ là những từ khóa chung chung.

### Bước 3. Bấm Tạo gợi ý và rà soát từng dòng

Một mô tả thường có kết quả sau 5 đến 25 giây. Đọc từng điều kiện trong bảng **Điều kiện đề xuất**, sửa bằng biểu tượng bút chì và xóa dòng thừa bằng biểu tượng thùng rác. Phần rà soát ở cuối trang liệt kê những lỗi hay gặp nhất.

### Bước 4. Áp dụng, rồi kiểm tra ở tab Điều kiện phân loại

Bấm **Áp dụng vào điều kiện**. Lưu ý thao tác này **thay thế toàn bộ** điều kiện đang có trong chính sách bằng các điều kiện đề xuất, không cộng thêm vào. Hãy dùng Gợi ý AI khi bắt đầu một chính sách mới, rồi bổ sung bằng tay ở tab Điều kiện phân loại.

## Mẫu câu đã được kiểm chứng

Các mẫu dưới đây cho kết quả đúng và ổn định qua nhiều lần chạy. Thay phần trong ngoặc kép bằng nội dung của tổ chức bạn.

<Cards>
  <Card title="Từ khóa và số định danh" tag="Dùng nhiều nhất">
    Chọn nhãn đích, rồi viết: <em>Gắn khi tài liệu có MỘT trong các cụm từ: "hợp đồng lao động"; "bảng lương"; "mức lương". Thêm regex số CCCD 12 chữ số.</em> Kết quả là một điều kiện từ khóa chứa đủ các cụm từ, cùng một điều kiện regex CCCD.
  </Card>
  <Card title="Hiểu theo ý nghĩa" tag="Khi tài liệu không có từ khóa cố định">
    Chọn nhãn đích, rồi viết: <em>Dùng ml với các mô tả: "Tài liệu bàn về việc sáp nhập hoặc mua lại một công ty khác"; "Kế hoạch thâu tóm doanh nghiệp, định giá và thẩm định đối tác trong thương vụ M&A".</em> Mỗi mô tả là một câu hoàn chỉnh, giống cách tài liệu thật được viết.
  </Card>
  <Card title="Con dấu" tag="Văn bản có đóng dấu">
    Chọn nhãn đích, rồi viết: <em>Văn bản có con dấu đỏ thì gắn nhãn.</em> Kết quả là điều kiện nhận diện con dấu, kèm một điều kiện từ khóa "dấu đỏ", "con dấu đỏ".
  </Card>
  <Card title="Cần hai dấu hiệu cùng lúc" tag="Làm bằng tay">
    Gợi ý AI hiện <strong>chưa tạo đúng</strong> điều kiện "cùng lúc": dù mô tả ghi rõ ĐỒNG THỜI, mô hình vẫn đặt các dấu hiệu vào một điều kiện Từ khóa, nghĩa là khớp <em>một trong hai</em> là đủ. Hãy dùng Gợi ý AI để lấy từng dấu hiệu, rồi ở tab Điều kiện phân loại tạo một điều kiện <strong>Hybrid</strong> với tổ hợp <strong>Tất cả điều kiện</strong>.
  </Card>
</Cards>

## Nên và không nên

| Nên viết | Không nên viết | Vì sao |
|---|---|---|
| Hồ sơ nhân sự gắn mức confidential, loại hr. Nhận biết khi có cụm từ "hợp đồng lao động", "bảng lương", hoặc số CCCD 12 chữ số. | tài liệu mật | Mô tả hai chữ không có dấu hiệu nào để tìm. Mô hình trả về đúng một từ khóa "tài liệu mật" và tự đoán loại tài liệu. |
| Gắn khi tài liệu có MỘT trong các cụm từ: "hóa đơn GTGT"; "tờ khai thuế". | chào bạn, công ty mình có nhiều loại giấy tờ lắm, kế toán thì có hóa đơn, nhân sự thì có hợp đồng... | Câu dài trộn nhiều phòng ban khiến mọi điều kiện bị gắn chung một nhãn, ở ví dụ thử nghiệm là Pháp chế cho cả hóa đơn lẫn lương thưởng. |
| Mỗi lần một mức bảo mật: Báo cáo tài chính có cụm từ "tuyệt mật" thì gắn mức secret, loại finance. | Nếu có chữ "tuyệt mật" thì secret, nếu có chữ "nội bộ" thì internal. | Khi một câu có nhiều mức, mô hình thường gán cùng một mức cho tất cả. Trong thử nghiệm, "tuyệt mật" bị gắn mức Nội bộ. |
| Dùng các mã nhãn có trong bộ nhãn, ví dụ confidential, hr, finance; hoặc chọn nhãn đích ở hai ô phía trên. | Gắn Mật, loại tài chính | Tên gọi tự do dễ bị hiểu sai mức. Trong thử nghiệm, "Mật" bị gán thành mức cao nhất là secret. |
| Không ghi số lượng điều kiện. Để mô tả quyết định số điều kiện. | Gộp lại thành 1 condition thôi nhé; Tạo 5 điều kiện | Khi mô tả có con số kèm "điều kiện" hay "condition", hệ thống hiểu là yêu cầu một bộ điều kiện đủ mọi kỹ thuật. Trong thử nghiệm, "gộp thành 1 condition" cho ra 7 điều kiện gồm cả con dấu và từ điển. |
| Dùng ml với các mô tả: "..." | Phân tích đầy đủ bằng mọi kỹ thuật, dùng ngữ nghĩa và từ điển | Các từ như "đầy đủ", "ngữ nghĩa", "từ điển", "hybrid", "kỹ thuật" được hiểu là yêu cầu phủ mọi kỹ thuật, nên hệ thống thêm cả điều kiện mẫu không liên quan, ví dụ từ điển nhân sự vào một chính sách về M&A. |

### Khi cần nhiều mức bảo mật

Vì mỗi lần **Áp dụng vào điều kiện** thay thế toàn bộ điều kiện, cách gọn nhất là tạo **mỗi mức bảo mật một chính sách** cho cùng đơn vị, ví dụ một chính sách "Tài chính – Tuyệt mật" và một chính sách "Tài chính – Nội bộ". Một đơn vị có thể bật nhiều chính sách cùng lúc và agent nhận bản gộp điều kiện của tất cả, nên kết quả giống hệt một chính sách lớn nhưng dễ rà soát hơn. Xem [Chính sách phân loại](./policies.md).

## Dùng tài liệu mẫu

Bấm biểu tượng ghim cạnh nút **Tạo gợi ý**, hoặc kéo thả tệp vào khung mô tả. Hệ thống trích chữ từ tệp, rồi đề xuất điều kiện dựa trên những dấu hiệu tìm thấy.

<Cards>
  <Card title="Định dạng nhận được">
    Word, Excel, PowerPoint, PDF, tệp văn bản (.txt, .md) và ảnh (.png, .jpg, .webp). Ảnh và tệp văn bản được đọc ngay trong trình duyệt. Tệp Word, Excel, PowerPoint và PDF tối đa 1 MB ở bản 1.0.0, 12 MB từ phiên bản 1.1.0.
  </Card>
  <Card title="Chỉ phần đầu được dùng">
    Mô hình chỉ đọc khoảng <strong>4.500 ký tự đầu tiên</strong>, tức một đến hai trang. Dấu hiệu nằm ở trang sau sẽ không được nhận ra; trong thử nghiệm, số CCCD ở phụ lục cuối hợp đồng bị bỏ sót hoàn toàn.
  </Card>
  <Card title="Thời gian">
    Một tài liệu mẫu cần khoảng 1 đến 1,5 phút, lâu hơn mô tả bằng chữ vì phải trích chữ và phân tích văn bản dài hơn. Hãy chờ đến khi bảng Điều kiện đề xuất hiện ra.
  </Card>
</Cards>

### Chọn tài liệu mẫu thế nào

**Chọn bản điện tử thay vì bản scan.** Chữ trích từ bản scan thường mất dấu tiếng Việt, ví dụ "tài liệu tuyệt mật" thành "tai liéu tuyét mat", nên từ khóa đề xuất cũng sai theo. Nếu chỉ có bản scan, hãy mô tả bằng chữ thay vì tải tệp lên.

**Cắt phần quan trọng lên đầu.** Nếu dấu hiệu nằm ở cuối tài liệu, hãy sao chép những trang chứa dấu hiệu sang một tệp mới và dùng tệp đó làm mẫu.

**Không dùng mẫu quá ngắn.** Với tài liệu chỉ có một câu, mô hình có xu hướng chép nguyên câu đó thành từ khóa. Một từ khóa dài cả câu gần như không bao giờ khớp với tài liệu khác.

**Kèm lời dặn để giữ đúng trọng tâm.** Khi chỉ có tệp mẫu, mô hình ưu tiên các dữ liệu cá nhân như số CCCD, mã số thuế, số điện thoại, và thường bỏ qua những cụm từ đặc trưng của loại tài liệu. Hãy viết thêm vào khung mô tả, ví dụ: <em>Học từ báo cáo mẫu. Dùng các cụm từ đặc trưng: "báo cáo tài chính"; "bảng cân đối kế toán"; "lưu chuyển tiền tệ". Không thêm regex dữ liệu cá nhân.</em> Với lời dặn này, điều kiện đề xuất chứa đúng các cụm từ của báo cáo tài chính.

## Rà soát trước khi áp dụng

Gợi ý AI là bản nháp. Trước khi bấm **Áp dụng vào điều kiện**, hãy dành một phút kiểm tra những điểm sau.

| Kiểm tra | Dấu hiệu cần sửa | Cách sửa |
|---|---|---|
| Biểu thức regex | Regex bắt đầu bằng `^` hoặc kết thúc bằng `$`, ví dụ `^\d{12}$` | Xóa dòng đó. Regex có `^` và `$` chỉ khớp khi cả tài liệu là đúng một con số, nên không bao giờ khớp trong tài liệu thật. Thường đã có một dòng regex đúng ngay bên dưới, dạng `\b\d{12}\b`. |
| Nhãn của từng dòng | Cột **Đích gắn nhãn** khác với nhãn bạn muốn | Sửa bằng biểu tượng bút chì, hoặc chạy lại sau khi chọn nhãn đích. |
| Điều kiện không ai yêu cầu | Con dấu, từ điển hay điều kiện hybrid xuất hiện dù mô tả không nhắc tới | Xóa dòng đó. Xem bảng "Nên và không nên" để tránh lần sau. |
| Từ khóa | Cụm từ quá chung như "tài chính", "số điện thoại", hoặc quá dài như nguyên một câu | Thay bằng cụm từ đặc trưng chỉ loại tài liệu đó mới có. |
| Từ khóa sai chính tả | Ví dụ "CCCĐ" thay cho "CCCD" | Sửa lại hoặc xóa. |

Sau khi áp dụng và lưu, hãy kiểm tra chính sách trên vài tài liệu thật trước khi bật cho toàn đơn vị.

## Khi gặp sự cố

**Nút Tạo gợi ý bị tắt hoặc có thông báo Admin LLM chưa sẵn sàng.** Mô hình đang khởi động hoặc đang được tải về lần đầu. Chờ vài phút rồi tải lại trang. Trong lúc đó, tải tài liệu mẫu lên vẫn tạo được điều kiện bằng phương pháp phân tích tín hiệu đơn giản, có ghi "nguồn: heuristic".

**Tải tệp mẫu lên thì báo lỗi 413 hoặc không có phản hồi.** Ở bản 1.0.0, tệp Word, Excel, PowerPoint và PDF lớn hơn 1 MB bị máy chủ web chặn trước khi tới server. Hãy dùng một tệp nhỏ hơn, ví dụ chỉ giữ những trang chứa dấu hiệu, hoặc mô tả bằng chữ. Phiên bản 1.1.0 nâng giới hạn này lên 12 MB.

**Thông báo "model response missing conditions".** Ở phiên bản 1.0.0, mô hình đôi khi trả về chính sách không có điều kiện nào, nhất là với mô tả ngắn hoặc mô tả chung chung. Hãy viết lại theo một trong các mẫu câu ở trên rồi thử lại. Lỗi này đã được khắc phục trong [phiên bản 1.1.0](../releases/1.1.0.md).

**Kết quả mỗi lần chạy một khác.** Mô hình có yếu tố ngẫu nhiên nhỏ. Mô tả càng cụ thể thì kết quả càng ổn định: các mẫu câu trên trang này cho cùng một kết quả qua nhiều lần chạy, còn mô tả chung chung như "tạo chính sách cho phòng nhân sự" cho mỗi lần một bộ điều kiện khác nhau.

## Đọc tiếp

Để hiểu từng kỹ thuật nhận diện và cách chỉnh tay, xem [Quy tắc nhận diện](./rules.md) và [Chính sách phân loại](./policies.md). Để quản lý mã nhãn dùng trong mô tả, xem [Mức bảo mật & loại tài liệu](./taxonomy.md).
