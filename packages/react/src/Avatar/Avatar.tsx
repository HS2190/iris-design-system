import { Children, useState } from 'react';
import s from './Avatar.module.css';

const SIZE = { xl: 64, l: 48, m: 40, s: 32 } as const;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** xl 64 · l 48 · m 40 · s 32 (Figma 정본) */
  size?: keyof typeof SIZE;
  src?: string;
  /** 이미지가 없거나 로드 실패 시 첫 글자를 이니셜로 표시 */
  name?: string;
  alt?: string;
}

/** 사용자·대상을 나타내는 원형 아이덴티티. 깨진 이미지를 보여주지 않는다. */
export function Avatar({ size = 'm', src, name, alt, className, style, ...rest }: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const px = SIZE[size];
  return (
    <span className={[s.root, s[size], className].filter(Boolean).join(' ')} style={style}
      role={src && !broken ? undefined : 'img'} aria-label={alt ?? name} {...rest}>
      {src && !broken
        ? <img className={s.img} src={src} alt={alt ?? name ?? ''} width={px} height={px} onError={() => setBroken(true)} />
        : <span aria-hidden>{(name ?? '?').trim().charAt(0)}</span>}
    </span>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 표시 한도 — 초과분은 +N */
  max?: number;
  /** +N 뱃지 크기 (아바타들과 맞춤) */
  size?: AvatarProps['size'];
  children: React.ReactNode;
}

/** 아바타 겹침 그룹. -8 겹침 + 2px 배경색 링, max 초과분은 +N. */
export function AvatarGroup({ max = 4, size = 'm', children, className, style, ...rest }: AvatarGroupProps) {
  const all = Children.toArray(children);
  const shown = all.slice(0, max);
  const extra = all.length - shown.length;
  return (
    <div className={[s.group, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {shown.map((c, i) => <span className={s.item} key={i}>{c}</span>)}
      {extra > 0 && <span className={s.item}><span className={[s.root, s[size], s.more].join(' ')} aria-label={`외 ${extra}명`}>+{extra}</span></span>}
    </div>
  );
}
