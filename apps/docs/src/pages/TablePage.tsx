import { useState } from 'react';
import { Table } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const rows = [
  { name: '안현서', role: '프로덕트 디자이너', years: '7' },
  { name: '김하나', role: '프론트엔드 개발자', years: '4' },
  { name: '이도윤', role: 'PM', years: '11' },
];

export default function TablePage() {
  const [al, setAl] = useState<'left' | 'right'>('right');
  return (
    <Page kicker="Components · Contents" title="Table" desc="데이터 테이블입니다. 헤더 40 · 행 48, 숫자 열은 우측 정렬 + tabular-nums. 넓으면 컨테이너가 가로 스크롤합니다.">
      <Section title="Playground" desc="행 위에 올려보세요 — interactive면 hover 배경이 생깁니다.">
        <Playground
          stage={<Table interactive style={{ width: 380 }} data={rows}
            columns={[{ key: 'name', header: '이름' }, { key: 'role', header: '직무' }, { key: 'years', header: '경력(년)', align: al }]} />}
          panel={<Seg label="숫자 열 정렬" value={al} options={['left', 'right'] as const} onChange={setAl} />}
          code={`<Table interactive columns={[..., { key: 'years', header: '경력(년)', align: '${al}' }]} data={rows} />`} />
      </Section>
      <Section title="States" desc="빈 데이터면 emptyText 행을 보여줍니다.">
        <Canvas col style={{ gap: 24 }}>
          <Spec label="기본 · hover"><Table interactive style={{ width: 380 }} data={rows}
            columns={[{ key: 'name', header: '이름' }, { key: 'role', header: '직무' }, { key: 'years', header: '경력(년)', align: 'right' }]} /></Spec>
          <Spec label="빈 상태"><Table style={{ width: 380 }} data={[]} emptyText="아직 팀원이 없습니다"
            columns={[{ key: 'name', header: '이름' }, { key: 'role', header: '직무' }]} /></Spec>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 셀 좌우 패딩 16(px). 헤더 행 40 · 데이터 행 48.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.4)', lineHeight: 1 }}>
                <Table style={{ width: 250 }} data={[{ name: '안현서', years: '7' }]}
                  columns={[{ key: 'name', header: '이름' }, { key: 'years', header: '경력(년)', align: 'right' }]} />
                {/* 헤더 0~40 · 행 40~88 · 첫 셀 padL 16 */}
                <span className="size-zone pad" style={{ left: 0, top: 40, width: 16, height: 48 }}>16</span>
                <span className="size-num" style={{ left: -24, top: 17 }}>40</span>
                <span className="size-num" style={{ left: -24, top: 60 }}>48</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · 2열</b>
              <span className="sub">헤더 H 40 (caption-1 500) · 행 H 48 (body-2)</span>
              <span className="sub">셀 P 좌우 16 · 헤더 하단 line/solid/normal · 행 hairline</span>
              <span className="sub">숫자 열 우측 정렬 + tabular-nums</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><Table style={{ width: 320 }} data={rows.slice(0, 2)}
                columns={[{ key: 'name', header: '이름' }, { key: 'years', header: '경력(년)', align: 'right' }]} /></div>
              <Chips primary="고정" items={['헤더 H 40', '행 H 48', '셀 P 16', 'caption-1 / body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="숫자는 우측 + tabular" doBody="같은 데이터 — 자릿수가 정렬되어 비교가 한눈에 됩니다."
          doEx={<Table style={{ width: 240 }} data={[{ n: '구독', v: '128,400' }, { n: '광고', v: '9,120' }]}
            columns={[{ key: 'n', header: '항목' }, { key: 'v', header: '금액(원)', align: 'right' }]} />}
          dontTitle="숫자를 가운데·좌측에" dontBody="같은 데이터도 정렬이 흩어지면 자릿수 비교가 안 됩니다."
          dontEx={<Table style={{ width: 240 }} data={[{ n: '구독', v: '128,400' }, { n: '광고', v: '9,120' }]}
            columns={[{ key: 'n', header: '항목' }, { key: 'v', header: '금액(원)', align: 'center' }]} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['columns', '{ key, header, align? }[]', '—', "열 정의 — align: 'right'면 tabular-nums"],
          ['data', 'Record<string, ReactNode>[]', '—', '행 데이터 (key 매칭)'],
          ['emptyText', 'ReactNode', "'데이터가 없습니다'", '빈 상태 문구'],
          ['interactive', 'boolean', 'false', '행 hover 배경'],
        ]} />
      </Section>
    </Page>
  );
}
