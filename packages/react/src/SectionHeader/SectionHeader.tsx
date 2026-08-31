import s from './SectionHeader.module.css';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 우측 액션 — '더보기' 링크·아이콘 버튼 */
  action?: React.ReactNode;
}

/** 섹션 제목 행. 상 16 · 하 8 패딩, 액션은 베이스라인 정렬. */
export function SectionHeader({ title, description, action, className, style, ...rest }: SectionHeaderProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      <span className={s.texts}>
        <span className={s.title}>{title}</span>
        {description && <span className={s.desc}>{description}</span>}
      </span>
      {action && <span className={s.action}>{action}</span>}
    </div>
  );
}
