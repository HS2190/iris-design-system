import { Button, Chip, ContentBadge, Switch, TextField, Checkbox, Divider } from '@iris/react';
import { Link } from 'react-router-dom';

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
      <p className="page-desc"><code>npm i @iris/tokens @iris/react</code></p>

      <h2 className="section">한눈에</h2>
      <p className="section-desc">아래는 이미지가 아니라 실제 컴포넌트입니다. 우측 하단 테마 토글로 다크 모드를 확인하세요.</p>
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

      <h2 className="section">시작</h2>
      <p className="section-desc">지금 문서가 있는 컴포넌트: <Link to="/components/button" style={{ textDecoration: 'underline' }}>Button</Link>. 나머지 컴포넌트는 순차 공개됩니다.</p>
    </>
  );
}
