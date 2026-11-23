---
sidebar_position: 3
title: Tệp lớn & mức phân tích
description: Cách agent xử lý tệp lớn, bản scan dài và tệp nén, cách nhận biết tài liệu chưa được phân tích đầy đủ và việc nên làm với chúng.
---

Không phải tài liệu nào cũng đọc được trọn vẹn trong thời gian hợp lý: một bản sao lưu vài chục GB, một bộ hồ sơ scan hàng nghìn trang, hay một tệp nén chứa tệp nén khác. NextDLP không bỏ qua những tệp này. Tệp trong phạm vi quét vẫn được ghi nhận và gắn nhãn, và Console cho bạn biết nhãn đó dựa trên toàn bộ nội dung hay chỉ một phần.

## Ba mức phân tích

Mỗi lần phân loại, agent ghi lại mình đã đọc tệp đến đâu.

| Mức | Agent đã làm gì |
|---|---|
| Phân tích đầy đủ | Đọc toàn bộ nội dung. Phần giải thích không có cảnh báo gì thêm. Phần lớn tài liệu thuộc mức này. |
| Chưa phân tích đầy đủ | Đọc một phần nội dung, ví dụ phần đầu và phần cuối của một tệp rất lớn, hoặc chưa đọc chữ ở một số trang scan. Nhãn dựa trên phần đã đọc. |
| Chỉ kiểm tra thông tin tệp | Không mở nội dung, chỉ dựa vào tên, đuôi, dung lượng và đường dẫn của tệp. Nhãn có thể bỏ sót dữ liệu nhạy cảm bên trong. |

## Nhận biết tài liệu chưa phân tích đầy đủ

### Bước 1. Lọc trong Kiểm kê dữ liệu

Vào **Dữ liệu › Kiểm kê dữ liệu**, mở bộ lọc **Mức phân tích** và chọn **Chưa phân tích đầy đủ**. Danh sách khi đó gồm cả tài liệu chỉ được đọc một phần lẫn tài liệu chỉ được kiểm tra thông tin tệp.

{/* TODO screenshot: Kiểm kê dữ liệu với bộ lọc "Mức phân tích" đang chọn "Chưa phân tích đầy đủ" */}

### Bước 2. Mở chi tiết để xem lý do

Bấm vào một tài liệu. Trong phần **Vì sao tài liệu có nhãn này?**, Console hiển thị cảnh báo như "Tài liệu chưa được phân tích đầy đủ (vượt giới hạn dung lượng của agent): nhãn chỉ dựa trên 250 MB đã đọc trong tổng 4 GB", hoặc "Chỉ kiểm tra thông tin của tệp, chưa đọc nội dung (…): nhãn có thể bỏ sót dữ liệu nhạy cảm bên trong". Cảnh báo tương tự xuất hiện trong **Chi tiết sự kiện** của [Nhật ký phân loại](../classification/events.md).

{/* TODO screenshot: phần "Vì sao tài liệu có nhãn này?" có cảnh báo "Tài liệu chưa được phân tích đầy đủ" */}

## Các lý do và ý nghĩa

Lý do trong ngoặc của cảnh báo cho biết agent dừng ở đâu. Một tài liệu có thể có nhiều lý do cùng lúc.

