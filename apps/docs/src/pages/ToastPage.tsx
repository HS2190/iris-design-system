import { useRef, useState } from 'react';
import { Toast, Button, SectionMessage } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function ToastPage() {
  const [tone, setTone] = useState<'neutral' | 'positive' | 'negative'>('positive');
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const fire = () => { setShown(true); clearTimeout(timer.current); timer.current = setTimeout(() => setShown(false), 2400); };
  return (
    <Page kicker="Components · Feedback" title="Toast" desc="결과를 잠깐 알리고 사라지는 알림입니다. 액션이 필요하면 Snackbar, 지속 안내는 Section message를 씁니다.">
      <Section title="Playground" desc="눌러보세요 — 2.4초 뒤 사라집니다.">
        <Playground
          stage={<div style={{ position: 'relative', width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button size="s" onClick={fire}>저장하기</Button>
            {shown && <Toast tone={tone} style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              {tone === 'negative' ? '저장에 실패했습니다' : tone === 'positive' ? '저장되었습니다' : '초안이 백업되었습니다'}
            </Toast>}
          </div>}
          panel={<Seg label="tone" value={tone} options={['neutral', 'positive', 'negative'] as const} onChange={setTone} />}
          code={`<Toast tone="${tone}">저장되었습니다</Toast>`} />
      </Section>
      <Section title="Variants" desc="Tone별 아이콘·색. 배경은 inverse — 어느 화면 위에서든 뜹니다.">
        <Canvas col style={{ gap: 12 }}>
          <Toast tone="neutral">초안이 백업되었습니다</Toast>
          <Toast tone="positive">저장되었습니다</Toast>
          <Toast tone="negative">저장에 실패했습니다</Toast>
        </Canvas>
      </Section>
      <Section title="States" desc="한 줄이 기본, 길면 두 줄까지.">
        <Canvas col style={{ gap: 12 }}>
          <Toast tone="positive">저장되었습니다</Toast>
          <Toast tone="neutral" style={{ maxWidth: 300 }}>네트워크가 불안정해 초안을 로컬에 백업했습니다. 연결되면 자동 동기화됩니다.</Toast>
        </Canvas>
      </Section>
      <Section title="Usage" desc="화면 하단 중앙에 뜹니다 — 콘텐츠를 가리지 않는 위치.">
        <Canvas>
          <div style={{ position: 'relative', width: '100%', maxWidth: 420, height: 200, borderRadius: 12, background: 'var(--iris-semantic-background-normal-normal)', border: '1px solid var(--iris-semantic-line-solid-neutral)' }}>
            <Toast tone="positive" style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>저장되었습니다</Toast>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 아이콘·문구 간격(px). 최소 높이 48.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.6)', lineHeight: 1 }}>
                <Toast tone="positive" style={{ whiteSpace: 'nowrap' }}>저장되었습니다</Toast>
                {/* H48 · padL 16 · 아이콘 20 (16~36) · G8 (36~44) · padR 16 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 16, height: 48 }}>16</span>
                <span className="size-zone gap" style={{ left: 36, top: 0, width: 8, height: 48 }} />
                <span className="size-num gapnum" style={{ left: 40, top: -12, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 16, height: 48 }}>16</span>
                <span className="size-num" style={{ left: -24, top: 22 }}>48</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>positive</b>
              <span className="sub">min-H 48 · P 12 · 16 · R 12 · 아이콘 20</span>
              <span className="sub">inverse 배경 · body-2 · elevation medium</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 48 }}><Toast tone="positive">저장되었습니다</Toast></div>
              <Chips primary="고정" items={['min-H 48', 'P 12 · 16', 'G 8', 'R 12', '아이콘 20', 'body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="결과 통보 — 사라져도 되는 것" doBody="같은 저장 흐름 — 성공은 잠깐 알리고 지나갑니다."
          doEx={<Toast tone="positive">저장되었습니다</Toast>}
          dontTitle="복구가 필요한 오류를 토스트로" dontBody="같은 흐름의 실패는 사라지면 안 됩니다 — Section message로 남기세요."
          dontEx={<SectionMessage tone="negative" title="저장 실패">네트워크 확인 후 다시 시도해 주세요.</SectionMessage>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['tone', "'neutral' | 'positive' | 'negative'", "'neutral'", '아이콘·아이콘 색'],
          ['children', 'ReactNode', '—', '문구 — 한 줄 권장, 최대 두 줄'],
        ]} />
      </Section>
    </Page>
  );
}
