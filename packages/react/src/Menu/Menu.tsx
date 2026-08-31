import { Icon, type IconName } from '../Icon/Icon';
import s from './Menu.module.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: IconName;
  /** 파괴적 행동 — status/negative + 구분선과 함께 */
  danger?: boolean;
  disabled?: boolean;
  /** 이 항목 위에 구분선 */
  divider?: boolean;
}

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: MenuItem[];
  onSelect?: (id: string) => void;
}

/** 드롭다운 행동 목록(표현부). 항목 40 · 외곽 패딩 6, role=menu. */
export function Menu({ items, onSelect, className, style, ...rest }: MenuProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} role="menu" {...rest}>
      {items.map(it => (
        <span key={it.id} style={{ display: 'contents' }}>
          {it.divider && <span className={s.divider} role="separator" />}
          <button type="button" role="menuitem" className={[s.item, it.danger ? s.danger : ''].filter(Boolean).join(' ')}
            disabled={it.disabled} onClick={() => onSelect?.(it.id)}>
            {it.icon && <Icon name={it.icon} size={20} />}
            {it.label}
          </button>
        </span>
      ))}
    </div>
  );
}
