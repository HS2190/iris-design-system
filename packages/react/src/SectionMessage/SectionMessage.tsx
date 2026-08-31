import { Icon } from '../Icon/Icon';
import s from './SectionMessage.module.css';

const ICON = { info: 'info', positive: 'check', cautionary: 'warning', negative: 'warning' } as const;

export interface SectionMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: keyof typeof ICON;
  title?: React.ReactNode;
  children: React.ReactNode;
  /** 있으면 우측에 닫기 버튼 */
  onClose?: () => void;
}

/** 화면 맥락 안에 남는 인라인 안내 배너. 잠깐 통보는 Toast. */
export function SectionMessage({ tone = 'info', title, children, onClose, className, style, ...rest }: SectionMessageProps) {
  return (
    <div className={[s.root, s[tone], className].filter(Boolean).join(' ')} style={style}
      role={tone === 'negative' ? 'alert' : 'status'} {...rest}>
      <span className={s.icon} aria-hidden><Icon name={ICON[tone]} size={20} /></span>
      <span className={s.body}>
        {title && <span className={s.title}>{title}</span>}
        <span className={s.msg}>{children}</span>
      </span>
      {onClose && <button type="button" className={s.close} onClick={onClose} aria-label="닫기"><Icon name="close" size={16} /></button>}
    </div>
  );
}
