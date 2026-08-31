import s from './Scrim.module.css';

export interface ScrimProps extends React.HTMLAttributes<HTMLDivElement> {}

/** 오버레이 뒤를 덮는 막. 부모(relative) 전체를 inset 0으로 덮고, 탭하면 닫는 게 관례. */
export function Scrim({ className, ...rest }: ScrimProps) {
  return <div className={[s.root, className].filter(Boolean).join(' ')} aria-hidden {...rest} />;
}
