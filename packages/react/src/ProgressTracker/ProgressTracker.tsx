import { Icon } from '../Icon/Icon';
import s from './ProgressTracker.module.css';

export interface ProgressTrackerStep {
  id: string;
  label: string;
  /** 세로 방향에서만 표시 */
  description?: string;
}

export interface ProgressTrackerProps extends React.HTMLAttributes<HTMLElement> {
  steps: ProgressTrackerStep[];
  /** 현재 단계 id — 앞 단계는 완료 처리 */
  current: string;
  orientation?: 'horizontal' | 'vertical';
}

/** 다단계 절차의 위치 표시. 마커 24 · 커넥터 2, 현재 단계는 aria-current=step. 진행률(%)은 Progress. */
export function ProgressTracker({ steps, current, orientation = 'horizontal', className, style, ...rest }: ProgressTrackerProps) {
  const cur = Math.max(0, steps.findIndex(st => st.id === current));
  const state = (i: number) => (i < cur ? 'done' : i === cur ? 'current' : 'todo');
  const marker = (i: number) => (
    <span className={[s.marker, s[state(i)]].join(' ')} aria-hidden>
      {i < cur ? <Icon name="check" size={14} /> : i + 1}
    </span>
  );
  if (orientation === 'vertical') {
    return (
      <ol className={[s.v, className].filter(Boolean).join(' ')} style={style} {...rest}>
        {steps.map((st, i) => (
          <li key={st.id} className={s.vrow} aria-current={i === cur ? 'step' : undefined}>
            <span className={s.vleft}>
              {marker(i)}
              {i < steps.length - 1 && <span className={[s.vconn, i < cur ? s.lineDone : ''].filter(Boolean).join(' ')} />}
            </span>
            <span className={s.vbody}>
              <span className={[s.label, s['t' + state(i)]].join(' ')}>{st.label}</span>
              {st.description && <span className={s.desc}>{st.description}</span>}
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className={[s.h, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {steps.map((st, i) => (
        <li key={st.id} className={s.hitem} aria-current={i === cur ? 'step' : undefined}>
          {i > 0 && <span className={[s.hconn, i <= cur ? s.lineDone : ''].filter(Boolean).join(' ')} />}
          <span className={s.hstep}>
            {marker(i)}
            <span className={[s.label, s['t' + state(i)]].join(' ')}>{st.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
