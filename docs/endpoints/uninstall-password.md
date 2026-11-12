---
sidebar_position: 4
title: Mật khẩu gỡ agent
description: Mật khẩu gỡ agent ngăn người có quyền quản trị cục bộ trên máy trạm tự gỡ hoặc dừng agent, và báo về Console khi có người thử.
---

import {Cards, Card} from '@site/src/components/FeatureCards';

Ở nhiều tổ chức, nhân viên vẫn có quyền quản trị cục bộ trên máy trạm để tự cài phần mềm. Quyền đó cũng đủ để gỡ agent NextDLP hoặc dừng dịch vụ của nó, và từ lúc ấy tài liệu trên máy không còn được phân loại. Ví dụ, một nhân viên phòng kế toán thấy máy chạy chậm khi agent quét lần đầu nên gỡ agent đi; nếu không có cơ chế bảo vệ, bộ phận CNTT chỉ phát hiện khi máy đã vắng mặt trên Console nhiều ngày.

Mật khẩu gỡ agent giải quyết việc này. Khi Quản trị hệ thống đặt mật khẩu trên Console, việc gỡ agent trên mọi máy trạm đòi hỏi mật khẩu đó, người có quyền quản trị cục bộ không dừng được dịch vụ agent bằng các công cụ quản trị thông thường của Windows, và Console thường được báo khi có người gỡ không thành công hoặc agent dừng bất thường.

