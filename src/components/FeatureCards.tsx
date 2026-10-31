import type {ReactNode} from 'react';

import styles from './FeatureCards.module.css';

type CardsProps = {children: ReactNode};

type CardProps = {
  title: string;
  /** Short label above the title, e.g. "Mặc định". */
  tag?: string;
  children: ReactNode;
};

/** Grid of feature cards used in the docs pages. */
export function Cards({children}: CardsProps): ReactNode {
  return <div className={styles.grid}>{children}</div>;
}

/** One card: a title, an optional tag and a short paragraph. */
export function Card({title, tag, children}: CardProps): ReactNode {
  return (
    <div className={styles.card}>
      {tag && <span className={styles.tag}>{tag}</span>}
      <strong className={styles.title}>{title}</strong>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
