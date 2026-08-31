import s from './SegmentedControl.module.css';

export interface SegmentedControlProps<T extends string = string> {
  /** 2~3개 권장. 4개 이상이면 Tab이나 Select */
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Partial<Record<T, string>>;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

/** 같은 데이터의 보기(view)를 즉시 전환. 페이지 이동은 Tab. */
export function SegmentedControl<T extends string>({ options, value, onChange, labels, disabled, className, ...rest }: SegmentedControlProps<T>) {
  return (
    <div role="group" className={[s.track, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined} {...rest}>
      {options.map(o => (
        <button key={o} type="button" className={s.item} aria-pressed={value === o}
          disabled={disabled} onClick={() => onChange(o)}>
          {labels?.[o] ?? o}
        </button>
      ))}
    </div>
  );
}
