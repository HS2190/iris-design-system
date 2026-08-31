import { useState } from 'react';
import tokens from '@iris/tokens';
import { Button, Icon } from '@iris/react';
import { Page, Section, DoDont } from '../components/Doc';

const hexToRgba = (h: string) => {
  const x = h.slice(1); const v = (i: number) => parseInt(x.slice(i, i + 2), 16);
  return x.length === 8 ? `rgba(${v(0)}, ${v(2)}, ${v(4)}, ${+(v(6) / 255).toFixed(3)})` : h;
};
const av = (name: string) => (tokens.atomic[name] ? hexToRgba(tokens.atomic[name]) : '');
const sem = (name: string) => {
  const s = tokens.semantic[name];
  return { light: av(s.light), dark: av(s.dark), lightRef: s.light, darkRef: s.dark };
};

const GROUPS: [string, string, string[]][] = [
  ['Primary', '브랜드 보라. 주 행동 버튼·선택 상태·포커스처럼 "지금 누르라"는 신호에만 씁니다. strong은 hover, heavy는 pressed.', ['primary/normal', 'primary/strong', 'primary/heavy']],
  ['Label', '텍스트 위계. normal이 기준이고 아래로 갈수록 보조 정보 — 위계를 건너뛰지 않습니다.', ['label/normal', 'label/strong', 'label/neutral', 'label/alternative', 'label/assistive', 'label/disable', 'label/primary']],
  ['Background', '바닥면. normal은 페이지, elevated는 떠 있는 표면(카드·메뉴·모달) — 다크에서는 이 명도 차가 곧 위계입니다.', ['background/normal/normal', 'background/normal/alternative', 'background/elevated/normal', 'background/elevated/alternative', 'background/transparent/normal', 'background/transparent/alternative']],
  ['Background · status', '상태 틴트 바닥 — Section message처럼 "머무는 안내"의 배경.', ['background/status/info', 'background/status/positive', 'background/status/cautionary', 'background/status/negative', 'background/status/neutral']],
  ['Line', '보더·구분선. solid는 불투명, normal은 알파 — 겹침이 있는 곳(입력 보더)은 알파 계열을 씁니다.', ['line/normal/normal', 'line/normal/neutral', 'line/normal/alternative', 'line/solid/normal', 'line/solid/neutral', 'line/solid/alternative', 'line/strong', 'line/primary/normal', 'line/primary/strong']],
  ['Line · status', '상태 보더 — 입력 오류·상태 알림의 테두리.', ['line/status/info', 'line/status/positive', 'line/status/cautionary', 'line/status/negative', 'line/status/neutral']],
  ['Fill', '면 채움 — 트랙·칩·셀 배경처럼 넓게 칠하는 회색 면.', ['fill/normal', 'fill/strong', 'fill/alternative', 'fill/primary']],
  ['Interaction', '상호작용 상태 레이어 — hover/pressed는 어떤 표면 위에도 얹히는 알파.', ['interaction/hover', 'interaction/pressed', 'interaction/focus-ring', 'interaction/inactive', 'interaction/disable']],
  ['Status', '의미 색 원색 — 아이콘·텍스트용. 배경이 필요하면 background/status를 씁니다.', ['status/info', 'status/positive', 'status/cautionary', 'status/negative', 'status/neutral']],
  ['Accent', '표현색 — 태그·차트·일러스트. 6색 × background(솔리드)/foreground(글자)/subtle(틴트).', ['accent/violet/background', 'accent/violet/foreground', 'accent/violet/subtle', 'accent/blue/background', 'accent/blue/foreground', 'accent/blue/subtle', 'accent/teal/background', 'accent/teal/foreground', 'accent/teal/subtle', 'accent/green/background', 'accent/green/foreground', 'accent/green/subtle', 'accent/orange/background', 'accent/orange/foreground', 'accent/orange/subtle', 'accent/red/background', 'accent/red/foreground', 'accent/red/subtle']],
  ['Inverse', '반전 표면 — Toast·Snackbar처럼 어느 화면 위에서든 떠야 하는 것.', ['inverse/background', 'inverse/label', 'inverse/primary']],
  ['Material', '오버레이 재질 — Scrim 하나뿐입니다.', ['material/dimmer']],
  ['Static', '테마 불변 — 흰 글자·검정처럼 라이트/다크가 같아야 하는 색.', ['static/white', 'static/black']],
];


const famOf = (k: string) => k.split('/')[0];
const FAM_USE: Record<string, string> = {
  violet: '브랜드 — primary 전 계열 · status/info',
  coolNeutral: '회색 전부 — label · background · line · fill',
  neutral: '웜 그레이 예비 (현재 미사용)',
  blue: 'accent 전용 — 태그·차트',
  teal: 'accent 전용 — 태그·차트',
  green: 'status/positive + accent',
  orange: 'status/cautionary + accent',
  red: 'status/negative + accent',
  common: 'black·white — static · 반전 표면',
};
const FAMS = [...new Set(Object.keys(tokens.atomic).map(famOf))];

