import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './DownloadCard.module.css';

type Release = {
  version: string;
  fileName: string;
  url: string;
  offlineUrl: string;
};

export default function DownloadCard(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const release = siteConfig.customFields?.release as Release;
  const meta = [release.fileName, release.version && `v${release.version}`]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <strong>Gói cài đặt server NextDLP</strong>
        <code className={styles.meta}>{meta}</code>
      </div>
      <div className={styles.actions}>
        {release.url ? (
          // No Referer: with one, Drive ignores confirm=t and shows its "too large to scan" page instead of the file.
          <a className="button button--primary" href={release.url} rel="noreferrer">
            Tải gói cài đặt
          </a>
        ) : (
          <span className={styles.missing}>Liên hệ đội hỗ trợ NextDLP để nhận gói cài đặt.</span>
        )}
        {release.offlineUrl && (
          <a className="button button--secondary" href={release.offlineUrl} rel="noreferrer">
            Bản offline đầy đủ
          </a>
        )}
      </div>
    </div>
  );
}
