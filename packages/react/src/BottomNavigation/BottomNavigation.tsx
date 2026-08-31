import { Icon, type IconName } from '../Icon/Icon';
import { PushBadge } from '../PushBadge/PushBadge';
import s from './BottomNavigation.module.css';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: IconName;
  /** 미확인 수 — PushBadge로 표시 */
  badge?: number;
}

export interface BottomNavigationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items: BottomNavItem[];
  value: string;
  onChange?: (id: string) => void;
}

/** 하단 탭 바. 3~5탭, 아이콘 24 + 라벨 10, 활성 = primary + aria-current. */
export function BottomNavigation({ items, value, onChange, className, style, ...rest }: BottomNavigationProps) {
  return (
    <nav className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {items.map(it => (
        <button type="button" key={it.id} className={s.item} data-active={it.id === value || undefined}
          aria-current={it.id === value ? 'page' : undefined} onClick={() => onChange?.(it.id)}>
          <span className={s.iconWrap}>
            {it.badge ? <PushBadge count={it.badge}><Icon name={it.icon} /></PushBadge> : <Icon name={it.icon} />}
          </span>
          <span className={s.label}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
