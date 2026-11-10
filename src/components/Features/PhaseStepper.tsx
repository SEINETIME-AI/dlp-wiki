import type {ReactNode} from 'react';

import type {Phase} from '@site/src/data/features';
import styles from './Features.module.css';

type PhaseStepperProps = {
  phases: Phase[];
  /** Number of the phase the reader is looking at; it gets a ring. */
  selected: number;
  onSelect: (phase: Phase) => void;
};

/** The three phases as connected steps; phase 1 is filled because it has shipped. */
export function PhaseStepper({phases, selected, onSelect}: PhaseStepperProps): ReactNode {
  return (
    <nav className={styles.stepper} aria-label="Các giai đoạn phát triển">
      <ol className={styles.steps}>
        {phases.map((phase) => {
          const shipped = phase.number === 1;
          return (
            <li key={phase.id} className={`${styles.step} ${styles[`step${phase.number}`]}`}>
              <button
                type="button"
                className={`${styles.stepButton} ${selected === phase.number ? styles.stepSelected : ''}`}
                aria-current={selected === phase.number ? 'step' : undefined}
                onClick={() => onSelect(phase)}>
                <span className={`${styles.stepDot} ${shipped ? styles.stepDotFilled : ''}`}>{phase.number}</span>
                <span className={styles.stepText}>
                  <span className={styles.stepKicker}>
                    Giai đoạn {phase.number} · {shipped ? 'Hiện hành' : 'Lộ trình'}
                  </span>
                  <span className={styles.stepName}>{phase.name}</span>
                  <span className={styles.stepTagline}>{phase.tagline}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
