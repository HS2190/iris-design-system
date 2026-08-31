import { useState } from 'react';
import { Switch, Checkbox } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function SwitchPage() {
  const [st, setSt] = useState<'off' | 'on' | 'disabled'>('off');
  return (
    <Page kicker="Components · Selection & Input" title="Switch" desc="즉시 적용되는 on/off 설정 토글입니다. 52×32 고정, role=switch로 노출됩니다.">
      <Section title="Playground">
        <Playground
          stage={<Switch key={st} label="푸시 알림" defaultChecked={st === 'on'} disabled={st === 'disabled'} />}
          panel={<Seg label="state" value={st} options={['off', 'on', 'disabled'] as const} onChange={setSt} />}
          code={`<Switch label="푸시 알림"${st === 'on' ? ' defaultChecked' : ''}${st === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="States">
        <Canvas>
          <Switch label="꺼짐" />
          <Switch label="켜짐" defaultChecked />
          <Switch label="비활성" disabled />
          <Switch label="비활성 · 켜짐" disabled defaultChecked />
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <Switch label="알림 받기" defaultChecked />
          <Chips primary="고정" items={['52 × 32', '노브 28', 'R full', 'On = primary/normal']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="즉시 반영되는 설정" doBody="누르는 순간 적용되고, 별도 저장이 없는 것."
          doEx={<Switch label="푸시 알림" defaultChecked />}
          dontTitle="제출이 필요한 동의" dontBody="폼과 함께 제출되는 선택은 Checkbox입니다."
          dontEx={<Checkbox label="약관에 동의합니다" />} />
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
