import { Icon } from '../Icon/Icon';
import s from './Pagination.module.css';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  total: number;
  onChange?: (p: number) => void;
  /** number = 페이지 번호(목록·표), dot = 인디케이터(캐러셀) */
  variant?: 'number' | 'dot';
}

function range(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const lo = Math.max(2, page - 1), hi = Math.min(total - 1, page + 1);
  const out: (number | '…')[] = [1];
  if (lo > 2) out.push('…');
  for (let i = lo; i <= hi; i++) out.push(i);
  if (hi < total - 1) out.push('…');
  out.push(total);
  return out;
}

/** 페이지 이동. 버튼 32 · 간격 4, 현재 페이지 aria-current. */
export function Pagination({ page, total, onChange, variant = 'number', className, style, ...rest }: PaginationProps) {
  if (variant === 'dot') {
    return (
      <nav className={[s.dots, className].filter(Boolean).join(' ')} style={style} {...rest}>
        {Array.from({ length: total }, (_, i) => (
          <button type="button" key={i} className={s.dot} data-active={i + 1 === page || undefined}
            aria-label={`${i + 1} 페이지`} aria-current={i + 1 === page ? 'page' : undefined}
            onClick={() => onChange?.(i + 1)} />
        ))}
      </nav>
    );
  }
  return (
    <nav className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      <button type="button" className={s.btn} disabled={page <= 1} aria-label="이전 페이지"
        onClick={() => onChange?.(page - 1)}><Icon name="chevron-left" size={18} /></button>
      {range(page, total).map((p, i) => p === '…'
        ? <span key={'e' + i} className={s.ellipsis}>…</span>
        : <button type="button" key={p} className={s.btn} data-active={p === page || undefined}
            aria-current={p === page ? 'page' : undefined} onClick={() => onChange?.(p)}>{p}</button>)}
      <button type="button" className={s.btn} disabled={page >= total} aria-label="다음 페이지"
        onClick={() => onChange?.(page + 1)}><Icon name="chevron-right" size={18} /></button>
    </nav>
  );
}
