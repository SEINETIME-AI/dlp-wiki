---
sidebar_position: 3
title: Chính sách Agent
description: Chính sách Agent điều chỉnh cách agent vận hành theo từng loại máy, gồm mức quét tài liệu, và được chọn khi tạo bộ cài cho đơn vị.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Chính sách Agent là mẫu cấu hình vận hành của agent: bao lâu báo trạng thái một lần, đọc tài liệu kỹ đến đâu, giữ dữ liệu bao lâu khi mất mạng. Bạn tạo chính sách tại **Thiết bị & Agent › Chính sách Agent** (trang có dòng tiêu đề nhỏ "Cấu hình máy"), rồi chọn nó khi tạo [Bộ cài Agent](./packages.md).

Chính sách Agent khác với chính sách phân loại. Nó không quyết định file được gắn nhãn gì, mà chỉ quyết định agent chạy ra sao trên máy.

![Trang Chính sách Agent](/img/console/agent-policies.png)

{/* TODO screenshot: hộp thoại "Chính sách Agent mới" với trường "Mức quét" mở danh sách Nhẹ / Chuẩn / Sâu */}

## Tham số cấu hình

Bấm **Chính sách Agent mới**, đặt tên cho chính sách (ví dụ "Máy văn phòng" hoặc "Máy chủ tệp"), rồi điền các tham số dưới đây. Mỗi thẻ chính sách trên trang hiển thị lại Heartbeat, Mức quét và thời gian Offline đã chọn.

