import { useState } from 'react';
import { BottomSheet, Button, ListCell, Icon, Popup } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const sheetList = (
  <div style={{ margin: '0 -8px' }}>
    <ListCell interactive title="링크 복사" leading={<Icon name="share" size={20} />} />
    <ListCell interactive title="수정" leading={<Icon name="edit" size={20} />} />
    <ListCell interactive title="삭제" leading={<Icon name="trash" size={20} />} />
  </div>
);

export default function BottomSheetPage() {
  const [open, setOpen] = useState(true);
  return (
    <Page kicker="Components · Presentation" title="Bottom sheet" desc="모바일 하단 시트입니다. 그래버 36×4 · 상단 radius-sheet 토큰. 스크림·드래그 제스처는 앱 셸이 담당합니다.">
      <Section title="Playground" desc="여닫아 보세요.">
        <Playground
          stage={<div style={{ position: 'relative', width: 280, height: 260, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--iris-semantic-line-solid-neutral)', background: 'var(--iris-semantic-background-normal-normal)' }}>
            <div style={{ padding: 16 }}><Button size="s" variant="outlined" color="assistive" onClick={() => setOpen(v => !v)}>{open ? '닫기' : '시트 열기'}</Button></div>
            {open && <>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--iris-semantic-material-dimmer, rgba(0,0,0,.52))' }} onClick={() => setOpen(false)} />
              <BottomSheet title="공유하기" style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>{sheetList}</BottomSheet>
            </>}
          </div>}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>스크림을 누르면<br />닫힙니다.</div>}
 />
      </Section>
      <Section title="Variants">
        <Canvas style={{ gap: 32 }}>
          <Spec label="제목 + 리스트"><div style={{ width: 260 }}><BottomSheet title="공유하기" style={{ borderRadius: 16 }}>{sheetList}</BottomSheet></div></Spec>
          <Spec label="본문만"><div style={{ width: 260 }}><BottomSheet style={{ borderRadius: 16 }}>사진 3장을 업로드할까요?</BottomSheet></div></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="모바일 프레임 최하단 + 스크림.">
        <Canvas>
          <div style={{ position: 'relative', width: 280, height: 300, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--iris-semantic-line-solid-neutral)', background: 'var(--iris-semantic-background-normal-normal)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--iris-semantic-material-dimmer, rgba(0,0,0,.52))' }} />
            <BottomSheet title="공유하기" style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>{sheetList}</BottomSheet>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 블록 간격(px). 그래버 36×4 중앙.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <BottomSheet title="공유하기" style={{ width: 260, borderRadius: 16 }}>사진 3장을 업로드할까요?</BottomSheet>
                {/* 실측: padT 8 · 그래버 8~12 · G12 · 제목 24~44 (h20) · G8 · 본문 52~74 · padB 74~94 */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 8 }}>8</span>
                <span className="size-num" style={{ right: 96, top: 7 }}>36 × 4</span>
                <span className="size-zone gap" style={{ left: 20, right: 20, top: 12, height: 12 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 12 }}>12</span>
                <span className="size-zone pad" style={{ left: 0, top: 12, width: 20, height: 62 }} />
                <span className="size-num" style={{ left: -10, top: 40 }}>20</span>
                <span className="size-zone pad" style={{ right: 0, top: 12, width: 20, height: 62 }} />
                <span className="size-zone gap" style={{ left: 20, right: 20, top: 44, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 42 }}>8</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 74, height: 20 }}>20</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <BottomSheet style={{ width: 260, borderRadius: 16 }}>사진 3장을 업로드할까요?</BottomSheet>
                {/* 본문만 — 그래버 8~12 · G8 (12~20) · 본문 20~42 · padB 42~62 */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 8 }}>8</span>
                <span className="size-zone gap" style={{ left: 20, right: 20, top: 12, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 10 }}>8</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 42, height: 20 }}>20</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>제목 + 본문 / 본문만</b>
              <span className="sub">상단 R radius-sheet (웹 16) · P 상 8 · 좌우·하 20</span>
              <span className="sub">그래버 36 × 4 중앙 · 그래버↔제목 12 · 제목↔본문 8</span>
              <span className="sub">제목 heading-2 18 · 본문 body-2</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['그래버 36×4', 'P 8 · 20', 'G 12 · 8', 'R sheet 16', 'heading-2 / body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="모바일 행동 시트" doBody="같은 공유 — 엄지 닿는 하단에서 리스트로."
          doEx={<div style={{ width: 240 }}><BottomSheet title="공유하기" style={{ borderRadius: 16 }}>{sheetList}</BottomSheet></div>}
          dontTitle="데스크톱 넓은 화면에 시트" dontBody="같은 작업이 데스크톱 중앙이면 Popup이 맞습니다."
          dontEx={<Popup title="공유하기" onClose={() => {}} style={{ width: 240 }}>링크를 아는 모두가 볼 수 있어요.</Popup>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="BottomSheet" code={`<BottomSheet title="공유하기"><ListCell ... /></BottomSheet>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '시트 제목'],
          ['children', 'ReactNode', '—', '콘텐츠 — 리스트·폼'],
        ]} />
      </Section>
    </Page>
  );
}
