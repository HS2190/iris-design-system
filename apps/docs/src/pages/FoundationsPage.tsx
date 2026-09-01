import { Link } from 'react-router-dom';
import { Icon } from '@hs2190/iris-react';
import { Page } from '../components/Doc';

const CARDS: [string, string, string, React.ReactNode][] = [
  ['Color', '/foundations/color', '아토믹 명도 스케일 위에 역할(시멘틱)을 얹어, 다크 모드가 재매핑 한 번으로 끝나는 2층 구조.',
    <span style={{ display: 'flex', gap: 4 }}>{['primary-normal', 'status-positive', 'status-cautionary', 'status-negative'].map(c => <i key={c} style={{ width: 22, height: 22, borderRadius: 6, background: `var(--iris-semantic-${c})` }} />)}</span>],
  ['Typography', '/foundations/typography', '전시 → 화면 → 섹션 → 본문 → 컨트롤 → 보조, 16단계 위계. 폰트는 변수 하나로 제어.',
    <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: 'var(--iris-semantic-label-normal)' }}><span style={{ fontSize: 26, fontWeight: 700 }}>Aa</span><span style={{ fontSize: 17 }}>Aa</span><span style={{ fontSize: 12, color: 'var(--iris-semantic-label-alternative)' }}>Aa</span></span>],
  ['Spacing', '/foundations/spacing', '4의 배수 하나로 모든 간격을 — 화면 어디를 잘라도 리듬이 같습니다. Radius·Stroke 포함.',
    <span style={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>{[4, 8, 12, 16, 24].map(v => <i key={v} style={{ width: 10, height: v, borderRadius: 2, background: 'var(--iris-semantic-fill-primary)' }} />)}</span>],
  ['Elevation', '/foundations/elevation', 'ambient + key 두 겹 그림자, None 포함 6단계. 다크에선 표면 명도가 위계를 잇습니다.',
    <span style={{ width: 44, height: 30, borderRadius: 8, background: 'var(--iris-semantic-background-elevated-normal)', boxShadow: 'var(--iris-elevation-normal-medium)', display: 'inline-block' }} />],
  ['Platform', '/foundations/platform', '하나의 토큰 이름, 웹·iOS·Android 세 값. 분기는 코드가 아니라 토큰 층이 흡수합니다.',
    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: 'var(--iris-semantic-label-assistive)' }}>48 · 48 · 56</span>],
  ['Icon', '/components/icon', 'Phosphor 기반 72종 × line/fill. 색은 currentColor — 글자와 같은 규칙으로 물듭니다.',
    <span style={{ display: 'flex', gap: 8, color: 'var(--iris-semantic-label-neutral)' }}><Icon name="star" size={20} /><Icon name="star" variant="fill" size={20} /><Icon name="bell" size={20} /></span>],
];

export default function FoundationsPage() {
  return (
    <Page kicker="Foundations" title="Foundations" desc="모든 컴포넌트가 딛고 서는 원자 단위들입니다. 색·글자·간격·그림자·플랫폼 — 다섯 기반과 아이콘이 같은 소스(Figma Variables)에서 빌드됩니다.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginTop: 24 }}>
        {CARDS.map(([name, path, desc, visual]) => (
          <Link key={path} to={path} className="home-link" style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b style={{ fontSize: 16 }}>{name}</b>
              {visual}
            </span>
            <small style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--iris-semantic-label-alternative)', whiteSpace: 'normal' }}>{desc}</small>
          </Link>
        ))}
      </div>
    </Page>
  );
}
