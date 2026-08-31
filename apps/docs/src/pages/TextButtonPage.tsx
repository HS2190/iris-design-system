import { useState } from 'react';
import { TextButton, Button } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function TextButtonPage() {
  const [co, setCo] = useState<'primary' | 'assistive'>('primary');
  const [sz, setSz] = useState<'m' | 's'>('m');
  return (
    <Page kicker="Components · Actions" title="Text button" desc="배경 없는 라벨 버튼입니다 — '더보기'·'전체 삭제' 같은 보조 행동. 화면당 주 행동은 Button 하나, 나머지가 이것입니다.">
      <Section title="Playground">
        <Playground
          stage={<TextButton color={co} size={sz} trailingIcon="chevron-right">더보기</TextButton>}
          panel={<>
            <Seg label="color" value={co} options={['primary', 'assistive'] as const} onChange={setCo} />
            <Seg label="size" value={sz} options={['m', 's'] as const} onChange={setSz} />
          </>}
          code={`<TextButton color="${co}" size="${sz}" trailingIcon="chevron-right">더보기</TextButton>`} />
      </Section>
      <Section title="Variants" desc="Primary = 강조 보조 행동, Assistive = 중립.">
        <Canvas style={{ gap: 32 }}>
          <Spec label="primary"><TextButton>더보기</TextButton></Spec>
          <Spec label="assistive"><TextButton color="assistive">전체 삭제</TextButton></Spec>
          <Spec label="아이콘"><TextButton trailingIcon="chevron-right">전체 보기</TextButton></Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="hover 배경 · pressed · 비활성. 올려보세요.">
        <Canvas style={{ gap: 24 }}>
          <TextButton>기본</TextButton>
          <TextButton disabled>비활성</TextButton>
        </Canvas>
      </Section>
      <Section title="Usage" desc="Section header의 '더보기'가 대표 자리입니다.">
        <Canvas col>
          <div style={{ width: 320, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--iris-semantic-label-normal)' }}>최근 프로젝트</span>
            <TextButton size="s" trailingIcon="chevron-right">더보기</TextButton>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 아이콘 간격(px).">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(2)', lineHeight: 1 }}>
                <TextButton trailingIcon="chevron-right">더보기</TextButton>
                {/* M: H36 · P8 · 라벨→아이콘 G4 · 아이콘 18 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 8, height: 36 }}>8</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 8, height: 36 }}>8</span>
                <span className="size-zone gap" style={{ right: 26, top: 6, width: 4, height: 24 }} />
                <span className="size-num gapnum" style={{ right: 26, top: -11, transform: 'translateX(50%)' }}>4</span>
                <span className="size-num" style={{ left: -24, top: 15 }}>36</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>M · trailing 아이콘</b>
              <span className="sub">H 36 · P 8 · G 4 · R 8 · label-1 500 · 아이콘 18</span>
              <span className="sub">S: H 28 · P 6 · label-2 · 아이콘 16</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item"><Chips primary="M" items={['H 36', 'P 8', 'G 4', 'label-1', '아이콘 18']} /></div>
            <div className="size-item"><Chips primary="S" items={['H 28', 'P 6', 'G 4', 'label-2', '아이콘 16']} /></div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="보조 행동" doBody="같은 화면 — 주 행동(저장)은 Button, 보조(취소)는 Text button으로 위계가 생깁니다."
          doEx={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><TextButton color="assistive">취소</TextButton><Button size="s">저장</Button></div>}
          dontTitle="주 행동을 텍스트로" dontBody="같은 저장을 배경 없이 두면 눌리는 곳이 안 보입니다."
          dontEx={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><TextButton color="assistive">취소</TextButton><TextButton>저장</TextButton></div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['color', "'primary' | 'assistive'", "'primary'", '강조 / 중립'],
          ['size', "'m' | 's'", "'m'", 'H 36 / 28'],
          ['leadingIcon / trailingIcon', 'IconName', '—', '라벨 앞/뒤 아이콘'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
