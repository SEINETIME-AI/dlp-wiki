---
sidebar_position: 2
title: Bản tiếp theo
description: Những thay đổi đã hoàn thành và sẽ có trong bản cập nhật tiếp theo của NextDLP.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Trang này tóm tắt những thay đổi đã hoàn thành sau V1 và sẽ có trong bản cập nhật tiếp theo. Các tính năng này **chưa phát hành**; ngày phát hành và số phiên bản sẽ được ghi tại đây khi gói cài đặt mới sẵn sàng. Để cập nhật, làm theo [Nâng cấp & gỡ cài đặt](../operations/upgrade-uninstall.md), rồi cài lại agent bằng bộ cài mới.

## Tệp lớn không còn bị bỏ qua

Trọng tâm của bản này là xử lý tệp lớn và tệp phức tạp: mọi tệp trong phạm vi quét đều được ghi nhận và gắn nhãn, và Console cho biết rõ tệp nào chưa được đọc hết.

<Cards>
  <Card title="Mức quét" tag="Chính sách Agent">
    Chọn Nhẹ, Chuẩn hoặc Sâu thay cho ô "File tối đa (MB)". Mỗi mức quy định dung lượng đọc toàn bộ, số trang OCR, thời gian cho một tệp và giới hạn tệp nén. Chính sách cũ được hiểu là Chuẩn.
  </Card>
  <Card title="Cảnh báo chưa phân tích đầy đủ" tag="Kiểm kê dữ liệu">
    Tài liệu chỉ được đọc một phần hiển thị cảnh báo kèm lý do, và bộ lọc Mức phân tích giúp liệt kê tất cả chúng.
  </Card>
  <Card title="Kích thước tối đa cố định" tag="Nguồn dữ liệu">
    Chọn 100 MB đến 2 GB. Tệp lớn hơn không còn bị ẩn mà vẫn hiện trong Kiểm kê dữ liệu kèm cảnh báo.
  </Card>
</Cards>

**Mức quét trong Chính sách Agent.** Ba mức Nhẹ, Chuẩn và Sâu đọc đầy đủ tệp đến 50 MB, 250 MB và 2 GB, đọc chữ tối đa 20, 100 và 500 trang scan mỗi tệp, và dành tối đa 10, 30 và 60 phút cho một tệp. Xem [Chính sách Agent](../endpoints/agent-policy.md#mức-quét).

**Không tệp nào bị bỏ qua trong im lặng.** Tệp lớn hơn Mức quét được đọc một phần hoặc đánh giá theo thông tin tệp; video, ảnh đĩa và bản sao lưu được đánh giá theo thông tin tệp; tệp lớn hơn Kích thước tối đa của nguồn vẫn xuất hiện trong Kiểm kê. Xem [Tệp lớn & mức phân tích](../data/large-files.md).

**Đọc tệp lớn nhanh hơn và nhẹ hơn.** PDF có sẵn lớp chữ không còn bị OCR từng trang, nên một báo cáo gần 100 trang trộn chữ và trang scan giảm từ hơn 5 phút xuống khoảng 1 phút trên một máy tính văn phòng thông thường. PDF được xử lý từng trang một, tài liệu Office được đọc từng phần, và tệp lớn không đổi không bị đọc lại sau khi khởi động lại máy.

**Tệp nén được đọc bên trong.** Agent mở zip, rar, 7z, tar, gz và phân loại từng tài liệu bên trong; tệp nén nhận mức cao nhất của các tệp bên trong, và phần giải thích liệt kê riêng từng tệp. Tệp nén có tỷ lệ nén bất thường bị từ chối.

## Máy người dùng mượt hơn

**Agent chạy ở chế độ nền của Windows**, nhường CPU, ổ đĩa và bộ nhớ cho ứng dụng của người dùng. Agent dùng tối đa số lõi CPU trừ một (không quá bốn), chỉ đọc một tệp lớn mỗi lúc trong khi tệp nhỏ vẫn được quét song song, và tạm dừng khi Windows báo bộ nhớ sắp cạn. Xem [Hiệu năng & tài nguyên máy](../endpoints/agent-policy.md#hiệu-năng--tài-nguyên-máy).

## Phân loại chính xác hơn

**Không còn bỏ sót dữ liệu ở ranh giới đoạn đọc.** Với tệp lớn được đọc theo từng đoạn, một số căn cước, số tài khoản hay từ khoá nằm vắt qua chỗ nối giữa hai đoạn trước đây có thể bị bỏ sót; nay chúng được nhận diện bình thường.

**Phân tích ngữ nghĩa cho tài liệu dài.** Tài liệu quá dài được phân tích ngữ nghĩa trên các đoạn mẫu trải đều từ đầu đến cuối, thay vì bỏ qua kỹ thuật này. Từ khoá, mẫu nhận diện và từ điển vẫn kiểm tra toàn bộ nội dung.

**Gợi ý điều kiện bằng AI gọn hơn và đáng tin hơn.** Các điều kiện trùng nhau được gộp thành một với mức bảo mật cao nhất, và gợi ý từ tệp mẫu không còn bị ngắt giữa chừng do chờ quá lâu. Mô tả bằng chữ không còn gặp lỗi "model response missing conditions": trong thử nghiệm, tỷ lệ mô tả nhận được điều kiện tăng từ 6/18 lên 18/18. Tệp mẫu Word, Excel, PowerPoint và PDF được nhận đến 12 MB, thay vì 1 MB. Xem [Viết mô tả cho Gợi ý AI](../classification/ai-suggest.md) để có kết quả tốt ngay từ lần đầu.

## Triển khai và vận hành

**Console dùng HTTPS.** Console và API được phục vụ qua HTTPS ở cổng 443; cổng 80 tự chuyển sang HTTPS. Lần đầu truy cập, trình duyệt cảnh báo về chứng chỉ; chọn **Advanced** rồi **Continue**. Xem [Cài đặt & kết nối](../getting-started/install.md).

**Server tự chạy lại** sau khi máy chủ khởi động lại hoặc một dịch vụ gặp sự cố, miễn là Docker được đặt tự khởi động cùng Windows.

**Đăng nhập lần đầu rõ ràng hơn.** Lần đầu đăng nhập bằng **admin / admin**, Console yêu cầu đặt mật khẩu mới ngay. Gói cài đặt kèm hướng dẫn ngắn cho người cài.

**Agent chạy được trên Windows mới cài**, không cần cài thêm thư viện Visual C++.

## Đọc tiếp

Những hạn chế còn lại được liệt kê tại [Lỗi đã biết](./known-issues.md). Các hướng phát triển tiếp theo có tại [Dự kiến V2](./v2-roadmap.md).
