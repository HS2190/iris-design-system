import { useState } from 'react';
import { Radio, Select } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function RadioPage() {
  const [rd, setRd] = useState<'default' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Radio" desc="상호 배타 옵션 중 하나를 고릅니다. 같은 name으로 그룹을 만들고, 기본 선택값 하나를 권장합니다. 옵션 6개 이상이면 Select를 씁니다.">
      <Section title="Playground">
        <Playground
          stage={<div key={rd} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Radio name="pg" label="카드 결제" defaultChecked disabled={rd === 'disabled'} />
            <Radio name="pg" label="계좌 이체" disabled={rd === 'disabled'} />
            <Radio name="pg" label="간편 결제" disabled={rd === 'disabled'} />
          </div>}
          panel={<Seg label="state" value={rd} options={['default', 'disabled'] as const} onChange={setRd} />}
          code={`<Radio name="pay" label="카드 결제" defaultChecked${rd === 'disabled' ? ' disabled' : ''} />`} />
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
      <Section title="Size">
        <Canvas col>
          <Radio name="sz" label="카드 결제" defaultChecked />
          <Chips primary="고정" items={['원 20 · 보더 1.5', '도트 8', 'R full', '라벨 간격 8', 'body-2']} />
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
