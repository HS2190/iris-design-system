import { forwardRef, useState } from 'react';
import s from './Slider.module.css';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** 우측 값 표시 포맷 */
  formatValue?: (value: number) => string;
}

/** 범위 안의 대략적인 값 선택. 정확한 값이 필요하면 Text field를 병행한다. */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, formatValue, min = 0, max = 100, defaultValue, value, onChange, className, ...rest }, ref) {
  const [val, setVal] = useState(Number(value ?? defaultValue ?? min));
  const pct = ((val - Number(min)) / (Number(max) - Number(min))) * 100;
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')}>
      {(label || formatValue) && (
        <div className={s.top}>
          {label && <span className={s.label}>{label}</span>}
          {formatValue && <span className={s.value}>{formatValue(val)}</span>}
        </div>
      )}
      <input ref={ref} type="range" className={s.input} min={min} max={max}
        value={value ?? val} style={{ ['--_pct' as string]: pct + '%' }}
        onChange={e => { setVal(Number(e.target.value)); onChange?.(e); }} {...rest} />
    </div>
  );
});
