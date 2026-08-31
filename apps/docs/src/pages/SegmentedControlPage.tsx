import { useState } from 'react';
import { SegmentedControl, Chip } from '@iris/react';
import { Page, Section, Canvas, Chips, DoDont, Props } from '../components/Doc';

export default function SegmentedControlPage() {
  const [view, setView] = useState<'전체' | '진행 중' | '완료'>('전체');
  return (
    <Page kicker="Components · Selection & Input" title="Segmented control" desc="같은 데이터의 보기(view)를 즉시 전환합니다. 2~3개 짧은 라벨 전용 — 4개 이상이면 Tab이나 Select입니다.">
      <Section title="Playground" desc="실제로 전환됩니다.">
        <Canvas col style={{ gap: 16 }}>
          <SegmentedControl options={['전체', '진행 중', '완료'] as const} value={view} onChange={setView} aria-label="보기 전환" />
          <p style={{ margin: 0, color: 'var(--iris-semantic-label-neutral)', fontSize: 14 }}>현재 보기: <b>{view}</b></p>
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <SegmentedControl options={['리스트', '캘린더'] as const} value="리스트" onChange={() => {}} aria-label="예시" />
          <Chips primary="고정" items={['H 40', '트랙 P 4', '세그먼트 H 32 · R 8', 'label-1']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="보기 전환" doBody="리스트↔캘린더처럼 같은 데이터를 다르게 보여줄 때."
          doEx={<SegmentedControl options={['리스트', '캘린더'] as const} value="리스트" onChange={() => {}} aria-label="do" />}
          dontTitle="다중 선택 필터" dontBody="여러 개를 고르는 값은 Chip 그룹입니다."
          dontEx={<><Chip size="s" selected>디자인</Chip><Chip size="s" selected>개발</Chip></>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['options', 'readonly string[]', '—', '2~3개 권장'],
          ['value / onChange', 'T · (v: T) => void', '—', '제어 컴포넌트'],
          ['labels', 'Record<T, string>', '—', '값과 다른 표시 라벨'],
          ['disabled', 'boolean', 'false', '전체 비활성'],
        ]} />
      </Section>
    </Page>
  );
}
