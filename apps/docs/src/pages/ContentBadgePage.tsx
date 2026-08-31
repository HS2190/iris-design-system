import { ContentBadge, Chip } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, DoDont, Props } from '../components/Doc';

const tones = ['neutral', 'info', 'positive', 'cautionary', 'negative'] as const;

export default function ContentBadgePage() {
  return (
    <Page kicker="Components · Contents" title="Content badge" desc="콘텐츠의 상태·분류를 짧게 표시하는 읽기 전용 뱃지입니다. Tone은 status/* 토큰과 1:1로 매핑됩니다.">
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
              {/* 배지 44×20을 4배 확대, 수치 오버레이는 비확대 → 존 안에 그대로 표기 */}
              <div style={{ position: 'relative', width: 176, height: 80 }}>
                <div style={{ transform: 'scale(4)', transformOrigin: 'top left', position: 'absolute', inset: 0 }}>
                  <ContentBadge tone="info" variant="subtle" style={{ width: 44, justifyContent: 'center' }}>안내</ContentBadge>
                  <span className="size-zone pad" style={{ left: 0, top: 0, width: 8, height: 20 }} />
                  <span className="size-zone pad" style={{ right: 0, top: 0, width: 8, height: 20 }} />
                  <span className="size-zone pad" style={{ left: 8, right: 8, top: 0, height: 2 }} />
                  <span className="size-zone pad" style={{ left: 8, right: 8, bottom: 0, height: 2 }} />
                </div>
                <span className="size-num-in" style={{ left: 0, top: 0, width: 32, height: 80 }}>8</span>
                <span className="size-num-in" style={{ right: 0, top: 0, width: 32, height: 80 }}>8</span>
                <span className="size-num-in" style={{ left: 32, right: 32, top: 0, height: 8 }}>2</span>
                <span className="size-num-in" style={{ left: 32, right: 32, bottom: 0, height: 8 }}>2</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>단일 크기</b>
              <span className="sub">높이 20 · radius-xs 8 · caption-1 500</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><div className="size-slot" style={{ height: 20 }}><ContentBadge tone="positive">완료</ContentBadge></div><Chips primary="기본" items={['H 20', 'P 8', 'R 8', 'caption-1']} /></div>
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
