import s from './Popover.module.css';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  children: React.ReactNode;
  /** 하단 액션 — 하나 권장 */
  action?: React.ReactNode;
}

/** 앵커에 붙는 작은 안내 오버레이(표현부). 위치·표시 제어는 호출부가 담당. */
export function Popover({ title, children, action, className, style, ...rest }: PopoverProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} role="dialog" {...rest}>
      {title && <span className={s.title}>{title}</span>}
      <div className={s.body}>{children}</div>
      {action && <div className={s.action}>{action}</div>}
    </div>
  );
}
