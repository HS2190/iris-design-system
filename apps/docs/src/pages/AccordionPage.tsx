import { useState } from 'react';
import { Accordion } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const faq = [
  { id: 'a', title: '배송은 얼마나 걸리나요?', content: '평일 오후 2시 이전 주문은 당일 출고되며, 보통 1~2일 안에 도착합니다.' },
  { id: 'b', title: '교환·환불은 어떻게 하나요?', content: '수령 후 7일 안에 주문 내역에서 신청할 수 있어요. 왕복 배송비는 사유에 따라 다릅니다.' },
  { id: 'c', title: '해외 배송도 되나요?', content: '현재는 국내 배송만 지원합니다.' },
];

export default function AccordionPage() {
  const [mode, setMode] = useState<'단일' | '복수'>('단일');
  return (
    <Page kicker="Components · Contents" title="Accordion" desc="접고 펼치는 목록입니다. 헤더 56 고정, 단일/복수 확장을 선택할 수 있고 aria-expanded로 노출됩니다.">
      <Section title="Playground" desc="눌러서 펼쳐보세요.">
        <Playground
          stage={<Accordion key={mode} items={faq} multiple={mode === '복수'} defaultOpen={['a']} style={{ width: 340 }} />}
          panel={<Seg label="expand" value={mode} options={['단일', '복수'] as const} onChange={setMode} />}
          code={`<Accordion items={faq}${mode === '복수' ? ' multiple' : ''} defaultOpen={['a']} />`} />
      </Section>
      <Section title="States" desc="펼침 · 접힘 · 비활성 항목.">
        <Canvas col>
          <Accordion style={{ width: 340 }} defaultOpen={['open']} items={[
            { id: 'open', title: '펼쳐진 항목', content: '콘텐츠는 하단 패딩 16 안에 들어갑니다.' },
            { id: 'closed', title: '접힌 항목', content: '눌러서 펼칩니다.' },
            { id: 'off', title: '비활성 항목', content: '열리지 않습니다.', disabled: true },
          ]} />
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩(px). 헤더 56 고정, 콘텐츠는 좌우·하단 16.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.4)', lineHeight: 1 }}>
                <Accordion style={{ width: 250 }} defaultOpen={['x']} items={[{ id: 'x', title: '헤더 56', content: '콘텐츠 영역' }]} />
                {/* 헤더 0~56 · 콘텐츠 56~71 · padB 71~87 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 16, height: 87 }}>16</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 16, height: 87 }}>16</span>
                <span className="size-zone pad" style={{ left: 16, right: 16, top: 71, height: 16 }}>16</span>
                <span className="size-num" style={{ left: -24, top: 26 }}>56</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>펼침 · 1항목</b>
              <span className="sub">헤더 min-H 56 · P 좌우 16 · 셰브론 20</span>
              <span className="sub">콘텐츠 P 좌우·하 16 · body-2 · 항목 간 구분선 1</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><Accordion style={{ width: 300 }} items={[{ id: 'r', title: '헤더', content: '콘텐츠' }]} /></div>
              <Chips primary="고정" items={['헤더 H 56', 'P 16', '콘텐츠 P 16', '구분선 1', 'body-1 / body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="질문은 짧게, 답은 안에" doBody="같은 FAQ — 제목은 한 줄 질문, 내용은 펼쳐서."
          doEx={<Accordion style={{ width: 260 }} items={[{ id: 'd1', title: '배송은 얼마나 걸리나요?', content: '1~2일 안에 도착합니다.' }]} />}
          dontTitle="제목에 답까지" dontBody="같은 FAQ의 답을 제목에 요약하면 펼칠 이유가 없어지고 행이 길어집니다."
          dontEx={<Accordion style={{ width: 260 }} items={[{ id: 'd2', title: '배송은 얼마나 걸리나요? (1~2일, 당일 출고)', content: '…' }]} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['items', '{ id, title, content, disabled? }[]', '—', '항목 배열'],
          ['multiple', 'boolean', 'false', '여러 항목 동시 확장'],
          ['defaultOpen', 'string[]', '[]', '초기 확장 id'],
        ]} />
      </Section>
    </Page>
  );
}
