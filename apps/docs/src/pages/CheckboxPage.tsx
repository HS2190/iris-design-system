import { useState } from 'react';
import { Checkbox, Switch } from '@iris/react';
import { Page, Section, Canvas, DoDont, Props } from '../components/Doc';

export default function CheckboxPage() {
  const [items, setItems] = useState([true, true, false]);
  const all = items.every(Boolean); const some = items.some(Boolean) && !all;
  return (
    <Page kicker="Components · Selection & Input" title="Checkbox" desc="서로 독립인 옵션의 다중 선택입니다. 하나만 골라야 하면 Radio, 즉시 적용되는 설정이면 Switch를 씁니다.">
      <Section title="States" desc="전부 실제 컴포넌트 — 눌러보세요.">
        <Canvas>
          <Checkbox label="기본" />
          <Checkbox label="선택됨" defaultChecked />
          <Checkbox label="일부 선택" indeterminate />
          <Checkbox label="비활성" disabled />
          <Checkbox label="비활성 · 선택" disabled defaultChecked />
        </Canvas>
      </Section>
      <Section title="Indeterminate" desc="부모 항목은 하위 선택 상태를 요약합니다.">
        <Canvas col style={{ gap: 10 }}>
          <Checkbox label="알림 전체" checked={all} indeterminate={some}
            onChange={e => setItems(items.map(() => e.target.checked))} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 28 }}>
            {['이메일', 'SMS', '푸시'].map((l, i) => (
              <Checkbox key={l} label={l} checked={items[i]}
                onChange={e => setItems(items.map((v, j) => j === i ? e.target.checked : v))} />
            ))}
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="독립 옵션 다중 선택" doBody="각 항목이 서로 영향을 주지 않을 때."
          doEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Checkbox label="이메일 수신" defaultChecked /><Checkbox label="SMS 수신" /></div>}
          dontTitle="즉시 적용되는 설정" dontBody="저장 버튼 없이 바로 반영되는 on/off는 Switch입니다."
          dontEx={<Switch label="다크 모드" defaultChecked />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['label', 'ReactNode', '—', '옆 라벨 (label 요소로 연결)'],
          ['indeterminate', 'boolean', 'false', '하위 일부 선택 상태'],
          ['checked / defaultChecked', 'boolean', '—', '표준 input 프로퍼티 그대로'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
