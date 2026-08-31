import s from './Progress.module.css';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0~max. 생략 + indeterminate로 불확정 표시 */
  value?: number;
  max?: number;
  label?: React.ReactNode;
  /** 우측에 % 표시 */
  showValue?: boolean;
  indeterminate?: boolean;
}

/** 진행 표시줄. 트랙 4 고정, 값 모르면 indeterminate. */
export function Progress({ value, max = 100, label, showValue, indeterminate, className, style, ...rest }: ProgressProps) {
  const pct = indeterminate || value === undefined ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {(label || showValue) && (
        <span className={s.top}>
          {label && <span className={s.label}>{label}</span>}
          {showValue && !indeterminate && <span className={s.value}>{Math.round(pct)}%</span>}
        </span>
      )}
      <span className={s.track} role="progressbar" aria-valuemin={0} aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value} aria-label={typeof label === 'string' ? label : undefined}>
        <span className={indeterminate ? s.indeterminate : s.fill} style={indeterminate ? undefined : { width: pct + '%' }} />
      </span>
    </div>
  );
}
