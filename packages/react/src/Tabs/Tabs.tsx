import s from './Tabs.module.css';

export interface TabsProps<T extends string = string> {
  items: readonly T[];
  /** 값과 다른 표시 라벨 */
  labels?: Partial<Record<T, string>>;
  value: T;
  onChange: (v: T) => void;
  /** 각 탭이 폭을 균등 분할 */
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** 콘텐츠 분류 전환. 높이 44 · 밑줄 인디케이터 2, role=tablist. 2~3개 보기 전환은 Segmented control. */
export function Tabs<T extends string>({ items, labels, value, onChange, fluid, className, style }: TabsProps<T>) {
  return (
    <div className={[s.root, fluid ? s.fluid : '', className].filter(Boolean).join(' ')} style={style} role="tablist">
      {items.map(it => (
        <button type="button" key={it} role="tab" className={s.item}
          aria-selected={it === value} onClick={() => onChange(it)}>
          {labels?.[it] ?? it}
        </button>
      ))}
    </div>
  );
}
