import { useState } from 'react';
import { Popover, Button, Tooltip } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function PopoverPage() {
  const [show, setShow] = useState(true);
  const [ac, setAc] = useState<'있음' | '없음'>('있음');
  return (
    <Page kicker="Components · Presentation" title="Popover" desc="앵커에 붙는 작은 안내 오버레이입니다. 제목 + 두어 줄 + 액션 하나. 한 줄 힌트는 Tooltip, 자유 콘텐츠는 Popup.">
      <Section title="Playground" desc="버튼으로 여닫아 보세요.">
        <Playground
          stage={<div style={{ position: 'relative', paddingBottom: show ? 150 : 0 }}>
            <Button size="s" variant="outlined" color="assistive" onClick={() => setShow(v => !v)}>기능 안내 {show ? '닫기' : '열기'}</Button>
            {show && <Popover title="새로운 필터" style={{ position: 'absolute', top: 44, left: 0 }}
              action={ac === '있음' ? <Button size="s" onClick={() => setShow(false)}>확인</Button> : undefined}>
              직무·경력을 한 번에 걸 수 있어요.
            </Popover>}
          </div>}
          panel={<Seg label="action" value={ac} options={['있음', '없음'] as const} onChange={setAc} />}
          code={`<Popover title="새로운 필터"${ac === '있음' ? ' action={<Button size="s">확인</Button>}' : ''}>직무·경력을 한 번에 걸 수 있어요.</Popover>`} />
      </Section>
      <Section title="Variants">
        <Canvas style={{ gap: 32 }}>
          <Spec label="본문만"><Popover>필터는 상단에서 걸 수 있어요.</Popover></Spec>
          <Spec label="제목 + 본문"><Popover title="새로운 필터">직무·경력을 한 번에 걸 수 있어요.</Popover></Spec>
          <Spec label="+ 액션"><Popover title="새로운 필터" action={<Button size="s">확인</Button>}>직무·경력을 한 번에 걸 수 있어요.</Popover></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="새 기능 온보딩 — 앵커 아래 붙입니다.">
        <Canvas>
          <div style={{ position: 'relative', width: 320, height: 200 }}>
            <Button size="s" variant="outlined" color="assistive" leadingIcon="filter">필터</Button>
            <Popover title="새로운 필터" style={{ position: 'absolute', top: 44, left: 0 }} action={<Button size="s">확인</Button>}>
              직무·경력을 한 번에 걸 수 있어요.
            </Popover>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩 16, 청록 = 제목·본문 간격 8(px). 폭 260 고정.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <Popover title="새로운 필터">직무·경력을 한 번에 걸어요</Popover>
                {/* padT 16 · 제목 16~30 · G8 · 본문 38~60 (lh22) · padB 60~76 */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 16 }}>16</span>
                <span className="size-zone pad" style={{ left: 0, top: 16, width: 16, height: 44 }} />
                <span className="size-zone pad" style={{ right: 0, top: 16, width: 16, height: 44 }} />
                <span className="size-num" style={{ left: -10, top: 35 }}>16</span>
                <span className="size-zone gap" style={{ left: 16, right: 16, top: 30, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 30 }}>8</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 60, height: 16 }}>16</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <Popover title="새로운 필터" action={<Button size="s">확인</Button>}>직무·경력을 한 번에 걸어요</Popover>
                {/* 본문 38~60 · 액션 위 12 (60~72) · 버튼 34 (72~106) · padB 106~122 */}
                <span className="size-zone gap" style={{ left: 16, right: 16, top: 60, height: 12 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 62 }}>12</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 106, height: 16 }}>16</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>제목 + 본문 / + 액션</b>
              <span className="sub">W 260 · P 16 · R 12 · elevation medium</span>
              <span className="sub">제목 label-1 700 · 본문 body-2 · 간격 8 · 액션 위 12</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['W 260', 'P 16', 'G 8 · 액션 12', 'R 12', 'label-1 / body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="짧은 안내 + 액션 하나" doBody="같은 온보딩 — 두어 줄과 확인 버튼이면 충분합니다."
          doEx={<Popover title="새로운 필터" action={<Button size="s">확인</Button>} style={{ width: 230 }}>직무·경력을 한 번에 걸 수 있어요.</Popover>}
          dontTitle="한 줄 힌트에 팝오버" dontBody="같은 정보가 이름 한 줄이면 Tooltip이 맞습니다."
          dontEx={<div style={{ paddingTop: 40 }}><Tooltip open content="필터"><Button size="s" variant="outlined" color="assistive" leadingIcon="filter">필터</Button></Tooltip></div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '한 줄 요약'],
          ['children', 'ReactNode', '—', '본문 — 두어 줄'],
          ['action', 'ReactNode', '—', '하단 우측 액션 하나'],
        ]} />
      </Section>
    </Page>
  );
}
