import { useRef, useState } from 'react';
import { Skeleton, Button, Avatar, ListCell, Card } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Playground, DoDont, Props } from '../components/Doc';

const CellSkeleton = ({ w = 300 }: { w?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: w }}>
    <Skeleton variant="circle" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      <Skeleton width="55%" />
      <Skeleton width="35%" />
    </div>
  </div>
);

export default function SkeletonPage() {
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const reload = () => { setLoading(true); clearTimeout(timer.current); timer.current = setTimeout(() => setLoading(false), 1600); };
  return (
    <Page kicker="Components · Loading" title="Skeleton" desc="로딩 플레이스홀더입니다. 실제 콘텐츠의 레이아웃 모양대로 조합합니다. 시머는 reduced-motion에서 정지합니다.">
      <Section title="Playground" desc="불러오기를 누르면 1.6초 동안 스켈레톤이 보입니다.">
        <Playground
          stage={<div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            {loading
              ? <CellSkeleton />
              : <ListCell title="안현서" description="프로덕트 디자이너" leading={<Avatar size="l" name="안" />} style={{ width: 300, padding: 0 }} />}
            <Button size="s" variant="outlined" color="assistive" onClick={reload}>다시 불러오기</Button>
          </div>}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>콘텐츠와 같은<br />모양·크기로.</div>}
          code={`<Skeleton variant="circle" /> <Skeleton width="55%" />`} />
      </Section>
      <Section title="Variants" desc="text(글줄 14) · circle(아바타) · rect(블록).">
        <Canvas style={{ gap: 40 }}>
          <Spec label="text"><div style={{ width: 160 }}><Skeleton /></div></Spec>
          <Spec label="circle · 40"><Skeleton variant="circle" /></Spec>
          <Spec label="rect"><Skeleton variant="rect" width={120} height={68} /></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="카드 스켈레톤 — 썸네일·제목·메타를 그대로 흉내냅니다.">
        <Canvas>
          <Card variant="outlined" style={{ width: 220 }} thumbnail={<Skeleton variant="rect" width="100%" height="100%" style={{ borderRadius: 0 }} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skeleton width="70%" />
              <Skeleton width="45%" />
            </div>
          </Card>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 조합 간격(px). 글줄 H 14 · R 4, circle 40, rect R 8.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.4)', lineHeight: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 180 }}>
                  <Skeleton variant="circle" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    <Skeleton width={120} />
                    <Skeleton width={80} />
                  </div>
                </div>
                {/* circle 40 (0~40) · G12 (40~52) · 줄 14 (y2~16 / 24~38) · 줄 간 8 (16~24) */}
                <span className="size-zone gap" style={{ left: 40, top: 0, width: 12, height: 40 }} />
                <span className="size-num gapnum" style={{ left: 46, top: -12, transform: 'translateX(-50%)' }}>12</span>
                <span className="size-zone gap" style={{ left: 52, top: 16, width: 120, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 16 }}>8</span>
                <span className="size-num" style={{ left: -24, top: 17 }}>40</span>
                <span className="size-num" style={{ right: -16, top: 3 }}>14</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>리스트 셀 조합</b>
              <span className="sub">글줄 H 14 · R 4 · circle 40 · rect R 8</span>
              <span className="sub">조합 간격은 실제 컴포넌트와 동일하게 (리딩 12 · 줄 간 8)</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="text" items={['H 14', 'R 4', 'W 자유']} /></div>
            <div className="size-item"><Chips primary="circle" items={['기본 40', 'R full']} /></div>
            <div className="size-item"><Chips primary="rect" items={['R 8', 'W·H 자유']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="콘텐츠 모양 그대로" doBody="같은 리스트 셀 — 아바타·두 줄 구조를 흉내내면 전환이 매끄럽습니다."
          doEx={<CellSkeleton w={240} />}
          dontTitle="아무 사각형 하나" dontBody="같은 자리를 큰 블록 하나로 채우면 로딩 후 레이아웃이 널뜁니다."
          dontEx={<Skeleton variant="rect" width={240} height={56} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['variant', "'text' | 'circle' | 'rect'", "'text'", '글줄 / 아바타 / 블록'],
          ['width / height', 'number | string', "text 100% · circle 40", '크기 — 실제 콘텐츠와 동일하게'],
        ]} />
      </Section>
    </Page>
  );
}
