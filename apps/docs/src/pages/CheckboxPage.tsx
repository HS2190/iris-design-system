import { useState } from 'react';
import { Checkbox, Switch, Button } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function CheckboxPage() {
  const [items, setItems] = useState([true, true, false]);
  const all = items.every(Boolean); const some = items.some(Boolean) && !all;
  const [cb, setCb] = useState<'default' | 'checked' | 'indeterminate' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Checkbox" desc="서로 독립인 옵션의 다중 선택입니다. 하나만 골라야 하면 Radio, 즉시 적용되는 설정이면 Switch를 씁니다.">
      <Section title="Playground">
        <Playground
          stage={<Checkbox key={cb} label="이메일 수신" defaultChecked={cb === 'checked'} indeterminate={cb === 'indeterminate'} disabled={cb === 'disabled'} />}
          panel={<Seg label="state" value={cb} options={['default', 'checked', 'indeterminate', 'disabled'] as const} onChange={setCb} />}
          code={`<Checkbox label="이메일 수신"${cb === 'checked' ? ' defaultChecked' : ''}${cb === 'indeterminate' ? ' indeterminate' : ''}${cb === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="States" desc="전부 실제 컴포넌트 — 눌러보세요.">
        <Canvas>
          <Checkbox label="기본" />
          <Checkbox label="선택됨" defaultChecked />
          <Checkbox label="일부 선택" indeterminate />
          <Checkbox label="비활성" disabled />
          <Checkbox label="비활성 · 선택" disabled defaultChecked />
        </Canvas>
      </Section>
      <Section title="Indeterminate" desc="부모 항목은 하위 선택 상태를 요약합니다. 눌러보세요.">
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
      <Section title="Usage" desc="약관 동의 — 폼과 함께 제출되는 선택.">
        <Canvas col>
          <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Checkbox label="(필수) 서비스 이용약관 동의" />
            <Checkbox label="(선택) 마케팅 수신 동의" />
            <Button style={{ width: '100%', marginTop: 6 }}>가입하기</Button>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 상하 여백, 청록 = 박스·라벨 간격(px). 행 높이 28에 박스 20이 가운데 정렬됩니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap" style={{ gap: 72 }}>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(2)', lineHeight: 1 }}>
                <Checkbox label="이메일 수신" defaultChecked />
                {/* 행 28 · 박스 20(상하 4) · 간격 8 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 20, height: 4 }} />
                <span className="size-zone pad" style={{ left: 0, bottom: 0, width: 20, height: 4 }} />
                <span className="size-num" style={{ left: -10, top: 0 }}>4</span>
                <span className="size-num" style={{ left: -10, bottom: 0 }}>4</span>
                <span className="size-zone gap" style={{ left: 20, top: 0, width: 8, height: 28 }} />
                <span className="size-num gapnum" style={{ left: 24, top: -12, transform: 'translateX(-50%)' }}>8</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <div style={{ width: 190, display: 'flex', flexDirection: 'column' }}>
                  <Checkbox label="알림 전체" indeterminate onChange={() => {}} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 28, marginTop: 10 }}>
                    <Checkbox label="이메일" defaultChecked />
                    <Checkbox label="SMS" defaultChecked />
                    <Checkbox label="푸시" />
                  </div>
                </div>
                {/* 부모 0~28 · 간격 10 · 자식 28행 + 간 8 · 들여쓰기 28 */}
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 28, height: 10 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 29 }}>10</span>
                <span className="size-zone pad" style={{ left: 0, top: 38, width: 28, height: 100 }}>28</span>
                <span className="size-zone gap" style={{ left: 28, right: 0, top: 66, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -14, top: 66 }}>8</span>
                <span className="size-zone gap" style={{ left: 28, right: 0, top: 102, height: 8 }} />
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정 · Checked / 부모–자식 리스트</b>
              <span className="sub">박스 20 · 보더 1.5 · R 8 · 행 높이 28 · 라벨 body-2 · 간격 8</span>
              <span className="sub">들여쓰기 28 = 박스 20 + 간격 8 — 자식 박스가 부모 라벨 시작선에 정렬</span>
              <span className="sub">부모↔자식 간격 10 · 자식 행 간 8</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />여백·들여쓰기&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['박스 20 · 보더 1.5', 'R 8', 'G 8', 'body-2', '행 높이 28']} />
            </div>
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
