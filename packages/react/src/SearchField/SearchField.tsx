import { forwardRef, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import s from './SearchField.module.css';

export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 지우기 버튼 클릭 시 (값 비운 뒤 호출) */
  onClear?: () => void;
}

/** 검색 전용 입력. radius-full로 일반 폼 입력과 구분한다. 화면당 하나. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { onClear, className, onChange, disabled, ...rest }, ref) {
  const inner = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(!!(rest.value ?? rest.defaultValue));
  return (
    <div className={[s.wrap, className].filter(Boolean).join(' ')}>
      <span className={s.icon}><Icon name="search" size={20} /></span>
      <input ref={node => { inner.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }}
        type="search" role="searchbox" className={s.input} disabled={disabled}
        onChange={e => { setHasValue(!!e.target.value); onChange?.(e); }} {...rest} />
      {hasValue && !disabled && (
        <button type="button" className={s.clear} aria-label="지우기"
          onClick={() => { if (inner.current) { inner.current.value = ''; inner.current.focus(); } setHasValue(false); onClear?.(); }}>
          <Icon name="close" size={12} />
        </button>
      )}
    </div>
  );
});
