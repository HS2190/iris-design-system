import s from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'outlined' | 'elevated' | 'filled';
  /** 상단 16:9 미디어 슬롯 */
  thumbnail?: React.ReactNode;
  /** hover 시 떠오름 (링크 카드) */
  interactive?: boolean;
}

/** 콘텐츠 묶음 컨테이너. 본문 패딩 16 · radius-lg. */
export function Card({ variant = 'outlined', thumbnail, interactive, children, className, style, ...rest }: CardProps) {
  return (
    <div className={[s.root, s[variant], className].filter(Boolean).join(' ')} style={style}
      data-interactive={interactive || undefined} tabIndex={interactive ? 0 : undefined} {...rest}>
      {thumbnail && <div className={s.thumb} aria-hidden>{thumbnail}</div>}
      <div className={s.body}>{children}</div>
    </div>
  );
}
