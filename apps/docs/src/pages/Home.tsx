import { Button, Chip, ContentBadge, Switch, TextField, Checkbox, Divider } from '@iris/react';
import { Link } from 'react-router-dom';

const FOUNDATIONS = [
  ['Color', '/foundations/color', '시멘틱 73 · 아토믹 8패밀리'],
  ['Typography', '/foundations/typography', '16 스타일 · .iris-* 클래스'],
  ['Spacing', '/foundations/spacing', '간격 스케일 · radius · stroke'],
  ['Elevation', '/foundations/elevation', '그림자 5단계'],
  ['Platform', '/foundations/platform', '웹·iOS·Android 분기 토큰'],
] as const;

const CATS: [string, [string, string][]][] = [
  ['Actions', [['Button', 'button'], ['Chip', 'chip'], ['Filter button', 'filter-button']]],
  ['Selection & Input', [['Text field', 'text-field'], ['Text area', 'text-area'], ['Select', 'select'], ['Search field', 'search-field'], ['Checkbox', 'checkbox'], ['Radio', 'radio'], ['Switch', 'switch'], ['Segmented control', 'segmented-control'], ['Slider', 'slider']]],
  ['Contents', [['Content badge', 'content-badge'], ['Avatar', 'avatar'], ['List cell', 'list-cell'], ['Card', 'card'], ['Section header', 'section-header'], ['Accordion', 'accordion'], ['Table', 'table']]],
  ['Feedback', [['Alert', 'alert'], ['Toast', 'toast'], ['Snackbar', 'snackbar'], ['Section message', 'section-message'], ['Fallback view', 'fallback-view'], ['Push badge', 'push-badge']]],
  ['Navigations', [['Top navigation', 'top-navigation'], ['Bottom navigation', 'bottom-navigation'], ['Tab', 'tab'], ['Pagination', 'pagination'], ['Progress', 'progress'], ['Progress tracker', 'progress-tracker']]],
  ['Presentation', [['Tooltip', 'tooltip'], ['Popover', 'popover'], ['Menu', 'menu'], ['Popup', 'popup'], ['Bottom sheet', 'bottom-sheet']]],
  ['Loading & Utilities', [['Skeleton', 'skeleton'], ['Scrim', 'scrim'], ['Grid', 'grid'], ['Divider', 'divider'], ['Icon', 'icon']]],
];

export default function Home() {
  return (
    <>
      <p className="page-kicker">Iris Design System</p>
      <h1 className="page-title">From screens to systems.</h1>
      <p className="page-desc">
        Iris는 웹·iOS·Android에서 함께 쓰는 범용 디자인 시스템입니다. 이름은 세 가지에서 왔습니다 —
        보라색 붓꽃, 빛을 조절하는 홍채, 그리고 플랫폼 사이를 오가는 전령 이리스.
        모든 색·간격·타이포는 Figma Variables를 단일 소스로 빌드됩니다.
      </p>

      <h2 className="section">한눈에</h2>
      <p className="section-desc">아래는 이미지가 아니라 실제 컴포넌트입니다. 좌측 하단 테마 토글로 다크 모드를 확인하세요.</p>
      <div className="canvas col" style={{ gap: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="m">저장</Button>
          <Button variant="outlined" color="assistive" size="m">취소</Button>
          <Chip selected>디자인</Chip>
          <Chip>개발</Chip>
          <ContentBadge tone="positive">완료</ContentBadge>
          <ContentBadge tone="cautionary">가설</ContentBadge>
        </div>
        <Divider />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <TextField label="이메일" placeholder="example@email.com" helper="회사 이메일을 입력하세요" style={{ width: 260 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 26 }}>
            <Checkbox label="이메일 수신" defaultChecked />
            <Switch label="알림 받기" defaultChecked />
          </div>
        </div>
      </div>

      <h2 className="section">시작하기</h2>
      <p className="section-desc">토큰 CSS를 한 번 불러오면 모든 컴포넌트가 라이트/다크에 반응합니다.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="codeline">npm i @iris/tokens @iris/react</div>
        <div className="codeline">{`import '@iris/tokens/css';  // 앱 진입점에서 1회`}</div>
        <div className="codeline">{`import { Button } from '@iris/react';`}</div>
        <div className="codeline">{`<html data-theme="dark">  // 생략하면 시스템 설정 따름`}</div>
      </div>

      <h2 className="section">Foundations</h2>
      <div className="home-grid">
        {FOUNDATIONS.map(([name, path, d]) => (
          <Link key={path} to={path} className="home-link">{name}<small>{d}</small></Link>
        ))}
      </div>

      <h2 className="section">Components</h2>
      <p className="section-desc">41개 컴포넌트 — 전부 Playground·수치 스펙·Do/Don't 문서를 갖췄습니다.</p>
      {CATS.map(([cat, items]) => (
        <div key={cat}>
          <div className="home-cat">{cat}</div>
          <div className="home-grid">
            {items.map(([name, slug]) => (
              <Link key={slug} to={`/components/${slug}`} className="home-link">{name}</Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
