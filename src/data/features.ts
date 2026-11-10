/**
 * Content of the Tính năng page (/features): the product's feature groups by phase.
 * Phase 1 lists what ships in 1.0; phases 2 and 3 are the roadmap. Edit the text here, not in the page.
 */

/** Name of an icon drawn by components/Features/Icon. */
export type IconName =
  | 'search'
  | 'scan'
  | 'ai'
  | 'policy'
  | 'tag'
  | 'users'
  | 'chart'
  | 'monitor'
  | 'laptop'
  | 'lock'
  | 'plug'
  | 'sliders'
  | 'cloud'
  | 'building'
  | 'layers';

/** Where a feature stands: shipped, being built, or planned. */
export type Status = 'available' | 'in-progress' | 'planned';

/** One feature inside a group. */
export type Item = {
  title: string;
  /** One or two sentences for a customer: what it does for them. */
  detail: string;
  status: Status;
  /** Docs page that explains the feature, for shipped features. */
  link?: string;
};

/** A group of related features, shown as one card. */
export type Group = {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  items: Item[];
};

/** One phase of the roadmap. */
export type Phase = {
  /** Used in the URL hash, e.g. #giai-doan-2. */
  id: string;
  number: 1 | 2 | 3;
  /** Short name on the stepper and tabs. */
  name: string;
  /** What the phase is about, one line. */
  tagline: string;
  /** "Kết quả" box at the end of the phase. */
  outcome: string;
  groups: Group[];
};

