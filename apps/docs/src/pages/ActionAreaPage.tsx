import { useState } from 'react';
import { ActionArea, Button } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 300, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--iris-semantic-line-solid-neutral)', background: 'var(--iris-semantic-background-normal-normal)' }}>
    <div style={{ height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--iris-semantic-label-assistive)', fontSize: 13 }}>콘텐츠 영역</div>
    {children}
  </div>
);

export default function ActionAreaPage() {
  const [n, setN] = useState<'1버튼' | '2버튼'>('1버튼');
  return (
    <Page kicker="Components · Actions" title="Action area" desc="화면 하단 고정 버튼 영역입니다. 버튼 1~2개를 균등 분할하고, 하단 패딩에 safe-area 토큰이 더해집니다.">
      <Section title="Playground">
        <Playground
          stage={<Frame><ActionArea divider>
            {n === '2버튼' && <Button variant="outlined" color="assistive">취소</Button>}
            <Button>{n === '2버튼' ? '결제하기' : '시작하기'}</Button>
          </ActionArea></Frame>}
          panel={<Seg label="buttons" value={n} options={['1버튼', '2버튼'] as const} onChange={setN} />}
 />
      </Section>
      <Section title="Variants" desc="풀폭 1버튼 / 균등 2버튼 · 스크롤 경계엔 divider.">
        <Canvas col style={{ gap: 20 }}>
          <Spec label="1버튼"><Frame><ActionArea><Button>시작하기</Button></ActionArea></Frame></Spec>
          <Spec label="2버튼 · divider"><Frame><ActionArea divider><Button variant="outlined" color="assistive">취소</Button><Button>결제하기</Button></ActionArea></Frame></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="콘텐츠가 스크롤돼도 하단에 고정 — 주 행동이 항상 손에 닿습니다.">
        <Canvas>
          <Frame><ActionArea divider><Button>다음</Button></ActionArea></Frame>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 버튼 간격(px). 하단엔 safe-area가 더해집니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <div style={{ width: 280 }}>
                  <ActionArea divider><Button variant="outlined" color="assistive">취소</Button><Button>결제하기</Button></ActionArea>
                </div>
                {/* padT 16 · 버튼 48 (16~64) · padB 16 · 좌우 20 · 가운데 G8 (x136~144) */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 16 }}>16</span>
                <span className="size-zone pad" style={{ left: 0, top: 16, width: 20, height: 48 }}>20</span>
                <span className="size-zone pad" style={{ right: 0, top: 16, width: 20, height: 48 }}>20</span>
                <span className="size-zone gap" style={{ left: 136, top: 16, width: 8, height: 48 }} />
                <span className="size-num gapnum" style={{ left: 140, top: 4, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 64, height: 16 }}>16</span>
                <span className="size-num" style={{ left: -24, top: 36 }}>48</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>2버튼 · divider</b>
              <span className="sub">P 상 16 · 좌우 20 · 하 16 + safe-area-bottom</span>
              <span className="sub">버튼 L 48 균등 분할 · 간격 8 · 구분선 1</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="고정" items={['P 16 · 20', '+ safe-area', 'G 8', '버튼 균등', '구분선 1']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="주 행동은 오른쪽 하나" doBody="같은 결제 — 취소는 왼쪽 outlined, 결제는 오른쪽 solid."
          doEx={<div style={{ width: 260 }}><ActionArea><Button variant="outlined" color="assistive">취소</Button><Button>결제하기</Button></ActionArea></div>}
          dontTitle="주 행동 두 개" dontBody="같은 영역에 solid가 둘이면 어느 것이 결제인지 알 수 없습니다."
          dontEx={<div style={{ width: 260 }}><ActionArea><Button>취소</Button><Button>결제하기</Button></ActionArea></div>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="ActionArea" code={`<ActionArea divider>${n === '2버튼' ? '<Button variant="outlined" color="assistive">취소</Button>' : ''}<Button>확인</Button></ActionArea>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['children', 'ReactNode', '—', '버튼 1~2개 — 폭 균등 분할'],
          ['divider', 'boolean', 'false', '상단 구분선 (스크롤 경계)'],
        ]} />
      </Section>
    </Page>
  );
}
