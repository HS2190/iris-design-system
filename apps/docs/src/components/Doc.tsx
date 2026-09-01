import { useEffect, useState } from 'react';
import { COMPONENT_TOKENS, PLATFORM_VALUES } from '../lib/component-tokens';

/** 문서 페이지 공용 빌딩블록 — 모든 컴포넌트 페이지가 같은 형식을 쓰게 한다. */

export function Page({ kicker, title, desc, children }:
  { kicker: string; title: string; desc: string; children: React.ReactNode }) {
  useEffect(() => { document.title = `${title} · Iris`; return () => { document.title = 'Iris Design System'; }; }, [title]);
  return (<>
    <p className="page-kicker">{kicker}</p>
    <h1 className="page-title">{title}</h1>
    <p className="page-desc">{desc}</p>
    {children}
  </>);
}

export function Section({ title, desc, children }:
  { title: string; desc?: React.ReactNode; children?: React.ReactNode }) {
  return (<>
    <h2 className="section">{title}</h2>
    {desc && <p className="section-desc">{desc}</p>}
    {children}
  </>);
}

export function Canvas({ col, children, style }: { col?: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className={col ? 'canvas col' : 'canvas'} style={style}>{children}</div>;
}

export function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="spec">{children}<small>{label}</small></div>;
}

export function Chips({ items, primary }: { items: string[]; primary?: string }) {
  return (
    <div className="spec-chips">
      {primary && <span className="spec-chip primary">{primary}</span>}
      {items.map(c => <span className="spec-chip" key={c}>{c}</span>)}
    </div>
  );
}

export function DoDont({ doTitle, doBody, dontTitle, dontBody, doEx, dontEx }:
  { doTitle: string; doBody: string; dontTitle: string; dontBody: string; doEx: React.ReactNode; dontEx: React.ReactNode }) {
  return (
    <div className="dodont">
      <div className="dd do"><b>Do — {doTitle}</b><div className="row">{doEx}</div><p>{doBody}</p></div>
      <div className="dd dont"><b>Don't — {dontTitle}</b><div className="row">{dontEx}</div><p>{dontBody}</p></div>
    </div>
  );
}

export function Props({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <table className="props">
      <thead><tr><th>prop</th><th>type</th><th>default</th><th>설명</th></tr></thead>
      <tbody>{rows.map(r => (
        <tr key={r[0]}><td>{r[0]}</td><td><code>{r[1]}</code></td><td>{r[2] === '—' ? '—' : <code>{r[2]}</code>}</td><td>{r[3]}</td></tr>
      ))}</tbody>
    </table>
  );
}

export function Seg<T extends string>({ label, value, options, onChange }:
  { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="control">
      <label>{label}</label>
      <div className="seg" role="group" aria-label={label}>
        {options.map(o => <button key={o} className={value === o ? 'on' : ''} onClick={() => onChange(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export function Playground({ stage, panel }:
  { stage: React.ReactNode; panel: React.ReactNode }) {
  return (
    <div className="playground">
      <div className="playground-stage">{stage}</div>
      <div className="playground-panel">{panel}</div>
    </div>
  );
}

/** Code 섹션 — 붙여넣으면 도는 코드 + 네이티브 구현에 필요한 수치 */
export function CodeSpec({ name, code }: { name: string; code: string }) {
  return (<>
    <CodeBlock code={code} name={name} />
    <PlatformSpec name={name} />
  </>);
}

/** import 줄까지 갖춘 코드 블록 — 붙여넣으면 그대로 도는 형태 */
export function CodeBlock({ code, name }: { code: string; name?: string }) {
  const full = name
    ? `import { ${name} } from '@iris/react';\nimport '@iris/tokens/css';\nimport '@iris/react/styles.css';\n\n${code}`
    : code;
  return <pre className="codeblock">{full}</pre>;
}

/**
 * 이 컴포넌트가 참조하는 플랫폼 토큰의 세 값.
 * 웹 코드만 제공하므로, 네이티브 구현자에게 필요한 것은 코드가 아니라 이 수치다.
 */
export function PlatformSpec({ name }: { name: string }) {
  const info = COMPONENT_TOKENS[name];
  if (!info) return null;
  return (
    <div className="platspec">
      <div className="platspec-head">
        <b>플랫폼 구현 스펙</b>
        {info.tokenCount > 0 && <small>참조 토큰 {info.tokenCount}개</small>}
      </div>
      {info.platform.length ? (
        <table className="props platspec-table">
          <thead>
            <tr><th>토큰</th><th>웹</th><th>iOS</th><th>Android</th></tr>
          </thead>
          <tbody>
            {info.platform.map(t => {
              const v = PLATFORM_VALUES[t];
              return (
                <tr key={t}>
                  <td>{t}</td>
                  <td>{v.web}</td><td>{v.ios}</td><td>{v.android}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="platspec-note">
          플랫폼에 따라 달라지는 값이 없습니다 — 세 플랫폼에서 같은 수치를 씁니다.
        </p>
      )}
      <p className="platspec-foot">
        {info.platform.length
          ? '제공되는 코드는 웹(React + CSS 변수)뿐입니다. iOS·Android는 위 값으로 구현합니다.'
          : '제공되는 코드는 웹(React + CSS 변수)뿐입니다. 네이티브에서도 같은 수치로 구현합니다.'}
      </p>
    </div>
  );
}

export function useSeg<T extends string>(initial: T) { return useState<T>(initial); }

/** CSS 변수 실값 구독 — 테마 전환에 반응 */
export function useCssVars(names: readonly string[]): Record<string, string> {
  const [vals, setVals] = useState<Record<string, string>>({});
  const key = names.join('|');
  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      key.split('|').forEach(n => { if (n) next[n] = cs.getPropertyValue(n).trim(); });
      setVals(next);
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', read);
    return () => { mo.disconnect(); mq.removeEventListener('change', read); };
  }, [key]);
  return vals;
}
