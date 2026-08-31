import { useState } from 'react';
import { ContentBadge, Chip } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const tones = ['neutral', 'info', 'positive', 'cautionary', 'negative'] as const;

export default function ContentBadgePage() {
  const [tone, setTone] = useState<(typeof tones)[number]>('info');
  const [variant, setVariant] = useState<'subtle' | 'solid'>('subtle');
  return (
    <Page kicker="Components · Contents" title="Content badge" desc="콘텐츠의 상태·분류를 짧게 표시하는 읽기 전용 뱃지입니다. Tone은 status/* 토큰과 1:1로 매핑됩니다.">
      <Section title="Playground">
        <Playground
          stage={<ContentBadge tone={tone} variant={variant}>안내</ContentBadge>}
          panel={<>
            <Seg label="tone" value={tone} options={tones} onChange={setTone} />
            <Seg label="variant" value={variant} options={['subtle', 'solid'] as const} onChange={setVariant} />
          </>}
          code={`<ContentBadge tone="${tone}"${variant === 'solid' ? ' variant="solid"' : ''}>안내</ContentBadge>`} />
      </Section>
      <Section title="Variants" desc="Solid = status 채움 + 흰 글자, Subtle = 8% 틴트 + status 글자.">
        <Canvas col style={{ gap: 14 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tones.map(t => <ContentBadge key={t} tone={t} variant="solid">{t}</ContentBadge>)}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tones.map(t => <ContentBadge key={t} tone={t} variant="subtle">{t}</ContentBadge>)}
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="단일 크기. 주황 = 패딩(px).">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              {/* 배지 44×20을 2.5배 — 칩 히어로와 비슷한 체급. 상하 2px 밴드 수치는 바로 밖에 */}
              <div style={{ position: 'relative', width: 110, height: 50 }}>
                <div style={{ transform: 'scale(2.5)', transformOrigin: 'top left', position: 'absolute', left: 0, top: 0, width: 44, height: 20 }}>
                  <ContentBadge tone="info" variant="subtle" style={{ position: 'absolute', inset: 0, justifyContent: 'center' }}>안내</ContentBadge>
                  <span className="size-zone pad" style={{ left: 0, top: 0, width: 8, height: 20 }} />
                  <span className="size-zone pad" style={{ right: 0, top: 0, width: 8, height: 20 }} />
                  <span className="size-zone pad" style={{ left: 8, right: 8, top: 0, height: 2 }} />
                  <span className="size-zone pad" style={{ left: 8, right: 8, bottom: 0, height: 2 }} />
                </div>
                <span className="size-num-in" style={{ left: 0, top: 0, width: 20, height: 50 }}>8</span>
                <span className="size-num-in" style={{ right: 0, top: 0, width: 20, height: 50 }}>8</span>
                <span className="size-num-in" style={{ left: 20, right: 20, top: -13, height: 10 }}>2</span>
                <span className="size-num-in" style={{ left: 20, right: 20, bottom: -13, height: 10 }}>2</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>단일 크기</b>
              <span className="sub">높이 20 · radius-xs 8 · caption-1 500</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="기본" items={['H 20', 'P 8', 'R 8', 'caption-1']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="Usage" desc="근거 등급·진행 상태처럼 읽기만 하는 정보에 씁니다.">
        <Canvas>
          <Spec label="목록 항목 상태"><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>디자인 시스템 v3 <ContentBadge tone="positive">완료</ContentBadge></span></Spec>
          <Spec label="근거 등급"><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>~6.5초 <ContentBadge tone="cautionary">가설</ContentBadge></span></Spec>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="읽기 전용 상태 표시" doBody="완료·진행·보류 같은 상태, 분류 라벨." doEx={<><ContentBadge tone="positive">완료</ContentBadge><ContentBadge tone="cautionary" variant="solid">진행 중</ContentBadge></>}
          dontTitle="클릭되는 필터" dontBody="누르면 상태가 바뀌는 값은 Chip입니다." dontEx={<><Chip size="s" selected>디자인</Chip><Chip size="s">개발</Chip></>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['tone', "'neutral' | 'info' | 'positive' | 'cautionary' | 'negative'", "'neutral'", 'status/* 토큰 매핑'],
          ['variant', "'solid' | 'subtle'", "'subtle'", '채움 / 틴트'],
        ]} />
      </Section>
    </Page>
  );
}
