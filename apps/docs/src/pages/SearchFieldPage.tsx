import { useState } from 'react';
import { SearchField, TextField } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function SearchFieldPage() {
  const [st, setSt] = useState<'default' | 'filled' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Search field" desc="검색 전용 입력입니다. radius-full 필 형태로 일반 폼 입력과 구분하고, 값이 있으면 지우기 버튼이 나타납니다. 화면당 하나만 둡니다.">
      <Section title="Playground" desc="입력하면 지우기 버튼이 나타납니다.">
        <Playground
          stage={<SearchField key={st} placeholder="검색어를 입력하세요" defaultValue={st === 'filled' ? '디자인 시스템' : ''} disabled={st === 'disabled'} style={{ width: 280 }} />}
          panel={<Seg label="state" value={st} options={['default', 'filled', 'disabled'] as const} onChange={setSt} />}
          code={`<SearchField placeholder="검색어를 입력하세요"${st === 'filled' ? ' defaultValue="디자인 시스템"' : ''}${st === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="States" desc="입력하면 지우기 버튼이 생깁니다.">
        <Canvas>
          <SearchField placeholder="검색어를 입력하세요" style={{ width: 260 }} />
          <SearchField defaultValue="디자인 시스템" style={{ width: 260 }} />
          <SearchField placeholder="검색 불가" disabled style={{ width: 260 }} />
        </Canvas>
      </Section>
      <Section title="Size">
        <Canvas col>
          <SearchField placeholder="검색어를 입력하세요" style={{ width: 320 }} />
          <Chips primary="기본" items={['H = input-height(48)', 'P 40(아이콘 자리)', 'R full', 'body-1']} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="검색 전용" doBody="입력 즉시 결과 갱신 또는 Enter 제출을 명확히 합니다."
          doEx={<SearchField placeholder="채용 공고 검색" style={{ width: 220 }} />}
          dontTitle="일반 폼 입력" dontBody="이름·이메일 입력에 필 형태를 쓰면 검색으로 오해합니다."
          dontEx={<TextField placeholder="이름" style={{ width: 200 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['placeholder', 'string', '—', '검색 안내 문구'],
          ['onClear', '() => void', '—', '지우기 버튼 클릭 시'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