export default function ColorPage() {
  const [copied, setCopied] = useState('');
  const cssVar = (n: string) => `--iris-semantic-${n.replace(/\//g, '-')}`;
  const copy = (n: string) => { navigator.clipboard?.writeText(`var(${cssVar(n)})`); setCopied(n); };
  const pn = sem('primary/normal');
  return (
    <Page kicker="Foundations" title="Color" desc="아토믹(명도 스케일) 위에 시멘틱(역할 → 강도)을 얹은 2층 구조입니다. 컴포넌트는 시멘틱만 참조하고, 라이트/다크는 시멘틱 층에서 갈립니다 — 코드는 테마를 몰라도 됩니다.">
      <Section title="구조" desc="원료(아토믹) → 역할(시멘틱) → 컴포넌트. 다크 모드는 가운데 층의 재매핑만으로 끝납니다.">
        <div className="fnd-diagram">
          <div className="fnd-node"><span className="chip" style={{ background: av(pn.lightRef) }} /><small>atomic · {pn.lightRef}</small></div>
          <span className="fnd-arrow"><Icon name="arrow-right" size={18} /></span>
          <div className="fnd-node"><span className="chip" style={{ background: 'var(--iris-semantic-primary-normal)' }} /><small>semantic · primary/normal</small></div>
          <span className="fnd-arrow"><Icon name="arrow-right" size={18} /></span>
          <div className="fnd-node"><Button size="s">저장</Button><small>component</small></div>
          <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--iris-semantic-label-assistive)', maxWidth: 240, lineHeight: 1.6 }}>
            다크에서는 primary/normal이 {pn.darkRef}로 재매핑될 뿐, 버튼 코드는 그대로입니다.
          </span>
        </div>
      </Section>
      <Section title="Semantic" desc="타일은 현재 테마의 실제 색 — 좌측 하단 토글로 다크 값을 확인하세요. 클릭 = var() 복사, 호버 = 원료(atomic) 확인.">
        {GROUPS.map(([t, d, names]) => (
          <div className="fnd-group" key={t}>
            <div className="fnd-group-title">{t}</div>
            <div className="fnd-group-desc">{d}</div>
            <div className="swt-grid">
              {names.map(n => {
                const s = sem(n);
                const last = n.split('/').slice(1).join('/') || n;
                return (
                  <button key={n} className="swt" onClick={() => copy(n)}
                    title={`${n} · L ${s.lightRef} → D ${s.darkRef}`}>
                    <span className="swt-tile" style={{ background: `var(${cssVar(n)})` }} />
                    <span className="swt-name">{copied === n ? '복사됨!' : <b>{last}</b>}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </Section>
      <Section title="Atomic" desc="명도 번호가 곧 이름 — /50이 기준 명도, 숫자가 클수록 밝습니다. 컴포넌트에서 직접 쓰지 않고 시멘틱의 재료로만 씁니다.">
        {FAMS.map(f => {
          const cells = Object.keys(tokens.atomic).filter(k => famOf(k) === f)
            .sort((a, b) => Number(a.split('/')[1]) - Number(b.split('/')[1]));
          if (!cells.length) return null;
          return (
            <div className="fam-row" key={f}>
              <span className="fam-name">{f}<em style={{ display: 'block', fontStyle: 'normal', fontSize: 9.5, color: 'var(--iris-semantic-label-assistive)', marginTop: 2, fontFamily: 'var(--iris-font-family)' }}>{FAM_USE[f] || ''}</em></span>
              {cells.map(k => (
                <span key={k} className="fam-cell" style={{ background: av(k) }} title={`${k} · ${tokens.atomic[k]}`} />
              ))}
            </div>
          );
        })}
      </Section>
      <Section title="Opacity" desc="알파 파생의 재료 — line/normal·interaction·transparent 계열이 coolNeutral × opacity로 만들어집니다.">
        <div className="op-grid">
          {Object.entries(tokens.scales.opacity).sort((a, b) => Number(a[0]) - Number(b[0])).map(([n, v]) => (
            <span className="op-cell" key={n}>
              <span className="op-chip"><i style={{ opacity: v }} /></span>
              <small style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10.5, color: 'var(--iris-semantic-label-assistive)' }}>{n} · {v}</small>
            </span>
          ))}
        </div>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="시멘틱 참조 — 다크가 공짜" doBody="같은 텍스트 — label/neutral을 쓰면 두 테마 모두에서 읽힙니다."
          doEx={<div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: '#FFF', color: sem('label/neutral').light, padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>라이트에서 읽힘</span>
            <span style={{ background: '#1B1C1E', color: sem('label/neutral').dark, padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>다크에서도 읽힘</span>
          </div>}
          dontTitle="아토믹 직접 참조" dontBody="같은 텍스트에 coolNeutral 고정값을 쓰면 다크에서 사라집니다."
          dontEx={<div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: '#FFF', color: sem('label/neutral').light, padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>라이트에서 읽힘</span>
            <span style={{ background: '#1B1C1E', color: sem('label/neutral').light, padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>다크에선 안 보임</span>
          </div>} />
        <div className="codeline" style={{ marginTop: 16 }}>{'color: var(--iris-semantic-label-neutral);  /* ✓ */   color: var(--iris-atomic-cool-neutral-40);  /* ✗ */'}</div>
      </Section>
    </Page>
  );
}
