import { forwardRef } from 'react';
import s from './Radio.module.css';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/** 상호 배타 옵션 중 하나 선택. 같은 name의 그룹으로 쓴다. 옵션 6개 이상이면 Select. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, disabled, className, ...rest }, ref) {
  return (
    <label className={[s.root, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      <input ref={ref} type="radio" className={s.input} disabled={disabled} {...rest} />
      <span className={s.circle} aria-hidden><span className={s.dot} /></span>
      {label}
    </label>
  );
});
