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
      <Section title="Size" desc="주황 = 패딩, 청록 = 라벨·메시지 간격(px). 높이는 input-height 토큰(웹 48 · Android 56).">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <TextField label="이메일" defaultValue="hs@example" error="이메일 형식이 올바르지 않습니다" style={{ width: 210 }} />
                {/* lh1 실측: label 14 · gap 6 · input 48 (pad-inline 16) · gap 6 · msg 12 */}
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 14, height: 6 }} />
                <span className="size-zone pad" style={{ left: 0, top: 20, width: 16, height: 48 }}>16</span>
                <span className="size-zone pad" style={{ right: 0, top: 20, width: 16, height: 48 }}>16</span>
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 68, height: 6 }} />
                <span className="size-num gapnum" style={{ right: -18, top: 13 }}>6</span>
                <span className="size-num gapnum" style={{ right: -18, top: 67 }}>6</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · Error</b>
              <span className="sub">H input-height 48 · radius-sm 10 · body-1</span>
              <span className="sub">라벨 label-1 500 · 메시지 caption-1</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><TextField label="기본" placeholder="example@email.com" style={{ width: 240 }} /></div>
              <Chips primary="기본" items={['H 48 (input-height)', 'P 16', 'G 6', 'R 10', 'body-1']} />
            </div>
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><TextField label="오류" defaultValue="hs@example" error="이메일 형식이 올바르지 않습니다" style={{ width: 240 }} /></div>
              <Chips primary="오류" items={['메시지 G 6', 'caption-1', 'status/negative']} />
            </div>
          </div>
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
