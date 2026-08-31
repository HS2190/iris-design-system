import { Icon } from '../Icon/Icon';
import s from './Popup.module.css';

export interface PopupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** 있으면 우상단 닫기 버튼 */
  onClose?: () => void;
  children: React.ReactNode;
  /** 하단 버튼 영역 */
  footer?: React.ReactNode;
}

/** 자유 콘텐츠 모달(표현부). 확인만 받는 흐름은 Alert. 스크림·포털은 앱 셸 담당. */
export function Popup({ title, onClose, children, footer, className, style, ...rest }: PopupProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} role="dialog" aria-modal="true" {...rest}>
      <div className={s.header}>
        <span className={s.title}>{title}</span>
        {onClose && <button type="button" className={s.close} onClick={onClose} aria-label="닫기"><Icon name="close" size={20} /></button>}
      </div>
      <div className={s.body}>{children}</div>
      {footer && <div className={s.footer}>{footer}</div>}
    </div>
  );
}
