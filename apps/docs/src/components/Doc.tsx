import { useState } from 'react';

/** 문서 페이지 공용 빌딩블록 — 모든 컴포넌트 페이지가 같은 형식을 쓰게 한다. */

export function Page({ kicker, title, desc, children }:
  { kicker: string; title: string; desc: string; children: React.ReactNode }) {
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

export function Playground({ stage, panel, code }:
  { stage: React.ReactNode; panel: React.ReactNode; code: string }) {
  return (<>
    <div className="playground">
      <div className="playground-stage">{stage}</div>
      <div className="playground-panel">{panel}</div>
    </div>
    <div className="codeline" style={{ marginTop: 12 }}>{code}</div>
  </>);
}

export function useSeg<T extends string>(initial: T) { return useState<T>(initial); }
