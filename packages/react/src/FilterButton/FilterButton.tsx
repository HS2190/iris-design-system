import { forwardRef } from 'react';
import { Icon } from '../Icon/Icon';
import s from './FilterButton.module.css';

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 적용된 필터가 있는 상태 */
  active?: boolean;
  /** 적용된 필터 수 — 있을 때만 뱃지 표시 */
  count?: number;
}

/** 필터 시트/메뉴를 여는 트리거. 즉시 토글되는 값은 Chip. */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(function FilterButton(
  { active, count, children, className, ...rest }, ref) {
  return (
    <button ref={ref} className={[s.button, active && s.active, className].filter(Boolean).join(' ')}
      aria-expanded={rest['aria-expanded']} {...rest}>
      <Icon name="filter" size={16} />
      {children}
      {count != null && count > 0 && <span className={s.count}>{count}</span>}
      <Icon name="chevron-down" size={16} />
    </button>
  );
});
