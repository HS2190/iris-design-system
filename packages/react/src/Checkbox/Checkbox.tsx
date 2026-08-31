import { forwardRef, useEffect, useRef } from 'react';
import s from './Checkbox.module.css';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** 하위 항목 일부만 선택된 부모 상태 */
  indeterminate?: boolean;
}

/** 다중 선택. 하나만 골라야 하면 Radio(예정)를 쓴다. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate, disabled, className, ...rest }, ref) {
  const inner = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (inner.current) inner.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label className={[s.root, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      <input ref={node => { inner.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }}
        type="checkbox" className={s.input} disabled={disabled} {...rest} />
      <span className={s.box} aria-hidden>
        <svg className={`${s.mark} ${s.check}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l5 5 9-10.5"/></svg>
        <svg className={`${s.mark} ${s.dash}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 12h12"/></svg>
      </span>
      {label}
    </label>
  );
});