| Lý do hiển thị trên Console | Điều đã xảy ra | Bạn có thể làm gì |
|---|---|---|
| vượt giới hạn dung lượng của agent | Tệp lớn hơn ngưỡng đọc toàn bộ của Mức quét. | Chọn Mức quét cao hơn cho máy chứa tệp, ví dụ Sâu cho máy chủ tệp. |
| chưa đọc các trang scan | Bản scan có nhiều trang hơn số trang OCR của Mức quét, hoặc PDF scan quá lớn so với bộ nhớ còn trống. | Chọn Mức quét cao hơn, hoặc tách bộ hồ sơ thành nhiều tệp nhỏ. |
| quá thời gian cho phép | Tệp cần nhiều thời gian hơn mức cho phép của Mức quét. Nhãn dựa trên phần đã đọc xong. | Chọn Mức quét cao hơn cho máy chứa tệp. |
| quá dài cho mô hình ngữ nghĩa | Agent phân tích ngữ nghĩa trên các đoạn mẫu trải đều tài liệu thay vì toàn văn. | Thường không cần làm gì. Với loại tài liệu dài, nên kết hợp điều kiện từ khóa hoặc Hybrid. |
| hình ảnh chưa được kiểm tra | Điều kiện Bản vẽ kỹ thuật cần gói GPU xem hình, và gói GPU chưa xem được tệp này. | Kiểm tra trạng thái AssistOCR tại **Hệ thống › Nhà cung cấp phân loại**. Agent tự hỏi lại sau. |
| nội dung bị mã hóa | Tệp hoặc tệp con trong tệp nén có mật khẩu. | Kiểm tra với chủ sở hữu tệp. Tệp có mật khẩu là đối tượng cần rà soát trong DLP. |
| tệp nén lồng quá sâu | Tệp nén chứa tệp nén khác nhiều tầng hơn mức cho phép. Các tầng sâu hơn không được mở. | Rà soát bằng tay. Lồng nhiều tầng thường là dấu hiệu dữ liệu đang bị giấu. |
| tỷ lệ nén bất thường | Kích thước giải nén lớn bất thường so với kích thước tệp nén. Agent từ chối giải nén để bảo vệ máy. | Rà soát nguồn gốc tệp. Đây không phải tài liệu làm việc thông thường. |
| không phải định dạng tài liệu (video, ảnh đĩa, bản sao lưu...) | Tệp không phải tài liệu văn phòng, PDF, ảnh hay tệp nén. | Nếu loại tệp này không cần theo dõi, thêm đuôi của nó vào Exclude extensions của nguồn dữ liệu. |
| lớn hơn giới hạn kích thước của nguồn dữ liệu | Tệp lớn hơn **Kích thước tối đa** của nguồn dữ liệu nên không được mở ra đọc. | Tăng Kích thước tối đa của nguồn nếu cần đọc tệp này. Xem [Nguồn dữ liệu](./sources.md#kích-thước-tối-đa-và-mức-quét). |

Với tệp vượt giới hạn dung lượng, tệp văn bản được đọc phần đầu và phần cuối, còn PDF và tài liệu Office chỉ được kiểm tra thông tin tệp. Với bản scan vượt số trang, các trang sau chỉ được kiểm tra dấu mộc, chưa được đọc chữ. Chữ trên con dấu và khối ký tên quanh nó vẫn được đọc nếu điều kiện dấu mộc có nêu tên trên dấu. Cách agent chọn giữa đọc nguyên và đọc từng đoạn được nêu ở [Thông số kỹ thuật](../getting-started/specs.md#agent-đọc-một-tệp-như-thế-nào).

## Chưa đầy đủ không có nghĩa là an toàn

Một tài liệu chưa được phân tích đầy đủ có thể chứa dữ liệu nhạy cảm ở đoạn agent chưa đọc. Vì vậy, theo mặc định, tài liệu bị bỏ lại một phần nội dung mà phần đã đọc chưa đạt mức Mật sẽ được gắn **Chờ rà soát**. Đó là tệp nén lồng quá sâu hoặc có mật khẩu, tệp lớn hơn Mức quét, bản scan vượt số trang OCR. Phần giải thích ghi rõ "Nhãn được nâng lên Chờ rà soát theo Chính sách Agent". Bạn đổi ngưỡng này trong [Chính sách Agent](../endpoints/agent-policy.md#tệp-chưa-đọc-hết).

Video, ảnh đĩa, bản sao lưu và tệp vượt Kích thước tối đa của nguồn dữ liệu không bị gắn Chờ rà soát, để danh sách rà soát không bị ngập.

### Rà soát định kỳ

Mỗi tuần, lọc Kiểm kê dữ liệu theo nhãn **Chờ rà soát** và theo **Chưa phân tích đầy đủ**, rồi xem các tài liệu mới xuất hiện. Ưu tiên tài liệu nằm trong thư mục của các phòng ban nhạy cảm.

### Điều chỉnh cấu hình khi lý do lặp lại

Nếu nhiều tài liệu cùng một lý do về dung lượng, số trang hay thời gian, hãy nâng Mức quét trong [Chính sách Agent](../endpoints/agent-policy.md#mức-quét) hoặc Kích thước tối đa của nguồn dữ liệu cho nhóm máy đó.

### Gắn nhãn bằng tay khi cần

Với tài liệu bạn đã kiểm tra và biết chắc mức độ nhạy cảm, Quản trị hệ thống và Quản lý đơn vị dùng **Cập nhật nhãn** trong chi tiết tài liệu. Xem [Kiểm kê dữ liệu & đổi nhãn](./inventory.md).

### Loại những gì không cần theo dõi

Với loại tệp không chứa tài liệu làm việc, như tệp cài đặt hay ảnh đĩa máy ảo, hãy thêm đuôi tệp hoặc thư mục vào phần loại trừ của nguồn dữ liệu để danh sách gọn hơn.

## Agent xử lý tệp lớn và phức tạp như thế nào

Với PDF có sẵn lớp chữ, agent lấy chữ trực tiếp từ tệp và chỉ chạy OCR cho những trang gần như không có chữ, tức trang scan. Một báo cáo dài trộn trang chữ và trang scan vì vậy không phải OCR toàn bộ.

Các trang scan được đọc chữ đến giới hạn số trang của Mức quét. Dấu mộc vẫn được kiểm tra trên các trang còn lại, và nếu điều kiện dấu mộc có nêu tên trên dấu thì chữ trên con dấu cùng khối ký tên quanh nó vẫn được đọc. Mỗi trang được xử lý xong mới sang trang kế tiếp, nên bộ nhớ không tăng theo số trang.

Tài liệu Word, Excel, PowerPoint được giải nén và đọc từng phần nhỏ thay vì nạp cả tệp vào bộ nhớ. Tệp nén zip, rar, 7z, tar, gz được mở ra để phân loại từng tài liệu bên trong, và tệp nén nhận mức cao nhất của các tệp bên trong.

Video, ảnh đĩa máy ảo và bản sao lưu được nhận diện ngay và đánh giá theo thông tin tệp, nên agent không tốn thời gian đọc hàng GB dữ liệu không chứa chữ. Sau khi máy khởi động lại, agent nhận ra tệp lớn không thay đổi và giữ nguyên kết quả cũ, không đọc lại cả tệp.

### Xem từng tệp bên trong tệp nén

Khi mở chi tiết của một tệp nén, phần giải thích cho biết mức của tệp nén được lấy từ tệp nào bên trong, số tệp đã phân loại, số tệp có mật khẩu và số tệp bị bỏ qua. Bên dưới là danh sách các tệp đã phân loại, tệp mật nhất đứng đầu, mỗi tệp kèm nhãn và lý do riêng. Những tệp không đọc được được liệt kê theo tên cùng lý do như "Có mật khẩu", "Quá lớn" hoặc "Tệp nén lồng quá sâu".

Bên trong tệp nén, agent chỉ đọc lớp chữ của từng tệp: tài liệu Office, tệp văn bản và PDF có chữ. Tệp con không được OCR và không được dò dấu mộc. Ảnh và PDF scan trong tệp nén được liệt kê là "Ảnh hoặc định dạng không đọc được", trong khi cùng tệp đó nằm ngoài tệp nén thì được đọc bình thường. Tệp có mật khẩu cũng không được đọc. Nhãn của tệp nén lấy từ các tệp đã đọc được. Vì còn tệp chưa đọc, tệp nén nhận ít nhất mức **Tệp chưa phân tích đầy đủ thì gắn ít nhất** của Chính sách Agent, mặc định Chờ rà soát.

Có một giới hạn cần biết. PDF trong tệp nén vừa có trang chữ vừa có trang scan chỉ được đọc các trang chữ. Các trang scan bị bỏ qua và hiện chưa được tính là "chưa đọc hết", nên tệp nén đó không tự nhận Chờ rà soát. Với hồ sơ scan hoặc ảnh, hãy để chúng ngoài tệp nén để được OCR và dò dấu mộc đầy đủ.

Mỗi Mức quét quy định tổng dung lượng giải nén và số tầng lồng nhau được mở: mức Nhẹ mở một tầng tệp nén bên trong, mức Chuẩn và Sâu mở hai tầng. Mỗi tệp nén được đọc tối đa 1.000 tệp bên trong, mỗi tệp tối đa 20 MB. Xem bảng giới hạn tại [Chính sách Agent](../endpoints/agent-policy.md#mức-quét).

## Đọc tiếp

Để chọn mức đọc tài liệu cho từng loại máy, xem [Chính sách Agent](../endpoints/agent-policy.md). Để giới hạn dung lượng theo thư mục, xem [Nguồn dữ liệu](./sources.md). Để điều chỉnh nhãn của tài liệu đã rà soát, xem [Kiểm kê dữ liệu & đổi nhãn](./inventory.md).
