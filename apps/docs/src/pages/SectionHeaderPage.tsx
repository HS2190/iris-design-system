import { useState } from 'react';
import { SectionHeader, ListCell, Icon } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const more = <>더보기<Icon name="chevron-right" size={16} /></>;

export default function SectionHeaderPage() {
  const [ac, setAc] = useState<'없음' | '더보기'>('더보기');
  const [de, setDe] = useState<'없음' | '있음'>('없음');
  return (
    <Page kicker="Components · Contents" title="Section header" desc="섹션 제목 행입니다. 제목 + 선택적 설명, 우측 '더보기' 액션. 아래 콘텐츠(리스트·카드)와 한 묶음으로 씁니다.">
      <Section title="Playground">
        <Playground
          stage={<SectionHeader title="최근 프로젝트" description={de === '있음' ? '최근 7일 작업' : undefined}
            action={ac === '더보기' ? more : undefined} style={{ width: 320 }} />}
          panel={<>
            <Seg label="action" value={ac} options={['없음', '더보기'] as const} onChange={setAc} />
            <Seg label="description" value={de} options={['없음', '있음'] as const} onChange={setDe} />
          </>}
          code={`<SectionHeader title="최근 프로젝트"${de === '있음' ? ' description="최근 7일 작업"' : ''}${ac === '더보기' ? ' action={<>더보기<Icon name="chevron-right" /></>}' : ''} />`} />
      </Section>
      <Section title="Variants">
        <Canvas col style={{ gap: 12 }}>
          <div style={{ width: 340 }}><SectionHeader title="타이틀만" /></div>
          <div style={{ width: 340 }}><SectionHeader title="더보기 액션" action={more} /></div>
          <div style={{ width: 340 }}><SectionHeader title="설명 포함" description="보조 설명은 caption-1" action={more} /></div>
        </Canvas>
      </Section>
      <Section title="Usage" desc="헤더는 단독이 아니라 콘텐츠 위에 얹습니다.">
        <Canvas col>
          <div style={{ width: 360 }}>
            <SectionHeader title="알림" action={more} />
            <ListCell title="새 댓글 3개" description="디자인 시스템 문서" trailing={<Icon name="chevron-right" size={20} />} />
            <ListCell title="리뷰 요청" description="Button 컴포넌트 PR" trailing={<Icon name="chevron-right" size={20} />} />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 상하 패딩(px). 제목 heading-2 18 · 액션은 하단 정렬.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.6)', lineHeight: 1 }}>
                <SectionHeader title="최근 프로젝트" action={more} style={{ width: 260 }} />
                {/* padT 0~16 · 제목 16~34 (18) · padB 34~42 */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 16 }}>16</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, bottom: 0, height: 8 }}>8</span>
                <span className="size-num" style={{ left: -24, top: 21 }}>18</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · 더보기</b>
              <span className="sub">패딩 상 16 · 하 8 · 제목 heading-2 18 700</span>
              <span className="sub">액션 label-1 primary · 하단 정렬 · 간격 12</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['P 상 16 · 하 8', '제목 18 (heading-2)', '액션 label-1', 'G 12']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="액션은 하나만" doBody="같은 섹션 — 우측엔 대표 액션(더보기) 하나."
          doEx={<div style={{ width: 260 }}><SectionHeader title="알림" action={more} /></div>}
          dontTitle="액션 여러 개" dontBody="같은 섹션에 더보기·설정·새로고침을 다 걸면 제목 행이 툴바가 됩니다."
          dontEx={<div style={{ width: 260 }}><SectionHeader title="알림" action={<><Icon name="settings" size={16} />설정 · 새로고침 · {more}</>} /></div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '섹션 제목 (필수)'],
          ['description', 'ReactNode', '—', '보조 설명'],
          ['action', 'ReactNode', '—', "우측 액션 — '더보기' 등 하나만"],
        ]} />
      </Section>
    </Page>
  );
}
