import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Item { id: string; text: string }

/** 본문의 h2.section을 스캔해 우측 "On this page" 목차를 만든다. 스크롤 위치에 따라 활성 표시. */
export default function Toc() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    // 라우트 렌더 직후 헤딩 수집 + id 부여
    const raf = requestAnimationFrame(() => {
      const hs = Array.from(document.querySelectorAll<HTMLHeadingElement>('main h2.section'));
      const list = hs.map(h => {
        const id = h.id || (h.textContent ?? '').trim().toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-');
        h.id = id;
        return { id, text: (h.textContent ?? '').trim() };
      });
      setItems(list);
      setActive(list[0]?.id ?? '');
      const io = new IntersectionObserver(entries => {
        const hit = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive((hit.target as HTMLElement).id);
      }, { rootMargin: '-10% 0px -75% 0px' });
      hs.forEach(h => io.observe(h));
      (window as any).__irisToc?.disconnect?.();
      (window as any).__irisToc = io;
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (items.length < 2) return null;
  return (
    <nav className="toc" aria-label="이 페이지 목차">
      <div className="toc-title">On this page</div>
      {items.map(i => (
        <a key={i.id} href={'#' + location.hash.split('#').slice(1, 2).join('') /* keep route */} className={active === i.id ? 'active' : ''}
          onClick={e => { e.preventDefault(); document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(i.id); }}>
          {i.text}
        </a>
      ))}
    </nav>
  );
}
