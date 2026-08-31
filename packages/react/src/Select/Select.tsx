import { forwardRef, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import s from './Select.module.css';

export interface SelectOption { value: string; label: string; disabled?: boolean }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  helper?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
}

/** 목록에서 하나 선택. 옵션 6개 이상일 때 — 2~5개면 Radio나 Segmented control. 네이티브 select라 모바일에서 OS 픽커가 뜬다. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, error, placeholder, options, id, disabled, className, defaultValue, onChange, ...rest }, ref) {
  const auto = useId();
  const inputId = id ?? auto;
  const [empty, setEmpty] = useState(!defaultValue && !rest.value);
  const msg = error ?? helper;
  return (
    <div className={[s.root, error && s.error, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      {label && <label className={s.label} htmlFor={inputId}>{label}</label>}
      <div className={s.wrap}>
        <select ref={ref} id={inputId} className={s.select} disabled={disabled}
          defaultValue={defaultValue ?? (placeholder ? '' : undefined)} data-placeholder={empty && !!placeholder}
          aria-invalid={error ? true : undefined} aria-describedby={msg ? inputId + '-msg' : undefined}
          onChange={e => { setEmpty(e.target.value === ''); onChange?.(e); }} {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <span className={s.chevron}><Icon name="chevron-down" size={20} /></span>
      </div>
      {msg && <p className={s.helper} id={inputId + '-msg'}>{msg}</p>}
    </div>
  );
});
