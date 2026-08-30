import s from './Divider.module.css';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  weight?: 'normal' | 'strong';
}

/** 1px 구분선. 여백으로 충분한 곳엔 쓰지 않는다. */
export function Divider({ orientation = 'horizontal', weight = 'normal', className, ...rest }: DividerProps) {
  const cls = [orientation === 'horizontal' ? s.h : s.v, s[weight], className].filter(Boolean).join(' ');
  return orientation === 'horizontal'
    ? <hr className={cls} {...rest} />
    : <span role="separator" aria-orientation="vertical" className={cls} {...(rest as React.HTMLAttributes<HTMLSpanElement>)} />;
}
