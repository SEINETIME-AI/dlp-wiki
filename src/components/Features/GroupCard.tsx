import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import type {Group, Status} from '@site/src/data/features';
import {Icon} from './Icon';
import styles from './Features.module.css';

const statusLabel: Record<Status, string> = {
  available: 'Đã có',
  'in-progress': 'Đang phát triển',
  planned: 'Dự kiến',
};

/** Small pill with a feature's status. */
export function StatusChip({status}: {status: Status}): ReactNode {
  return <span className={`${styles.chip} ${styles[`chip-${status}`]}`}>{statusLabel[status]}</span>;
}

type GroupCardProps = {
  group: Group;
  /** Whether the details (one sentence and a docs link per feature) are shown. */
  open: boolean;
  onToggle: () => void;
};

/** Card of a shipped feature group: titles with a check mark, details on demand. */
export function GroupCard({group, open, onToggle}: GroupCardProps): ReactNode {
  const listId = `nhom-${group.id}`;
  return (
    <article className={`${styles.card} ${open ? styles.cardOpen : ''}`}>
      <header className={styles.cardHead}>
        <span className={styles.iconTile}>
          <Icon name={group.icon} size={22} />
        </span>
        <div>
          <h3 className={styles.cardTitle}>{group.title}</h3>
          <span className={styles.cardCount}>{group.items.length} tính năng</span>
        </div>
      </header>
      <p className={styles.cardSummary}>{group.summary}</p>
      <ul id={listId} className={styles.itemList}>
        {group.items.map((item) => (
          <li key={item.title} className={styles.item}>
            <span className={styles.check}>
              <Icon name="check" size={14} />
            </span>
            <div className={styles.itemBody}>
              <span className={styles.itemTitle}>{item.title}</span>
              {open && (
                <>
                  <p className={styles.itemDetail}>{item.detail}</p>
                  {item.link && (
                    <Link className={styles.itemLink} to={item.link}>
                      Xem hướng dẫn <Icon name="arrow" size={14} />
                    </Link>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={listId} onClick={onToggle}>
        {open ? 'Thu gọn' : 'Xem chi tiết'}
        <Icon name="chevron" size={16} className={open ? styles.chevronUp : undefined} />
      </button>
    </article>
  );
}

/** Card of a roadmap group: lighter, every feature with its status and one sentence. */
export function RoadmapGroup({group}: {group: Group}): ReactNode {
  return (
    <article className={styles.roadCard}>
      <header className={styles.cardHead}>
        <span className={`${styles.iconTile} ${styles.iconTileMuted}`}>
          <Icon name={group.icon} size={20} />
        </span>
        <div>
          <h3 className={styles.cardTitle}>{group.title}</h3>
          <span className={styles.cardCount}>{group.summary}</span>
        </div>
      </header>
      <ul className={styles.roadList}>
        {group.items.map((item) => (
          <li key={item.title} className={styles.roadItem}>
            <div className={styles.roadItemHead}>
              <span className={styles.itemTitle}>{item.title}</span>
              <StatusChip status={item.status} />
            </div>
            <p className={styles.itemDetail}>{item.detail}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
