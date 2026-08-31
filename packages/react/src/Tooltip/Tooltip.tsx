import s from './Tooltip.module.css';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: React.ReactNode;
  placement?: 'top' | 'bottom';
  /** 강제 표시 — 기본은 hover/focus에 자동 표시 */
  open?: boolean;
  children: React.ReactNode;
}

/** 짧은 힌트 한 줄. 앵커 hover/focus에 표시, 오프셋 8. 필수 정보는 담지 않는다. */
export function Tooltip({ content, placement = 'top', open, children, className, style, ...rest }: TooltipProps) {
  return (
    <span className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {children}
      <span className={[s.tip, s[placement], open ? s.open : ''].filter(Boolean).join(' ')} role="tooltip">{content}</span>
    </span>
  );
}
