import tokens from '@hs2190.an/iris-tokens';
import { Table } from '@hs2190.an/iris-react';
import { Page, Section, Chips } from '../components/Doc';

const shadow = (name: string, filter?: number) => {
  const layers = tokens.elevation[name] || [];
  return layers.filter((_, i) => filter === undefined || i === filter)
    .map(l => `0 ${l.y}px ${l.b}px ${l.s}px rgba(23, 23, 23, ${l.a})`).join(', ');
};
const spec = (name: string) => (tokens.elevation[name] || []).map(l => `y${l.y} b${l.b} ${Math.round(l.a * 100)}%`).join(' + ');

const LEVELS: [string, string][] = [
  ['none', '평면 — 대부분의 UI'],
  ['normal-xsmall', '세그먼트 썸 · 스위치 노브'],
  ['normal-small', 'Card elevated · 슬라이더 노브'],
  ['normal-medium', 'Menu · Popover · Toast · Snackbar'],
  ['normal-large', 'Alert · Popup · Bottom sheet'],
  ['normal-xlarge', '최상위 오버레이 (예약)'],
];
const hexToRgba = (h: string) => { const x = h.slice(1); const v = (i: number) => parseInt(x.slice(i, i + 2), 16);
  return x.length === 8 ? `rgba(${v(0)}, ${v(2)}, ${v(4)}, ${+(v(6) / 255).toFixed(3)})` : h; };
const av = (n: string) => hexToRgba(tokens.atomic[n] || '#000000');
const bgL = av(tokens.semantic['background/normal/normal'].light);
const bgD = av(tokens.semantic['background/normal/normal'].dark);
const elL = av(tokens.semantic['background/elevated/normal'].light);
const elD = av(tokens.semantic['background/elevated/normal'].dark);

