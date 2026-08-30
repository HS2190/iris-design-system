import { useState } from 'react';
import { TextField } from '@iris/react';
import { Page, Section, Canvas, Chips, DoDont, Props, Playground, Seg } from '../components/Doc';

export default function TextFieldPage() {
  const [state, setState] = useState<'default' | 'error' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Text field" desc="단일 행 텍스트 입력입니다. 라벨·입력 영역·헬퍼로 구성되고, 높이는 플랫폼 토큰(--iris-input-height)을 따릅니다.">
      <Section title="Playground">
        <Playground
          stage={<TextField label="이메일" placeholder="example@email.com" style={{ width: 280 }}
            helper="회사 이메일을 입력하세요" error={state === 'error' ? '이메일 형식이 올바르지 않습니다' : undefined}
            disabled={state === 'disabled'} defaultValue={state === 'error' ? 'hs@example' : ''} />}
          panel={<Seg label="state" value={state} options={['default', 'error', 'disabled'] as const} onChange={setState} />}
          code={`<TextField label="이메일" helper="회사 이메일을 입력하세요"${state === 'error' ? ' error="이메일 형식이 올바르지 않습니다"' : ''}${state === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="States" desc="Focused는 line/primary/strong 2px, Error는 status/negative. 입력해 보세요.">
        <Canvas>
          <TextField label="기본" placeholder="입력하세요" style={{ width: 220 }} />
          <TextField label="오류" defaultValue="hs@example" error="이메일 형식이 올바르지 않습니다" style={{ width: 220 }} />
          <TextField label="비활성" placeholder="입력 불가" disabled style={{ width: 220 }} />
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <TextField label="이메일" placeholder="example@email.com" style={{ width: 320 }} />
          <Chips primary="기본" items={['H = input-height(48)', 'P 16', 'R 10', 'body-1']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="라벨 + 헬퍼로 규칙 안내" doBody="무엇을 넣는 칸인지(라벨), 어떤 형식인지(헬퍼)를 항상 보이게."
          doEx={<TextField label="이메일" placeholder="example@email.com" helper="회사 이메일" style={{ width: 220 }} />}
          dontTitle="플레이스홀더를 라벨 대신" dontBody="입력을 시작하면 라벨이 사라져 무엇을 쓰던 칸인지 잊게 됩니다."
          dontEx={<TextField placeholder="이메일" style={{ width: 220 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['label', 'string', '—', '입력 라벨 (항상 권장)'],
          ['helper', 'string', '—', '입력 규칙 안내'],
          ['error', 'string', '—', '오류 메시지 — 있으면 helper 대신 표시, aria-invalid'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
