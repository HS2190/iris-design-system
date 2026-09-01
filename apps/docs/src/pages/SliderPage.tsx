import { useState } from 'react';
import { Slider, TextField, Button } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function SliderPage() {
  const [st, setSt] = useState<'default' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Slider" desc="범위 안의 대략적인 값을 드래그로 고릅니다. 정확한 숫자가 필요하면 Text field를 병행합니다.">
      <Section title="Playground" desc="드래그해 보세요.">
        <Playground name="Slider"
          stage={<Slider key={st} label="가격대" defaultValue={30} formatValue={v => `${v}만 원`} disabled={st === 'disabled'} style={{ width: 300 }} />}
          panel={<Seg label="state" value={st} options={['default', 'disabled'] as const} onChange={setSt} />}
          code={`<Slider label="가격대" formatValue={v => \`\${v}만 원\`}${st === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="States" desc="드래그해 보세요.">
        <Canvas col style={{ gap: 24 }}>
          <Slider label="가격대" defaultValue={30} formatValue={v => `${v}만 원`} style={{ maxWidth: 360 }} />
          <Slider label="볼륨" defaultValue={70} formatValue={v => `${v}%`} style={{ maxWidth: 360 }} />
          <Slider label="비활성" defaultValue={50} disabled style={{ maxWidth: 360 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="필터 패널 — 범위를 감으로 고르고 적용합니다.">
        <Canvas col>
          <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Slider label="가격대" defaultValue={30} formatValue={v => `~${v}만 원`} />
            <Slider label="경력" defaultValue={50} formatValue={v => `~${Math.round(v / 10)}년`} />
            <Button style={{ width: '100%' }}>적용하기</Button>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 라벨행·트랙 간격(px). 트랙 4 위에 노브 24가 올라갑니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.4)', lineHeight: 1 }}>
                <Slider label="가격대" defaultValue={30} formatValue={v => v + '만'} style={{ width: 210 }} />
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 14, height: 6 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 13 }}>6</span>
                <span className="size-num" style={{ left: -10, top: 29 }}>4</span>
                <span className="size-num" style={{ left: 63, top: 46, transform: 'translateX(-50%)' }}>24</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정</b>
              <span className="sub">트랙 4 · 노브 24 (white + primary 2px 보더)</span>
              <span className="sub">라벨·값 label-1 · 트랙과 간격 6</span>
              <span className="sub">터치 타깃 ≥ touch-target-min (플랫폼 토큰)</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['트랙 4', '노브 24', 'G 6', '터치 타깃 ≥ touch-target-min']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="대략의 값·범위" doBody="볼륨·가격대처럼 감으로 조절하는 값."
          doEx={<Slider label="가격대" defaultValue={30} formatValue={v => `${v}만`} style={{ width: 220 }} />}
          dontTitle="정확한 값 단독 입력" dontBody="생년월일·수량처럼 정확해야 하는 값은 입력 필드로."
          dontEx={<TextField label="수량" defaultValue="3" style={{ width: 120 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['label', 'string', '—', '상단 라벨'],
          ['formatValue', '(v: number) => string', '—', '우측 현재 값 표시'],
          ['min / max / step', 'number', '0 / 100 / 1', '표준 range 프로퍼티'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
