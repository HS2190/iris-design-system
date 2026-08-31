import { useState } from 'react';
import { FilterButton, Chip } from '@iris/react';
import { Page, Section, Canvas, Chips, DoDont, Props } from '../components/Doc';

export default function FilterButtonPage() {
  const [open, setOpen] = useState(false);
  const count = 2;
  return (
    <Page kicker="Components · Selection & Input" title="Filter button" desc="필터 시트/메뉴를 여는 트리거입니다. 적용된 필터 수를 뱃지로 보여줍니다. 즉시 토글되는 값은 Chip입니다.">
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
      <Section title="Size">
        <Canvas col>
          <FilterButton active count={2}>직무</FilterButton>
          <Chips primary="고정" items={['H 36', 'P 12', 'G 4', 'R full', 'label-1', '아이콘 16']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="시트를 여는 트리거 + 적용 수" doBody="리스트 상단 가로 그룹으로, 적용된 개수를 뱃지에."
          doEx={<><FilterButton active count={2}>직무</FilterButton><FilterButton>경력</FilterButton><FilterButton>지역</FilterButton></>}
          dontTitle="즉시 토글되는 값" dontBody="누르는 즉시 켜지고 꺼지는 값은 Chip입니다."
          dontEx={<><Chip selected>디자인</Chip><Chip>개발</Chip></>} />
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
