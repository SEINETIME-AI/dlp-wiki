import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const steps = [
  {
    tag: '01 · AGENT',
    title: 'Agent đọc file trên máy trạm',
    text: 'Agent Windows theo dõi thư mục, trích xuất nội dung và ngữ cảnh nghiệp vụ của file mới hoặc vừa thay đổi.',
  },
  {
    tag: '02 · PHÂN LOẠI',
    title: 'Gắn nhãn theo chính sách',
    text: 'Từ khoá, mẫu dữ liệu, ML, OCR và nhận diện dấu mộc xác định mức bảo mật và loại tài liệu. Nhãn được lưu trên server.',
  },
  {
    tag: '03 · DLP',
    title: 'DLP tra nhãn và thực thi',
    text: 'Khi file được gửi hoặc sao chép, DLP của bạn tra cứu nhãn qua API rồi cho phép, chặn hoặc cách ly.',
  },
];

const starts = [
  {
    to: '/docs/getting-started/install',
    title: 'Cài đặt',
    text: 'Tải gói server, tạo bộ cài Agent theo đơn vị và đưa máy trạm đầu tiên lên Console.',
  },
  {
    to: '/docs/getting-started/quickstart',
    title: 'Sử dụng',
    text: 'Soạn chính sách phân loại, quản lý kiểm kê dữ liệu, duyệt yêu cầu đổi nhãn và xem báo cáo.',
  },
  {
    to: '/releases',
    title: 'Phát hành',
    text: 'Thông báo phát hành và nội dung của từng phiên bản.',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Tài liệu sản phẩm" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.over}>TÀI LIỆU SẢN PHẨM</div>
          <Heading as="h1" className={styles.title}>
            {siteConfig.tagline}
          </Heading>
          <p className={styles.lead}>
            NextDLP đọc nội dung và ngữ cảnh nghiệp vụ của từng file như phòng ban, đường dẫn và người
            sở hữu, gắn nhãn mức bảo mật và loại tài liệu, rồi cung cấp nhãn đó cho hệ thống DLP bạn
            đang dùng. Toàn bộ chạy on-premises.
          </p>
          <Link className="button button--primary button--lg" to="/docs/getting-started/install">
            Bắt đầu nhanh
          </Link>
        </div>
      </header>
      <main className="container">
        <section className={styles.sec}>
          <Heading as="h2">NextDLP hoạt động thế nào</Heading>
          <p className={styles.sub}>Một lớp gắn nhãn đứng trước DLP hiện có, không thay thế DLP.</p>
          <div className={styles.grid}>
            {steps.map((s) => (
              <div key={s.tag} className={styles.card}>
                <div className={styles.tag}>{s.tag}</div>
                <Heading as="h3">{s.title}</Heading>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.sec}>
          <Heading as="h2">Bắt đầu từ đâu?</Heading>
          <div className={styles.grid}>
            {starts.map((s) => (
              <Link key={s.to} to={s.to} className={styles.card}>
                <Heading as="h3">{s.title}</Heading>
                <p>{s.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
