import { Select, Radio } from '@iris/react';
import { Page, Section, Canvas, Chips, DoDont, Props } from '../components/Doc';

const jobs = [
  { value: 'pd', label: '프로덕트 디자이너' }, { value: 'ux', label: 'UX 리서처' },
  { value: 'fe', label: '프론트엔드 개발자' }, { value: 'be', label: '백엔드 개발자' },
  { value: 'pm', label: '프로덕트 매니저' }, { value: 'da', label: '데이터 분석가' },
];

export default function SelectPage() {
  return (
    <Page kicker="Components · Selection & Input" title="Select" desc="목록에서 하나를 고르는 드롭다운입니다. 네이티브 select 기반이라 모바일에서는 OS 픽커가 뜹니다. 옵션 6개 이상일 때 씁니다.">
      <Section title="States" desc="열어 보세요.">
        <Canvas>
          <Select label="직무" placeholder="선택하세요" options={jobs} helper="하나만 선택할 수 있어요" style={{ width: 240 }} />
          <Select label="선택됨" options={jobs} defaultValue="pd" style={{ width: 240 }} />
          <Select label="오류" placeholder="선택하세요" options={jobs} error="직무를 선택해 주세요" style={{ width: 240 }} />
          <Select label="비활성" placeholder="선택 불가" options={jobs} disabled style={{ width: 240 }} />
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <Select label="직무" placeholder="선택하세요" options={jobs} style={{ width: 300 }} />
          <Chips primary="기본" items={['H = input-height(48)', 'P 16 · 40(chevron)', 'R 10', 'body-1']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="옵션 6개 이상" doBody="긴 목록을 접어서 공간을 아낍니다."
          doEx={<Select placeholder="직무 선택 (6개)" options={jobs} style={{ width: 200 }} />}
          dontTitle="옵션 2~3개" dontBody="다 보여줄 수 있으면 Radio나 Segmented control이 빠릅니다."
          dontEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Radio name="s1" label="카드" defaultChecked /><Radio name="s1" label="계좌" /></div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['options', '{ value, label, disabled? }[]', '—', '옵션 목록'],
          ['placeholder', 'string', '—', '미선택 상태 문구'],
          ['label / helper / error', 'string', '—', 'Text field와 동일한 폼 규칙'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