Tính năng này chặn được thao tác gỡ và dừng agent thông thường, nhưng không phải hàng rào tuyệt đối: người hiểu sâu về Windows vẫn có cách gỡ agent mà không cần mật khẩu. Khi đó, dấu hiệu bạn thấy trên Console là máy chuyển sang **Mất kết nối** hoặc sự kiện **Agent dừng bất thường**; xem [Giới hạn](#giới-hạn).

## Tính năng bảo vệ những gì

<Cards>
  <Card title="Gỡ cài đặt cần mật khẩu" tag="Máy trạm">
    Lệnh gỡ agent chỉ chạy tiếp khi kèm đúng mật khẩu. Thiếu hoặc sai mật khẩu, Windows hoàn tác và agent vẫn còn nguyên.
  </Card>
  <Card title="Dịch vụ agent không bị dừng" tag="Máy trạm">
    Thành viên nhóm Administrators trên máy chỉ xem và khởi động được dịch vụ agent. Lệnh dừng, khởi động lại, chuyển sang Disabled hay xóa dịch vụ đều bị Windows từ chối với lỗi Access is denied.
  </Card>
  <Card title="Console được báo" tag="Console">
    Lần gỡ bị từ chối và lần agent dừng bất thường hiện tại máy đó trên trang Máy trạm, và chuông thông báo báo cho Quản trị hệ thống. Máy không đồng bộ quá ngưỡng offline chuyển sang Mất kết nối.
  </Card>
</Cards>

Khi agent được cài từ một bộ cài mới, nút gỡ cài đặt của NextDLP trong **Programs and Features** (Chương trình và Tính năng) bị ẩn, kể cả khi chưa đặt mật khẩu, vì bộ cài không biết trước mật khẩu sẽ được đặt hay xóa về sau. Agent vì vậy luôn được gỡ bằng lệnh, như ở mục [Gỡ agent trên máy được bảo vệ](#gỡ-agent-trên-máy-được-bảo-vệ).

Khi đã đặt mật khẩu, lệnh `sc.exe stop nextdlp` chạy trong PowerShell quyền quản trị bị Windows từ chối với mã 5; `sc.exe config nextdlp start= disabled` và `sc.exe delete nextdlp` cũng nhận cùng kết quả:

```text
[SC] OpenService FAILED 5:

Access is denied.
```

## Khi nào tính năng có hiệu lực

Hệ thống có một mật khẩu gỡ agent duy nhất, áp dụng cho mọi máy trạm; không có mật khẩu riêng theo đơn vị hay theo chính sách Agent. Bảo vệ bật đúng trong khoảng thời gian mật khẩu được đặt: đặt mật khẩu là bật, xóa mật khẩu là tắt. Khi chưa có mật khẩu, lệnh gỡ agent không hỏi mật khẩu và người có quyền quản trị cục bộ dừng được dịch vụ như trước.

Máy trạm nhận thay đổi ở lần đồng bộ kế tiếp với server, nên các máy không đổi trạng thái cùng một lúc. Agent khóa dịch vụ khi khởi động và mỗi khi nhận một mật khẩu khác, và mở khóa khi mật khẩu bị xóa.

Bộ cài chỉ mang dạng băm một chiều của mật khẩu, không mang chính mật khẩu, nên không thể lấy lại mật khẩu từ bộ cài. Mỗi lần đặt hoặc xóa mật khẩu được ghi vào nhật ký kiểm toán của hệ thống, kèm tài khoản đã thực hiện; bản thân mật khẩu không được ghi.

## Đặt hoặc đổi mật khẩu

Chỉ Quản trị hệ thống làm được việc này, vì mật khẩu nằm trên trang **Hệ thống**.

### Bước 1. Mở mục Cấu hình Agent mặc định

Vào **Báo cáo & quản trị › Hệ thống** và chọn **Cấu hình Agent mặc định**. Khối **Mật khẩu gỡ agent** nằm dưới Heartbeat, Ngưỡng offline và Kênh phát hành, kèm nhãn **Chưa đặt** hoặc **Đã đặt**.

### Bước 2. Nhập mật khẩu hai lần

Gõ mật khẩu vào ô **Mật khẩu mới** và gõ lại vào ô **Nhập lại mật khẩu**. Mật khẩu cần ít nhất 8 ký tự và không được chỉ gồm khoảng trắng; nút **Lưu** chỉ bật khi hai ô khớp nhau. Bạn sẽ gõ mật khẩu này trong PowerShell trên máy trạm, nên hãy dùng chữ cái không dấu và chữ số. Tránh dấu nháy kép `"`, dấu nháy ngược `` ` ``, các ký tự `$ % ^ & | < >` và khoảng trắng ở đầu hay cuối, vì chúng có nghĩa riêng trong dòng lệnh.

### Bước 3. Lưu

Bấm **Lưu**. Console báo **Đã lưu mật khẩu gỡ agent.** và nhãn chuyển sang **Đã đặt**. Mật khẩu không hiển thị lại sau khi lưu, nên hãy cất nó ở nơi tổ chức bạn quản lý mật khẩu.

![Khối Mật khẩu gỡ agent ở trạng thái Đã đặt](/img/console/system-uninstall-password.png)

Đổi mật khẩu cũng làm như trên: nhập mật khẩu mới rồi bấm **Lưu**, không cần biết mật khẩu cũ. Hãy giữ lại mật khẩu cũ cho đến khi mọi máy đã kết nối lại, vì máy chưa đồng bộ vẫn đòi mật khẩu cũ.

## Triển khai cho toàn bộ máy trạm

Sau khi đặt mật khẩu lần đầu, làm lần lượt các bước sau để mọi máy được bảo vệ.

1. **Đặt mật khẩu** trên Console như mục trên.
2. **Tạo lại bộ cài** của từng đơn vị tại **Thiết bị & Agent › Bộ cài Agent**, để bộ cài mang sẵn mật khẩu. Xem [Bộ cài Agent](./packages.md).
3. **Triển khai bộ cài mới** cho máy cài mới và cho máy còn chạy agent phiên bản cũ.
4. **Chờ các máy đồng bộ.** Máy đang chạy agent có tính năng này nhận mật khẩu ở lần đồng bộ kế tiếp.
5. **Cập nhật agent cũ.** Máy chạy agent phiên bản trước khi có tính năng này không được bảo vệ cho đến khi được cài agent mới.

Bảng dưới đây tóm tắt từng tình huống.

| Tình huống | Kết quả | Việc cần làm |
|---|---|---|
| Cài mới từ bộ cài tạo hoặc tạo lại sau khi đặt mật khẩu | Được bảo vệ ngay từ lúc cài. | Không cần. |
| Cài mới từ bộ cài tạo trước khi đặt mật khẩu | Chưa được bảo vệ cho đến lần đồng bộ đầu tiên. | **Tạo lại** bộ cài để đóng khoảng trống này. |
| Máy chạy agent phiên bản cũ, chưa có tính năng | Không được bảo vệ; gỡ không cần mật khẩu. | Cài agent mới bằng `Reinstall-NextDLP.ps1`. |
| Cài bộ cài có số phiên bản cao hơn đè lên bản đang có | Windows thay bản cũ trong quá trình nâng cấp, không hỏi mật khẩu. | Không cần. |
| Cài lại bằng `Reinstall-NextDLP.ps1` | Script gỡ hẳn bản cũ trước khi cài, nên cần mật khẩu. | Thêm `-UninstallPassword`. |
| Máy không kết nối được server | Giữ mật khẩu cuối cùng đã nhận. | Xem [Máy không kết nối được server](#máy-không-kết-nối-được-server). |

Hiện các bộ cài agent mang cùng một số phiên bản, nên cài bộ cài mới đè lên agent đang chạy không phải là nâng cấp theo cách Windows hiểu. Vì vậy, để cập nhật agent, hãy dùng `Reinstall-NextDLP.ps1` kèm mật khẩu. Việc cài đè không cần mật khẩu chỉ áp dụng khi bộ cài mới có số phiên bản cao hơn bản đang cài.

## Xóa mật khẩu

Bấm **Xóa mật khẩu** trong cùng khối. Console hỏi lại: khi xóa, tính năng chống gỡ cài đặt tắt trên mọi máy trạm và bất kỳ ai có quyền quản trị cục bộ cũng gỡ hoặc dừng được agent. Bấm **Xóa mật khẩu** trong hộp thoại để xác nhận; nhãn chuyển về **Chưa đặt**.

Máy đang không kết nối được server vẫn được bảo vệ bằng mật khẩu cũ cho đến khi kết nối lại và đồng bộ.

![Hộp thoại xác nhận Xóa mật khẩu gỡ agent](/img/console/system-uninstall-password-clear.png)

## Máy không kết nối được server

Một máy mất kết nối, ví dụ laptop đang công tác, giữ mật khẩu cuối cùng nó đã nhận. Mật khẩu mới, hay việc xóa mật khẩu, chỉ đến máy đó khi máy kết nối lại server. Sau khi bạn xóa mật khẩu trên Console, máy này vẫn được bảo vệ cho đến lúc đó.

Không có mã mở khóa riêng cho máy đang mất kết nối. Muốn gỡ agent trên máy như vậy, hãy dùng mật khẩu mà máy nhận lần cuối, hoặc đưa máy về mạng để nó nhận mật khẩu hiện hành.

## Gỡ agent trên máy được bảo vệ

:::info[Một mật khẩu, hai cách truyền]

`UNINSTALL_PASSWORD` trong lệnh `msiexec` và tham số `-UninstallPassword` của script `Reinstall-NextDLP.ps1` là cùng một mật khẩu: mật khẩu gỡ agent đặt trên Console.

:::

### Bước 1. Mở PowerShell với quyền quản trị

Trên máy trạm, mở PowerShell bằng **Run as administrator** (Chạy với quyền quản trị).

### Bước 2. Tìm mã sản phẩm của NextDLP

Chạy lệnh sau. Lệnh tìm trong cả hai nhánh danh sách chương trình của Windows và in ra các bản NextDLP đã cài:

```powershell
$roots = 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall',
         'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall'
$products = @(Get-ChildItem $roots -ErrorAction SilentlyContinue |
    Get-ItemProperty | Where-Object { $_.DisplayName -like 'NextDLP*' })
$products | Format-Table DisplayName, DisplayVersion, PSChildName -AutoSize
```

Nếu danh sách trống, máy không còn NextDLP. Nếu có đúng một dòng, chạy `$code = $products[0].PSChildName`. Nếu có nhiều dòng, chọn dòng cần gỡ và gán mã ở cột PSChildName, ví dụ `$code = '{mã ở cột PSChildName}'`.

### Bước 3. Nhập mật khẩu và gỡ

Chạy đoạn lệnh dưới đây. PowerShell hỏi mật khẩu và không hiện các ký tự bạn gõ, nên mật khẩu không nằm trong dòng lệnh bạn gõ hay trong lịch sử lệnh:

```powershell
$secure = Read-Host 'Mật khẩu gỡ agent' -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
$password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
$log = Join-Path $env:TEMP 'nextdlp-uninstall.log'
$arguments = '/x {0} UNINSTALL_PASSWORD="{1}" /qn /norestart /l*v "{2}"' -f $code, ($password -replace '"', '""'), $log
$process = Start-Process msiexec.exe -ArgumentList $arguments -Wait -PassThru
Remove-Variable password, arguments
"Mã kết thúc: $($process.ExitCode)  Nhật ký: $log"
```

Mật khẩu vẫn được chuyển cho trình cài đặt của Windows trên dòng lệnh của tiến trình `msiexec`, nên có thể bị ghi lại nếu tổ chức bạn bật kiểm toán dòng lệnh của tiến trình. Sau khi gỡ agent theo cách này trên nhiều máy, hãy cân nhắc đổi mật khẩu.

### Bước 4. Đọc mã kết thúc

| Mã | Ý nghĩa | Việc tiếp theo |
|---|---|---|
| 0 | Agent đã được gỡ. | Thu hồi máy trên Console, xem [Ngừng dùng một máy trạm](#ngừng-dùng-một-máy-trạm). |
| 3010 | Agent đã được gỡ; Windows cần khởi động lại máy. | Khởi động lại máy khi thuận tiện, rồi thu hồi máy. |
| 1603 | Việc gỡ bị từ chối hoặc gặp lỗi; Windows đã hoàn tác và agent vẫn chạy. | Mở máy trên trang **Máy trạm**, xem mục **Sự kiện bảo vệ agent** có **Gỡ agent bị từ chối** không (sự kiện đến sau lần đồng bộ kế tiếp). Trong tệp nhật ký, tìm dòng `uninstall refused`. Nếu đúng là bị từ chối, kiểm tra lại mật khẩu, xem [Khi không gỡ được agent](#khi-không-gỡ-được-agent). |
| 1605 | Không có sản phẩm nào với mã này trên máy. | Kiểm tra lại mã ở Bước 2. |
| 1618 | Windows đang chạy một lượt cài đặt khác. | Chờ lượt đó xong, ví dụ cập nhật Windows, rồi chạy lại Bước 3. |

Với mật khẩu sai, đoạn lệnh ở Bước 3 in `Mã kết thúc: 1603`, agent vẫn chạy, và tệp nhật ký cài đặt có hai dòng như sau:

```text
VerifyUninstall: [<thời điểm>] [nextdlp] [warning] verify-uninstall: uninstall refused: wrong uninstall password
VerifyUninstall: uninstall refused (verify-uninstall exit 1)
```

### Cài lại và cập nhật agent

Script `Reinstall-NextDLP.ps1` trong gói tải về gỡ hẳn bản agent cũ trước khi cài bản mới. Khi đã đặt mật khẩu, bước gỡ đó cần mật khẩu như mọi lần gỡ khác, nên hãy truyền mật khẩu cho script:

```powershell
.\Reinstall-NextDLP.ps1 -UninstallPassword "<mật khẩu gỡ agent>"
```

Thiếu mật khẩu, script dừng ở bước gỡ với mã 1603 và nhắc bạn truyền `-UninstallPassword`. Mật khẩu gõ theo cách này nằm trong lịch sử lệnh của PowerShell, nên hãy xóa lịch sử sau khi cài lại, hoặc đổi mật khẩu.

## Khi cần dừng dịch vụ agent để hỗ trợ

Khóa dịch vụ áp dụng cho cả bộ phận CNTT: khi đã đặt mật khẩu, `Stop-Service`, `Restart-Service` hay nút Stop trong Services đều bị từ chối, kể cả với tài khoản quản trị cục bộ. Nếu cần dừng agent để xử lý sự cố, hãy xóa mật khẩu trên Console, chờ máy đó đồng bộ, rồi dừng hoặc khởi động lại dịch vụ. Xong việc, đặt lại mật khẩu; máy sẽ khóa lại ở lần đồng bộ kế tiếp. Lưu ý rằng xóa mật khẩu tắt bảo vệ trên mọi máy trạm trong thời gian đó.

## Ngừng dùng một máy trạm

Khi máy được thanh lý hoặc chuyển sang không dùng NextDLP, làm theo thứ tự sau.

### Bước 1. Gỡ agent bằng mật khẩu

Gỡ agent như mục [Gỡ agent trên máy được bảo vệ](#gỡ-agent-trên-máy-được-bảo-vệ) khi máy còn kết nối được server, để nếu việc gỡ bị từ chối, Console vẫn nhận được sự kiện.

### Bước 2. Thu hồi máy trên Console

Vào **Thiết bị & Agent › Máy trạm**, chọn máy và bấm **Thu hồi**. Máy đã thu hồi không còn bị đánh dấu **Mất kết nối**, nên bạn không nhận cảnh báo về nó nữa. Xem [Máy trạm](./machines.md).

## Theo dõi trên Console

Hai loại sự kiện bảo vệ gắn với máy, không gắn với tệp, nên chúng hiện trên trang **Thiết bị & Agent › Máy trạm**, ngay tại máy xảy ra sự kiện, chứ không nằm trong Nhật ký phân loại.

| Loại sự kiện | Khi nào xuất hiện |
|---|---|
| Gỡ agent bị từ chối | Việc gỡ agent trên máy bị từ chối vì thiếu mật khẩu hoặc mật khẩu không đúng, hoặc vì agent không kiểm tra được mật khẩu. Sự kiện chỉ được ghi khi dịch vụ agent đang chạy lúc việc gỡ bị từ chối, và đến Console sau khi máy đồng bộ với server. |
| Agent dừng bất thường | Agent khởi động lại sau một lần dừng không đúng quy trình: tiến trình bị buộc tắt, máy mất điện, agent gặp sự cố hoặc tự khởi động lại sau khi bị treo. Khi tiến trình agent bị buộc tắt, Windows tự khởi động lại dịch vụ, dịch vụ vẫn bị khóa, và sự kiện xuất hiện ngay sau đó. Tắt hay khởi động lại Windows bình thường không tạo sự kiện này. |

Máy có sự kiện bảo vệ trong 7 ngày qua được đánh dấu bằng biểu tượng khiên trước tên máy, màu đỏ khi sự kiện gần nhất là **Gỡ agent bị từ chối** và màu cam khi là **Agent dừng bất thường**. Rê chuột vào biểu tượng để xem loại sự kiện và thời điểm. Phía trên danh sách, một dòng cảnh báo cho biết có bao nhiêu máy như vậy; bấm **Xem các máy này** để chỉ hiện những máy đó. Bộ lọc **Sự kiện bảo vệ** với lựa chọn **Có sự kiện trong 7 ngày** cho cùng kết quả.

![Máy trạm với dòng cảnh báo sự kiện bảo vệ và biểu tượng khiên trước tên máy](/img/console/endpoints-protection-flag.png)

Bấm vào tên máy để mở bảng chi tiết của máy. Mục **Sự kiện bảo vệ agent** liệt kê 20 sự kiện gần nhất, mới nhất ở trên, kèm thời điểm xảy ra và ý nghĩa của từng loại. Sau 7 ngày biểu tượng khiên tắt, nhưng sự kiện vẫn nằm trong mục **Sự kiện bảo vệ agent** của máy; khi máy có hơn 20 sự kiện, mục này ghi số sự kiện đang hiện trên tổng số. Địa chỉ trang lúc này trỏ thẳng tới máy đó, nên bạn có thể gửi cho đồng nghiệp để họ mở đúng máy. Quản lý đơn vị thấy các sự kiện này trên những máy thuộc đơn vị mình.

![Bảng chi tiết máy với mục Sự kiện bảo vệ agent](/img/console/endpoint-drawer-protection-events.png)

Nếu bạn đăng nhập bằng tài khoản Quản trị hệ thống và đang mở Console khi sự kiện đến, chuông thông báo hiện **Gỡ agent bị từ chối** ("Việc gỡ agent trên … bị từ chối vì thiếu mật khẩu hoặc mật khẩu không đúng.") hoặc **Agent dừng bất thường** ("Agent trên … đã dừng bất thường (bị tắt hoặc mất điện) và vừa chạy lại."). Bấm vào thông báo để mở bảng chi tiết của máy đó. Sự kiện xảy ra khi không ai mở Console vẫn được ghi lại và hiện trên trang Máy trạm. Quản lý đơn vị không nhận thông báo trên chuông; hãy xem dòng cảnh báo trên trang Máy trạm.

![Chuông thông báo với Gỡ agent bị từ chối và Agent dừng bất thường](/img/console/notifications-agent-protection.png)

Vì mất điện hay sự cố cũng tạo sự kiện **Agent dừng bất thường**, một sự kiện đơn lẻ chưa đủ để kết luận có người can thiệp. Hãy chú ý khi sự kiện lặp lại trên cùng một máy, hoặc đi kèm **Gỡ agent bị từ chối**.

Một máy không đồng bộ quá **Ngưỡng offline** (xem tại **Hệ thống › Cấu hình Agent mặc định**, mặc định 300 giây) chuyển sang **Mất kết nối** trên trang [Máy trạm](./machines.md), và chuông hiện **Máy trạm mất kết nối**. Đây cũng là dấu hiệu bạn nhận được khi agent bị gỡ bằng cách vượt qua mật khẩu, hoặc khi máy đơn giản đã tắt hay rời mạng.

## Khi không gỡ được agent

**Quên mật khẩu.** Đặt một mật khẩu mới trên Console như mục [Đặt hoặc đổi mật khẩu](#đặt-hoặc-đổi-mật-khẩu), chờ máy trạm đồng bộ, rồi gỡ bằng mật khẩu mới.

**Nhập đúng mật khẩu mà vẫn bị từ chối.** Nếu máy vừa nhận mật khẩu mới, hãy chắc rằng bạn dùng mật khẩu mới nhất. Nếu vẫn bị từ chối, agent trên máy có thể không đọc được mật khẩu đã lưu: hãy lưu lại mật khẩu trên Console (có thể dùng đúng mật khẩu cũ), chờ máy đồng bộ để agent ghi lại mật khẩu, rồi gỡ lại.

**Chương trình agent bị hỏng hoặc mất.** Việc kiểm tra mật khẩu do chính chương trình agent thực hiện, nên khi chương trình này bị xóa hay hỏng, mọi lần gỡ đều bị từ chối. Hãy sửa bản cài trước bằng `msiexec /fa <mã sản phẩm>` trong PowerShell quyền quản trị; sửa bản cài không cần mật khẩu. Sau đó gỡ như bình thường. Nếu việc sửa bản cài cũng thất bại, hãy gửi tệp nhật ký cài đặt cho đội hỗ trợ NextDLP.

## Giới hạn

Mật khẩu gỡ agent chặn được việc gỡ và dừng agent bằng các thao tác quản trị thông thường: danh sách chương trình của Windows, lệnh gỡ cài đặt, công cụ quản lý dịch vụ. Một người có quyền quản trị cục bộ và hiểu sâu về Windows vẫn có thể vượt qua nó, chẳng hạn bằng cách chạy lệnh với quyền của chính hệ điều hành, khởi động máy ở chế độ đặc biệt hoặc can thiệp vào trình cài đặt.

Trong những trường hợp đó NextDLP không ngăn được việc gỡ, nhưng việc gỡ không diễn ra trong im lặng: máy chuyển sang **Mất kết nối** sau ngưỡng offline, hoặc Console nhận **Agent dừng bất thường** khi agent chạy lại. Console hiện chưa cho biết từng máy đã nhận mật khẩu hay chưa. Hãy kết hợp tính năng này với việc hạn chế quyền quản trị cục bộ của người dùng khi có thể.

## Đọc tiếp

Để xem trạng thái kết nối của từng máy và thu hồi máy đã gỡ agent, xem [Máy trạm](./machines.md). Để tạo lại bộ cài sau khi đặt mật khẩu, xem [Bộ cài Agent](./packages.md). Các cấu hình áp dụng cho toàn hệ thống khác nằm ở [Hệ thống](../admin/system.md).
