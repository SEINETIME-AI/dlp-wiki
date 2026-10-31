---
sidebar_position: 3
title: Tệp lớn & mức phân tích
description: Cách agent xử lý tệp lớn, bản scan dài và tệp nén, cách nhận biết tài liệu chưa được phân tích đầy đủ và việc quản trị viên nên làm với chúng.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

:::note Bản tiếp theo

Các tính năng trên trang này có trong bản cập nhật tiếp theo của NextDLP. Xem [Bản tiếp theo](../releases/next.md).

:::

Không phải tài liệu nào cũng đọc được trọn vẹn trong thời gian hợp lý: một bản sao lưu vài chục GB, một bộ hồ sơ scan hàng nghìn trang, hay một tệp nén chứa tệp nén khác. NextDLP không bỏ qua những tệp này. Mọi tệp trong phạm vi quét đều được ghi nhận, được gắn nhãn, và Console cho bạn biết rõ nhãn đó dựa trên toàn bộ nội dung hay chỉ một phần.

## Ba mức phân tích

Mỗi lần phân loại, agent ghi lại mình đã đọc tệp đến đâu. Kết quả rơi vào một trong ba trường hợp.

<Cards>
  <Card title="Phân tích đầy đủ" tag="Thông thường">
    Agent đã đọc toàn bộ nội dung. Phần giải thích không có cảnh báo gì thêm. Đây là trường hợp của phần lớn tài liệu.
  </Card>
  <Card title="Chưa phân tích đầy đủ" tag="Đọc một phần">
    Agent đã đọc một phần nội dung, ví dụ phần đầu và phần cuối của một tệp rất lớn, hoặc chưa đọc chữ ở một số trang scan. Nhãn dựa trên phần đã đọc.
  </Card>
  <Card title="Chỉ kiểm tra thông tin tệp" tag="Chưa đọc nội dung">
    Agent không mở nội dung, chỉ dựa vào thông tin của tệp như tên, đuôi, dung lượng và đường dẫn. Nhãn có thể bỏ sót dữ liệu nhạy cảm bên trong.
  </Card>
