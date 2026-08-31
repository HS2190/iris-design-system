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
      <Section title="Size" desc="주황 = 좌우 패딩 40(px) — 왼쪽엔 검색 아이콘(좌 14), 오른쪽엔 지우기 버튼(우 12)이 들어갑니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <SearchField defaultValue="디자인 시스템" style={{ width: 230 }} />
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 40, height: 48 }}>40</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 40, height: 48 }}>40</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · 값 입력됨</b>
              <span className="sub">H input-height 48 · R full · body-1</span>
              <span className="sub">P 40 — 아이콘 20 (좌 14) · 지우기 20 (우 12)</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot"><SearchField placeholder="검색어를 입력하세요" style={{ width: 280 }} /></div>
              <Chips primary="기본" items={['H 48 (input-height)', 'P 40', 'R full', 'body-1']} />
            </div>
          </div>
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
