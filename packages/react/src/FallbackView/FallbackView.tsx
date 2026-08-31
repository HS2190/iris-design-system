import { Icon, type IconName } from '../Icon/Icon';
import s from './FallbackView.module.css';

export interface FallbackViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: IconName;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 다음 행동 — 버튼 하나 권장 */
  action?: React.ReactNode;
}

/** 빈 상태·오류·결과 없음을 채우는 중앙 안내. 다음 행동을 함께 제시한다. */
export function FallbackView({ icon = 'search', title, description, action, className, style, ...rest }: FallbackViewProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      <span className={s.icon} aria-hidden><Icon name={icon} size={40} /></span>
      <span className={s.title}>{title}</span>
      {description && <span className={s.desc}>{description}</span>}
      {action && <span className={s.action}>{action}</span>}
    </div>
  );
}
