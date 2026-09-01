import { useState } from 'react';
import { PushBadge, Icon, Button } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function PushBadgePage() {
  const [v, setV] = useState<'dot' | '3' | '120'>('3');
  return (
    <Page kicker="Components · Feedback" title="Push badge" desc="미확인 알림 표시입니다. dot(존재만) 또는 카운트(수), 앵커 우상단에 얹습니다. 확인하면 사라지는 값만 담습니다.">
      <Section title="Playground">
        <Playground name="PushBadge"
          stage={<PushBadge count={v === 'dot' ? undefined : Number(v)}><Icon name="bell" /></PushBadge>}
          panel={<Seg label="value" value={v} options={['dot', '3', '120'] as const} onChange={setV} />}
          code={`<PushBadge${v === 'dot' ? '' : ` count={${v}}`}><Icon name="bell" /></PushBadge>`} />
      </Section>
      <Section title="Variants" desc="dot = 존재만 알림, count = 수가 의미 있을 때. 앵커 없이 단독도 가능.">
        <Canvas style={{ gap: 40 }}>
          <Spec label="dot"><PushBadge><Icon name="bell" /></PushBadge></Spec>
          <Spec label="count"><PushBadge count={3}><Icon name="bell" /></PushBadge></Spec>
          <Spec label="단독 (탭 라벨 옆)"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--iris-semantic-label-normal)' }}>알림 <PushBadge count={3} /></span></Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="0이면 렌더하지 않고, max(기본 99) 초과는 99+로 접습니다.">
        <Canvas style={{ gap: 40 }}>
          <Spec label="count 0 → 숨김"><PushBadge count={0}><Icon name="bell" /></PushBadge></Spec>
          <Spec label="99 이하 그대로"><PushBadge count={99}><Icon name="bell" /></PushBadge></Spec>
          <Spec label="초과 → 99+"><PushBadge count={120}><Icon name="bell" /></PushBadge></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="하단 탭 바 — 미확인이 있는 탭에만 얹습니다.">
        <Canvas>
          <div style={{ display: 'flex', gap: 44, padding: '10px 24px', borderRadius: 12, background: 'var(--iris-semantic-background-elevated-normal)', color: 'var(--iris-semantic-label-alternative)' }}>
            <Icon name="home" />
            <Icon name="search" />
            <PushBadge count={3}><Icon name="bell" style={{ color: 'var(--iris-semantic-label-normal)' }} /></PushBadge>
            <Icon name="user" />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 앵커 밖 오프셋 4(px). 카운트 최소 16 · dot 6.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(3)', lineHeight: 1 }}>
                <PushBadge count={3}><Icon name="bell" /></PushBadge>
                {/* 앵커 24 · 뱃지 16, top/right -4 → 밖으로 4 돌출 */}
                <span className="size-zone pad" style={{ right: -4, top: -4, width: 4, height: 16 }} />
                <span className="size-zone pad" style={{ right: 0, top: -4, width: 12, height: 4 }} />
                <span className="size-num" style={{ right: -14, top: 2 }}>4</span>
                <span className="size-num" style={{ right: -16, top: 13 }}>16</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>count · 앵커</b>
              <span className="sub">카운트 H 16 · min-W 16 · P 0 4 · caption-2 700</span>
              <span className="sub">dot 6 · 앵커 우상단 오프셋 -4 · status/negative</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />오프셋&nbsp;&nbsp;· px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="count" items={['H 16 · min-W 16', 'P 0 4', 'caption-2', 'R full']} />
            </div>
            <div className="size-item">
              <Chips primary="dot" items={['6 × 6', '오프셋 0', 'R full']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="미확인 수만" doBody="같은 알림 아이콘 — 확인하면 사라지는 수를 담아야 '봐야 할 것'이 됩니다."
          doEx={<PushBadge count={3}><Icon name="bell" /></PushBadge>}
          dontTitle="전체 개수를 상시 노출" dontBody="같은 아이콘에 총량을 붙이면 영원히 99+ — 신호가 죽습니다."
          dontEx={<PushBadge count={4096}><Icon name="bell" /></PushBadge>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['count', 'number', '—', '미확인 수 — 0이면 숨김, 생략하면 dot'],
          ['max', 'number', '99', "초과 시 'N+'"],
          ['children', 'ReactNode', '—', '앵커 요소 — 있으면 우상단 -4에 얹힘'],
        ]} />
      </Section>
    </Page>
  );
}