export default function ElevationPage() {
  return (
    <Page kicker="Foundations" title="Elevation" desc="떠 있는 정도가 위계입니다. 그림자는 Normal(아래로 지는 방향성)과 Spread(사방 확산) 두 종류, 각 단계는 쓰는 컴포넌트가 정해져 있습니다.">
      <Section title="두 종류" desc="Normal = 빛이 위에 있는 보통의 그림자. Spread = 다이얼로그처럼 배경에서 완전히 분리돼야 할 때.">
        <div className="fnd-diagram" style={{ gap: 40, background: '#F7F7F8' }}>
          <div className="fnd-node">
            <span style={{ width: 120, height: 72, borderRadius: 12, background: '#FFF', boxShadow: shadow('normal-medium') }} />
            <small>normal — 아래로</small>
          </div>
          <div className="fnd-node">
            <span style={{ width: 120, height: 72, borderRadius: 12, background: '#FFF', boxShadow: shadow('spread-medium') }} />
            <small>spread — 사방으로</small>
          </div>
        </div>
      </Section>
      <Section title="구성 원리" desc="small부터는 그림자 두 겹을 합성합니다 — 넓게 퍼지는 ambient + 아래로 지는 key. 한 겹보다 훨씬 자연스럽습니다.">
        <div className="fnd-diagram" style={{ gap: 40, background: '#F7F7F8' }}>
          <div className="fnd-node">
            <span style={{ width: 100, height: 64, borderRadius: 12, background: '#FFF', boxShadow: shadow('normal-medium', 0) }} />
            <small>ambient (y4 · b6)</small>
          </div>
          <span className="fnd-arrow" style={{ color: '#8A8A93' }}>+</span>
          <div className="fnd-node">
            <span style={{ width: 100, height: 64, borderRadius: 12, background: '#FFF', boxShadow: shadow('normal-medium', 1) }} />
            <small>key (y10 · b15)</small>
          </div>
          <span className="fnd-arrow" style={{ color: '#8A8A93' }}>=</span>
          <div className="fnd-node">
            <span style={{ width: 100, height: 64, borderRadius: 12, background: '#FFF', boxShadow: shadow('normal-medium') }} />
            <small>medium</small>
          </div>
        </div>
      </Section>
      <Section title="Levels" desc="None 포함 6단계 — 단계마다 쓰는 곳이 정해져 있어 컴포넌트가 임의로 고르지 않습니다.">
        <div className="elev-grid" style={{ padding: 24, borderRadius: 12, background: '#F7F7F8' }}>
          {LEVELS.map(([n, use]) => (
            <div className="elev-card" key={n} style={{ background: '#FFF', boxShadow: n === 'none' ? 'none' : shadow(n), border: n === 'none' ? '1px solid #E8E8EA' : 'none' }}>
              <div className="elev-name" style={{ color: '#171719' }}>{n.replace('normal-', '')}</div>
              <div className="elev-use" style={{ color: '#8A8A93' }}>{use}</div>
              <div style={{ marginTop: 6, fontFamily: '"IBM Plex Mono", monospace', fontSize: 9.5, color: '#AEAEB5' }}>{n === 'none' ? '—' : spec(n)}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Spread" desc="확산형 2단계 — 포커스 링 보조와 강조 카드·다이얼로그.">
        <div className="elev-grid" style={{ padding: 24, borderRadius: 12, background: '#F7F7F8' }}>
          {(['spread-small', 'spread-medium'] as const).map(n => (
            <div className="elev-card" key={n} style={{ background: '#FFF', boxShadow: shadow(n) }}>
              <div className="elev-name" style={{ color: '#171719' }}>{n.replace('spread-', '')}</div>
              <div className="elev-use" style={{ color: '#8A8A93' }}>{n === 'spread-small' ? '포커스 링 보조' : '강조 카드 · 다이얼로그'}</div>
              <div style={{ marginTop: 6, fontFamily: '"IBM Plex Mono", monospace', fontSize: 9.5, color: '#AEAEB5' }}>{spec(n)}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="다크 모드의 위계" desc="다크에선 그림자가 거의 보이지 않습니다 — 표면 명도 차(background/elevated)가 주 위계이고, 그림자는 보조입니다.">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ background: bgL, borderRadius: 12, padding: 24, width: 240 }}>
            <div style={{ background: elL, boxShadow: shadow('normal-medium'), borderRadius: 12, padding: 16, color: '#171719', fontSize: 13 }}>
              라이트 — 그림자가 층을 만든다
            </div>
          </div>
          <div style={{ background: bgD, borderRadius: 12, padding: 24, width: 240 }}>
            <div style={{ background: elD, boxShadow: shadow('normal-medium'), borderRadius: 12, padding: 16, color: '#E9E9EA', fontSize: 13 }}>
              다크 — 밝은 표면이 층을 만든다
            </div>
          </div>
        </div>
      </Section>
      <Section title="매핑" desc="컴포넌트 문서와 1:1 — 여기 없는 조합은 쓰지 않습니다.">
        <Table style={{ width: '100%', maxWidth: 640 }} columns={[
          { key: 'l', header: '단계' }, { key: 's', header: '표면' }, { key: 'u', header: '쓰는 곳' },
        ]} data={[
          { l: 'xsmall', s: 'elevated', u: '세그먼트 썸 · 스위치 노브' },
          { l: 'small', s: 'elevated', u: 'Card elevated · Slider 노브' },
          { l: 'medium', s: 'elevated', u: 'Menu · Popover · Toast · Snackbar' },
          { l: 'large', s: 'elevated', u: 'Alert · Popup · Bottom sheet' },
          { l: 'spread', s: 'elevated', u: '포커스 링 보조 · 강조 다이얼로그' },
        ]} />
        <p className="section-desc" style={{ marginTop: 14 }}>그림자만 올리지 않습니다 — 표면은 항상 <code>background/elevated-normal</code>과 짝입니다.</p>
        <Chips primary="사용" items={['box-shadow: var(--iris-elevation-normal-medium)', '배경 = background/elevated-normal']} />
      </Section>
    </Page>
  );
}
