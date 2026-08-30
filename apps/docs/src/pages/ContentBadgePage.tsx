import { ContentBadge, Chip } from '@iris/react';
import { Page, Section, Canvas, Spec, DoDont, Props } from '../components/Doc';

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
