import { useState } from 'react';
import { Pagination, Table } from '@hs2190/iris-react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const rows = [
  { name: '안현서', role: '프로덕트 디자이너' },
  { name: '김하나', role: '프론트엔드 개발자' },
];

export default function PaginationPage() {
  const [pg, setPg] = useState(3);
  const [va, setVa] = useState<'number' | 'dot'>('number');
  return (
    <Page kicker="Components · Navigations" title="Pagination" desc="페이지를 나눠 이동합니다. number는 목록·표, dot은 캐러셀 인디케이터. 현재 페이지는 aria-current로 노출됩니다.">
      <Section title="Playground" desc="눌러보세요.">
        <Playground
          stage={<Pagination variant={va} page={pg} total={9} onChange={setPg} />}
          panel={<Seg label="variant" value={va} options={['number', 'dot'] as const} onChange={setVa} />}
 />
      </Section>
      <Section title="Variants">
        <Canvas col style={{ gap: 20 }}>
          <Spec label="number · 목록·표"><Pagination page={3} total={9} /></Spec>
          <Spec label="dot · 캐러셀"><Pagination variant="dot" page={2} total={5} /></Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="양끝에서 이전/다음이 비활성, 페이지가 많으면 말줄임.">
        <Canvas col style={{ gap: 16 }}>
          <Pagination page={1} total={5} />
          <Pagination page={5} total={20} />
          <Pagination page={20} total={20} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="표·목록 아래 중앙 또는 우측.">
        <Canvas col>
          <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <Table data={rows} columns={[{ key: 'name', header: '이름' }, { key: 'role', header: '직무' }]} style={{ width: '100%' }} />
            <Pagination page={3} total={9} />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 버튼 간격(px). 버튼 32 고정 · dot 6/활성 16.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.6)', lineHeight: 0 }}>
                <Pagination page={2} total={3} />
                {/* [<]0~32 · G4 · [1]36~68 · G4 · [2]72~104 · G4 · [3]108~140 · G4 · [>]144~176 */}
                <span className="size-zone gap" style={{ left: 32, top: 0, width: 4, height: 32 }} />
                <span className="size-num gapnum" style={{ left: 34, top: -12, transform: 'translateX(-50%)' }}>4</span>
                <span className="size-num" style={{ left: 52, top: 34, transform: 'translateX(-50%)' }}>32</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(3)', lineHeight: 0 }}>
                <Pagination variant="dot" page={2} total={4} />
                {/* dot 6 (0~6) · G 8 (6~14) · 활성 16 (14~30) · 이후 반복 */}
                <span className="size-zone gap" style={{ left: 6, top: 0, width: 8, height: 6 }} />
                <span className="size-num gapnum" style={{ left: 10, top: -11, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-num" style={{ left: 3, top: 9, transform: 'translateX(-50%)' }}>6</span>
                <span className="size-num" style={{ left: 22, top: 9, transform: 'translateX(-50%)' }}>16</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>number · 2 페이지 / dot</b>
              <span className="sub">버튼 32 × 32 · 간격 4 · R 8 · label-1 tabular</span>
              <span className="sub">활성 = primary/normal 채움 · dot 6 (활성 16 필)</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="number" items={['버튼 32', 'G 4', 'R 8', 'label-1']} />
            </div>
            <div className="size-item">
              <Chips primary="dot" items={['dot 6', '활성 16', 'G 8', 'R full']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="목록엔 number" doBody="같은 20페이지 — 위치와 총량이 보이고 건너뛸 수 있습니다."
          doEx={<Pagination page={5} total={20} />}
          dontTitle="목록에 dot" dontBody="같은 20페이지를 점으로 늘어놓으면 위치도 이동도 못 잡습니다."
          dontEx={<Pagination variant="dot" page={5} total={20} />} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Pagination" code={`<Pagination${va === 'dot' ? ' variant="dot"' : ''} page={${pg}} total={9} onChange={setPage} />`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['page / total', 'number', '—', '현재 · 전체 페이지 (aria-current=page)'],
          ['onChange', '(p: number) => void', '—', '이동 핸들러'],
          ['variant', "'number' | 'dot'", "'number'", '목록·표 / 캐러셀'],
        ]} />
      </Section>
    </Page>
  );
}
