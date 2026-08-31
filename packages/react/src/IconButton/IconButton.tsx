import { Icon, type IconName } from '../Icon/Icon';
import s from './IconButton.module.css';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** 필수 — 아이콘의 이름 (스크린리더·Tooltip과 짝) */
  'aria-label': string;
  /** l 48 · m 40 · s 32 (아이콘 24/24/20) */
  size?: 'l' | 'm' | 's';
  variant?: 'plain' | 'outlined';
}

/** 아이콘 전용 버튼. 라벨이 없으므로 aria-label 필수, 뜻이 모호하면 Tooltip을 얹는다. */
export function IconButton({ icon, size = 'm', variant = 'plain', className, ...rest }: IconButtonProps) {
  return (
    <button type="button" className={[s.root, s[size], s[variant], className].filter(Boolean).join(' ')} {...rest}>
      <Icon name={icon} size={size === 's' ? 20 : 24} />
    </button>
  );
}
