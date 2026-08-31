import { Link } from 'react-router-dom';
import { Page } from '../components/Doc';

const CATS: [string, string, [string, string][]][] = [
  ['Actions', '누르면 일이 일어나는 것', [['Button', 'button'], ['Text button', 'text-button'], ['Icon button', 'icon-button'], ['Chip', 'chip'], ['Filter button', 'filter-button'], ['Action area', 'action-area']]],
  ['Selection & Input', '고르고 입력하는 것', [['Text field', 'text-field'], ['Text area', 'text-area'], ['Select', 'select'], ['Search field', 'search-field'], ['Checkbox', 'checkbox'], ['Radio', 'radio'], ['Switch', 'switch'], ['Segmented control', 'segmented-control'], ['Slider', 'slider']]],
  ['Contents', '내용을 담는 그릇', [['Content badge', 'content-badge'], ['Avatar', 'avatar'], ['List cell', 'list-cell'], ['Card', 'card'], ['Section header', 'section-header'], ['Accordion', 'accordion'], ['Table', 'table']]],
  ['Feedback', '시스템이 답하는 방법', [['Alert', 'alert'], ['Toast', 'toast'], ['Snackbar', 'snackbar'], ['Section message', 'section-message'], ['Fallback view', 'fallback-view'], ['Push badge', 'push-badge']]],
  ['Navigations', '길을 잡는 것', [['Top navigation', 'top-navigation'], ['Bottom navigation', 'bottom-navigation'], ['Tab', 'tab'], ['Pagination', 'pagination'], ['Progress', 'progress'], ['Progress tracker', 'progress-tracker']]],
  ['Presentation', '떠오르는 레이어', [['Tooltip', 'tooltip'], ['Popover', 'popover'], ['Menu', 'menu'], ['Popup', 'popup'], ['Bottom sheet', 'bottom-sheet']]],
];

export default function ComponentsIndexPage() {
  const total = CATS.reduce((n, c) => n + c[2].length, 0);
  return (
    <Page kicker="Components" title="Components" desc={`${total}개 컴포넌트 — 전부 Playground · 수치 스펙(Size 히어로) · Usage · Do/Don't 문서를 갖췄습니다.`}>
      {CATS.map(([cat, d, items]) => (
        <div key={cat}>
          <div className="home-cat" style={{ marginTop: 28 }}>{cat} · {items.length} <span style={{ textTransform: 'none', letterSpacing: 0, marginLeft: 6 }}>— {d}</span></div>
          <div className="home-grid">
            {items.map(([name, slug]) => (
              <Link key={slug} to={`/components/${slug}`} className="home-link">{name}</Link>
            ))}
          </div>
        </div>
      ))}
    </Page>
  );
}
