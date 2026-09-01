import { useState } from 'react';
import { Grid, GridItem, Card } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const Col = ({ h = 40 }: { h?: number }) => (
  <div style={{ height: h, borderRadius: 6, background: 'var(--iris-semantic-fill-primary)', border: '1px solid var(--iris-semantic-line-primary-normal, transparent)' }} />
);

export default function GridPage() {
  const [cols, setCols] = useState<'12' | '8' | '4'>('12');
  return (
    <Page kicker="Components · Utilities" title="Grid" desc="레이아웃 그리드입니다. 웹 12 · 태블릿 8 · 모바일 4컬럼 관례, 거터 16. 브레이크포인트는 breakpoint 토큰을 따릅니다.">
      <Section title="Playground" desc="컬럼 수를 바꿔보세요.">
        <Playground
          stage={<Grid columns={Number(cols)} gutter={16} style={{ width: 340 }}>
            {Array.from({ length: Number(cols) }, (_, i) => <GridItem key={i}><Col /></GridItem>)}
          </Grid>}
          panel={<Seg label="columns" value={cols} options={['12', '8', '4'] as const} onChange={setCols} />}
 />
      </Section>
      <Section title="Variants" desc="플랫폼 관례 — 웹 12 · 태블릿 8 · 모바일 4.">
        <Canvas col style={{ gap: 16 }}>
          {([['12', 360], ['8', 300], ['4', 220]] as const).map(([c, w]) => (
            <div key={c} style={{ width: w }}>
              <Grid columns={Number(c)} gutter={16}>{Array.from({ length: Number(c) }, (_, i) => <GridItem key={i}><Col h={28} /></GridItem>)}</Grid>
              <div style={{ marginTop: 4, fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: 'var(--iris-semantic-label-assistive)' }}>{c} columns</div>
            </div>
          ))}
        </Canvas>
      </Section>
      <Section title="States" desc="breakpoint 토큰 — 화면 폭에 따라 컬럼 관례가 바뀝니다.">
        <Canvas col>
          <Chips primary="breakpoint" items={['xs 0', 'sm 768', 'md 992', 'lg 1200', 'xl 1600']} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="카드 그리드 — span으로 배분합니다.">
        <Canvas col>
          <Grid columns={12} gutter={16} style={{ width: 380 }}>
            <GridItem span={8}><Card variant="outlined"><div style={{ fontSize: 13, color: 'var(--iris-semantic-label-neutral)' }}>본문 · span 8</div></Card></GridItem>
            <GridItem span={4}><Card variant="filled"><div style={{ fontSize: 13, color: 'var(--iris-semantic-label-neutral)' }}>사이드 · span 4</div></Card></GridItem>
          </Grid>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 거터 16(px). 컬럼 폭은 유동(1fr).">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.4)', lineHeight: 0 }}>
                <Grid columns={4} gutter={16} style={{ width: 240 }}>
                  {Array.from({ length: 4 }, (_, i) => <GridItem key={i}><Col /></GridItem>)}
                </Grid>
                {/* 컬럼 48 (0~48) · 거터 16 (48~64) · 반복 */}
                <span className="size-zone gap" style={{ left: 48, top: 0, width: 16, height: 40 }} />
                <span className="size-num gapnum" style={{ left: 56, top: -12, transform: 'translateX(-50%)' }}>16</span>
                <span className="size-num" style={{ left: 24, top: 44, transform: 'translateX(-50%)' }}>1fr</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>4컬럼 · 거터 16</b>
              <span className="sub">컬럼 1fr 유동 · 거터 16 고정 · 페이지 마진 page-margin 토큰</span>
              <span className="sub">웹 12 · 태블릿 8 · 모바일 4 (breakpoint 토큰 기준)</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />거터 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="고정" items={['거터 16', '컬럼 1fr', '마진 page-margin (웹 24 · iOS 20 · Android 16)']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="그리드에 스냅" doBody="같은 본문+사이드 — span 8 + 4로 거터가 정렬됩니다."
          doEx={<Grid columns={12} gutter={16} style={{ width: 280 }}><GridItem span={8}><Col h={48} /></GridItem><GridItem span={4}><Col h={48} /></GridItem></Grid>}
          dontTitle="임의 폭 배치" dontBody="같은 구성을 자유 폭으로 놓으면 페이지마다 간격이 달라집니다."
          dontEx={<div style={{ display: 'flex', gap: 9, width: 280 }}><div style={{ width: 171 }}><Col h={48} /></div><div style={{ flex: 1 }}><Col h={48} /></div></div>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Grid" code={`<Grid columns={${cols}} gutter={16}>...</Grid>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['(Grid) columns', 'number', '12', '컬럼 수 — 12 / 8 / 4 관례'],
          ['(Grid) gutter', 'number', '16', '거터 px'],
          ['(GridItem) span', 'number', '1', '차지할 컬럼 수'],
        ]} />
      </Section>
    </Page>
  );
}
