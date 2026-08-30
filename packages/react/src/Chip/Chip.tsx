import { forwardRef } from 'react';
import s from './Chip.module.css';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outlined';
  size?: 'm' | 's';
  /** 필터·태그의 선택 상태 (aria-pressed로 노출) */
  selected?: boolean;
}

/** 태그·필터·선택 항목. 높이 고정, 다중 선택 가능. */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { variant = 'outlined', size = 'm', selected, className, ...rest }, ref) {
  return (
    <button ref={ref} aria-pressed={selected}
      className={[s.chip, s[variant], s[size], selected && s.selected, className].filter(Boolean).join(' ')} {...rest} />
  );
});
