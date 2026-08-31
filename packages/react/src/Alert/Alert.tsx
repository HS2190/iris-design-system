import s from './Alert.module.css';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** 본문 메시지 */
  children?: React.ReactNode;
  /** 하단 우측 액션 버튼들 — 주 행동은 맨 오른쪽 */
  actions?: React.ReactNode;
}

/** 흐름을 멈추는 확인 대화상자(표현부). 스크림·포털은 앱 셸이 담당한다. */
export function Alert({ title, children, actions, className, style, ...rest }: AlertProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style}
      role="alertdialog" aria-modal="true" {...rest}>
      <span className={s.title}>{title}</span>
      {children && <div className={s.message}>{children}</div>}
      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  );
}
