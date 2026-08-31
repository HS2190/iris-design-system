import s from './TopNavigation.module.css';

export interface TopNavigationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  /** 좌측 — 뒤로가기·로고 */
  leading?: React.ReactNode;
  /** 우측 액션 — 최대 2개 권장 */
  trailing?: React.ReactNode;
}

/** 화면 상단 바. 높이 = nav-top-height 토큰(웹 64), 제목은 넘치면 말줄임. */
export function TopNavigation({ title, leading, trailing, className, style, ...rest }: TopNavigationProps) {
  return (
    <header className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {leading && <span className={s.slot}>{leading}</span>}
      {title && <span className={s.title}>{title}</span>}
      {trailing && <span className={s.slot}>{trailing}</span>}
    </header>
  );
}
