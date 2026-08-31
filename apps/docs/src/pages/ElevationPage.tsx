import { Page, Section, Chips, useCssVars } from '../components/Doc';

const LEVELS: [string, string][] = [
  ['xsmall', '세그먼트 썸 · 스위치 노브'],
  ['small', 'Card elevated · Slider 노브'],
  ['medium', 'Menu · Popover · Toast · Snackbar'],
  ['large', 'Alert · Popup · Bottom sheet'],
  ['xlarge', '최상위 오버레이 (예약)'],
];

export default function ElevationPage() {
  const vals = useCssVars(LEVELS.map(([n]) => `--iris-elevation-normal-${n}`));
  return (
    <Page kicker="Foundations" title="Elevation" desc="그림자 5단계 — 떠 있는 정도가 위계입니다. 표면 색(background/elevated)과 함께 써야 다크 모드에서도 층이 보입니다.">
      <Section title="Levels" desc="쓰는 곳이 정해져 있습니다 — 컴포넌트가 임의로 단계를 고르지 않습니다.">
        <div className="elev-grid">
          {LEVELS.map(([n, use]) => (
            <div className="elev-card" key={n} style={{ boxShadow: `var(--iris-elevation-normal-${n})` }}>
              <div className="elev-name">{n}</div>
              <div className="elev-use">{use}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Spread" desc="포커스 링처럼 퍼지는 보조 그림자.">
        <Chips primary="spread" items={['small — 포커스 링 보조', 'medium — 강조 카드']} />
      </Section>
      <Section title="사용 규칙">
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--iris-semantic-label-neutral)', fontSize: 14.5, lineHeight: 1.9 }}>
          <li>그림자만 올리지 않습니다 — 표면은 <code>background/elevated-normal</code>과 짝입니다.</li>
          <li>다크 모드에선 그림자가 약해 보이므로 표면 명도 차가 주 위계입니다.</li>
          <li>값 예시: <code style={{ fontSize: 11 }}>{vals['--iris-elevation-normal-medium'] || ''}</code></li>
        </ul>
      </Section>
    </Page>
  );
}
