import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import s from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** true면 여러 항목 동시 확장 */
  multiple?: boolean;
  defaultOpen?: string[];
}

/** 접고 펼치는 목록. 헤더 56 · 콘텐츠 하단 패딩 16, aria-expanded 노출. */
export function Accordion({ items, multiple, defaultOpen = [], className, style, ...rest }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (id: string) => setOpen(prev => prev.includes(id)
    ? prev.filter(v => v !== id)
    : multiple ? [...prev, id] : [id]);
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} {...rest}>
      {items.map(it => {
        const isOpen = open.includes(it.id);
        return (
          <div className={s.item} key={it.id}>
            <button type="button" className={s.header} onClick={() => toggle(it.id)}
              disabled={it.disabled} aria-expanded={isOpen} aria-controls={'acc-' + it.id}>
              <span className={s.title}>{it.title}</span>
              <span className={[s.chevron, isOpen ? s.up : ''].filter(Boolean).join(' ')} aria-hidden><Icon name="chevron-down" size={20} /></span>
            </button>
            <div className={s.region} id={'acc-' + it.id} role="region" data-open={isOpen || undefined}>
              <div className={s.inner}><div className={s.content}>{it.content}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
