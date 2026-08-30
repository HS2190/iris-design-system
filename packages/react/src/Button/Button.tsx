import { forwardRef } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import s from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Solid = 채움, Outlined = 테두리 */
  variant?: 'solid' | 'outlined';
  /** Primary = 메인 행동, Assistive = 보조 행동 */
  color?: 'primary' | 'assistive';
  size?: 'l' | 'm' | 's';
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  /** 파일 업로드처럼 짧은 대기. 로딩 중 클릭 차단 */
  loading?: boolean;
}

const iconSize = { l: 20, m: 18, s: 16 } as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', color = 'primary', size = 'm', leadingIcon, trailingIcon, loading, disabled, children, className, ...rest }, ref) {
  return (
    <button ref={ref} className={[s.button, s[variant], s[color], s[size], className].filter(Boolean).join(' ')}
      disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className={s.spinner} aria-hidden /> : leadingIcon && <Icon name={leadingIcon} size={iconSize[size]} />}
      {children}
      {!loading && trailingIcon && <Icon name={trailingIcon} size={iconSize[size]} />}
    </button>
  );
});
