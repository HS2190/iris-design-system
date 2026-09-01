import { useState } from 'react';
import { Popup, Button, TextField, Alert } from '@hs2190/iris-react';
import { Page, Section, Canvas, Spec, Chips, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

export default function PopupPage() {
  const [open, setOpen] = useState(true);
  return (
    <Page kicker="Components · Presentation" title="Popup" desc="자유 콘텐츠를 담는 모달입니다. 폼·상세 등 한 작업을 완결. 확인만 받는 흐름은 Alert, 모바일 다중 선택은 Bottom sheet.">
      <Section title="Playground" desc="여닫아 보세요 — 닫기 X와 푸터 버튼이 있습니다.">
        <Playground
          stage={open
            ? <Popup title="이름 바꾸기" onClose={() => setOpen(false)}
                footer={<><Button size="s" variant="outlined" color="assistive" onClick={() => setOpen(false)}>취소</Button><Button size="s" onClick={() => setOpen(false)}>저장</Button></>}>
                <TextField label="프로젝트 이름" defaultValue="디자인 시스템" style={{ width: '100%' }} />
              </Popup>
            : <Button size="s" variant="outlined" color="assistive" onClick={() => setOpen(true)}>팝업 열기</Button>}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>스크림·포털은<br />앱 셸 담당입니다.</div>}
 />
      </Section>
      <Section title="Variants">
        <Canvas col style={{ gap: 24 }}>
          <Spec label="본문만"><Popup title="점검 안내">오늘 밤 12시부터 30분간 점검합니다.</Popup></Spec>
          <Spec label="닫기 + 푸터"><Popup title="이름 바꾸기" onClose={() => {}} footer={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">저장</Button></>}>
            <TextField label="프로젝트 이름" defaultValue="디자인 시스템" style={{ width: '100%' }} />
          </Popup></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="스크림(material/dimmer) 위 중앙.">
        <Canvas>
          <div style={{ position: 'relative', width: '100%', maxWidth: 480, height: 280, borderRadius: 12, overflow: 'hidden', background: 'var(--iris-semantic-background-normal-normal)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--iris-semantic-material-dimmer, rgba(0,0,0,.52))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Popup title="이름 바꾸기" onClose={() => {}} footer={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">저장</Button></>} style={{ width: 320 }}>
                <TextField label="프로젝트 이름" defaultValue="디자인 시스템" style={{ width: '100%' }} />
              </Popup>
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩 20, 청록 = 헤더·본문 간격 12(px). 폭 360 · 닫기 24.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.2)', lineHeight: 1 }}>
                <Popup title="점검 안내" onClose={() => {}} style={{ width: 300 }}>오늘 밤 30분간 점검합니다</Popup>
                {/* padT 20 · 헤더(닫기 24) 20~44 · G12 (44~56) · 본문 56~78 (lh22) · padB 78~98 */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 20 }}>20</span>
                <span className="size-zone pad" style={{ left: 0, top: 20, width: 20, height: 58 }} />
                <span className="size-num" style={{ left: -10, top: 47 }}>20</span>
                <span className="size-zone pad" style={{ right: 0, top: 20, width: 20, height: 58 }} />
                <span className="size-zone gap" style={{ left: 20, right: 20, top: 44, height: 12 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 47 }}>12</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 78, height: 20 }}>20</span>
                <span className="size-num" style={{ right: 30, top: 8, transform: 'translateX(50%)' }}>24</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.1)', lineHeight: 1 }}>
                <Popup title="점검 안내" onClose={() => {}} style={{ width: 300 }}
                  footer={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">확인</Button></>}>오늘 밤 30분간 점검합니다</Popup>
                {/* 본문 56~78 · 본문 padB 20 (78~98) · 푸터 버튼 34 (98~132) · padB 132~152 */}
                <span className="size-zone pad" style={{ left: 20, right: 20, top: 78, height: 20 }}>20</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 132, height: 20 }}>20</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>닫기 포함 / + 푸터</b>
              <span className="sub">W 360 · P 20 · R 16 · elevation large</span>
              <span className="sub">제목 heading-2 18 · 닫기 24 · 헤더↔본문 12 · 푸터 버튼 간 8</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['W 360', 'P 20', '헤더↔본문 12', '닫기 24', 'R 16']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="한 작업 완결" doBody="같은 이름 변경 — 입력과 저장이 팝업 안에서 끝납니다."
          doEx={<Popup title="이름 바꾸기" onClose={() => {}} footer={<Button size="s">저장</Button>} style={{ width: 260 }}>
            <TextField label="이름" defaultValue="디자인 시스템" style={{ width: '100%' }} />
          </Popup>}
          dontTitle="확인만 받는데 팝업" dontBody="같은 흐름이 예/아니오 확인뿐이면 Alert가 맞습니다."
          dontEx={<Alert title="저장할까요?" actions={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">저장</Button></>} style={{ width: 260 }}>변경 사항을 저장합니다.</Alert>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="Popup" code={`<Popup title="이름 바꾸기" onClose={close} footer={...}><TextField ... /></Popup>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '헤더 제목 (필수)'],
          ['onClose', '() => void', '—', '있으면 우상단 닫기 X'],
          ['children', 'ReactNode', '—', '자유 콘텐츠 (폼·상세)'],
          ['footer', 'ReactNode', '—', '하단 우측 버튼 영역'],
        ]} />
      </Section>
    </Page>
  );
}
