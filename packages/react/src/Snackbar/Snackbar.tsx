import s from './Snackbar.module.css';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** 액션 라벨 — '실행 취소' 등 하나 */
  actionLabel?: string;
  onAction?: () => void;
}

/** 액션이 붙는 지속형 알림(표현부). 통보만이면 Toast. */
export function Snackbar({ children, actionLabel, onAction, className, style, ...rest }: SnackbarProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} role="status" {...rest}>
      <span className={s.msg}>{children}</span>
      {actionLabel && <button type="button" className={s.action} onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}
