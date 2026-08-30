import { forwardRef } from 'react';
import s from './Switch.module.css';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/** 즉시 적용되는 on/off 설정. 제출이 필요한 동의는 Checkbox를 쓴다. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, disabled, className, ...rest }, ref) {
  return (
    <label className={[s.root, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      <input ref={ref} type="checkbox" role="switch" className={s.input} disabled={disabled} {...rest} />
      <span className={s.track} aria-hidden><span className={s.knob} /></span>
      {label}
    </label>
  );
});
