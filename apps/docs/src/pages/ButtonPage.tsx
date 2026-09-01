import { useEffect, useState } from 'react';
import { Button, TextField } from '@iris/react';
import { CodeBlock, PlatformSpec } from '../components/Doc';

const variants = ['solid', 'outlined'] as const;
const colors = ['primary', 'assistive'] as const;
const sizes = ['l', 'm', 's'] as const;

function Seg<T extends string>({ label, value, options, onChange }:
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

export default function ButtonPage() {
  useEffect(() => { document.title = 'Button · Iris'; return () => { document.title = 'Iris Design System'; }; }, []);
  const [variant, setVariant] = useState<typeof variants[number]>('solid');
  const [color, setColor] = useState<typeof colors[number]>('primary');
  const [size, setSize] = useState<typeof sizes[number]>('m');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const code = `<Button variant="${variant}" color="${color}" size="${size}"${disabled ? ' disabled' : ''}${loading ? ' loading' : ''}>버튼</Button>`;

  return (
    <>
      <p className="page-kicker">Components · Actions</p>
      <h1 className="page-title">Button</h1>
      <p className="page-desc">작업을 수행하는 클릭 가능한 요소입니다. 콘텐츠 또는 화면 하단에 배치되어 메인·대체·보조 행동을 제시합니다. 높이는 고정하고 너비만 조절합니다.</p>

      <h2 className="section">Playground</h2>
      <div className="playground">
        <div className="playground-stage">
          <Button variant={variant} color={color} size={size} disabled={disabled} loading={loading}
            leadingIcon={variant === 'solid' && color === 'primary' ? 'plus' : undefined}>버튼</Button>
        </div>
        <div className="playground-panel">
          <Seg label="variant" value={variant} options={variants} onChange={setVariant} />
          <Seg label="color" value={color} options={colors} onChange={setColor} />
          <Seg label="size" value={size} options={sizes} onChange={setSize} />
          <Seg label="disabled" value={String(disabled) as 'true' | 'false'} options={['false', 'true'] as const} onChange={v => setDisabled(v === 'true')} />
          <Seg label="loading" value={String(loading) as 'true' | 'false'} options={['false', 'true'] as const} onChange={v => setLoading(v === 'true')} />
        </div>
      </div>

      <h2 className="section">Variants</h2>
      <p className="section-desc">Variant(Solid·Outlined) × Color(Primary·Assistive). 위계는 Solid Primary(메인) → Outlined Primary(대체) → Solid Assistive(토글 보조) → Outlined Assistive(닫기·취소) 순입니다.</p>
      <div className="canvas">
        {variants.map(v => colors.map(c => (
          <div className="spec" key={v + c}>
            <Button variant={v} color={c}>버튼</Button>
            <small>{v} · {c}</small>
          </div>
        )))}
      </div>

      <h2 className="section">States</h2>
      <p className="section-desc">Hover는 <code>interaction/hover</code>(Solid Primary는 <code>primary/strong</code>), Pressed는 <code>interaction/pressed</code>(<code>primary/heavy</code>), 키보드 포커스는 <code>interaction/focus-ring</code> 2px 링으로 표시됩니다. 마우스를 올리거나 Tab으로 이동해 확인하세요.</p>
      <div className="canvas">
        <div className="spec"><Button>Default</Button><small>default</small></div>
        <div className="spec"><Button loading>저장</Button><small>loading</small></div>
        <div className="spec"><Button disabled>Disabled</Button><small>disabled</small></div>
        <div className="spec"><Button variant="outlined" color="assistive" disabled>Disabled</Button><small>outlined · disabled</small></div>
      </div>

      <h2 className="section">Usage</h2>
      <p className="section-desc">폼 하단 제출 영역 — 주 행동 하나 + 보조 행동, 오른쪽 정렬.</p>
      <div className="canvas">
        <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField label="이메일" placeholder="example@email.com" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="outlined" color="assistive">취소</Button>
            <Button>저장</Button>
          </div>
        </div>
      </div>
      <h2 className="section">Size</h2>
      <p className="section-desc">높이 고정 · 너비 자유. 주황 = 패딩, 청록 = 아이콘–라벨 간격(px). 수치는 전부 토큰입니다.</p>
      <div className="canvas col" style={{ gap: 8 }}>
        <div className="size-hero-wrap">
          <div className="size-hero">
            <div className="stage">
              <Button size="m" leadingIcon="plus">버튼</Button>
              {/* M: h42 · pad-inline 20 · pad-block 10 · icon 18 → gap 4 (x 38~42). 수치는 전부 존 밖에 표기 */}
              <span className="size-zone pad" style={{ left: 0, top: 0, width: 20, height: 42 }}>20</span>
              <span className="size-zone pad" style={{ right: 0, top: 0, width: 20, height: 42 }}>20</span>
              <span className="size-zone pad" style={{ left: 20, right: 20, top: 0, height: 10 }}>10</span>
              <span className="size-zone pad" style={{ left: 20, right: 20, bottom: 0, height: 10 }}>10</span>
              <span className="size-zone gap" style={{ left: 38, top: 10, width: 4, bottom: 10 }} />
              <span className="size-num gapnum" style={{ left: 40, top: -14, transform: 'translateX(-50%)' }}>4</span>
            </div>
          </div>
          <div className="size-hero-caption">
            <b>M · 기본</b>
            <span className="sub">높이 42 · radius-sm 10 · body-2 700</span>
            <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
          </div>
        </div>
        <div className="size-row">
          {([['l', 'H 48', 'P 12 \u00b7 32', 'G 6', 'R 12', 'body-1'], ['m', 'H 42', 'P 10 \u00b7 20', 'G 4', 'R 10', 'body-2'], ['s', 'H 34', 'P 8 \u00b7 14', 'G 4', 'R 8', 'label-2']] as const).map(([sz, ...chips]) => (
            <div className="size-item" key={sz}>
              <div className="spec-chips">
                <span className="spec-chip primary">{sz.toUpperCase()}</span>
                {chips.map(c => <span className="spec-chip" key={c}>{c}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section">Icon</h2>
      <p className="section-desc">Leading 아이콘은 라벨의 보조 설명, Trailing 아이콘은 행동 유도에 씁니다.</p>
      <div className="canvas">
        <Button leadingIcon="plus">항목 추가</Button>
        <Button trailingIcon="arrow-right">다음</Button>
        <Button variant="outlined" color="assistive" leadingIcon="share">공유</Button>
      </div>

      <h2 className="section">How to use</h2>
      <div className="dodont">
        <div className="dd do">
          <b>Do — 주요 액션은 오른쪽, 보조는 왼쪽</b>
          <div className="row">
            <Button variant="outlined" color="assistive">취소</Button>
            <Button>저장</Button>
          </div>
          <p>폼·시트의 확정 영역에서 주요 액션은 항상 오른쪽에 둡니다.</p>
        </div>
        <div className="dd dont">
          <b>Don't — Primary 두 개 나란히</b>
          <div className="row">
            <Button>확인</Button>
            <Button>확인</Button>
          </div>
          <p>화면당 Solid Primary는 하나. 높이·둥글기를 임의로 바꾸지 않습니다.</p>
        </div>
      </div>

      <h2 className="section">Code</h2>
      <p className="section-desc">Playground에서 고른 설정이 그대로 반영됩니다.</p>
      <CodeBlock code={code} name="Button" />
      <PlatformSpec name="Button" />

      <h2 className="section">Props</h2>
      <table className="props">
        <thead><tr><th>prop</th><th>type</th><th>default</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td>variant</td><td><code>'solid' | 'outlined'</code></td><td><code>'solid'</code></td><td>채움 / 테두리</td></tr>
          <tr><td>color</td><td><code>'primary' | 'assistive'</code></td><td><code>'primary'</code></td><td>메인 / 보조 행동</td></tr>
          <tr><td>size</td><td><code>'l' | 'm' | 's'</code></td><td><code>'m'</code></td><td>높이 48 / 42 / 34</td></tr>
          <tr><td>leadingIcon</td><td><code>IconName</code></td><td>—</td><td>라벨 앞 아이콘</td></tr>
          <tr><td>trailingIcon</td><td><code>IconName</code></td><td>—</td><td>라벨 뒤 아이콘</td></tr>
          <tr><td>loading</td><td><code>boolean</code></td><td><code>false</code></td><td>스피너 표시 + 클릭 차단 (<code>aria-busy</code>)</td></tr>
          <tr><td>disabled</td><td><code>boolean</code></td><td><code>false</code></td><td>비활성</td></tr>
        </tbody>
      </table>
    </>
  );
}
