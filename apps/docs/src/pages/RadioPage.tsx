import { useState } from 'react';
import { Radio, Select, Button } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function RadioPage() {
  const [rd, setRd] = useState<'default' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Radio" desc="상호 배타 옵션 중 하나를 고릅니다. 같은 name으로 그룹을 만들고, 기본 선택값 하나를 권장합니다. 옵션 6개 이상이면 Select를 씁니다.">
      <Section title="Playground">
        <Playground name="Radio"
          stage={<div key={rd} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Radio name="pg" label="카드 결제" defaultChecked disabled={rd === 'disabled'} />
            <Radio name="pg" label="계좌 이체" disabled={rd === 'disabled'} />
            <Radio name="pg" label="간편 결제" disabled={rd === 'disabled'} />
          </div>}
          panel={<Seg label="state" value={rd} options={['default', 'disabled'] as const} onChange={setRd} />}
          code={`<Radio name="pay" label="카드 결제" defaultChecked${rd === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="Variants" desc="시각 변형은 단일형 — 쓰임에 따라 배치만 달라집니다.">
        <Canvas style={{ gap: 40 }}>
          <Spec label="세로 그룹 · 기본">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Radio name="v1" label="카드 결제" defaultChecked />
              <Radio name="v1" label="계좌 이체" />
            </div>
          </Spec>
          <Spec label="가로 그룹 · 짧은 라벨 2~3개">
            <div style={{ display: 'flex', gap: 16 }}>
              <Radio name="v2" label="예" defaultChecked />
              <Radio name="v2" label="아니요" />
            </div>
          </Spec>
          <Spec label="라벨 없음 · 행 선택용 (aria-label 필수)">
            <Radio name="v3" aria-label="이 행 선택" defaultChecked />
          </Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="눌러보세요 — 같은 그룹에서 하나만 선택됩니다.">
        <Canvas col style={{ gap: 10 }}>
          <Radio name="pay" label="카드 결제" defaultChecked />
          <Radio name="pay" label="계좌 이체" />
          <Radio name="pay" label="간편 결제" />
          <Radio name="pay2" label="비활성" disabled />
          <Radio name="pay2" label="비활성 · 선택" disabled defaultChecked />
        </Canvas>
      </Section>
      <Section title="Usage" desc="결제 수단 선택 — 기본값 하나를 미리 선택해 둡니다.">
        <Canvas col>
          <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Radio name="upay" label="카드 결제" defaultChecked />
            <Radio name="upay" label="계좌 이체" />
            <Radio name="upay" label="간편 결제" />
            <Button style={{ width: '100%', marginTop: 6 }}>결제하기</Button>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 상하 여백, 청록 = 원·라벨 간격(px). 행 높이 28에 원 20이 가운데 정렬됩니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(2)', lineHeight: 1 }}>
                <Radio name="hero" label="카드 결제" defaultChecked />
                {/* 행 28 · 원 20(상하 4) · 간격 8 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 20, height: 4 }} />
                <span className="size-zone pad" style={{ left: 0, bottom: 0, width: 20, height: 4 }} />
                <span className="size-num" style={{ left: -10, top: 0 }}>4</span>
                <span className="size-num" style={{ left: -10, bottom: 0 }}>4</span>
                <span className="size-zone gap" style={{ left: 20, top: 0, width: 8, height: 28 }} />
                <span className="size-num gapnum" style={{ left: 24, top: -12, transform: 'translateX(-50%)' }}>8</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정 · Checked</b>
              <span className="sub">원 20 · 보더 1.5 · 도트 8 · R full</span>
              <span className="sub">라벨 body-2 · 간격 8 · 행 높이 28</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />여백&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['원 20 · 보더 1.5', '도트 8', 'R full', 'G 8', 'body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="2~5개 옵션이 한눈에" doBody="모든 옵션이 보여야 비교가 됩니다."
          doEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Radio name="d1" label="카드 결제" defaultChecked /><Radio name="d1" label="계좌 이체" /></div>}
          dontTitle="옵션 6개 이상" dontBody="목록이 길어지면 Select로 접습니다."
          dontEx={<Select options={[{ value: 'seoul', label: '서울' }]} placeholder="지역 선택 (17개 시·도)" style={{ width: 200 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['label', 'ReactNode', '—', '옆 라벨'],
          ['name', 'string', '—', '그룹 식별자 (같은 name = 한 그룹)'],
          ['checked / defaultChecked', 'boolean', '—', '표준 input 프로퍼티'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
