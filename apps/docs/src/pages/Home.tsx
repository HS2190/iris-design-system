import { Button, Chip, ContentBadge, Switch, TextField, Checkbox, Divider, TextButton, iconNames } from '@iris/react';
import { Link, useNavigate } from 'react-router-dom';

const FOUNDATIONS = [
  ['Color', '/foundations/color', '시멘틱 73 · 아토믹 7패밀리'],
  ['Typography', '/foundations/typography', '16 스타일 · .iris-* 클래스'],
  ['Spacing', '/foundations/spacing', '간격 스케일 · radius · stroke'],
  ['Elevation', '/foundations/elevation', '그림자 6단계 · 2겹 합성'],
  ['Platform', '/foundations/platform', '웹·iOS·Android 분기 토큰'],
  ['Icon', '/components/icon', `Phosphor ${iconNames.length}종 × line/fill`],
] as const;

export default function Home() {
  const nav = useNavigate();
  return (
    <>
      <section className="hero">
        <h1>From screens<br />to <em>systems.</em></h1>
        <p>
          Iris는 웹·iOS·Android에서 함께 쓰는 범용 디자인 시스템입니다.
          보라색 붓꽃, 빛을 조절하는 홍채, 플랫폼 사이를 오가는 전령 — 세 은유에서 이름을 얻었고,
          모든 색·간격·타이포가 Figma Variables 단일 소스에서 빌드됩니다.
        </p>
        <div className="hero-cta">
          <Button onClick={() => nav('/components')}>컴포넌트 보기</Button>
          <Button variant="outlined" color="assistive" onClick={() => nav('/foundations')}>Foundations</Button>
        </div>
        <div className="hero-stats">
          <span><b>44</b><small>Components</small></span>
          <span><b>200</b><small>Design tokens</small></span>
          <span><b>{iconNames.length}×2</b><small>Icons (line·fill)</small></span>
          <span><b>3</b><small>Platforms, one source</small></span>
        </div>
      </section>

      <h2 className="section">한눈에</h2>
      <p className="section-desc">아래는 이미지가 아니라 실제 컴포넌트입니다. 우측 상단 토글로 다크 모드를 확인하세요.</p>
      <div className="canvas col" style={{ gap: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="m">저장</Button>
          <Button variant="outlined" color="assistive" size="m">취소</Button>
          <TextButton trailingIcon="chevron-right">더보기</TextButton>
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
    </>
  );
}
