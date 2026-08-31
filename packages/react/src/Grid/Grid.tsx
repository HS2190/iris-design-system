import s from './Grid.module.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 컬럼 수 — 웹 12 · 태블릿 8 · 모바일 4 관례 */
  columns?: number;
  /** 거터(px) */
  gutter?: number;
}

export function Grid({ columns = 12, gutter = 16, style, className, children, ...rest }: GridProps) {
  return (
    <div className={[s.grid, className].filter(Boolean).join(' ')}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: gutter, ...style }} {...rest}>
      {children}
    </div>
  );
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 차지할 컬럼 수 */
  span?: number;
}

export function GridItem({ span = 1, style, className, children, ...rest }: GridItemProps) {
  return (
    <div className={className} style={{ gridColumn: `span ${span}`, minWidth: 0, ...style }} {...rest}>
      {children}
    </div>
  );
}
