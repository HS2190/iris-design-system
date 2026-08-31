import { Icon, type IconName } from '../Icon/Icon';
import s from './TextButton.module.css';

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'assistive';
  size?: 'm' | 's';
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}

/** 배경 없는 라벨 버튼 — 보조 행동·인라인 링크형 액션. 주 행동은 Button. */
export function TextButton({ color = 'primary', size = 'm', leadingIcon, trailingIcon, children, className, ...rest }: TextButtonProps) {
  const ic = size === 'm' ? 18 : 16;
  return (
    <button type="button" className={[s.root, s[color], s[size], className].filter(Boolean).join(' ')} {...rest}>
      {leadingIcon && <Icon name={leadingIcon} size={ic} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={ic} />}
    </button>
  );
}
