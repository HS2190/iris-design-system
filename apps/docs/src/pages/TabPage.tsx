import { useState } from 'react';
import { Tabs, SegmentedControl, ListCell, Icon } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const cats = ['전체', '디자인', '개발', '마케팅'] as const;

export default function TabPage() {
  const [tab, setTab] = useState<(typeof cats)[number]>('전체');
  const [mode, setMode] = useState<'기본' | 'fluid'>('기본');
  return (
    <Page kicker="Components · Navigations" title="Tab" desc="콘텐츠 분류를 전환합니다. 높이 44 · 밑줄 인디케이터 2, 4개 이상이면 가로 스크롤. 2~3개 보기 전환은 Segmented control.">
      <Section title="Playground" desc="눌러보세요.">
        <Playground
          stage={<Tabs items={cats} value={tab} onChange={setTab} fluid={mode === 'fluid'} style={{ width: 340 }} />}
          panel={<Seg label="layout" value={mode} options={['기본', 'fluid'] as const} onChange={setMode} />}
          code={`<Tabs items={['전체', ...]} value="${tab}" onChange={setTab}${mode === 'fluid' ? ' fluid' : ''} />`} />
      </Section>
      <Section title="Variants" desc="기본 = 내용 폭 + 간격 20, fluid = 균등 분할.">
        <Canvas col style={{ gap: 16 }}>
          <Tabs items={cats} value="전체" onChange={() => {}} style={{ width: 360 }} />
          <Tabs items={['홈', '탐색', '보관함'] as const} value="홈" onChange={() => {}} fluid style={{ width: 360 }} />
        </Canvas>
      </Section>
      <Section title="States" desc="선택 = label-normal 700 + 인디케이터. 넘치면 가로 스크롤.">
        <Canvas col>
          <Tabs items={['전체', '디자인', '개발', '마케팅', '기획', '데이터', '채용'] as const} value="디자인" onChange={() => {}} style={{ width: 320 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="탭 아래 목록이 바로 이어집니다.">
        <Canvas col style={{ gap: 0 }}>
          <div style={{ width: 360 }}>
            <Tabs items={cats} value="디자인" onChange={() => {}} />
            <ListCell title="Iris 컴포넌트 문서" description="디자인 시스템" trailing={<Icon name="chevron-right" size={20} />} />
            <ListCell title="포트폴리오 리뉴얼" description="개인 작업" trailing={<Icon name="chevron-right" size={20} />} />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 탭 간격(px). 높이 44 · 인디케이터 2 · 아이템 패딩 4.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <Tabs items={['전체', '팔로잉'] as const} value="전체" onChange={() => {}} style={{ width: 200 }} />
                {/* 아이템1 '전체' = P4 + 30 + P4 = 38 · 간격 20 (38~58) · H 44 · 인디케이터 2 */}
                <span className="size-zone gap" style={{ left: 38, top: 0, width: 20, height: 44 }} />
                <span className="size-num gapnum" style={{ left: 48, top: -12, transform: 'translateX(-50%)' }}>20</span>
                <span className="size-num" style={{ left: -24, top: 20 }}>44</span>
                <span className="size-num" style={{ left: 19, top: 46, transform: 'translateX(-50%)' }}>2</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · 선택됨</b>
              <span className="sub">H 44 · 탭 간격 20 · 아이템 P 4 · body-2</span>
              <span className="sub">인디케이터 2 (primary/normal) · 하단 보더 1</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['H 44', 'G 20', '아이템 P 4', '인디케이터 2', 'body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="콘텐츠 분류 전환" doBody="같은 목록 — 분류가 4개 이상으로 늘 수 있으면 Tab."
          doEx={<Tabs items={cats} value="디자인" onChange={() => {}} style={{ width: 280 }} />}
          dontTitle="2개 보기 전환에 탭" dontBody="같은 데이터의 2~3개 짧은 보기 전환은 Segmented control이 맞습니다."
          dontEx={<SegmentedControl options={['리스트', '캘린더'] as const} value="리스트" onChange={() => {}} aria-label="보기" />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['items', 'readonly string[]', '—', '탭 목록 — 넘치면 가로 스크롤'],
          ['value / onChange', 'T · (v: T) => void', '—', '선택 탭 (aria-selected)'],
          ['labels', 'Record<T, string>', '—', '값과 다른 표시 라벨'],
          ['fluid', 'boolean', 'false', '탭 폭 균등 분할'],
        ]} />
      </Section>
    </Page>
  );
}
