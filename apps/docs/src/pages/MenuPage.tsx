import { useState } from 'react';
import { Menu, type MenuItem, Icon, Select } from '@iris/react';
import { Page, Section, Canvas, Chips, Playground, DoDont, Props } from '../components/Doc';

const items: MenuItem[] = [
  { id: 'edit', label: '수정', icon: 'edit' },
  { id: 'share', label: '공유', icon: 'share' },
  { id: 'del', label: '삭제', icon: 'trash', danger: true, divider: true },
];

export default function MenuPage() {
  const [open, setOpen] = useState(true);
  const [last, setLast] = useState<string | null>(null);
  return (
    <Page kicker="Components · Presentation" title="Menu" desc="더보기·우클릭에서 뜨는 행동 목록입니다. 항목 40 · 외곽 패딩 6, 파괴적 행동은 구분선 아래 negative로.">
      <Section title="Playground" desc="더보기를 눌러 여닫고, 항목을 선택해 보세요.">
        <Playground
          stage={<div style={{ position: 'relative', paddingBottom: open ? 150 : 0 }}>
            <button aria-label="더보기" aria-expanded={open} onClick={() => setOpen(v => !v)}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--iris-semantic-line-solid-neutral)', background: 'none', borderRadius: 10, color: 'var(--iris-semantic-label-neutral)', cursor: 'pointer' }}>
              <Icon name="more-vertical" size={20} />
            </button>
            {open && <Menu items={items} onSelect={id => { setLast(id); setOpen(false); }} style={{ position: 'absolute', top: 44, left: 0 }} />}
          </div>}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>마지막 선택:<br /><b>{last ?? '없음'}</b></div>}
          code={`<Menu items={[{ id: 'edit', label: '수정', icon: 'edit' }, ...]} onSelect={run} />`} />
      </Section>
      <Section title="Variants" desc="아이콘 유무 · 파괴적 행동은 구분선 + negative.">
        <Canvas style={{ gap: 32 }}>
          <Menu items={[{ id: 'a', label: '수정' }, { id: 'b', label: '공유' }]} />
          <Menu items={items} />
        </Canvas>
      </Section>
      <Section title="States" desc="hover · 비활성 항목.">
        <Canvas>
          <Menu items={[{ id: 'a', label: '수정', icon: 'edit' }, { id: 'b', label: '공유 (비활성)', icon: 'share', disabled: true }]} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="리스트 행의 더보기 아래 — 우상단 정렬.">
        <Canvas>
          <div style={{ position: 'relative', width: 320, height: 190 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ fontSize: 15, color: 'var(--iris-semantic-label-normal)' }}>디자인 시스템 문서</span>
              <Icon name="more-vertical" size={20} style={{ color: 'var(--iris-semantic-label-alternative)' }} />
            </div>
            <Menu items={items} style={{ position: 'absolute', top: 40, right: 0 }} />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 외곽 패딩 6 · 항목 좌우 10, 청록 = 아이콘·라벨 간격 8(px). 항목 높이 40.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <Menu items={items} style={{ width: 180 }} />
                {/* P6 링 · 항목1 6~46 · padL 10 (6~16) · 아이콘 20 (16~36) · G8 (36~44) */}
                <span className="size-zone pad" style={{ left: 0, top: 0, right: 0, height: 6 }} />
                <span className="size-zone pad" style={{ left: 0, top: 6, width: 6, bottom: 6 }} />
                <span className="size-num" style={{ left: 90, top: -13, transform: 'translateX(-50%)' }}>6</span>
                <span className="size-zone pad" style={{ left: 6, top: 6, width: 10, height: 40 }} />
                <span className="size-num" style={{ left: -10, top: 22 }}>10</span>
                <span className="size-zone gap" style={{ left: 36, top: 6, width: 8, height: 40 }} />
                <span className="size-num gapnum" style={{ left: 40, top: -13, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-num" style={{ right: -24, top: 22 }}>40</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>아이콘 + 구분선</b>
              <span className="sub">min-W 180 · 외곽 P 6 · R 12 · elevation medium</span>
              <span className="sub">항목 H 40 · P 10 · R 8 · 아이콘 20 · 간격 8 · body-2</span>
              <span className="sub">구분선 1 · 상하 6</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['외곽 P 6', '항목 H 40 · P 10', 'G 8', '아이콘 20', 'R 12 / 8']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="행동 목록 + 위험 분리" doBody="같은 메뉴 — 동사 라벨, 삭제는 구분선 아래 negative로."
          doEx={<Menu items={items} style={{ minWidth: 160 }} />}
          dontTitle="값 선택을 메뉴로" dontBody="같은 목록이라도 '하나를 고르는 값'이면 Select입니다."
          dontEx={<Select aria-label="정렬" options={[{ value: 'a', label: '수정됨 순' }, { value: 'b', label: '이름순' }]} defaultValue="a" style={{ width: 160 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['items', '{ id, label, icon?, danger?, disabled?, divider? }[]', '—', '행동 목록 — danger는 negative'],
          ['onSelect', '(id: string) => void', '—', '선택 핸들러'],
        ]} />
      </Section>
    </Page>
  );
}
