import { useState } from 'react';
import { Switch, Checkbox, ListCell } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

export default function SwitchPage() {
  const [st, setSt] = useState<'off' | 'on' | 'disabled'>('off');
  return (
    <Page kicker="Components · Selection & Input" title="Switch" desc="즉시 적용되는 on/off 설정 토글입니다. 52×32 고정, role=switch로 노출됩니다.">
      <Section title="Playground">
        <Playground
          stage={<Switch key={st} label="푸시 알림" defaultChecked={st === 'on'} disabled={st === 'disabled'} />}
          panel={<Seg label="state" value={st} options={['off', 'on', 'disabled'] as const} onChange={setSt} />}
 />
      </Section>
      <Section title="States">
        <Canvas>
          <Switch label="꺼짐" />
          <Switch label="켜짐" defaultChecked />
          <Switch label="비활성" disabled />
          <Switch label="비활성 · 켜짐" disabled defaultChecked />
        </Canvas>
      </Section>
      <Section title="Usage" desc="설정 리스트 — 셀 트레일링에 얹어 즉시 적용.">
        <Canvas col style={{ gap: 4 }}>
          <ListCell title="푸시 알림" description="새 소식을 바로 받아요" trailing={<Switch aria-label="푸시 알림" defaultChecked />} style={{ width: 320 }} />
          <ListCell title="이메일 요약" description="주 1회 모아서" trailing={<Switch aria-label="이메일 요약" />} style={{ width: 320 }} />
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 노브 인셋(px), 청록 = 트랙·라벨 간격(px). 트랙 52×32 안에 노브 28이 2px 인셋으로 들어갑니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.8)', lineHeight: 1 }}>
                <Switch label="푸시 알림" />
                {/* 트랙 52×32 · p2 · 노브 28(off, 좌측) · 간격 8 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 2, height: 32 }} />
                <span className="size-zone pad" style={{ left: 2, top: 0, width: 28, height: 2 }} />
                <span className="size-zone pad" style={{ left: 2, bottom: 0, width: 28, height: 2 }} />
                <span className="size-num" style={{ left: -9, top: 13 }}>2</span>
                <span className="size-num" style={{ left: 16, top: -11, transform: 'translateX(-50%)' }}>2</span>
                <span className="size-zone gap" style={{ left: 52, top: 0, width: 8, height: 32 }} />
                <span className="size-num gapnum" style={{ left: 56, top: -11, transform: 'translateX(-50%)' }}>8</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정 · Off</b>
              <span className="sub">트랙 52×32 · 노브 28 · 인셋 2 · R full</span>
              <span className="sub">라벨 body-2 · 간격 8</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />인셋&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['트랙 52×32', '노브 28 · 인셋 2', 'R full', 'G 8', 'On = primary/normal']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="즉시 반영되는 설정" doBody="누르는 순간 적용되고, 별도 저장이 없는 것."
          doEx={<Switch label="푸시 알림" defaultChecked />}
          dontTitle="제출이 필요한 동의" dontBody="폼과 함께 제출되는 선택은 Checkbox입니다."
          dontEx={<Checkbox label="약관에 동의합니다" />} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Switch" code={`<Switch label="푸시 알림"${st === 'on' ? ' defaultChecked' : ''}${st === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['label', 'ReactNode', '—', '옆 라벨'],
          ['checked / defaultChecked', 'boolean', '—', '표준 input 프로퍼티'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
