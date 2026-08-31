import s from './ActionArea.module.css';

export interface ActionAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 상단 구분선 — 콘텐츠가 스크롤될 때 */
  divider?: boolean;
  /** 버튼 1~2개 — 폭을 균등 분할, 주 행동은 오른쪽 */
  children: React.ReactNode;
}

/** 화면 하단 고정 버튼 영역. P 상 16 · 좌우 20 · 하 16 + safe-area, 버튼 균등 분할. */
export function ActionArea({ divider, children, className, ...rest }: ActionAreaProps) {
  return (
    <div className={[s.root, divider ? s.divider : '', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
