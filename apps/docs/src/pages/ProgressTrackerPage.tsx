import { useState } from 'react';
import { ProgressTracker, Button, Progress } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const steps = [
  { id: 'cart', label: '장바구니' },
  { id: 'ship', label: '배송지' },
  { id: 'pay', label: '결제' },
  { id: 'done', label: '완료' },
];
const vSteps = [
  { id: 'cart', label: '장바구니', description: '3개 상품' },
  { id: 'ship', label: '배송지', description: '집 · 서울' },
  { id: 'pay', label: '결제', description: '카드 선택' },
  { id: 'done', label: '완료' },
];

export default function ProgressTrackerPage() {
  const [idx, setIdx] = useState(1);
  const [ori, setOri] = useState<'horizontal' | 'vertical'>('horizontal');
  return (
    <Page kicker="Components · Navigations" title="Progress tracker" desc="다단계 절차의 현재 위치를 보여줍니다. 마커 24 · 커넥터 2, 3~5단계 권장. 단계가 아니라 진행률(%)이면 Progress입니다.">
      <Section title="Playground" desc="다음/이전으로 단계를 이동해 보세요.">
        <Playground
          stage={<div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: ori === 'horizontal' ? 340 : undefined }}>
            <ProgressTracker steps={ori === 'vertical' ? vSteps : steps} current={steps[idx].id} orientation={ori} />
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="s" variant="outlined" color="assistive" disabled={idx === 0} onClick={() => setIdx(i => i - 1)}>이전</Button>
              <Button size="s" disabled={idx === steps.length - 1} onClick={() => setIdx(i => i + 1)}>다음</Button>
            </div>
          </div>}
          panel={<Seg label="orientation" value={ori} options={['horizontal', 'vertical'] as const} onChange={setOri} />}
          code={`<ProgressTracker steps={steps} current="${steps[idx].id}"${ori === 'vertical' ? ' orientation="vertical"' : ''} />`} />
      </Section>
      <Section title="Variants" desc="가로 = 짧은 라벨 절차, 세로 = 설명 붙는 절차.">
        <Canvas col style={{ gap: 32 }}>
          <Spec label="horizontal · 기본"><ProgressTracker steps={steps} current="pay" style={{ width: 360 }} /></Spec>
          <Spec label="vertical · 설명 포함"><ProgressTracker steps={vSteps} current="ship" orientation="vertical" /></Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="완료 = 체크 채움, 현재 = 보더 2 + aria-current, 대기 = 회색 번호.">
        <Canvas col style={{ gap: 24 }}>
          <ProgressTracker steps={steps} current="cart" style={{ width: 360 }} />
          <ProgressTracker steps={steps} current="done" style={{ width: 360 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="결제 플로우 상단 — 콘텐츠 위에 고정.">
        <Canvas col>
          <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 20, padding: '4px 0' }}>
            <ProgressTracker steps={steps} current="pay" />
            <div style={{ height: 72, borderRadius: 12, border: '1px dashed var(--iris-semantic-line-solid-normal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--iris-semantic-label-assistive)', fontSize: 13 }}>결제 수단 폼</div>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 마커·보더, 청록 = 간격(px). 마커 24 · 커넥터 2 고정.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap" style={{ gap: 72 }}>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <ProgressTracker steps={[{ id: 'a', label: '배송지' }, { id: 'b', label: '결제' }]} current="b" style={{ width: 160 }} />
                {/* 마커 24 (0~24) · 마커↔라벨 8 (24~32) · 라벨 14 (32~46) · 커넥터 2 (y11~13) 여백 4 */}
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 24, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 23 }}>8</span>
                <span className="size-num" style={{ left: -24, top: 8 }}>24</span>
                <span className="size-zone gap" style={{ left: 24, top: 11, width: 4, height: 2 }} />
                <span className="size-num gapnum" style={{ left: 26, top: -3, transform: 'translateX(-50%)' }}>4</span>
                <span className="size-num" style={{ left: 70, top: -3, transform: 'translateX(-50%)' }}>2</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <ProgressTracker steps={[{ id: 'a', label: '배송지', description: '집 · 서울' }, { id: 'b', label: '결제' }]} current="b" orientation="vertical" style={{ width: 150 }} />
                {/* 세로: 마커 24 · 커넥터 상하 여백 4 · 본문 좌측 간격 12 */}
                <span className="size-zone gap" style={{ left: 24, top: 0, width: 12, height: 24 }} />
                <span className="size-num gapnum" style={{ left: 30, top: -12, transform: 'translateX(-50%)' }}>12</span>
                <span className="size-zone gap" style={{ left: 11, top: 24, width: 2, height: 4 }} />
                <span className="size-num" style={{ left: -10, top: 25 }}>4</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>가로 / 세로</b>
              <span className="sub">마커 24 (보더 2 · caption-1 700) · 커넥터 2 · 커넥터 여백 4</span>
              <span className="sub">가로: 마커↔라벨 8 · 세로: 마커↔본문 12 · 항목 하단 20</span>
              <span className="sub">라벨 label-1 · 현재 700 · 설명 caption-1</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="고정" items={['마커 24 · 보더 2', '커넥터 2 · 여백 4', 'G 8 / 12', 'label-1 / caption-1']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="3~5단계 · 명사 라벨" doBody="같은 결제 절차 — 단계가 세어지고 위치가 보입니다."
          doEx={<ProgressTracker steps={steps} current="ship" style={{ width: 320 }} />}
          dontTitle="진행률에 트래커" dontBody="같은 흐름이라도 '몇 %'가 중요하면 Progress가 맞습니다."
          dontEx={<Progress label="업로드 중" value={65} showValue style={{ width: 280 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['steps', '{ id, label, description? }[]', '—', '3~5단계 권장 · description은 세로 전용'],
          ['current', 'string', '—', '현재 단계 id — 앞은 완료 처리, aria-current=step'],
          ['orientation', "'horizontal' | 'vertical'", "'horizontal'", '방향'],
        ]} />
      </Section>
    </Page>
  );
}
