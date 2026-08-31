import { Icon } from '../Icon/Icon';
import s from './Toast.module.css';

const ICON = { neutral: 'info', positive: 'check', negative: 'warning' } as const;

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof ICON;
  children: React.ReactNode;
}

/** 결과를 잠깐 알리고 사라지는 알림(표현부). 액션이 필요하면 Snackbar. */
export function Toast({ tone = 'neutral', children, className, style, ...rest }: ToastProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} role="status" {...rest}>
      <span className={[s.icon, s[tone]].join(' ')} aria-hidden><Icon name={ICON[tone]} size={20} /></span>
      <span className={s.msg}>{children}</span>
    </div>
  );
}
