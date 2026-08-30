import { forwardRef, useId } from 'react';
import s from './TextField.module.css';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** 입력 규칙 안내. error가 있으면 error가 대신 표시된다 */
  helper?: string;
  /** 오류 메시지 — 무엇이 잘못됐고 어떻게 고치는지 */
  error?: string;
}

/** 단일 행 입력. 높이 = --iris-input-height(플랫폼 토큰). 라벨을 플레이스홀더로 대체하지 않는다. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helper, error, id, disabled, className, ...rest }, ref) {
  const auto = useId();
  const inputId = id ?? auto;
  const msg = error ?? helper;
  return (
    <div className={[s.root, error && s.error, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      {label && <label className={s.label} htmlFor={inputId}>{label}</label>}
      <input ref={ref} id={inputId} className={s.input} disabled={disabled}
        aria-invalid={error ? true : undefined} aria-describedby={msg ? inputId + '-msg' : undefined} {...rest} />
      {msg && <p className={s.helper} id={inputId + '-msg'}>{msg}</p>}
    </div>
  );
});