const phase1: Phase = {
  id: 'giai-doan-1',
  number: 1,
  name: 'Bản 1.0',
  tagline: 'Phiên bản thương mại đầu tiên, đã phát hành',
  outcome:
    'NextDLP 1.0 phân loại và gắn nhãn tài liệu trên máy trạm Windows, đọc được cả bản scan, cho phép đổi nhãn có phân quyền và phê duyệt, rồi cung cấp nhãn cho hệ thống DLP mà tổ chức đang dùng. Toàn bộ chạy trong hạ tầng của tổ chức.',
  groups: [
    {
      id: 'phat-hien',
      icon: 'search',
      title: 'Phát hiện & phân loại dữ liệu',
      summary: 'Agent tìm và đọc tài liệu trong các thư mục được giao, kể cả thư mục chia sẻ trên mạng.',
      items: [
        {
          title: 'Quét thư mục cục bộ và thư mục chia sẻ',
          detail:
            'Agent theo dõi liên tục các thư mục khai báo trong Nguồn dữ liệu, gồm thư mục trên máy trạm và thư mục chia sẻ SMB/NAS, rồi tự phân loại tệp mới hoặc vừa thay đổi. Không cần đặt lịch quét, và có thể tạm dừng từng nguồn khi cần.',
          status: 'available',
          link: '/docs/data/sources',
        },
        {
          title: 'Nhiều định dạng tệp',
          detail:
            'Đọc Word, Excel, PowerPoint (.docx, .xlsx, .pptx), PDF, tệp văn bản, CSV, ảnh, bản vẽ AutoCAD (kể cả chữ dùng font TCVN3, VNI) và từng tài liệu bên trong tệp nén như zip, rar, 7z. Tệp Office đời cũ (.doc, .xls, .ppt) hiện được ghi nhận theo tên, đường dẫn và kích thước, chưa đọc nội dung.',
          status: 'available',
          link: '/docs/getting-started/specs#định-dạng-tệp',
        },
        {
          title: 'Mẫu nhận diện dữ liệu phổ biến tại Việt Nam',
          detail:
            'Thư viện có sẵn mẫu cho số CCCD/CMND, mã số thuế, mã số bảo hiểm xã hội, số hộ chiếu, số tài khoản ngân hàng và nhiều loại dữ liệu khác. Tổ chức tạo thêm mẫu riêng khi cần.',
          status: 'available',
          link: '/docs/classification/rules',
        },
        {
          title: 'Hai tầng nhãn',
          detail:
            'Mỗi tài liệu có một mức bảo mật theo thang do tổ chức tự sắp xếp, và một hoặc nhiều loại tài liệu phân cấp cha con, ví dụ Tài chính › Báo cáo quý.',
          status: 'available',
          link: '/docs/classification/taxonomy',
        },
        {
          title: 'Tệp lớn và tệp nén',
          detail:
            'Tệp quá lớn, bản scan nhiều trang hoặc tệp nén có thể chỉ được đọc một phần. Những tài liệu này vẫn có trong Kiểm kê dữ liệu và được gắn cờ chưa phân tích đầy đủ để rà soát, thay vì bị coi là không chứa dữ liệu nhạy cảm.',
          status: 'available',
          link: '/docs/data/large-files',
        },
      ],
    },
    {
      id: 'ocr',
      icon: 'scan',
      title: 'OCR tiếng Việt & dấu mộc',
      summary: 'Đọc được hồ sơ giấy đã scan, loại tài liệu mà công cụ chỉ đọc chữ có sẵn trong tệp thường bỏ sót.',
      items: [
        {
          title: 'Đọc PDF scan và ảnh chụp',
          detail:
            'Agent nhận dạng chữ tiếng Việt có dấu trong bản scan và ảnh ngay trên máy trạm, rồi phân loại như tài liệu thường.',
          status: 'available',
          link: '/docs/getting-started/specs#định-dạng-tệp',
        },
        {
          title: 'Nhận diện dấu mộc',
          detail:
            'Agent dò con dấu đỏ trên bản scan và ảnh. Điều kiện Dấu mộc trong chính sách dùng kết quả này để gắn nhãn cho công văn, hồ sơ có đóng dấu.',
          status: 'available',
          link: '/docs/classification/policies#kỹ-thuật-nhận-diện',
        },
        {
          title: 'Nhận ra công ty, đơn vị trên con dấu',
          detail:
            'Agent đọc chữ trên vòng dấu để biết đó là dấu của cơ quan, đơn vị nào. Bạn nêu tên đơn vị trong điều kiện Dấu mộc, và có thể chỉ gắn nhãn khi đúng là dấu của các đơn vị đó, ví dụ chỉ công văn đóng dấu của chính công ty. Khi vòng dấu mờ, agent tìm tên đơn vị trong khối ký tên quanh con dấu.',
          status: 'available',
          link: '/docs/classification/policies#công-ty-trên-dấu-mộc',
        },
        {
          title: 'Đọc bản scan trên máy chủ GPU (tùy chọn)',
          detail:
            'Khi cài thêm AssistOCR trên máy chủ có GPU trong mạng nội bộ, chính sách có thể giao việc đọc ảnh và bản scan cho máy chủ, giảm tải cho máy trạm và đọc tốt hơn bản scan khó. Máy trạm thiếu bộ nhớ hoặc đang bận cũng tự nhờ máy chủ. Khi máy chủ chưa sẵn sàng hoặc đã dùng hết hạn mức trong ngày, agent tự đọc trên máy trạm.',
          status: 'available',
          link: '/docs/classification/policies#chế-độ-ocr',
        },
      ],
    },
    {
      id: 'ai',
      icon: 'ai',
      title: 'Phân loại theo nội dung, có AI hỗ trợ',
      summary: 'Kết hợp quy tắc với hiểu ngữ nghĩa, và luôn giải thích được vì sao tài liệu có nhãn đó.',
      items: [
        {
          title: 'Nhiều kỹ thuật trong một chính sách',
          detail:
            'Từ khóa, mẫu ký tự (ví dụ dãy 12 chữ số của CCCD), từ điển có trọng số, ngữ nghĩa và dấu mộc được dùng cùng nhau. Mỗi loại tài liệu chọn kỹ thuật phù hợp với nó.',
          status: 'available',
          link: '/docs/classification/policies#kỹ-thuật-nhận-diện',
        },
        {
          title: 'Phân loại theo ngữ nghĩa',
          detail:
            'Mô hình học máy chạy trong hạ tầng của tổ chức nhận ra tài liệu cùng chủ đề dù diễn đạt khác. Nội dung không được gửi tới dịch vụ AI bên ngoài.',
          status: 'available',
          link: '/docs/getting-started/data-flow#mô-hình-ai',
        },
        {
          title: 'Gợi ý điều kiện bằng AI',
          detail:
            'Bạn mô tả loại tài liệu cần nhận diện và đưa vài tài liệu mẫu. Console đề xuất điều kiện để bạn rà soát rồi áp dụng vào chính sách. Mô hình gợi ý chạy trên server nội bộ.',
          status: 'available',
          link: '/docs/classification/ai-suggest',
        },
        {
          title: 'Giải thích từng nhãn',
          detail:
            'Mỗi sự kiện phân loại cho biết điều kiện nào đã khớp, mức độ giống về nội dung với mô tả mẫu, kết quả dò dấu mộc và phiên bản chính sách đã dùng.',
          status: 'available',
          link: '/docs/classification/events#đọc-giải-thích-của-một-sự-kiện',
        },
      ],
    },
    {
      id: 'chinh-sach',
      icon: 'policy',
      title: 'Quản lý chính sách',
      summary: 'Soạn một lần trên Console, agent trên mọi máy của đơn vị tự nhận bản mới.',
      items: [
        {
          title: 'Chính sách theo đơn vị',
          detail:
            'Chính sách phân loại áp dụng theo đơn vị trong cơ cấu tổ chức. Phòng ban chưa có chính sách riêng kế thừa chính sách của công ty con cấp trên.',
          status: 'available',
          link: '/docs/organization/org#chính-sách-kế-thừa',
        },
        {
          title: 'Phiên bản và tự đồng bộ',
          detail:
            'Mỗi lần lưu, chính sách được nâng phiên bản và đẩy xuống agent. Agent tự phân loại lại tài liệu theo điều kiện mới, không cần cài lại.',
          status: 'available',
          link: '/docs/classification/policies#phiên-bản-và-đồng-bộ',
        },
        {
          title: 'Nhiều chính sách cho một đơn vị',
          detail:
            'Một đơn vị có thể bật nhiều chính sách cùng lúc. Màn hình Xem chính sách hiệu lực cho biết chính xác bản gộp mà agent của đơn vị đang nhận, và đơn vị đang dùng chính sách riêng hay kế thừa.',
          status: 'available',
          link: '/docs/classification/policies#phiên-bản-và-đồng-bộ',
        },
        {
          title: 'Loại trừ đuôi tệp và thư mục',
          detail: 'Nguồn dữ liệu cho phép bỏ qua những đuôi tệp và thư mục không cần theo dõi.',
          status: 'available',
          link: '/docs/data/sources',
        },
        {
          title: 'Nhập và xuất JSON',
          detail:
            'Xuất toàn bộ chính sách ra JSON để lưu trữ hoặc chuyển sang hệ thống khác, và tạo chính sách mới từ một bản có sẵn.',
          status: 'available',
          link: '/docs/classification/policies#nhập-và-xuất-json',
        },
        {
          title: 'Chính sách Agent theo nhóm máy',
          detail:
            'Với từng nhóm máy, bạn đặt bao lâu agent báo trạng thái về server một lần, Mức quét Nhẹ, Chuẩn hoặc Sâu, và số ngày giữ sự kiện trên máy khi mất kết nối. Các thiết lập này đi kèm bộ cài.',
          status: 'available',
          link: '/docs/endpoints/agent-policy',
        },
      ],
    },
    {
      id: 'nhan',
      icon: 'tag',
      title: 'Nhãn & điều chỉnh nhãn',
      summary: 'Nhãn đi cùng tệp, và mỗi lần đổi nhãn đều qua đúng người có quyền.',
      items: [
        {
          title: 'Ghi nhãn vào tệp',
          detail:
            'Mức bảo mật và loại tài liệu được ghi vào thuộc tính của tệp Office và PDF. Nhãn đi cùng tệp khi sao chép, đổi tên hay gửi đi, và hệ thống DLP đọc nhãn ngay trong tệp để quyết định chặn hay cho phép.',
          status: 'available',
          link: '/docs/classification/file-labels',
        },
        {
          title: 'Cập nhật nhãn trực tiếp',
          detail:
            'Quản trị hệ thống và Quản lý đơn vị sửa nhãn của một tài liệu ngay trong Kiểm kê dữ liệu. Nhãn mới có hiệu lực ngay và được đồng bộ xuống agent để ghi vào tệp.',
          status: 'available',
          link: '/docs/data/inventory#đổi-nhãn-tài-liệu',
        },
        {
          title: 'Yêu cầu đổi nhãn và phê duyệt',
          detail:
            'Người dùng máy trạm đề xuất nhãn mới kèm lý do. Quản lý đơn vị hoặc Quản trị hệ thống phê duyệt hoặc từ chối, và người gửi theo dõi được trạng thái yêu cầu.',
          status: 'available',
          link: '/docs/data/inventory#duyệt-yêu-cầu-đổi-nhãn',
        },
        {
          title: 'Chống sửa nhãn bằng tay',
          detail:
            'Khi nhãn trong tệp bị sửa hoặc xóa, agent ghi lại nhãn đúng và lưu sự kiện Can thiệp nhãn vào Nhật ký phân loại.',
          status: 'available',
          link: '/docs/classification/file-labels#bảo-vệ-nhãn-khỏi-sửa-tay',
        },
        {
          title: 'API tra nhãn cho DLP',
          detail:
            'Với ảnh, bản vẽ và các định dạng không ghi được nhãn vào tệp, hệ thống DLP gửi mã SHA-256 của tệp tới API tra nhãn của NextDLP và nhận lại mức bảo mật, loại tài liệu. Ở bản 1.0, đội hỗ trợ NextDLP hướng dẫn mở cổng của API này khi tích hợp.',
          status: 'available',
          link: '/docs/integrations/dlp#cách-2-tra-cứu-nhãn-qua-grpc',
        },
      ],
    },
    {
      id: 'phan-quyen',
      icon: 'users',
      title: 'Tổ chức & phân quyền',
      summary: 'Mỗi người chỉ thấy và thao tác trong phạm vi đơn vị của mình.',
      items: [
        {
          title: 'Cơ cấu tổ chức ba cấp',
          detail:
            'Tổng công ty ở cấp trên cùng. Bên dưới là công ty con, có thể có phòng ban riêng, và ban chuyên môn trực thuộc Tổng công ty. Máy trạm, chính sách và phạm vi phân quyền đều gắn với cơ cấu này.',
          status: 'available',
          link: '/docs/organization/org',
        },
        {
          title: 'Ba vai trò, phạm vi theo đơn vị',
          detail:
            'Quản trị hệ thống, Quản lý đơn vị và Người dùng máy trạm, mỗi vai trò có quyền riêng. Một Quản lý đơn vị có thể phụ trách nhiều đơn vị. Tài khoản Người dùng máy trạm được tạo tự động khi máy đăng ký.',
          status: 'available',
          link: '/docs/organization/users#vai-trò',
        },
        {
          title: 'Bảo mật đăng nhập',
          detail:
            'Độ dài mật khẩu tối thiểu, khóa tài khoản khi nhập sai nhiều lần, đặt lại mật khẩu và thu hồi mọi phiên đăng nhập của một người dùng.',
          status: 'available',
          link: '/docs/organization/users#các-thao-tác-trên-tài-khoản',
        },
      ],
    },
    {
      id: 'giam-sat',
      icon: 'chart',
      title: 'Giám sát, nhật ký & báo cáo',
      summary: 'Biết dữ liệu mật đang nằm ở đâu, và có bằng chứng khi cần kiểm toán.',
      items: [
        {
          title: 'Trang Tổng quan',
          detail:
            'Số tài liệu đã phân loại, dữ liệu nhạy cảm, máy đang hoạt động, yêu cầu cần duyệt và xu hướng phân loại trên một màn hình.',
          status: 'available',
          link: '/docs/admin/reports',
        },
        {
          title: 'Kiểm kê dữ liệu',
          detail:
            'Danh mục mọi tài liệu đã quét kèm nhãn, máy và nguồn chứa nó. Lọc nhanh tài liệu nhạy cảm hoặc tài liệu chưa được phân tích đầy đủ.',
          status: 'available',
          link: '/docs/data/inventory#tra-cứu-tài-liệu',
        },
        {
          title: 'Nhật ký phân loại không sửa được',
          detail:
            'Mọi lần phân loại, can thiệp nhãn và gắn lại nhãn chỉ được ghi thêm vào nhật ký. Lọc theo thời gian, máy, đơn vị và nhãn.',
          status: 'available',
          link: '/docs/classification/events',
        },
        {
          title: 'Báo cáo và xuất dữ liệu',
          detail:
            'Báo cáo theo nhãn, theo đơn vị và các trường hợp hạ mức bảo mật. Xuất CSV và PDF để trình lãnh đạo hoặc lưu hồ sơ.',
          status: 'available',
          link: '/docs/admin/reports#xuất-dữ-liệu',
        },
        {
          title: 'Thông báo trên Console',
          detail:
            'Console báo khi máy mất kết nối, nguồn dữ liệu gặp sự cố kết nối, có yêu cầu đổi nhãn mới, hoặc máy không kết nối được vì đã dùng hết số máy trong giấy phép. Bật hoặc tắt từng loại thông báo tại Hệ thống.',
          status: 'available',
          link: '/docs/admin/system',
        },
        {
          title: 'Tìm kiếm nhanh',
          detail: 'Một ô tìm kiếm chung cho máy trạm, đơn vị, chính sách và tài liệu.',
          status: 'available',
          link: '/docs/getting-started/intro#tìm-kiếm-nhanh',
        },
      ],
    },
    {
      id: 'agent',
      icon: 'monitor',
      title: 'Agent Windows',
      summary: 'Cài một lần, agent tự chạy, tự đồng bộ và tự khởi động lại khi gặp sự cố.',
      items: [
        {
          title: 'Chạy nền, ưu tiên ứng dụng của người dùng',
          detail:
            'Agent chạy dưới dạng dịch vụ Windows ở chế độ ưu tiên nền, nên ứng dụng của người dùng luôn được ưu tiên. Máy cấu hình yếu có thể dùng Mức quét Nhẹ.',
          status: 'available',
          link: '/docs/endpoints/agent-policy#hiệu-năng--tài-nguyên-máy',
        },
        {
          title: 'Hoạt động khi mất kết nối',
          detail:
            'Agent tiếp tục phân loại theo chính sách đã nhận và giữ sự kiện chưa gửi trên máy, rồi gửi lên server khi có kết nối trở lại.',
          status: 'available',
          link: '/docs/getting-started/data-flow#dữ-liệu-lưu-trên-máy-trạm',
        },
        {
          title: 'Tự bảo vệ và tự khởi động lại',
          detail:
            'Người dùng thông thường không dừng, gỡ hay sửa được dịch vụ agent; chỉ người có quyền quản trị máy mới làm được. Dịch vụ tự khởi động lại khi dừng bất thường hoặc bị treo.',
          status: 'available',
          link: '/docs/endpoints/machines#agent-tự-bảo-vệ-và-tự-khởi-động-lại',
        },
        {
          title: 'Bộ cài theo đơn vị',
          detail:
            'Bộ cài gắn sẵn đơn vị và Chính sách Agent. Máy cài từ bộ cài tự đăng ký với server, không cần cấu hình trên từng máy. Khi nâng cấp, chạy bộ cài mới trên máy trạm; máy giữ nguyên danh tính và dữ liệu đã quét.',
          status: 'available',
          link: '/docs/endpoints/packages',
        },
      ],
    },
    {
      id: 'van-hanh',
      icon: 'sliders',
      title: 'Quản lý máy trạm & vận hành',
      summary: 'Nắm tình trạng từng máy và kiểm soát máy nào được kết nối với hệ thống.',
      items: [
        {
          title: 'Theo dõi máy trạm',
          detail:
            'Trang Máy trạm cho biết máy nào trực tuyến, mất kết nối hay đang chờ đồng bộ chính sách, kèm địa chỉ IP, người đang đăng nhập và thời điểm kết nối gần nhất.',
          status: 'available',
          link: '/docs/endpoints/machines',
        },
        {
          title: 'Thu hồi máy và cấp lại khóa',
          detail:
            'Thu hồi một máy ngay trên Console: server từ chối mọi kết nối của agent trên máy đó, tài khoản gắn với máy bị xóa và máy không còn tính vào giấy phép. Tạo lại khóa khi nghi khóa của máy bị lộ, khóa cũ hết hiệu lực ngay.',
          status: 'available',
          link: '/docs/endpoints/machines#thao-tác-quản-trị',
        },
        {
          title: 'Chuyển đơn vị cho máy',
          detail: 'Chuyển máy sang đơn vị khác khi nhân viên đổi phòng ban; máy dùng chính sách phân loại của đơn vị mới.',
          status: 'available',
          link: '/docs/endpoints/machines#thao-tác-quản-trị',
        },
        {
          title: 'Giấy phép và phiên bản',
          detail:
            'Kích hoạt giấy phép, theo dõi số máy đã dùng, thời hạn, gia hạn và phiên bản agent đang chạy ngay trên Console.',
          status: 'available',
          link: '/docs/admin/license',
        },
        {
          title: 'Chạy hoàn toàn trong hạ tầng của bạn',
          detail:
            'Server chạy bằng Docker trong mạng nội bộ. Máy chủ không có internet dùng bản cài offline đầy đủ.',
          status: 'available',
          link: '/docs/getting-started/install',
        },
      ],
    },
  ],
};

