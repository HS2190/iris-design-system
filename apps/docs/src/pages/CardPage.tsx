import { useState } from 'react';
import { Card, ContentBadge } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

function CardDemo({ w = 220 }: { w?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: w - 32 }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--iris-semantic-label-normal)' }}>디자인 시스템 구축기</span>
      <span style={{ fontSize: 12, color: 'var(--iris-semantic-label-alternative)' }}>토큰에서 컴포넌트까지 · 8분</span>
    </div>
  );
}

export default function CardPage() {
  const [va, setVa] = useState<'outlined' | 'elevated' | 'filled'>('outlined');
  const [th, setTh] = useState<'있음' | '없음'>('있음');
  return (
    <Page kicker="Components · Contents" title="Card" desc="콘텐츠 묶음 컨테이너입니다. 상단 16:9 썸네일 슬롯 + 본문 패딩 16, 링크 카드는 hover로 떠오릅니다.">
      <Section title="Playground">
        <Playground
          stage={<Card variant={va} interactive thumbnail={th === '있음' ? <span>16 : 9</span> : undefined} style={{ width: 220 }}><CardDemo /></Card>}
          panel={<>
            <Seg label="variant" value={va} options={['outlined', 'elevated', 'filled'] as const} onChange={setVa} />
            <Seg label="thumbnail" value={th} options={['있음', '없음'] as const} onChange={setTh} />
          </>}
 />
      </Section>
      <Section title="Variants" desc="Outlined = 경계선, Elevated = 그림자 + elevated 배경, Filled = alternative 배경.">
        <Canvas style={{ gap: 24 }}>
          <Spec label="outlined · 기본"><Card variant="outlined" style={{ width: 200 }}><CardDemo w={200} /></Card></Spec>
          <Spec label="elevated"><Card variant="elevated" style={{ width: 200 }}><CardDemo w={200} /></Card></Spec>
          <Spec label="filled"><Card variant="filled" style={{ width: 200 }}><CardDemo w={200} /></Card></Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="interactive 카드는 hover 시 -2px 떠오름 + 그림자. 올려보세요.">
        <Canvas style={{ gap: 24 }}>
          <Spec label="정적"><Card variant="outlined" style={{ width: 200 }}><CardDemo w={200} /></Card></Spec>
          <Spec label="인터랙티브 · hover"><Card variant="outlined" interactive style={{ width: 200 }}><CardDemo w={200} /></Card></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="아티클 그리드 — 같은 카드가 나란히 반복됩니다.">
        <Canvas style={{ gap: 16 }}>
          <Card variant="outlined" interactive thumbnail={<span>16 : 9</span>} style={{ width: 200 }}><CardDemo w={200} /></Card>
          <Card variant="outlined" interactive thumbnail={<span>16 : 9</span>} style={{ width: 200 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 168 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--iris-semantic-label-normal)' }}>토큰 네이밍 가이드</span>
              <span style={{ fontSize: 12, color: 'var(--iris-semantic-label-alternative)' }}>atomic → semantic · 5분</span>
            </div>
          </Card>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 본문 패딩 16, 청록 = 제목·메타 간격(px). 썸네일은 16:9 고정 비율.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <Card variant="outlined" thumbnail={<span style={{ fontSize: 11 }}>16 : 9</span>} style={{ width: 192 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--iris-semantic-label-normal)' }}>제목 body-1</span>
                    <span style={{ fontSize: 12, color: 'var(--iris-semantic-label-alternative)' }}>메타 caption-1</span>
                  </div>
                </Card>
                {/* 썸네일 0~108(16:9) · 본문 108~174: padT 108~124 · 제목 124~140 · gap 140~146 · 메타 146~158 · padB 158~174 */}
                <span className="size-zone pad" style={{ left: 16, right: 16, top: 108, height: 16 }}>16</span>
                <span className="size-zone pad" style={{ left: 0, top: 108, width: 16, height: 66 }} />
                <span className="size-zone pad" style={{ right: 0, top: 108, width: 16, height: 66 }} />
                <span className="size-num" style={{ left: -10, top: 138 }}>16</span>
                <span className="size-zone gap" style={{ left: 16, right: 16, top: 140, height: 6 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 139 }}>6</span>
                <span className="size-zone pad" style={{ left: 16, right: 16, top: 158, height: 16 }}>16</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>outlined · 썸네일 카드</b>
              <span className="sub">R 16 (radius-lg) · 본문 P 16 · 보더 1</span>
              <span className="sub">썸네일 16:9 · fill/normal 플레이스홀더</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['R 16', '본문 P 16', '썸네일 16:9', '내부 간격 자유']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="목록 진입용 요약" doBody="같은 아티클 — 썸네일 · 제목 · 메타 한 줄로 요약하고 상세는 눌러서."
          doEx={<Card variant="outlined" interactive thumbnail={<span>16 : 9</span>} style={{ width: 200 }}><CardDemo w={200} /></Card>}
          dontTitle="상세를 카드에 다 싣기" dontBody="같은 아티클의 본문 전체와 배지·버튼까지 넣으면 카드가 페이지가 됩니다."
          dontEx={<Card variant="outlined" style={{ width: 200 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--iris-semantic-label-neutral)' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--iris-semantic-label-normal)' }}>디자인 시스템 구축기</span>
              <span>토큰 설계부터 컴포넌트, 문서 사이트까지 전 과정을 다룹니다. 아토믹과 시멘틱을 나누고…</span>
              <span style={{ display: 'flex', gap: 4 }}><ContentBadge tone="info">기록</ContentBadge><ContentBadge tone="positive">완료</ContentBadge></span>
            </div>
          </Card>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Card" code={`<Card variant="${va}" interactive${th === '있음' ? ' thumbnail={<img ... />}' : ''}>...</Card>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['variant', "'outlined' | 'elevated' | 'filled'", "'outlined'", '컨테이너 스타일'],
          ['thumbnail', 'ReactNode', '—', '상단 16:9 미디어 슬롯'],
          ['interactive', 'boolean', 'false', 'hover 떠오름 + 포커스 (링크 카드)'],
          ['children', 'ReactNode', '—', '본문 (P 16 안에 렌더)'],
        ]} />
      </Section>
    </Page>
  );
}
