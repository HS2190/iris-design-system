import s from './ContentBadge.module.css';

export interface ContentBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'info' | 'positive' | 'cautionary' | 'negative';
  variant?: 'solid' | 'subtle';
}

/** 읽기 전용 상태·분류 뱃지. 클릭되는 필터는 Chip을 쓴다. */
export function ContentBadge({ tone = 'neutral', variant = 'subtle', className, ...rest }: ContentBadgeProps) {
  return <span className={[s.badge, s[variant], s[tone], className].filter(Boolean).join(' ')} {...rest} />;
}
