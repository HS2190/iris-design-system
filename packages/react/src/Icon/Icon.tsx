import { paths } from './paths';

export type IconName = keyof typeof paths & string;
export type IconVariant = 'line' | 'fill';
export const iconNames = Object.keys(paths) as IconName[];

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  /** px. 기본 24 */
  size?: number;
  /** line = Phosphor regular · fill = 채움 */
  variant?: IconVariant;
}

/** Phosphor 기반 아이콘. 색은 currentColor — 부모의 color 토큰을 따른다. */
export function Icon({ name, size = 24, variant = 'line', ...rest }: IconProps) {
  const g = paths[name];
  if (!g) return null;
  const ds = variant === 'fill' ? g.fill : g.line;
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor"
      aria-hidden={rest['aria-label'] ? undefined : true} {...rest}>
      {ds.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}
