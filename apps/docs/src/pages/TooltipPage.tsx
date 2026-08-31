import { useState } from 'react';
import { Tooltip, Button, Icon, Popover } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function TooltipPage() {
  const [pl, setPl] = useState<'top' | 'bottom'>('top');
  return (
    <Page kicker="Components · Presentation" title="Tooltip" desc="hover·focus에 뜨는 한 줄 힌트입니다. 오프셋 8 · caption-1. 필수 정보는 담지 않습니다 — 못 보는 사용자가 있습니다.">
      <Section title="Playground" desc="버튼에 마우스를 올리거나 Tab으로 포커스해 보세요.">
        <Playground
          stage={<div style={{ padding: '48px 0' }}><Tooltip content="변경 사항 저장" placement={pl}><Button size="s" variant="outlined" color="assistive">저장</Button></Tooltip></div>}
          panel={<Seg label="placement" value={pl} options={['top', 'bottom'] as const} onChange={setPl} />}
          code={`<Tooltip content="변경 사항 저장" placement="${pl}"><Button>저장</Button></Tooltip>`} />
      </Section>
      <Section title="Variants" desc="위/아래 배치. open으로 강제 표시(제어)도 가능합니다.">
        <Canvas style={{ gap: 56, paddingTop: 56, paddingBottom: 56 }}>
          <Spec label="top · 기본"><Tooltip open content="위에 표시" placement="top"><Button size="s" variant="outlined" color="assistive">앵커</Button></Tooltip></Spec>
          <Spec label="bottom"><Tooltip open content="아래에 표시" placement="bottom"><Button size="s" variant="outlined" color="assistive">앵커</Button></Tooltip></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="라벨 없는 아이콘 버튼의 이름 힌트가 대표 용도입니다.">
        <Canvas style={{ paddingTop: 56 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {([['share', '공유'], ['edit', '편집'], ['trash', '삭제']] as const).map(([ic, lb]) => (
              <Tooltip key={ic} content={lb} open={ic === 'edit'}>
                <button aria-label={lb} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--iris-semantic-line-solid-neutral)', background: 'none', borderRadius: 10, color: 'var(--iris-semantic-label-neutral)', cursor: 'pointer' }}>
                  <Icon name={ic} size={20} />
                </button>
              </Tooltip>
            ))}
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 앵커와의 오프셋 8(px). 팁 P 6 · 10, caption-1 한 줄.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero" style={{ paddingTop: 76 }}>
              <div className="stage" style={{ transform: 'scale(1.8)', lineHeight: 1 }}>
                <Tooltip open content="변경 사항 저장"><Button size="s" variant="outlined" color="assistive">저장</Button></Tooltip>
                {/* 팁 H 24 (y -32~-8) · 오프셋 8 (-8~0) · 앵커 34 */}
                <span className="size-zone gap" style={{ left: 0, right: 0, top: -8, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: -9 }}>8</span>
                <span className="size-num" style={{ left: -24, top: -22 }}>24</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>top · 강제 표시</b>
              <span className="sub">팁 H 24 · P 6 · 10 · R 8 · caption-1 한 줄</span>
              <span className="sub">앵커 오프셋 8 · inverse 배경 · 앵커 중앙 정렬</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['H 24', 'P 6 · 10', '오프셋 8', 'R 8', 'caption-1']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="이름 힌트 한 줄" doBody="같은 정보 — 아이콘의 이름을 짧게. 없어도 되는 보조 정보만."
          doEx={<div style={{ paddingTop: 40 }}><Tooltip open content="공유"><Button size="s" variant="outlined" color="assistive" leadingIcon="share">공유</Button></Tooltip></div>}
          dontTitle="설명·액션을 툴팁에" dontBody="같은 안내가 길거나 눌러야 한다면 Popover입니다."
          dontEx={<Popover title="공유하기" action={<Button size="s">링크 복사</Button>} style={{ width: 220 }}>링크를 아는 모두가 볼 수 있어요.</Popover>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['content', 'ReactNode', '—', '한 줄 힌트 (필수)'],
          ['placement', "'top' | 'bottom'", "'top'", '앵커 기준 위치'],
          ['open', 'boolean', '—', '강제 표시 — 기본은 hover/focus 자동'],
          ['children', 'ReactNode', '—', '앵커 요소'],
        ]} />
      </Section>
    </Page>
  );
}
