import s from './ListCell.module.css';

export interface ListCellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 좌측 슬롯 — 아이콘·아바타 */
  leading?: React.ReactNode;
  /** 우측 슬롯 — 값·셰브론·스위치 */
  trailing?: React.ReactNode;
  /** 행 전체가 눌리는 셀 (hover + 포커스) */
  interactive?: boolean;
}

/** 리스트 한 행. 리딩 12 · 트레일링 8 간격, 최소 높이 56. */
export function ListCell({ title, description, leading, trailing, interactive, className, style, ...rest }: ListCellProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style}
      data-interactive={interactive || undefined} role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined} {...rest}>
      {leading && <span className={s.leading}>{leading}</span>}
      <span className={s.content}>
        <span className={s.title}>{title}</span>
        {description && <span className={s.desc}>{description}</span>}
      </span>
      {trailing && <span className={s.trailing}>{trailing}</span>}
    </div>
  );
}
