import type {ReactNode} from 'react';

import styles from './DataFlowDiagram.module.css';

type ConnectionProps = {
  protocol: string;
  port: string;
  /** True when the link is TLS-encrypted. */
  encrypted: boolean;
  note?: string;
  /** On a narrow screen the arrow points up instead of down. */
  upward?: boolean;
};

/** One labelled arrow between two zones, with its encryption badge. */
function Connection({protocol, port, encrypted, note, upward}: ConnectionProps): ReactNode {
  return (
    <div className={`${styles.connection} ${upward ? styles.upward : ''}`}>
      <div className={styles.connectionLabel}>
        <span>
          <strong>{protocol}</strong> · cổng {port}
        </span>
        <span className={encrypted ? styles.secure : styles.plain}>{encrypted ? 'TLS' : 'Chưa mã hoá'}</span>
      </div>
      {note && <div className={styles.connectionNote}>{note}</div>}
      <div className={styles.arrow} aria-hidden="true" />
    </div>
  );
}

type NodeProps = {title: string; children?: ReactNode};

/** One component inside a zone. */
function Node({title, children}: NodeProps): ReactNode {
  return (
    <div className={styles.node}>
      <strong>{title}</strong>
      {children && <span className={styles.nodeText}>{children}</span>}
    </div>
  );
}

/** The components of a NextDLP deployment, the ports between them and which links are encrypted. */
export function DataFlowDiagram(): ReactNode {
  return (
    <figure className={styles.diagram} aria-label="Sơ đồ thành phần và cổng kết nối của NextDLP">
      <div className={`${styles.zone} ${styles.endpoint}`}>
        <div className={styles.zoneTitle}>Máy trạm Windows</div>
        <Node title="Agent NextDLP">Đọc tệp, OCR, dò dấu mộc, phân tích ngữ nghĩa, ghi nhãn vào tệp</Node>
      </div>

      <div className={`${styles.links} ${styles.endpointLinks}`}>
        <Connection protocol="gRPC" port="9091" encrypted={false} />
        <Connection protocol="HTTP" port="9092" encrypted={false} note="Chỉ khi cài gói GPU" />
      </div>

      <div className={`${styles.zone} ${styles.browser}`}>
        <div className={styles.zoneTitle}>Máy của quản trị viên</div>
        <Node title="Trình duyệt">Mở Console</Node>
      </div>

      <div className={`${styles.links} ${styles.browserLinks}`}>
        <Connection protocol="HTTPS" port="443" encrypted upward />
      </div>

      <div className={`${styles.zone} ${styles.server}`}>
        <div className={styles.zoneTitle}>Máy chủ NextDLP · Docker</div>
        <div className={styles.gateway}>Cổng vào nginx</div>
        <div className={styles.nodes}>
          <Node title="Server NextDLP">API, PostgreSQL, Redis</Node>
          <Node title="Console">HTTPS 443</Node>
          <Node title="API tích hợp">HTTPS 9090</Node>
          <Node title="Mô hình Gợi ý AI">Chạy bằng CPU</Node>
        </div>
        <div className={`${styles.zone} ${styles.optional}`}>
          <div className={styles.zoneTitle}>Gói GPU AssistOCR · tuỳ chọn</div>
          <div className={styles.nodes}>
            <Node title="Mô hình đọc tài liệu" />
            <Node title="Mô hình ngữ nghĩa" />
            <Node title="Kho tạm bản scan">Tự xoá sau 1 ngày</Node>
          </div>
        </div>
      </div>
    </figure>
  );
}