| Tham số | Ý nghĩa |
|---|---|
| Heartbeat (giây) | Chu kỳ agent báo trạng thái và kiểm tra chính sách mới. Tối thiểu 15 giây. |
| Mức quét | Agent đọc tài liệu kỹ đến đâu: **Nhẹ**, **Chuẩn** hoặc **Sâu**. Mặc định là Chuẩn. Xem mục bên dưới. |
| Tệp chưa phân tích đầy đủ thì gắn ít nhất | Nhãn tối thiểu cho tệp agent không đọc hết được. Mặc định là **Chờ rà soát**. Xem [Tệp chưa đọc hết](#tệp-chưa-đọc-hết). |
| Offline cache (ngày) | Thời gian agent giữ kết quả chờ gửi khi không kết nối được server. |

## Mức quét

Thay vì tự nhập một con số dung lượng, bạn chọn một trong ba mức đã được cân chỉnh sẵn. Mỗi mức quy định cùng lúc dung lượng file được đọc toàn bộ, số trang scan được đọc chữ (OCR), thời gian tối đa dành cho một file và giới hạn khi mở tệp nén.

<Cards>
  <Card title="Nhẹ" tag="Máy yếu">
    Đọc đầy đủ tệp đến 50 MB, đọc chữ tối đa 20 trang scan mỗi tệp, tối đa 10 phút cho một tệp. Phù hợp với laptop cũ hoặc máy có ít bộ nhớ.
  </Card>
  <Card title="Chuẩn" tag="Mặc định, khuyến nghị">
    Đọc đầy đủ tệp đến 250 MB, đọc chữ tối đa 100 trang scan mỗi tệp, tối đa 30 phút cho một tệp. Phù hợp với phần lớn máy văn phòng.
  </Card>
  <Card title="Sâu" tag="Máy chủ tệp">
    Đọc đầy đủ tệp đến 2 GB, đọc chữ tối đa 500 trang scan mỗi tệp, tối đa 60 phút cho một tệp. Dành cho máy chủ tệp hoặc máy quét thư mục chia sẻ.
  </Card>
</Cards>

Bảng dưới đây tóm tắt đầy đủ giới hạn của từng mức để tiện tra cứu.

| Giới hạn | Nhẹ | Chuẩn | Sâu |
|---|---|---|---|
| Đọc toàn bộ nội dung tệp đến | 50 MB | 250 MB | 2 GB |
| Số trang scan được đọc chữ (OCR) mỗi tệp | 20 | 100 | 500 |
| Thời gian tối đa cho một tệp | 10 phút | 30 phút | 60 phút |
| Tổng dung lượng giải nén của một tệp nén | 100 MB | 250 MB | 1 GB |
| Số tầng tệp nén lồng nhau được mở | 1 | 2 | 2 |
| Số tệp bên trong một tệp nén | 1.000 | 1.000 | 1.000 |
| Dung lượng mỗi tệp bên trong tệp nén | 20 MB | 20 MB | 20 MB |

### Khi tài liệu vượt giới hạn

Không có tài liệu nào bị bỏ qua trong im lặng. Một tệp văn bản (như `.txt`, `.csv`, `.log`, `.json`, `.xml`) lớn hơn ngưỡng đọc toàn bộ vẫn được đọc phần đầu và phần cuối, rồi gắn nhãn theo những gì đã đọc. Các định dạng khác như PDF, Word hay Excel lớn hơn ngưỡng này chưa được đọc nội dung, mà được đánh giá theo thông tin của tệp. Một bản scan dài hơn số trang OCR vẫn được kiểm tra dấu mộc trên mọi trang, chỉ phần chữ của các trang còn lại là chưa được đọc. Một tệp chạy quá thời gian cho phép được kết luận dựa trên phần đã đọc xong.

Trong mọi trường hợp đó, tài liệu vẫn có nhãn và vẫn xuất hiện trong Kiểm kê dữ liệu, nhưng kèm cảnh báo **Tài liệu chưa được phân tích đầy đủ** cùng lý do. Xem [Tệp lớn & mức phân tích](../data/large-files.md) để biết cách đọc cảnh báo và xử lý.

### Tệp chưa đọc hết

Phần chưa đọc có thể chứa dữ liệu nhạy cảm mà phần đã đọc không có. Vì vậy mỗi Chính sách Agent có một ngưỡng **Tệp chưa phân tích đầy đủ thì gắn ít nhất**, áp dụng khi agent không đọc hết nội dung của tệp: tệp nén lồng quá sâu, có mật khẩu, quá nhiều tệp hoặc quá dung lượng; tài liệu có mật khẩu; tệp lớn hơn Mức quét; bản scan vượt số trang OCR; tệp chạy quá thời gian.

Nếu nhãn từ phần đã đọc **bằng hoặc cao hơn** ngưỡng, nhãn đó được giữ. Nếu thấp hơn hoặc chưa có nhãn, tệp được gắn mức ngưỡng. Ngưỡng không bao giờ hạ nhãn xuống. Mức **Chờ rà soát** được xếp ngang với Mật: tệp đọc một phần mà phần đã đọc là Tối mật vẫn giữ Tối mật.

Mặc định là **Chờ rà soát**, vì hệ thống không biết bên trong có gì. DLP có thể chặn hoặc cảnh báo theo nhãn này, còn quản trị viên lọc Kiểm kê dữ liệu theo **Chờ rà soát**, xem lý do trong chi tiết tài liệu rồi **Cập nhật nhãn**. Chọn **Không áp dụng** để giữ nhãn từ phần đã đọc, hoặc một mức bảo mật cụ thể như Mật.

Ngưỡng không áp dụng cho tệp không phải tài liệu (video, ảnh đĩa, bản sao lưu) và tệp lớn hơn Kích thước tối đa mà bạn đặt cho nguồn dữ liệu, để danh sách rà soát không bị ngập.

### Chọn mức nào

**Chuẩn** là lựa chọn đúng cho hầu hết máy trạm, nên đây là mức mặc định. Chỉ chuyển sang **Nhẹ** khi người dùng phản ánh máy chậm hoặc máy có cấu hình thấp, chấp nhận rằng nhiều tệp lớn sẽ chỉ được phân tích một phần. Dùng **Sâu** cho máy chủ tệp và cho máy được chọn làm **Máy quét** của thư mục chia sẻ, nơi có nhiều tệp lớn và không có người ngồi làm việc trực tiếp.

Mức quét chỉ quyết định agent đọc kỹ đến đâu đối với những tệp đã nằm trong phạm vi quét. Việc một tệp có được đọc nội dung hay không còn phụ thuộc vào **Kích thước tối đa** của [Nguồn dữ liệu](../data/sources.md#kích-thước-tối-đa-và-mức-quét).

:::info[Chính sách tạo từ phiên bản trước]

Các chính sách Agent đã lưu trước khi có Mức quét được hiểu là **Chuẩn**. Giá trị "File tối đa" cũ không còn được áp dụng. Nếu trước đây bạn đã hạ ngưỡng này cho máy yếu, hãy mở lại chính sách và chọn **Nhẹ**.

:::

## Hiệu năng & tài nguyên máy

Agent được thiết kế để làm việc ở chế độ nền và nhường máy cho người dùng. Bạn không cần cấu hình gì thêm cho các cơ chế dưới đây; chúng luôn bật trên mọi máy.

<Cards>
  <Card title="Chạy ở chế độ nền của Windows">
    Việc quét chạy ở mức ưu tiên thấp về CPU, ổ đĩa và bộ nhớ. Khi người dùng mở Word, Excel hay trình duyệt, Windows dành tài nguyên cho các ứng dụng đó trước.
  </Card>
  <Card title="Số luồng quét vừa sức máy">
    Agent dùng tối đa số lõi CPU trừ một, và không quá bốn luồng. Máy hai lõi chỉ quét một tệp mỗi lúc, luôn chừa lại một lõi cho người dùng.
  </Card>
  <Card title="Mỗi lúc một tệp lớn">
    Tệp lớn được đọc lần lượt từng tệp một. Trong lúc đó các tệp nhỏ vẫn được quét song song, không phải xếp hàng chờ sau tệp lớn.
  </Card>
  <Card title="Tạm dừng khi máy thiếu bộ nhớ">
    Khi Windows báo bộ nhớ sắp cạn, agent không nhận thêm tệp mới và tạm dừng giữa chừng tệp đang đọc, rồi tiếp tục khi máy đã thoáng.
  </Card>
  <Card title="Không đọc lại tệp lớn chưa đổi">
    Sau khi máy hoặc dịch vụ khởi động lại, agent nhận ra tệp lớn không thay đổi và dùng lại kết quả cũ thay vì đọc lại từ đầu.
  </Card>
</Cards>

Agent vẫn cần tài nguyên khi phân loại một lượng lớn tài liệu lần đầu, đặc biệt là bản scan cần đọc chữ. Vì agent luôn nhường máy cho người dùng, lần quét đầu trên một máy có nhiều dữ liệu có thể kéo dài; sau đó agent chỉ xử lý tệp mới hoặc tệp vừa sửa.

## Gợi ý cấu hình

Với **máy văn phòng** luôn nối mạng nội bộ, giá trị mặc định là phù hợp. Với **laptop công tác** thường làm việc bên ngoài, hãy tăng Offline cache lên khoảng 14 ngày để kết quả phân loại không bị mất trước khi máy quay lại mạng nội bộ. Với **máy cấu hình yếu**, chọn Mức quét **Nhẹ**. Với **máy chủ tệp**, chọn Mức quét **Sâu**.

## Chính sách đi theo bộ cài

Một máy dùng chính sách Agent của bộ cài mà nó được cài từ đó, kể cả khi máy được chuyển sang đơn vị khác. Muốn đổi cấu hình cho một nhóm máy, hãy sửa chính sách Agent tương ứng: các máy sẽ nhận giá trị mới, kể cả Mức quét, ở lần báo trạng thái kế tiếp.

Giá trị mặc định cho toàn hệ thống như ngưỡng offline được thiết lập tại **Hệ thống › Cấu hình Agent mặc định**.

## Đọc tiếp

Để tạo bộ cài gắn với chính sách này, xem [Bộ cài Agent](./packages.md). Để hiểu cách agent xử lý tệp lớn, tệp nén và bản scan dài, xem [Tệp lớn & mức phân tích](../data/large-files.md). Để giới hạn phạm vi quét theo thư mục và dung lượng, xem [Nguồn dữ liệu](../data/sources.md).
