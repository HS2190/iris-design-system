import { useState } from 'react';
import { Divider } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function DividerPage() {
  const [ori, setOri] = useState<'horizontal' | 'vertical'>('horizontal');
  const [wt, setWt] = useState<'normal' | 'strong'>('normal');
  return (
    <Page kicker="Components · Utilities" title="Divider" desc="요소 사이를 나누는 1px 선입니다. 여백으로 충분한 곳에는 쓰지 않습니다.">
      <Section title="Playground">
        <Playground
          stage={ori === 'horizontal'
            ? <div style={{ width: 220 }}>항목 A<Divider weight={wt} style={{ margin: '10px 0' }} />항목 B</div>
            : <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40 }}>항목 A<Divider orientation="vertical" weight={wt} />항목 B</div>}
          panel={<>
            <Seg label="orientation" value={ori} options={['horizontal', 'vertical'] as const} onChange={setOri} />
            <Seg label="weight" value={wt} options={['normal', 'strong'] as const} onChange={setWt} />
          </>}
          code={`<Divider${ori === 'vertical' ? ' orientation="vertical"' : ''}${wt === 'strong' ? ' weight="strong"' : ''} />`} />
      </Section>
      <Section title="Variants" desc="Normal(line/solid/neutral)이 기본, 섹션 경계만 Strong(line/solid/normal).">
        <Canvas col style={{ gap: 20 }}>
          <div style={{ width: '100%' }}><Divider /><small className="mono" style={{ fontSize: 11, color: 'var(--iris-semantic-label-assistive)' }}>normal</small></div>
          <div style={{ width: '100%' }}><Divider weight="strong" /><small className="mono" style={{ fontSize: 11, color: 'var(--iris-semantic-label-assistive)' }}>strong</small></div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40 }}>
            텍스트 <Divider orientation="vertical" /> 텍스트 <Divider orientation="vertical" weight="strong" /> 텍스트
          </div>
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <div style={{ width: 260 }}><Divider /></div>
          <Chips primary="고정" items={['두께 1 (stroke-hairline)', 'normal = line/solid/neutral', 'strong = line/solid/normal']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="리스트 셀 사이 · 섹션 경계" doBody="구조가 실제로 나뉘는 곳에 한 줄."
          doEx={<div style={{ width: '100%' }}>항목 A<Divider style={{ margin: '10px 0' }} />항목 B</div>}
          dontTitle="모든 줄 사이에 선" dontBody="여백이 이미 구분해 주는 곳에 선을 더하면 소음이 됩니다."
          dontEx={<div style={{ width: '100%' }}>줄 1<Divider weight="strong" style={{ margin: '6px 0' }} />줄 2<Divider weight="strong" style={{ margin: '6px 0' }} />줄 3</div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['orientation', "'horizontal' | 'vertical'", "'horizontal'", '방향 (세로는 부모 높이를 따름)'],
          ['weight', "'normal' | 'strong'", "'normal'", '1px 색 강도'],
        ]} />
      </Section>
    </Page>
  );
}
