import { useState } from 'react';
import { IconButton, Tooltip, Button } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

export default function IconButtonPage() {
  const [sz, setSz] = useState<'l' | 'm' | 's'>('m');
  const [va, setVa] = useState<'plain' | 'outlined'>('plain');
  return (
    <Page kicker="Components · Actions" title="Icon button" desc="아이콘 전용 버튼입니다. 라벨이 없으므로 aria-label이 필수이고, 뜻이 모호하면 Tooltip을 얹습니다.">
      <Section title="Playground">
        <Playground
          stage={<IconButton icon="share" aria-label="공유" size={sz} variant={va} />}
          panel={<>
            <Seg label="size" value={sz} options={['l', 'm', 's'] as const} onChange={setSz} />
            <Seg label="variant" value={va} options={['plain', 'outlined'] as const} onChange={setVa} />
          </>}
 />
      </Section>
      <Section title="Variants" desc="Plain = 나브·툴바 안, Outlined = 단독 배치.">
        <Canvas style={{ gap: 32 }}>
          <Spec label="plain"><IconButton icon="bell" aria-label="알림" /></Spec>
          <Spec label="outlined"><IconButton icon="share" aria-label="공유" variant="outlined" /></Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="hover · pressed · 비활성.">
        <Canvas style={{ gap: 24 }}>
          <IconButton icon="edit" aria-label="편집" />
          <IconButton icon="edit" aria-label="편집" disabled />
        </Canvas>
      </Section>
      <Section title="Usage" desc="Tooltip과 짝 — 이름 힌트를 얹습니다.">
        <Canvas style={{ paddingTop: 48 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Tooltip content="공유"><IconButton icon="share" aria-label="공유" variant="outlined" /></Tooltip>
            <Tooltip open content="편집"><IconButton icon="edit" aria-label="편집" variant="outlined" /></Tooltip>
            <Tooltip content="삭제"><IconButton icon="trash" aria-label="삭제" variant="outlined" /></Tooltip>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 아이콘 여백(px). 정사각 3단계 — 터치 타깃은 touch-target-min 기준.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(2)', lineHeight: 1 }}>
                <IconButton icon="share" aria-label="공유" variant="outlined" />
                {/* M 40 · 아이콘 24 중앙 → 여백 8 */}
                <span className="size-zone pad" style={{ left: 0, top: 8, width: 8, height: 24 }} />
                <span className="size-zone pad" style={{ left: 8, top: 0, width: 24, height: 8 }} />
                <span className="size-num" style={{ left: -10, top: 17 }}>8</span>
                <span className="size-num" style={{ left: 20, top: -11, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-num" style={{ right: -24, top: 15 }}>40</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>M · outlined</b>
              <span className="sub">L 48 · M 40 (아이콘 24) · S 32 (아이콘 20)</span>
              <span className="sub">R 10 (S는 8) · 여백 = (크기−아이콘)/2</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />여백 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="L" items={['48', '아이콘 24', 'R 10']} /></div>
            <div className="size-item"><Chips primary="M" items={['40 · 기본', '아이콘 24', 'R 10']} /></div>
            <div className="size-item"><Chips primary="S" items={['32', '아이콘 20', 'R 8']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="자명한 아이콘 + aria-label" doBody="같은 공유 버튼 — 통용되는 아이콘만 단독으로, 이름은 항상 코드에."
          doEx={<IconButton icon="share" aria-label="공유" variant="outlined" />}
          dontTitle="모호한 행동을 아이콘만으로" dontBody="같은 행동인데 해석이 갈리면 라벨 있는 버튼이 맞습니다."
          dontEx={<Button size="s" variant="outlined" color="assistive" leadingIcon="share">공유</Button>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="IconButton" code={`<IconButton icon="share" aria-label="공유" size="${sz}"${va === 'outlined' ? ' variant="outlined"' : ''} />`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['icon', 'IconName', '—', '아이콘 (필수)'],
          ['aria-label', 'string', '—', '이름 (필수) — 타입으로 강제'],
          ['size', "'l' | 'm' | 's'", "'m'", '48 / 40 / 32'],
          ['variant', "'plain' | 'outlined'", "'plain'", '투명 / 보더'],
        ]} />
      </Section>
    </Page>
  );
}
