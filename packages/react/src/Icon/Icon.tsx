import { paths } from './paths';

export type IconName = keyof typeof paths & string;
export const iconNames = Object.keys(paths) as IconName[];

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  /** px. 기본 24 */
  size?: number;
}

/** 24px 그리드 라인 아이콘. 색은 currentColor — 부모의 color 토큰을 따른다. */
export function Icon({ name, size = 24, ...rest }: IconProps) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden={rest['aria-label'] ? undefined : true} {...rest}>
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}
