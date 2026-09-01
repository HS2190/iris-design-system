import { useState } from 'react';
import { FilterButton, Chip, SearchField } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

export default function FilterButtonPage() {
  const [open, setOpen] = useState(false);
  const count = 2;
  const [st, setSt] = useState<'default' | 'active' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Filter button" desc="필터 시트/메뉴를 여는 트리거입니다. 적용된 필터 수를 뱃지로 보여줍니다. 즉시 토글되는 값은 Chip입니다.">
      <Section title="Playground">
        <Playground
          stage={<FilterButton active={st === 'active'} count={st === 'active' ? 2 : undefined} disabled={st === 'disabled'}>직무</FilterButton>}
          panel={<Seg label="state" value={st} options={['default', 'active', 'disabled'] as const} onChange={setSt} />}
 />
      </Section>
      <Section title="States">
        <Canvas>
          <FilterButton>직무</FilterButton>
          <FilterButton active count={count}>직무</FilterButton>
          <FilterButton disabled>직무</FilterButton>
          <FilterButton active={open} count={open ? 1 : 0} onClick={() => setOpen(v => !v)} aria-expanded={open}>
            눌러보기
          </FilterButton>
        </Canvas>
      </Section>
      <Section title="Usage" desc="목록 상단 필터 바 — 적용 수가 뱃지로 남습니다.">
        <Canvas col>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
            <SearchField placeholder="채용 공고 검색" />
            <div style={{ display: 'flex', gap: 8 }}>
              <FilterButton active count={2}>직무</FilterButton>
              <FilterButton active count={1}>경력</FilterButton>
              <FilterButton>지역</FilterButton>
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 요소 간격(px). 높이 36 고정 · 너비 자유.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(2)', lineHeight: 1 }}>
                <FilterButton active count={2}>직무</FilterButton>
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 12, height: 36 }}>12</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 12, height: 36 }}>12</span>
                <span className="size-zone gap" style={{ left: 28, top: 6, width: 4, bottom: 6 }} />
                <span className="size-num gapnum" style={{ left: 30, top: -11, transform: 'translateX(-50%)' }}>4</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정 · Active</b>
              <span className="sub">H 36 · P 12 · R full · label-1 700</span>
              <span className="sub">아이콘 16 · 카운트 뱃지 16 · 요소 간격 4</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['H 36', 'P 12', 'G 4', 'R full', '아이콘 16', 'label-1']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="시트를 여는 트리거 + 적용 수" doBody="리스트 상단 가로 그룹으로, 적용된 개수를 뱃지에."
          doEx={<><FilterButton active count={2}>직무</FilterButton><FilterButton>경력</FilterButton><FilterButton>지역</FilterButton></>}
          dontTitle="즉시 토글되는 값" dontBody="누르는 즉시 켜지고 꺼지는 값은 Chip입니다."
          dontEx={<><Chip selected>디자인</Chip><Chip>개발</Chip></>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="FilterButton" code={`<FilterButton${st === 'active' ? ' active count={2}' : ''}${st === 'disabled' ? ' disabled' : ''}>직무</FilterButton>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['active', 'boolean', 'false', '적용된 필터가 있는 상태'],
          ['count', 'number', '—', '적용 수 (0이면 숨김)'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
