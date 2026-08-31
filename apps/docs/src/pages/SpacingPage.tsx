import { Page, Section, Chips } from '../components/Doc';

const SPACE = [2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 120];
const RADIUS: [string, number | string][] = [['none', 0], ['xs', 8], ['sm', 10], ['md', 12], ['lg', 16], ['xl', 20], ['sheet', '16 (iOS 20 · And 28)'], ['full', 999]];

export default function SpacingPage() {
  return (
    <Page kicker="Foundations" title="Spacing" desc="4 기반 간격 스케일(2는 미세 조정 전용)과 radius·stroke 토큰입니다. 모든 컴포넌트 수치는 이 스케일 위에 있습니다.">
      <Section title="Scale" desc="--iris-space-N — 값이 곧 이름입니다.">
        {SPACE.map(v => (
          <div className="space-row" key={v}>
            <span className="space-label">{v}</span>
            <span className="space-bar" style={{ width: v * 2.6 }} />
          </div>
        ))}
      </Section>
      <Section title="쓰임" desc="어림 규칙 — 컴포넌트들이 실제로 쓰는 구간.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Chips primary="2–6" items={['미세 정렬', '제목↔설명 2', '세그 간 2', '이니셜 여백 4']} />
          <Chips primary="8–16" items={['컴포넌트 내부 패딩·간격', '입력 P 16', '리딩 G 12', '아이콘 G 8']} />
          <Chips primary="20–32" items={['블록 간·컨테이너 패딩', 'Alert P 20', '섹션 하위 24']} />
          <Chips primary="40+" items={['섹션 간·페이지 리듬', '히어로 상하 48+']} />
        </div>
      </Section>
      <Section title="Radius" desc="--iris-radius-* — 컴포넌트 체급에 따라 커집니다.">
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {RADIUS.map(([n, v]) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <span style={{ width: 64, height: 64, background: 'var(--iris-semantic-fill-normal)', border: '1px solid var(--iris-semantic-line-solid-normal)', borderRadius: `var(--iris-radius-${n})` }} />
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: 'var(--iris-semantic-label-neutral)' }}>{n} · {v}</span>
            </div>
          ))}
        </div>
        <p className="section-desc" style={{ marginTop: 14 }}>xs 8 = 뱃지·칩 내부 · sm 10 = 입력·버튼 M · md 12 = 카드 내부·토스트 · lg 16 = 카드·모달 · full = 필형.</p>
      </Section>
      <Section title="Stroke">
        <Chips primary="stroke" items={['hairline 1 — 구분선·보더', 'bar 2 — 탭 인디케이터·포커스 링']} />
      </Section>
    </Page>
  );
}
