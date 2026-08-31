import s from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** text = 글줄(H 14) · circle = 아바타 · rect = 블록 */
  variant?: 'text' | 'circle' | 'rect';
  width?: number | string;
  height?: number | string;
}

/** 로딩 플레이스홀더. 실제 콘텐츠 레이아웃 모양대로 조합해 쓴다. */
export function Skeleton({ variant = 'text', width, height, className, style, ...rest }: SkeletonProps) {
  const w = width ?? (variant === 'circle' ? 40 : variant === 'text' ? '100%' : undefined);
  const h = height ?? (variant === 'circle' ? w : variant === 'text' ? undefined : 80);
  return (
    <span className={[s.root, s[variant], className].filter(Boolean).join(' ')}
      style={{ width: w, height: h, ...style }} aria-hidden {...rest} />
  );
}
