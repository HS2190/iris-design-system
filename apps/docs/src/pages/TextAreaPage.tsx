import { useState } from 'react';
import { TextArea, TextField } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function TextAreaPage() {
  const [st, setSt] = useState<'default' | 'error' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Text area" desc="여러 줄 텍스트 입력입니다. 최소 높이 120에 세로 리사이즈를 허용하고, maxLength와 함께 글자 수 카운터를 보여줍니다.">
      <Section title="Playground" desc="입력하면 카운터가 실시간으로 움직입니다.">
        <Playground
          stage={<TextArea key={st} label="자기소개" placeholder="200자 이내로 입력하세요" maxLength={200} showCount
            error={st === 'error' ? '10자 이상 입력해 주세요' : undefined} defaultValue={st === 'error' ? '너무 짧음' : ''}
            disabled={st === 'disabled'} style={{ width: 300 }} />}
          panel={<Seg label="state" value={st} options={['default', 'error', 'disabled'] as const} onChange={setSt} />}
          code={`<TextArea label="자기소개" maxLength={200} showCount${st === 'error' ? ' error="10자 이상 입력해 주세요"' : ''}${st === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="States" desc="입력해 보세요 — 카운터가 실시간으로 움직입니다.">
        <Canvas>
          <TextArea label="자기소개" placeholder="200자 이내로 입력하세요" maxLength={200} showCount style={{ width: 300 }} />
          <TextArea label="오류" defaultValue="너무 짧음" error="10자 이상 입력해 주세요" style={{ width: 300 }} />
          <TextArea label="비활성" placeholder="입력 불가" disabled style={{ width: 300 }} />
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <TextArea label="자기소개" placeholder="입력하세요" style={{ width: 340 }} />
          <Chips primary="기본" items={['min-H 120', 'P 12 · 16', 'R 10', 'body-1', '세로 리사이즈']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="긴 입력 + 카운터" doBody="제한이 있으면 미리 보여줍니다."
          doEx={<TextArea label="후기" maxLength={100} showCount placeholder="100자 이내" style={{ width: 240 }} />}
          dontTitle="한 줄 입력" dontBody="이름·이메일 같은 한 줄 값은 Text field입니다."
          dontEx={<TextField label="이메일" placeholder="example@email.com" style={{ width: 240 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['label / helper / error', 'string', '—', 'Text field와 동일한 폼 규칙'],
          ['maxLength', 'number', '—', '최대 글자 수'],
          ['showCount', 'boolean', 'false', 'maxLength와 함께 "n / max" 표시'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
