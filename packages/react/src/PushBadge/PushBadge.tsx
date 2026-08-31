import s from './PushBadge.module.css';

export interface PushBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 미확인 수 — 0이면 숨김, 생략하면 dot */
  count?: number;
  /** 초과 시 "N+" 표기 */
  max?: number;
  /** 앵커 요소 — 있으면 우상단에 얹힌다 */
  children?: React.ReactNode;
}

/** 미확인 알림 표시. dot 6 · 카운트 16, 앵커 우상단 -4 오프셋. */
export function PushBadge({ count, max = 99, children, className, style, ...rest }: PushBadgeProps) {
  const hidden = count !== undefined && count <= 0;
  const badge = hidden ? null : (
    <span className={[s.badge, count === undefined ? s.dot : '', !children ? className : ''].filter(Boolean).join(' ')}
      style={children ? undefined : style} aria-label={count !== undefined ? `알림 ${count}개` : '새 알림'}
      {...(children ? {} : rest)}>
      {count !== undefined && (count > max ? `${max}+` : count)}
    </span>
  );
  if (!children) return badge;
  return (
    <span className={[s.anchor, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {children}
      {badge}
    </span>
  );
}
