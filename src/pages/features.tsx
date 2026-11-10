import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import {currentPhase, phases, roadmapPhases, type Phase} from '@site/src/data/features';
import {GroupCard, RoadmapGroup, StatusChip} from '@site/src/components/Features/GroupCard';
import {Icon} from '@site/src/components/Features/Icon';
import {PhaseStepper} from '@site/src/components/Features/PhaseStepper';
import styles from '@site/src/components/Features/Features.module.css';

const shippedCount = currentPhase.groups.reduce((n, g) => n + g.items.length, 0);

/** Short promises shown under the stepper; each is backed by a 1.0 feature on this page. */
const highlights = ['Chạy trong mạng nội bộ', 'Đọc được bản scan tiếng Việt', 'Làm việc cùng DLP sẵn có'];

/** Scrolls smoothly to the element with this id, if it exists. */
function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
}

/** "Kết quả" box closing a phase. */
function Outcome({phase, label}: {phase: Phase; label: string}): ReactNode {
  return (
    <aside className={`${styles.outcome} ${styles[`outcome${phase.number}`]}`}>
      <span className={styles.outcomeIcon}>
        <Icon name="trophy" size={22} />
      </span>
      <div>
        <strong className={styles.outcomeLabel}>{label}</strong>
        <p className={styles.outcomeText}>{phase.outcome}</p>
      </div>
    </aside>
  );
}

/** The Tính năng page: what ships in 1.0 first and in full, then the roadmap by phase. */
export default function Features(): ReactNode {
  const [selected, setSelected] = useState<number>(1);
  const [roadTab, setRoadTab] = useState<number>(roadmapPhases[0].number);
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Links such as /features#giai-doan-3 open the roadmap on that phase. Read after mount: no window during the build.
  useEffect(() => {
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const target = roadmapPhases.find((p) => p.id === hash);
      if (target) {
        setRoadTab(target.number);
        setSelected(target.number);
        requestAnimationFrame(() => scrollToId('lo-trinh'));
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const select = (phase: Phase) => {
    setSelected(phase.number);
    window.history.replaceState(null, '', `#${phase.id}`);
    if (phase.number === 1) {
      scrollToId('giai-doan-1');
    } else {
      setRoadTab(phase.number);
      scrollToId('lo-trinh');
    }
  };

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = open.size === currentPhase.groups.length;
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(currentPhase.groups.map((g) => g.id)));

  const road = roadmapPhases.find((p) => p.number === roadTab) ?? roadmapPhases[0];

  return (
    <Layout
      title="Tính năng & lộ trình"
      description="Những gì NextDLP 1.0 làm được hôm nay, và lộ trình phát triển các giai đoạn tiếp theo.">
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.heroTitle}>
              Tính năng sản phẩm
            </Heading>
            <PhaseStepper phases={phases} selected={selected} onSelect={select} />
            <ul className={styles.stats}>
              <li>
                <strong>{shippedCount}</strong> tính năng trong bản 1.0
              </li>
              {highlights.map((text) => (
                <li key={text}>
                  <span className={styles.statsCheck}>
                    <Icon name="check" size={14} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <main>
          <section id="giai-doan-1" className={`container ${styles.section}`}>
            <div className={styles.sectionHead}>
              <div>
                <span className={`${styles.phaseBadge} ${styles.phaseBadge1}`}>
                  <span className={styles.liveDot} aria-hidden="true" />
                  Giai đoạn 1 · Hiện hành
                </span>
                <Heading as="h2" className={styles.sectionTitle}>
                  Có trong bản 1.0
                </Heading>
                <p className={styles.sectionSub}>
                  Mọi tính năng dưới đây đã có trong phiên bản đang phát hành. Bấm <strong>Xem chi tiết</strong> trên
                  từng nhóm để đọc mô tả và mở trang hướng dẫn.
                </p>
              </div>
              <button type="button" className={styles.expandAll} onClick={toggleAll}>
                {allOpen ? 'Thu gọn tất cả' : 'Mở tất cả chi tiết'}
              </button>
            </div>

            <div className={styles.grid}>
              {currentPhase.groups.map((group) => (
                <GroupCard key={group.id} group={group} open={open.has(group.id)} onToggle={() => toggle(group.id)} />
              ))}
            </div>

            <Outcome phase={currentPhase} label="Kết quả" />
          </section>

          <section id="lo-trinh" className={styles.roadBand}>
            <div className="container">
              <div className={styles.sectionHead}>
                <div>
                  <Heading as="h2" className={styles.sectionTitle}>
                    Lộ trình tiếp theo
                  </Heading>
                  <p className={styles.sectionSub}>
                    Nội dung và thứ tự ưu tiên có thể thay đổi theo phản hồi của khách hàng. Khi một hạng mục hoàn
                    thành, nó được chuyển lên phần bản hiện hành và vào <Link to="/releases">thông báo phát hành</Link>{' '}
                    của phiên bản chứa nó.
                  </p>
                </div>
              </div>

              <div className={styles.tabs} role="tablist" aria-label="Giai đoạn trên lộ trình">
                {roadmapPhases.map((phase) => (
                  <button
                    key={phase.id}
                    type="button"
                    role="tab"
                    id={`tab-${phase.id}`}
                    aria-selected={phase.number === road.number}
                    aria-controls={`panel-${phase.id}`}
                    className={`${styles.tab} ${styles[`tab${phase.number}`]} ${
                      phase.number === road.number ? styles.tabActive : ''
                    }`}
                    onClick={() => {
                      setRoadTab(phase.number);
                      setSelected(phase.number);
                      window.history.replaceState(null, '', `#${phase.id}`);
                    }}>
                    <span className={styles.tabNumber}>{phase.number}</span>
                    <span>
                      <span className={styles.tabName}>Giai đoạn {phase.number}</span>
                      <span className={styles.tabSub}>{phase.name}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div role="tabpanel" id={`panel-${road.id}`} aria-labelledby={`tab-${road.id}`}>
                <div className={styles.roadIntro}>
                  <p className={styles.roadTagline}>{road.tagline}</p>
                  <div className={styles.legend}>
                    <span>
                      <StatusChip status="in-progress" /> đã bắt đầu làm
                    </span>
                    <span>
                      <StatusChip status="planned" /> có trong kế hoạch, chưa bắt đầu
                    </span>
                  </div>
                </div>
                <div className={styles.roadGrid}>
                  {road.groups.map((group) => (
                    <RoadmapGroup key={group.id} group={group} />
                  ))}
                </div>
                <Outcome phase={road} label="Kết quả kỳ vọng" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
