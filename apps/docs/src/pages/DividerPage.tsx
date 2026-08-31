import { useState } from 'react';
import { Divider } from '@iris/react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function DividerPage() {
  const [ori, setOri] = useState<'horizontal' | 'vertical'>('horizontal');
  const [wt, setWt] = useState<'normal' | 'strong'>('normal');
  return (
    <Page kicker="Components · Utilities" title="Divider" desc="요소 사이를 나누는 1px 선입니다. 여백으로 충분한 곳에는 쓰지 않습니다.">
      <Section title="Playground">
        <Playground
          stage={ori === 'horizontal'
            ? <div style={{ width: 220 }}>항목 A<Divider weight={wt} style={{ margin: '10px 0' }} />항목 B</div>
            : <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40 }}>항목 A<Divider orientation="vertical" weight={wt} />항목 B</div>}
          panel={<>
            <Seg label="orientation" value={ori} options={['horizontal', 'vertical'] as const} onChange={setOri} />
            <Seg label="weight" value={wt} options={['normal', 'strong'] as const} onChange={setWt} />
          </>}
          code={`<Divider${ori === 'vertical' ? ' orientation="vertical"' : ''}${wt === 'strong' ? ' weight="strong"' : ''} />`} />
      </Section>
      <Section title="Variants" desc="Normal(line/solid/neutral)이 기본, 섹션 경계만 Strong(line/solid/normal).">
        <Canvas col style={{ gap: 20 }}>
          <div style={{ width: '100%' }}><Divider /><small className="mono" style={{ fontSize: 11, color: 'var(--iris-semantic-label-assistive)' }}>normal</small></div>
          <div style={{ width: '100%' }}><Divider weight="strong" /><small className="mono" style={{ fontSize: 11, color: 'var(--iris-semantic-label-assistive)' }}>strong</small></div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40 }}>
            텍스트 <Divider orientation="vertical" /> 텍스트 <Divider orientation="vertical" weight="strong" /> 텍스트
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="두께는 1(stroke-hairline) 고정. 청록 = 권장 여백(px) — 가로는 상하 10, 세로는 좌우 12.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap" style={{ gap: 72 }}>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.6)', lineHeight: 1 }}>
                <div style={{ width: 200, fontSize: 14 }}>
                  <div>항목 A</div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div>항목 B</div>
                </div>
                {/* A 0~14 · 여백 10 · 선 24~25 · 여백 10 · B 35~49 */}
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 14, height: 10 }} />
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 25, height: 10 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 16 }}>10</span>
                <span className="size-num gapnum" style={{ right: -16, top: 27 }}>10</span>
                <span className="size-num" style={{ left: -10, top: 21 }}>1</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.6)', lineHeight: 1 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40, fontSize: 14 }}>
                  <span style={{ width: 60, textAlign: 'right' }}>텍스트</span>
                  <Divider orientation="vertical" />
                  <span>텍스트</span>
                </div>
                {/* 박스 60 · 간격 12 · 선 72~73 · 간격 12 */}
                <span className="size-zone gap" style={{ left: 60, top: 0, width: 12, height: 40 }} />
                <span className="size-zone gap" style={{ left: 73, top: 0, width: 12, height: 40 }} />
                <span className="size-num gapnum" style={{ left: 64, top: -11, transform: 'translateX(-50%)' }}>12</span>
                <span className="size-num gapnum" style={{ left: 82, top: -11, transform: 'translateX(-50%)' }}>12</span>
                <span className="size-num" style={{ left: 72, bottom: -12, transform: 'translateX(-50%)' }}>1</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>고정 · Horizontal / Vertical</b>
              <span className="sub">두께 1 (stroke-hairline) · normal = line/solid/neutral · strong = line/solid/normal</span>
              <span className="sub">권장 여백 — 가로: 상하 10 · 세로: 좌우 12 (세로 높이는 부모를 따름)</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><div style={{ width: 220 }}>항목 A<Divider style={{ margin: '10px 0' }} />항목 B</div></div>
              <Chips primary="가로" items={['두께 1', '상하 여백 10', 'normal / strong']} />
            </div>
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 40 }}>텍스트 <Divider orientation="vertical" /> 텍스트</div></div>
              <Chips primary="세로" items={['두께 1', '좌우 간격 12', '높이 = 부모']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="성격이 바뀌는 경계에만 한 줄" doBody="같은 그룹(알림·테마)은 여백으로만 묶고, 성격이 다른 로그아웃 앞에만 선을 긋습니다 — 선 1개."
          doEx={<div style={{ width: '100%', fontSize: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><span>알림 설정</span><span>테마</span></div>
            <Divider style={{ margin: '12px 0' }} />
            <span>로그아웃</span>
          </div>}
          dontTitle="모든 줄 사이에 선" dontBody="같은 리스트인데 줄마다 선을 그으면 그룹 정보는 사라지고 소음만 남습니다 — 선 2개."
          dontEx={<div style={{ width: '100%', fontSize: 14 }}>
            <span>알림 설정</span><Divider style={{ margin: '12px 0' }} />
            <span>테마</span><Divider style={{ margin: '12px 0' }} />
            <span>로그아웃</span>
          </div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['orientation', "'horizontal' | 'vertical'", "'horizontal'", '방향 (세로는 부모 높이를 따름)'],
          ['weight', "'normal' | 'strong'", "'normal'", '1px 색 강도'],
        ]} />
      </Section>
    </Page>
  );
}