const phase2: Phase = {
  id: 'giai-doan-2',
  number: 2,
  name: 'Tích hợp doanh nghiệp',
  tagline: 'Tích hợp sâu hơn với hạ tầng sẵn có của doanh nghiệp',
  outcome:
    'NextDLP tích hợp với Active Directory/LDAP và hệ thống giám sát an ninh (SIEM), có agent cho macOS và Linux, nhận diện thêm bằng dấu vân tay tài liệu và đối chiếu dữ liệu chính xác, cùng các công cụ vận hành như cập nhật agent từ Console, sao lưu và dự phòng.',
  groups: [
    {
      id: 'ad-ldap',
      icon: 'users',
      title: 'Tích hợp AD/LDAP',
      summary: 'Dùng lại tài khoản và cơ cấu đã có trong Active Directory.',
      items: [
        {
          title: 'Đồng bộ người dùng, nhóm và OU',
          detail: 'Lấy tài khoản và cơ cấu tổ chức từ Active Directory hoặc LDAP. Ở bản 1.0, cơ cấu và tài khoản quản trị được tạo trên Console.',
          status: 'planned',
        },
        {
          title: 'Chính sách theo người dùng và nhóm',
          detail: 'Áp dụng chính sách phân loại theo người dùng, nhóm và loại máy, bên cạnh đơn vị.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'nhan-dien-nang-cao',
      icon: 'scan',
      title: 'Nhận diện nâng cao',
      summary: 'Bắt được tài liệu khó: con dấu mờ, bản sao chỉnh sửa, dữ liệu trích từ hệ thống.',
      items: [
        {
          title: 'Nhận diện con dấu theo hình mẫu',
          detail:
            'Tải lên ảnh dấu mẫu của từng đơn vị. Agent so con dấu tìm thấy với dấu mẫu, nên nhận ra cả dấu mực nhạt, dấu đóng đè lên chữ và dấu có chữ nước ngoài.',
          status: 'in-progress',
        },
        {
          title: 'Thêm định dạng',
          detail: 'Đọc nội dung tài liệu Word đời cũ (.doc) và đọc đầy đủ các ô số trong bảng tính Excel.',
          status: 'in-progress',
        },
        {
          title: 'Dấu vân tay tài liệu',
          detail:
            'Tạo dấu vân tay từ tài liệu mẫu để nhận ra tài liệu giống hoặc gần giống, kể cả khi bị đổi tên hay sửa một phần.',
          status: 'planned',
        },
        {
          title: 'Đối chiếu dữ liệu chính xác (EDM)',
          detail:
            'So khớp với dữ liệu có cấu trúc nhập từ CSV, cơ sở dữ liệu hoặc API, để nhận ra tài liệu chứa một phần dữ liệu trích ra từ đó.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'nhan-ben-vung',
      icon: 'tag',
      title: 'Nhãn bền vững hơn',
      summary: 'Nhãn đã duyệt và lịch sử nhãn không bị mất khi tệp thay đổi.',
      items: [
        {
          title: 'Giữ lịch sử nhãn khi đổi tên, di chuyển tệp',
          detail:
            'Nhãn ghi trong tệp đã đi theo tệp từ bản 1.0. Giai đoạn này giữ thêm nhãn đã duyệt, lịch sử nhãn và yêu cầu đổi nhãn đang chờ trên Console khi tệp được đổi tên hoặc chuyển thư mục.',
          status: 'in-progress',
        },
        {
          title: 'Giữ nhãn đã duyệt khi tệp được sửa',
          detail:
            'Khi nội dung tệp thay đổi và agent phân loại lại, nhãn do Quản lý đơn vị hoặc Quản trị hệ thống đã điều chỉnh được giữ nguyên.',
          status: 'in-progress',
        },
      ],
    },
    {
      id: 'macos-linux',
      icon: 'laptop',
      title: 'Agent macOS & Linux',
      summary: 'Phân loại trên mọi máy trạm, không chỉ Windows.',
      items: [
        {
          title: 'Agent cho macOS và Linux',
          detail: 'Quét và phân loại dữ liệu nhạy cảm trên ổ đĩa như agent Windows.',
          status: 'planned',
        },
        {
          title: 'Hoạt động khi mất kết nối',
          detail: 'Nhận chính sách, gửi kết quả về server và giữ sự kiện khi mất kết nối.',
          status: 'planned',
        },
        {
          title: 'Theo dõi tình trạng agent',
          detail: 'Trạng thái của máy macOS và Linux hiển thị cùng máy Windows trên Console.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'bao-ve-agent',
      icon: 'lock',
      title: 'Bảo vệ agent nâng cao',
      summary: 'Dừng hoặc gỡ agent cần mật khẩu, kể cả với người có quyền quản trị máy.',
      items: [
        {
          title: 'Mật khẩu khi gỡ agent',
          detail: 'Yêu cầu mật khẩu hoặc mã xác thực khi gỡ hoặc dừng agent trên máy trạm.',
          status: 'planned',
        },
        {
          title: 'Chống sửa cấu hình',
          detail: 'Ngăn sửa cấu hình, registry và chính sách đã lưu trên máy.',
          status: 'planned',
        },
        {
          title: 'Gỡ cài đặt agent từ xa',
          detail:
            'Gỡ hẳn chương trình agent khỏi máy trạm ngay từ Console. Bản 1.0 đã thu hồi được máy từ Console, còn việc gỡ chương trình vẫn làm trên máy.',
          status: 'planned',
        },
        {
          title: 'Cảnh báo can thiệp',
          detail: 'Báo riêng khi agent bị dừng hoặc gỡ có chủ đích, phân biệt với máy tắt hay mất mạng.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'siem',
      icon: 'chart',
      title: 'Báo cáo & tích hợp SIEM/SOC',
      summary: 'Đưa sự kiện phân loại vào hệ thống giám sát an ninh sẵn có.',
      items: [
        {
          title: 'Báo cáo định kỳ',
          detail: 'Tự động tạo và gửi báo cáo theo lịch, phục vụ tuân thủ.',
          status: 'planned',
        },
        {
          title: 'Gửi sự kiện tới SIEM',
          detail: 'Đẩy sự kiện phân loại sang SIEM qua Syslog, CEF, LEEF hoặc JSON webhook.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'tich-hop',
      icon: 'plug',
      title: 'Tích hợp & API',
      summary: 'Kết nối với DLP và công cụ nội bộ dễ hơn.',
      items: [
        {
          title: 'Quản lý hệ thống DLP trên Console',
          detail:
            'Cổng API tra nhãn mở sẵn ngay khi cài, và Console có màn hình quản lý các hệ thống DLP được phép tra nhãn, thay cho việc tạo bằng REST API.',
          status: 'in-progress',
        },
        {
          title: 'Tài liệu REST API',
          detail: 'Tài liệu tham chiếu đầy đủ cho từng API.',
          status: 'in-progress',
        },
      ],
    },
    {
      id: 'van-hanh',
      icon: 'sliders',
      title: 'Vận hành',
      summary: 'Ít việc tay hơn cho đội IT khi hệ thống lớn dần.',
      items: [
        {
          title: 'Trợ lý hỏi đáp trên trang tài liệu',
          detail: 'Trả lời câu hỏi về cài đặt và sử dụng, kèm liên kết tới trang nguồn.',
          status: 'in-progress',
        },
        {
          title: 'Cập nhật agent tự động',
          detail: 'Cập nhật agent từ Console thay vì chạy bộ cài trên từng máy, kể cả trong mạng không có internet.',
          status: 'planned',
        },
        {
          title: 'Sao lưu và khôi phục',
          detail: 'Server tự sao lưu theo lịch, khôi phục cấu hình và tự xóa dữ liệu cũ theo thời gian lưu đã đặt.',
          status: 'planned',
        },
        {
          title: 'Dự phòng cơ bản',
          detail: 'Dự phòng cho các thành phần server quan trọng, để việc tra nhãn không bị gián đoạn.',
          status: 'planned',
        },
      ],
    },
  ],
};

const phase3: Phase = {
  id: 'giai-doan-3',
  number: 3,
  name: 'Nền tảng mở rộng',
  tagline: 'Tính năng nâng cao và mở rộng hệ sinh thái',
  outcome:
    'Phân loại cả tài liệu trên OneDrive, SharePoint và Google Drive; nhiều tổ chức dùng chung một hệ thống nhưng quản trị riêng; kết nối với các hệ thống bảo mật khác qua API; phục vụ số máy rất lớn và nhiều chi nhánh.',
  groups: [
    {
      id: 'cloud',
      icon: 'cloud',
      title: 'Phân loại dữ liệu trên cloud',
      summary: 'Cùng một bộ nhãn cho tài liệu trên máy trạm và trên cloud.',
      items: [
        {
          title: 'OneDrive và SharePoint',
          detail: 'Phân loại và gắn nhãn tài liệu lưu trên OneDrive và SharePoint.',
          status: 'planned',
        },
        {
          title: 'Google Drive và ứng dụng đám mây',
          detail: 'Mở rộng việc phân loại sang Google Drive và các ứng dụng đám mây phổ biến.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'api-platform',
      icon: 'plug',
      title: 'API & hệ sinh thái',
      summary: 'Cho bên thứ ba xây dựng trên nhãn của NextDLP.',
      items: [
        {
          title: 'API mở cho bên thứ ba',
          detail: 'Bộ API ổn định để đối tác và hệ thống nội bộ đọc nhãn, kiểm kê và sự kiện.',
          status: 'planned',
        },
        {
          title: 'Gửi sự kiện tức thời',
          detail: 'Hệ thống khác nhận sự kiện phân loại ngay khi xảy ra, qua webhook hoặc luồng sự kiện.',
          status: 'planned',
        },
        {
          title: 'Tích hợp IAM, SOAR, ITSM',
          detail: 'Kết nối với hệ thống quản lý định danh, điều phối xử lý sự cố và quản lý dịch vụ IT.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'multi-tenant',
      icon: 'building',
      title: 'Nhiều tổ chức & quản trị tập trung',
      summary: 'Một hệ thống cho cả tập đoàn hoặc nhà cung cấp dịch vụ bảo mật.',
      items: [
        {
          title: 'Nhiều tổ chức trên một hệ thống',
          detail: 'Dữ liệu được phân vùng theo từng tổ chức, mỗi tổ chức quản trị riêng.',
          status: 'planned',
        },
        {
          title: 'Tập đoàn và nhà cung cấp dịch vụ bảo mật',
          detail:
            'Quản trị tập trung nhiều tổ chức từ một Console, phù hợp tập đoàn và nhà cung cấp dịch vụ bảo mật thuê ngoài (MSSP).',
          status: 'planned',
        },
      ],
    },
    {
      id: 'scale',
      icon: 'layers',
      title: 'Sẵn sàng cao & mở rộng quy mô',
      summary: 'Hệ thống chạy liên tục khi số máy tăng lên rất lớn.',
      items: [
        {
          title: 'Kiến trúc mở rộng ngang',
          detail: 'Thêm máy chủ để phục vụ nhiều máy trạm hơn, với dự phòng cho mọi thành phần server.',
          status: 'planned',
        },
        {
          title: 'Triển khai nhiều site',
          detail: 'Một hệ thống cho nhiều chi nhánh và trung tâm dữ liệu.',
          status: 'planned',
        },
        {
          title: 'Lưu trữ dài hạn',
          detail: 'Giữ nhật ký và kiểm kê nhiều năm cho nhu cầu kiểm toán.',
          status: 'planned',
        },
      ],
    },
    {
      id: 'ai-nang-cao',
      icon: 'ai',
      title: 'AI nâng cao',
      summary: 'AI hỗ trợ người quản trị nhiều hơn trong công việc hằng ngày.',
      items: [
        {
          title: 'Trợ lý AI cho Quản trị hệ thống',
          detail: 'Hỗ trợ soạn chính sách và tra cứu dữ liệu đã phân loại bằng câu hỏi thông thường.',
          status: 'planned',
        },
      ],
    },
  ],
};

/** The current release, shown first and in full. */
export const currentPhase = phase1;

/** Later phases, shown in the roadmap section. */
export const roadmapPhases: Phase[] = [phase2, phase3];

/** All phases in order, for the stepper. */
export const phases: Phase[] = [phase1, phase2, phase3];
