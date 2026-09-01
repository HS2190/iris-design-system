import { useState } from 'react';
import { Progress, Card, Toast } from '@hs2190/iris-react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

export default function ProgressPage() {
  const [v, setV] = useState<'25' | '65' | '100' | '불확정'>('65');
  return (
    <Page kicker="Components · Navigations" title="Progress" desc="진행 표시줄입니다. 트랙 4 고정, 값을 모르면 indeterminate. role=progressbar로 노출됩니다.">
      <Section title="Playground">
        <Playground
          stage={<Progress label="업로드 중" value={v === '불확정' ? undefined : Number(v)} showValue indeterminate={v === '불확정'} style={{ width: 280 }} />}
          panel={<Seg label="value" value={v} options={['25', '65', '100', '불확정'] as const} onChange={setV} />}
 />
      </Section>
      <Section title="Variants">
        <Canvas col style={{ gap: 20 }}>
          <Progress value={65} aria-label="진행" style={{ width: 320 }} />
          <Progress label="업로드 중" value={65} showValue style={{ width: 320 }} />
          <Progress label="불러오는 중" indeterminate style={{ width: 320 }} />
        </Canvas>
      </Section>
      <Section title="States">
        <Canvas col style={{ gap: 20 }}>
          <Progress label="대기" value={0} showValue style={{ width: 320 }} />
          <Progress label="진행" value={45} showValue style={{ width: 320 }} />
          <Progress label="완료" value={100} showValue style={{ width: 320 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="업로드 카드 안 — 파일명과 함께.">
        <Canvas>
          <Card variant="outlined" style={{ width: 320 }}>
            <Progress label="portfolio-2026.pdf" value={65} showValue />
          </Card>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 라벨행·트랙 간격(px). 트랙 4 고정.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.25)', lineHeight: 1 }}>
                <Progress label="업로드 중" value={65} showValue style={{ width: 220 }} />
                {/* 라벨행 14 (0~14) · G 6 (14~20) · 트랙 4 (20~24) */}
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 14, height: 6 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 13 }}>6</span>
                <span className="size-num" style={{ left: -10, top: 19 }}>4</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>라벨 + 값</b>
              <span className="sub">트랙 4 · R full · fill = primary/normal</span>
              <span className="sub">라벨·값 label-1 · 라벨행↔트랙 6 · % tabular</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['트랙 4', 'G 6', 'R full', 'label-1', 'fill primary']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="모르면 indeterminate" doBody="같은 로딩 — 진짜 진행률이 없으면 흐르는 바로 정직하게."
          doEx={<Progress label="불러오는 중" indeterminate style={{ width: 240 }} />}
          dontTitle="가짜 고정 퍼센트" dontBody="같은 로딩을 65%에 멈춰두면 멈춘 것처럼 보이고 신뢰를 잃습니다."
          dontEx={<Progress label="불러오는 중" value={65} showValue style={{ width: 240 }} />} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Progress" code={`<Progress label="업로드 중"${v === '불확정' ? ' indeterminate' : ` value={${v}} showValue`} />`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['value / max', 'number', '— / 100', '진행 값 (aria-valuenow)'],
          ['label / showValue', 'ReactNode · boolean', '—', '라벨 · 우측 % 표시'],
          ['indeterminate', 'boolean', 'false', '불확정 — 흐르는 애니메이션'],
        ]} />
      </Section>
    </Page>
  );
}