</Cards>

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
| vượt giới hạn dung lượng của agent | Tệp lớn hơn ngưỡng đọc toàn bộ của Mức quét. Tệp văn bản được đọc phần đầu và phần cuối; PDF và tài liệu Office chỉ được kiểm tra thông tin tệp. | Chọn Mức quét cao hơn cho máy chứa tệp, ví dụ Sâu cho máy chủ tệp. |
| chưa đọc các trang scan | Bản scan có nhiều trang hơn số trang OCR của Mức quét. Các trang sau chỉ được kiểm tra dấu mộc, chưa được đọc chữ. | Chọn Mức quét cao hơn, hoặc tách bộ hồ sơ thành nhiều tệp nhỏ. |
| quá thời gian cho phép | Tệp cần nhiều thời gian hơn mức cho phép của Mức quét. Nhãn dựa trên phần đã đọc xong. | Chọn Mức quét cao hơn cho máy chứa tệp. |
| quá dài cho mô hình ngữ nghĩa | Tài liệu quá dài để phân tích ngữ nghĩa toàn văn, nên agent phân tích ngữ nghĩa trên các đoạn mẫu trải đều tài liệu. Từ khoá, mẫu nhận diện và từ điển vẫn được kiểm tra trên toàn bộ nội dung. | Thường không cần làm gì. Với loại tài liệu dài, nên kết hợp điều kiện từ khoá hoặc Hybrid. |
| nội dung bị mã hóa | Tệp hoặc tệp con trong tệp nén có mật khẩu, nên không đọc được nội dung. | Kiểm tra với chủ sở hữu tệp. Tệp có mật khẩu là đối tượng cần rà soát trong DLP. |
| tệp nén lồng quá sâu | Tệp nén chứa tệp nén khác nhiều tầng hơn mức cho phép. Các tầng sâu hơn không được mở. | Rà soát bằng tay. Lồng nhiều tầng thường là dấu hiệu dữ liệu đang bị giấu. |
| tỷ lệ nén bất thường | Tệp nén có kích thước giải nén lớn bất thường so với kích thước thật (kiểu "zip bomb"). Agent từ chối giải nén để bảo vệ máy. | Rà soát nguồn gốc tệp; đây không phải tài liệu làm việc thông thường. |
| không phải định dạng tài liệu (video, ảnh đĩa, bản sao lưu...) | Tệp không phải tài liệu văn phòng, PDF, ảnh hay tệp nén, nên agent chỉ đánh giá theo thông tin tệp. | Nếu loại tệp này không cần theo dõi, thêm đuôi của nó vào Exclude extensions của nguồn dữ liệu. |
| lớn hơn giới hạn kích thước của nguồn dữ liệu | Tệp lớn hơn **Kích thước tối đa** của nguồn dữ liệu nên không được mở ra đọc. | Tăng Kích thước tối đa của nguồn nếu cần đọc tệp này. Xem [Nguồn dữ liệu](./sources.md#kích-thước-tối-đa-và-mức-quét). |

## Chưa đầy đủ không có nghĩa là an toàn

Một tài liệu chưa được phân tích đầy đủ có thể mang nhãn thấp, thậm chí ở trạng thái Chưa gắn nhãn, chỉ vì phần chứa dữ liệu nhạy cảm nằm ở đoạn agent chưa đọc. Đừng coi nhãn của những tài liệu này là kết luận cuối cùng. Cảnh báo cũng không tự đưa tài liệu vào hàng chờ rà soát, để danh sách rà soát không bị ngập bởi video và bản sao lưu; việc theo dõi là của quản trị viên.

### Bước 1. Rà soát định kỳ

Mỗi tuần, lọc Kiểm kê dữ liệu theo **Chưa phân tích đầy đủ** và xem các tài liệu mới xuất hiện, ưu tiên tài liệu nằm trong thư mục của các phòng ban nhạy cảm.

### Bước 2. Điều chỉnh cấu hình khi lý do lặp lại

Nếu nhiều tài liệu cùng một lý do về dung lượng, số trang hay thời gian, hãy nâng Mức quét trong [Chính sách Agent](../endpoints/agent-policy.md#mức-quét) hoặc Kích thước tối đa của nguồn dữ liệu cho nhóm máy đó.

### Bước 3. Gắn nhãn bằng tay khi cần

Với tài liệu bạn đã kiểm tra và biết chắc mức độ nhạy cảm, Quản trị hệ thống và Quản lý đơn vị dùng **Cập nhật nhãn** trong chi tiết tài liệu. Xem [Kiểm kê dữ liệu & đổi nhãn](./inventory.md).

### Bước 4. Loại những gì không cần theo dõi

Với loại tệp không bao giờ chứa tài liệu làm việc, như tệp cài đặt hay ảnh đĩa máy ảo, hãy thêm đuôi tệp hoặc thư mục vào phần loại trừ của nguồn dữ liệu để danh sách gọn hơn.

## Agent xử lý tệp lớn và phức tạp như thế nào

Những cải tiến dưới đây giúp agent đọc được nhiều hơn trong cùng thời gian, mà không chiếm nhiều bộ nhớ của máy.

<Cards>
  <Card title="PDF có sẵn lớp chữ">
    Agent lấy chữ trực tiếp từ PDF và chỉ chạy OCR cho những trang gần như không có chữ, tức là trang scan. Trên một máy tính văn phòng thông thường, một báo cáo PDF gần 100 trang trộn chữ và trang scan giảm từ hơn 5 phút xuống khoảng 1 phút.
  </Card>
  <Card title="Bản scan và dấu mộc">
    Các trang scan được đọc chữ đến giới hạn số trang của Mức quét. Dấu mộc vẫn được kiểm tra trên mọi trang, kể cả khi đã vượt giới hạn đó. Mỗi trang được xử lý xong mới sang trang kế tiếp, nên bộ nhớ không tăng theo số trang.
  </Card>
  <Card title="Word, Excel, PowerPoint">
    Tài liệu Office được giải nén và đọc từng phần nhỏ thay vì nạp cả tệp vào bộ nhớ, nên tài liệu rất lớn không làm máy bị đầy bộ nhớ.
  </Card>
  <Card title="Tệp nén">
    Agent mở các tệp zip, rar, 7z, tar, gz và phân loại từng tài liệu bên trong. Tệp nén nhận mức cao nhất của các tệp bên trong. Tệp có tỷ lệ nén bất thường bị từ chối.
  </Card>
  <Card title="Tệp không phải tài liệu">
    Video, ảnh đĩa máy ảo, bản sao lưu được nhận diện ngay và đánh giá theo thông tin tệp, không tốn thời gian đọc hàng GB dữ liệu không chứa chữ.
  </Card>
  <Card title="Tệp lớn không đổi">
    Sau khi máy khởi động lại, agent nhận ra tệp lớn không thay đổi và giữ nguyên kết quả cũ, không đọc lại cả tệp.
  </Card>
</Cards>

### Xem từng tệp bên trong tệp nén

Khi mở chi tiết của một tệp nén, phần giải thích cho biết mức của tệp nén được lấy từ tệp nào bên trong, số tệp đã phân loại, số tệp có mật khẩu và số tệp bị bỏ qua. Bên dưới là danh sách các tệp đã phân loại, tệp mật nhất đứng đầu, mỗi tệp kèm nhãn và lý do riêng. Những tệp không đọc được được liệt kê theo tên cùng lý do như "Có mật khẩu", "Quá lớn" hoặc "Tệp nén lồng quá sâu".

Mỗi Mức quét quy định tổng dung lượng giải nén và số tầng lồng nhau được mở: mức Nhẹ và Chuẩn mở một tầng tệp nén bên trong, mức Sâu mở hai tầng. Xem bảng giới hạn tại [Chính sách Agent](../endpoints/agent-policy.md#mức-quét).

## Đọc tiếp

Để chọn mức đọc tài liệu cho từng loại máy, xem [Chính sách Agent](../endpoints/agent-policy.md). Để giới hạn dung lượng theo thư mục, xem [Nguồn dữ liệu](./sources.md). Để điều chỉnh nhãn của tài liệu đã rà soát, xem [Kiểm kê dữ liệu & đổi nhãn](./inventory.md).
