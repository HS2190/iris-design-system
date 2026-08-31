import { useState } from 'react';
import { Chip } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, DoDont, Props, Playground, Seg } from '../components/Doc';

export default function ChipPage() {
  const [variant, setVariant] = useState<'solid' | 'outlined'>('outlined');
  const [size, setSize] = useState<'m' | 's'>('m');
  const [selected, setSelected] = useState(true);
  const [filters, setFilters] = useState<string[]>(['디자인']);
  const toggle = (f: string) => setFilters(v => v.includes(f) ? v.filter(x => x !== f) : [...v, f]);
  return (
    <Page kicker="Components · Actions" title="Chip" desc="태그·필터·선택 항목을 표현하는 작은 액션입니다. 선택할 수 있는 모든 값이 한 화면에 보일 때 그룹으로 씁니다. 높이는 고정입니다.">
      <Section title="Playground">
        <Playground
          stage={<Chip variant={variant} size={size} selected={selected} onClick={() => setSelected(v => !v)}>필터</Chip>}
          panel={<>
            <Seg label="variant" value={variant} options={['solid', 'outlined'] as const} onChange={setVariant} />
            <Seg label="size" value={size} options={['m', 's'] as const} onChange={setSize} />
            <Seg label="selected" value={String(selected) as 'true' | 'false'} options={['false', 'true'] as const} onChange={v => setSelected(v === 'true')} />
          </>}
          code={`<Chip variant="${variant}" size="${size}"${selected ? ' selected' : ''}>필터</Chip>`} />
      </Section>
      <Section title="Variants" desc="Selected는 Solid = primary 채움, Outlined = fill/primary + primary 라인입니다.">
        <Canvas>
          <Spec label="outlined"><Chip>필터</Chip></Spec>
          <Spec label="outlined · selected"><Chip selected>필터</Chip></Spec>
          <Spec label="solid"><Chip variant="solid">필터</Chip></Spec>
          <Spec label="solid · selected"><Chip variant="solid" selected>필터</Chip></Spec>
          <Spec label="disabled"><Chip disabled>필터</Chip></Spec>
        </Canvas>
      </Section>
      <Section title="Chip group" desc="다중 선택 필터 — 실제로 눌러보세요.">
        <Canvas>
          {['전체', '디자인', '개발', '마케팅'].map(f => (
            <Chip key={f} selected={filters.includes(f)} onClick={() => toggle(f)}>{f}</Chip>
          ))}
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩(px). 높이 고정 · 너비 자유.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage">
                <Chip size="m">필터</Chip>
                {/* M: h36 · pad-inline 14 · pad-block (36-20)/2 = 8 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 14, height: 36 }}>14</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 14, height: 36 }}>14</span>
                <span className="size-zone pad" style={{ left: 14, right: 14, top: 0, height: 8 }}>8</span>
                <span className="size-zone pad" style={{ left: 14, right: 14, bottom: 0, height: 8 }}>8</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>M · 기본</b>
              <span className="sub">높이 36 · radius-full · label-1 500</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><div className="size-slot" style={{ height: 36 }}><Chip size="m">Chip M</Chip></div><Chips primary="M" items={['H 36', 'P 14', 'R full', 'label-1']} /></div>
            <div className="size-item"><div className="size-slot" style={{ height: 36 }}><Chip size="s">Chip S</Chip></div><Chips primary="S" items={['H 30', 'P 12', 'R full', 'label-2']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="한 화면에 다 보이는 선택지" doBody="칩 그룹은 옵션 전체가 보일 때만. 상태는 selected로 표시합니다."
          doEx={<><Chip selected>디자인</Chip><Chip>개발</Chip><Chip>마케팅</Chip></>}
          dontTitle="긴 문장·내비게이션" dontBody="칩은 짧은 값 전용입니다. 페이지 이동은 Tab, 읽기 전용 상태는 Content badge를 쓰세요."
          dontEx={<Chip>지원 자격을 확인한 후 신청해 주세요</Chip>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['variant', "'solid' | 'outlined'", "'outlined'", '채움 / 테두리'],
          ['size', "'m' | 's'", "'m'", '높이 36 / 30'],
          ['selected', 'boolean', 'false', '선택 상태 (aria-pressed)'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
