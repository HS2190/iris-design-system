import { Link } from 'react-router-dom';
import { Page } from '../components/Doc';

const ITEMS: [string, string, string][] = [
  ['Skeleton', 'skeleton', '로딩 플레이스홀더 — 콘텐츠 레이아웃 모양대로'],
  ['Scrim', 'scrim', '오버레이 뒤를 덮는 막 — material/dimmer'],
  ['Grid', 'grid', '레이아웃 그리드 — 12/8/4컬럼 · 거터 16'],
  ['Divider', 'divider', '구분선 — 성격이 바뀌는 경계에만'],
];

export default function UtilitiesIndexPage() {
  return (
    <Page kicker="Utilities" title="Utilities" desc="화면의 바탕을 받치는 도구들입니다 — 로딩·오버레이·레이아웃·구분. 컴포넌트와 같은 문서 형식(Playground·Size·Do/Don't)을 갖췄습니다.">
      <div className="home-grid" style={{ marginTop: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {ITEMS.map(([name, slug, d]) => (
          <Link key={slug} to={`/components/${slug}`} className="home-link">{name}<small>{d}</small></Link>
        ))}
      </div>
    </Page>
  );
}
