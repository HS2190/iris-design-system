import { Slider, TextField } from '@iris/react';
import { Page, Section, Canvas, Chips, DoDont, Props } from '../components/Doc';

export default function SliderPage() {
  return (
    <Page kicker="Components · Selection & Input" title="Slider" desc="범위 안의 대략적인 값을 드래그로 고릅니다. 정확한 숫자가 필요하면 Text field를 병행합니다.">
      <Section title="States" desc="드래그해 보세요.">
        <Canvas col style={{ gap: 24 }}>
          <Slider label="가격대" defaultValue={30} formatValue={v => `${v}만 원`} style={{ maxWidth: 360 }} />
          <Slider label="볼륨" defaultValue={70} formatValue={v => `${v}%`} style={{ maxWidth: 360 }} />
          <Slider label="비활성" defaultValue={50} disabled style={{ maxWidth: 360 }} />
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <Slider defaultValue={40} style={{ maxWidth: 320 }} aria-label="예시" />
          <Chips primary="고정" items={['트랙 4', '노브 24 · white + primary 2px', '터치 타깃 ≥ touch-target-min']} />
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
