import { useState } from 'react';
import { TextArea, TextField, Button } from '@iris/react';
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
      <Section title="Usage" desc="후기 작성 폼 — 한 줄 입력과 여러 줄 입력의 조합.">
        <Canvas col>
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField label="제목" placeholder="한 줄 요약" />
            <TextArea label="내용" placeholder="200자 이내" maxLength={200} showCount />
            <Button style={{ width: '100%' }}>등록</Button>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩(상하 12 · 좌우 16), 청록 = 라벨·카운터 간격(px). 최소 높이 120에 세로 리사이즈.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.05)', lineHeight: 1 }}>
                <TextArea label="자기소개" defaultValue="안녕하세요" maxLength={200} showCount style={{ width: 210 }} />
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 14, height: 6 }} />
                <span className="size-zone pad" style={{ left: 0, top: 20, width: 16, height: 120 }}>16</span>
                <span className="size-zone pad" style={{ right: 0, top: 20, width: 16, height: 120 }}>16</span>
                <span className="size-zone pad" style={{ left: 16, right: 16, top: 20, height: 12 }}>12</span>
                <span className="size-zone pad" style={{ left: 16, right: 16, top: 128, height: 12 }}>12</span>
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 140, height: 6 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 13 }}>6</span>
                <span className="size-num gapnum" style={{ right: -16, top: 139 }}>6</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · 카운터 표시</b>
              <span className="sub">min-H 120 · P 12 · 16 · R 10 · body-1</span>
              <span className="sub">라벨 label-1 500 · 카운터 caption-1 · 간격 6</span>
              <span className="sub">세로 리사이즈 허용 (disabled 시 잠금)</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="기본" items={['min-H 120', 'P 12 · 16', 'G 6', 'R 10', 'body-1']} />
            </div>
          </div>
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
