import { useState } from 'react';
import { Scrim, Button, Popup, BottomSheet, ListCell, Icon } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, Spec, Chips, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const Frame = ({ children, h = 220 }: { children?: React.ReactNode; h?: number }) => (
  <div style={{ position: 'relative', width: 280, height: h, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--iris-semantic-line-solid-neutral)', background: 'var(--iris-semantic-background-normal-normal)' }}>
    <div style={{ padding: 16, fontSize: 13, color: 'var(--iris-semantic-label-neutral)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span>뒤에 있는 콘텐츠</span><span style={{ color: 'var(--iris-semantic-label-assistive)' }}>목록·본문 영역</span>
    </div>
    {children}
  </div>
);

export default function ScrimPage() {
  const [on, setOn] = useState(true);
  return (
    <Page kicker="Components · Utilities" title="Scrim" desc="오버레이 뒤를 덮는 막입니다. material/dimmer 토큰(52%)으로 부모 전체를 덮고, 탭하면 닫는 게 관례입니다.">
      <Section title="Playground" desc="켜고 꺼 보세요 — 뒤 콘텐츠의 대비가 어떻게 죽는지.">
        <Playground
          stage={<Frame>{on && <Scrim onClick={() => setOn(false)} style={{ cursor: 'pointer' }} />}{!on && <div style={{ position: 'absolute', bottom: 12, left: 12 }}><Button size="s" variant="outlined" color="assistive" onClick={() => setOn(true)}>스크림 켜기</Button></div>}</Frame>}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>스크림을 탭하면<br />닫힙니다.</div>}
 />
      </Section>
      <Section title="Variants" desc="단일형 — 항상 material/dimmer 토큰. 라이트/다크 모두에서 같은 역할.">
        <Canvas>
          <Spec label="material/dimmer · 52%"><Frame h={140}><Scrim /></Frame></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="모달·시트 뒤 — 항상 함께 갑니다.">
        <Canvas>
          <Frame h={260}>
            <Scrim />
            <BottomSheet title="공유하기" style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
              <div style={{ margin: '0 -8px' }}>
                <ListCell interactive title="링크 복사" leading={<Icon name="share" size={20} />} />
                <ListCell interactive title="삭제" leading={<Icon name="trash" size={20} />} />
              </div>
            </BottomSheet>
          </Frame>
        </Canvas>
      </Section>
      <Section title="Size" desc="크기 수치가 없는 유일한 컴포넌트 — 부모를 inset 0으로 전부 덮습니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.2)', lineHeight: 0 }}>
                <Frame h={120} />
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(6,182,212,.18)', border: '1.5px dashed rgb(6,182,212)' }} />
                <span className="size-num gapnum" style={{ left: '50%', top: -14, transform: 'translateX(-50%)' }}>inset 0</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>전체 덮기</b>
              <span className="sub">position absolute · inset 0 — 부모(relative) 기준</span>
              <span className="sub">배경 material/dimmer (52% 검정) · 수치 토큰 없음</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />덮는 범위</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="고정" items={['inset 0', 'material/dimmer 52%', '탭 = 닫기 관례']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="모달 뒤엔 항상" doBody="같은 팝업 — 스크림이 있어야 뒤가 눌리지 않는 게 보입니다."
          doEx={<Frame h={200}><Scrim /><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Popup title="점검 안내" style={{ width: 220 }}>오늘 밤 점검합니다.</Popup></div></Frame>}
          dontTitle="스크림 없는 모달" dontBody="같은 팝업인데 뒤가 그대로면 어디를 눌러도 되는지 헷갈립니다."
          dontEx={<Frame h={200}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Popup title="점검 안내" style={{ width: 220 }}>오늘 밤 점검합니다.</Popup></div></Frame>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Scrim" code={`<Scrim onClick={close} />`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['onClick', '() => void', '—', '탭하면 닫기 — 오버레이 닫기 핸들러 연결'],
          ['className / style', '—', '—', 'z-index 등 배치 조정'],
        ]} />
      </Section>
    </Page>
  );
}
