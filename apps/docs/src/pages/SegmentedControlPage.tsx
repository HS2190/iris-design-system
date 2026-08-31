import { useState } from 'react';
import { SegmentedControl, Chip, SectionHeader, ListCell, Icon } from '@iris/react';
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
      <Section title="States">
        <Canvas col style={{ gap: 16 }}>
          <SegmentedControl options={['전체', '진행 중', '완료'] as const} value="전체" onChange={() => {}} aria-label="기본" />
          <SegmentedControl options={['전체', '진행 중', '완료'] as const} value="전체" onChange={() => {}} disabled aria-label="비활성" />
        </Canvas>
      </Section>
      <Section title="Usage" desc="섹션 헤더 아래에서 같은 데이터의 보기를 전환합니다.">
        <Canvas col style={{ gap: 8 }}>
          <div style={{ width: 340 }}>
            <SectionHeader title="내 작업" />
            <SegmentedControl options={['전체', '진행 중'] as const} value="전체" onChange={() => {}} aria-label="보기" />
            <div style={{ marginTop: 8 }}>
              <ListCell title="디자인 시스템 문서" description="오늘" trailing={<Icon name="chevron-right" size={20} />} />
              <ListCell title="포트폴리오 개편" description="어제" trailing={<Icon name="chevron-right" size={20} />} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 트랙 패딩 4(px). 높이 40 트랙 안에 32 세그먼트, 세그 사이 2.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.6)', lineHeight: 1 }}>
                <SegmentedControl options={['리스트', '캘린더'] as const} value="리스트" onChange={() => {}} aria-label="크기 예시" />
                <span className="size-zone pad" style={{ left: 0, top: 4, width: 4, bottom: 4 }} />
                <span className="size-zone pad" style={{ right: 0, top: 4, width: 4, bottom: 4 }} />
                <span className="size-zone pad" style={{ left: 4, right: 4, top: 0, height: 4 }} />
                <span className="size-zone pad" style={{ left: 4, right: 4, bottom: 0, height: 4 }} />
                <span className="size-num" style={{ left: -9, top: 16 }}>4</span>
                <span className="size-num" style={{ left: 24, top: -11, transform: 'translateX(-50%)' }}>4</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정</b>
              <span className="sub">트랙 H 40 · P 4 · R 10</span>
              <span className="sub">세그먼트 H 32 · P 12 · R 8 · 세그 간 2 · label-1</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />트랙 패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['H 40', '트랙 P 4', '세그 H 32 · R 8', '세그 간 2', 'label-1']} />
            </div>
          </div>
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
