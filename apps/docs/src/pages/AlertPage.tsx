import { useState } from 'react';
import { Alert, Button, Toast } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function AlertPage() {
  const [btns, setBtns] = useState<'2버튼' | '1버튼'>('2버튼');
  return (
    <Page kicker="Components · Feedback" title="Alert" desc="흐름을 멈추고 확인을 받는 대화상자입니다. 표현부 컴포넌트 — 스크림·포털·포커스 트랩은 앱 셸이 담당합니다.">
      <Section title="Playground">
        <Playground
          stage={<Alert title="메모를 삭제할까요?" actions={btns === '2버튼'
            ? <><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">삭제</Button></>
            : <Button size="s">확인</Button>}>
            삭제하면 되돌릴 수 없어요.
          </Alert>}
          panel={<Seg label="actions" value={btns} options={['2버튼', '1버튼'] as const} onChange={setBtns} />}
          code={`<Alert title="메모를 삭제할까요?" actions={...}>삭제하면 되돌릴 수 없어요.</Alert>`} />
      </Section>
      <Section title="Variants" desc="확인+취소 2버튼이 기본, 단순 공지는 1버튼.">
        <Canvas style={{ gap: 32 }}>
          <Spec label="2버튼 · 기본">
            <Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">삭제</Button></>}>삭제하면 되돌릴 수 없어요.</Alert>
          </Spec>
          <Spec label="1버튼 · 공지">
            <Alert title="점검 안내" actions={<Button size="s">확인</Button>}>오늘 밤 12시부터 30분간 점검합니다.</Alert>
          </Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="실사용은 스크림(material/dimmer) 위 중앙 배치입니다.">
        <Canvas>
          <div style={{ position: 'relative', width: '100%', maxWidth: 480, height: 260, borderRadius: 12, overflow: 'hidden', background: 'var(--iris-semantic-background-normal-normal)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--iris-semantic-material-dimmer, rgba(0,0,0,.52))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">삭제</Button></>}>삭제하면 되돌릴 수 없어요.</Alert>
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 블록 간격(px). 폭 320 고정.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">삭제</Button></>}>삭제하면 되돌릴 수 없어요.</Alert>
                {/* 실측: 제목 20~40 · G8 · 본문 48~70 · G20 · 버튼 90~124 · padB 124~144 */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 20 }}>20</span>
                <span className="size-zone pad" style={{ left: 0, top: 20, width: 20, height: 104 }}>20</span>
                <span className="size-zone pad" style={{ right: 0, top: 20, width: 20, height: 104 }}>20</span>
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 124, height: 20 }}>20</span>
                <span className="size-zone gap" style={{ left: 20, right: 20, top: 40, height: 8 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 39 }}>8</span>
                <span className="size-zone gap" style={{ left: 20, right: 20, top: 70, height: 20 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 76 }}>20</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>2버튼 · 기본</b>
              <span className="sub">W 320 · P 20 · R 16 · elevation large</span>
              <span className="sub">제목 heading-2 18 → 본문 8 → 액션 20 · 버튼 간 8</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['W 320', 'P 20', 'R 16', '제목→본문 8', '본문→액션 20']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="버튼 라벨 = 행동" doBody="같은 삭제 확인 — 무엇이 일어나는지 버튼이 말합니다."
          doEx={<Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">삭제</Button></>}>삭제하면 되돌릴 수 없어요.</Alert>}
          dontTitle="예 / 아니요" dontBody="같은 확인인데 라벨이 행동을 안 담으면 질문을 다시 읽어야 합니다."
          dontEx={<Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">아니요</Button><Button size="s">예</Button></>}>삭제하면 되돌릴 수 없어요.</Alert>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '질문형 제목 (필수)'],
          ['children', 'ReactNode', '—', '본문 — 결과·되돌림 가능 여부'],
          ['actions', 'ReactNode', '—', '우측 정렬 버튼들, 주 행동은 맨 오른쪽'],
        ]} />
      </Section>
    </Page>
  );
}
