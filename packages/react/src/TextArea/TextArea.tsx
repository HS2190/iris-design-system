import { forwardRef, useId, useState } from 'react';
import s from './TextArea.module.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
  /** maxLength와 함께 쓰면 "n / max" 카운터 표시 */
  showCount?: boolean;
}

/** 여러 줄 입력. 최소 높이 120, 세로 리사이즈 허용. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helper, error, showCount, maxLength, id, disabled, className, onChange, defaultValue, value, ...rest }, ref) {
  const auto = useId();
  const inputId = id ?? auto;
  const [len, setLen] = useState(String(value ?? defaultValue ?? '').length);
  const msg = error ?? helper;
  return (
    <div className={[s.root, error && s.error, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      {label && <label className={s.label} htmlFor={inputId}>{label}</label>}
      <textarea ref={ref} id={inputId} className={s.input} disabled={disabled} maxLength={maxLength}
        value={value} defaultValue={defaultValue}
        aria-invalid={error ? true : undefined} aria-describedby={msg ? inputId + '-msg' : undefined}
        onChange={e => { setLen(e.target.value.length); onChange?.(e); }} {...rest} />
      {(msg || (showCount && maxLength)) && (
        <div className={s.foot}>
          {msg && <p className={s.helper} id={inputId + '-msg'}>{msg}</p>}
          {showCount && maxLength && <span className={s.counter}>{len} / {maxLength}</span>}
        </div>
      )}
    </div>
  );
});
