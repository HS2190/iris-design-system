import { useState } from 'react';
import { Page, Section, useCssVars } from '../components/Doc';

const GROUPS: [string, string, string[]][] = [
  ['Primary', '브랜드 보라 — 주 행동·선택·포커스', ['primary-normal', 'primary-strong', 'primary-heavy']],
  ['Label', '텍스트 위계 — normal이 기준, 아래로 갈수록 보조', ['label-normal', 'label-strong', 'label-neutral', 'label-alternative', 'label-assistive', 'label-disable', 'label-primary']],
  ['Background', '바닥면 — elevated는 떠 있는 표면(카드·메뉴·모달)', ['background-normal-normal', 'background-normal-alternative', 'background-elevated-normal', 'background-elevated-alternative', 'background-transparent-normal', 'background-transparent-alternative']],
  ['Background · status', '상태 틴트 바닥 (Section message 등)', ['background-status-info', 'background-status-positive', 'background-status-cautionary', 'background-status-negative', 'background-status-neutral']],
  ['Line', '보더·구분선 — solid는 불투명, normal은 알파', ['line-normal-normal', 'line-normal-neutral', 'line-normal-alternative', 'line-solid-normal', 'line-solid-neutral', 'line-solid-alternative', 'line-strong', 'line-primary-normal', 'line-primary-strong']],
  ['Line · status', '상태 보더 (입력 오류 등)', ['line-status-info', 'line-status-positive', 'line-status-cautionary', 'line-status-negative', 'line-status-neutral']],
  ['Fill', '면 채움 — 트랙·칩·셀 배경', ['fill-normal', 'fill-strong', 'fill-alternative', 'fill-primary']],
  ['Interaction', '상호작용 상태 레이어', ['interaction-hover', 'interaction-pressed', 'interaction-focus-ring', 'interaction-inactive', 'interaction-disable']],
  ['Status', '의미 색 — 아이콘·텍스트용 원색', ['status-info', 'status-positive', 'status-cautionary', 'status-negative', 'status-neutral']],
  ['Accent', '태그·차트 등 표현색 — 6색 × background/foreground/subtle', ['accent-violet-background', 'accent-violet-foreground', 'accent-violet-subtle', 'accent-blue-background', 'accent-blue-foreground', 'accent-blue-subtle', 'accent-teal-background', 'accent-teal-foreground', 'accent-teal-subtle', 'accent-green-background', 'accent-green-foreground', 'accent-green-subtle', 'accent-orange-background', 'accent-orange-foreground', 'accent-orange-subtle', 'accent-red-background', 'accent-red-foreground', 'accent-red-subtle']],
  ['Inverse', '반전 표면 — Toast·Snackbar', ['inverse-background', 'inverse-label', 'inverse-primary']],
  ['Material', '오버레이 재질 — Scrim', ['material-dimmer']],
  ['Static', '테마 불변', ['static-white', 'static-black']],
];
const ALL_SEMANTIC = GROUPS.flatMap(g => g[2]).map(n => `--iris-semantic-${n}`);

const FAMILIES = ['cool-neutral', 'neutral', 'violet', 'blue', 'teal', 'green', 'orange', 'red', 'common'];
const STEPS = [0, 5, 10, 15, 20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 97, 98, 99, 100];
const ATOMIC_NAMES = FAMILIES.flatMap(f => STEPS.map(s => `--iris-atomic-${f}-${s}`));

export default function ColorPage() {
  const vals = useCssVars([...ALL_SEMANTIC, ...ATOMIC_NAMES]);
  const [copied, setCopied] = useState('');
  const copy = (v: string) => { navigator.clipboard?.writeText(`var(${v})`); setCopied(v); };
  return (
    <Page kicker="Foundations" title="Color" desc="아토믹(명도 스케일) 위에 시멘틱(역할 → 강도)을 얹은 2층 구조입니다. 컴포넌트는 시멘틱만 씁니다 — 라이트/다크는 시멘틱 층에서 갈립니다.">
      <Section title="Semantic" desc="클릭하면 var(--iris-semantic-…)가 복사됩니다. 값은 현재 테마 기준 — 우측 하단 토글로 다크 값을 확인하세요.">
        {GROUPS.map(([t, d, tokens]) => (
          <div className="fnd-group" key={t}>
            <div className="fnd-group-title">{t}</div>
            <div className="fnd-group-desc">{d}</div>
            <div className="swatch-grid">
              {tokens.map(n => {
                const v = `--iris-semantic-${n}`;
                return (
                  <button key={n} className="swatch" onClick={() => copy(v)} title={copied === v ? '복사됨!' : `var(${v})`}>
                    <span className="swatch-chip" style={{ background: `var(${v})` }} />
                    <span className="swatch-meta">
                      <span className="swatch-name">{n}</span>
                      <span className="swatch-val">{copied === v ? '복사됨!' : vals[v] || ''}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </Section>
      <Section title="Atomic" desc="명도 번호 스케일 — /50이 기준 명도입니다. 컴포넌트에서 직접 쓰지 않고, 시멘틱 토큰의 재료로만 씁니다.">
        {FAMILIES.map(f => {
          const cells = STEPS.filter(s => vals[`--iris-atomic-${f}-${s}`]);
          if (cells.length === 0) return null;
          return (
            <div className="fam-row" key={f}>
              <span className="fam-name">{f}</span>
              {cells.map(s => (
                <span key={s} className="fam-cell" style={{ background: `var(--iris-atomic-${f}-${s})` }}
                  title={`${f}-${s} · ${vals[`--iris-atomic-${f}-${s}`]}`} />
              ))}
            </div>
          );
        })}
      </Section>
      <Section title="사용 규칙">
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--iris-semantic-label-neutral)', fontSize: 14.5, lineHeight: 1.9 }}>
          <li>컴포넌트·화면은 <b>시멘틱 토큰만</b> 참조합니다. 아토믹 직접 사용 금지.</li>
          <li>다크 모드는 시멘틱 층에서 재매핑됩니다 — 코드는 <code>data-theme="dark"</code>만 바꾸면 됩니다.</li>
          <li>투명 계열(line/normal·interaction·transparent)은 coolNeutral × opacity 알파 파생입니다.</li>
          <li>상태색은 status/* 하나로 통일 — Content badge·Section message·입력 오류가 같은 토큰을 씁니다.</li>
        </ul>
      </Section>
    </Page>
  );
}
