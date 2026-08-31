import { useRef, useState } from 'react';
import { Snackbar, Button, Toast } from '@iris/react';
import { Page, Section, Canvas, Chips, Playground, DoDont, Props } from '../components/Doc';

export default function SnackbarPage() {
  const [deleted, setDeleted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const del = () => { setDeleted(true); clearTimeout(timer.current); timer.current = setTimeout(() => setDeleted(false), 5000); };
  const undo = () => { clearTimeout(timer.current); setDeleted(false); };
  return (
    <Page kicker="Components · Feedback" title="Snackbar" desc="액션이 붙는 지속형 알림입니다 — 실행 취소가 대표 용도. 단순 통보면 Toast를 씁니다.">
      <Section title="Playground" desc="삭제해 보세요 — 5초 안에 실행 취소할 수 있습니다.">
        <Playground
          stage={<div style={{ position: 'relative', width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {deleted
              ? <span style={{ color: 'var(--iris-semantic-label-assistive)', fontSize: 14 }}>메모 없음</span>
              : <Button size="s" variant="outlined" color="assistive" onClick={del}>메모 삭제</Button>}
            {deleted && <Snackbar actionLabel="실행 취소" onAction={undo}
              style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', minWidth: 260 }}>
              메모를 삭제했습니다
            </Snackbar>}
          </div>}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>실행 취소를 누르면<br />메모가 돌아옵니다.</div>}
          code={`<Snackbar actionLabel="실행 취소" onAction={undo}>메모를 삭제했습니다</Snackbar>`} />
      </Section>
      <Section title="States" desc="한 줄이 기본, 길면 두 줄까지.">
        <Canvas col style={{ gap: 12 }}>
          <Snackbar actionLabel="실행 취소" style={{ minWidth: 300 }}>메모를 삭제했습니다</Snackbar>
          <Snackbar actionLabel="재시도" style={{ maxWidth: 340 }}>네트워크가 불안정해 3개 항목이 동기화되지 않았습니다.</Snackbar>
        </Canvas>
      </Section>
      <Section title="Usage" desc="화면 하단 중앙 — 사라지기 전까지 액션이 살아있습니다.">
        <Canvas>
          <div style={{ position: 'relative', width: '100%', maxWidth: 420, height: 200, borderRadius: 12, background: 'var(--iris-semantic-background-normal-normal)', border: '1px solid var(--iris-semantic-line-solid-neutral)' }}>
            <Snackbar actionLabel="실행 취소" style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', minWidth: 280 }}>메모를 삭제했습니다</Snackbar>
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩(px) — 우측은 액션 버튼 자체 패딩 8이 있어 8로 좁습니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <Snackbar actionLabel="실행 취소" style={{ whiteSpace: 'nowrap' }}>메모를 삭제했습니다</Snackbar>
                {/* H48 · padL 16 · padR 8 (+액션 자체 P8) */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 16, height: 48 }}>16</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 8, height: 48 }} />
                <span className="size-num" style={{ right: 4, top: -11, transform: 'translateX(50%)' }}>8</span>
                <span className="size-num" style={{ left: -24, top: 22 }}>48</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>실행 취소</b>
              <span className="sub">min-H 48 · P 좌 16 · 우 8 · R 12 · 문구↔액션 16</span>
              <span className="sub">액션 label-1 700 · 자체 P 8 · inverse primary</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 48 }}><Snackbar actionLabel="실행 취소">메모를 삭제했습니다</Snackbar></div>
              <Chips primary="고정" items={['min-H 48', 'P 좌 16 · 우 8', 'G 16', 'R 12', '액션 label-1']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="되돌릴 기회 제공" doBody="같은 삭제 — 액션 하나(실행 취소)를 5초쯤 제공합니다."
          doEx={<Snackbar actionLabel="실행 취소" style={{ minWidth: 240 }}>메모를 삭제했습니다</Snackbar>}
          dontTitle="액션 없는 통보에 스낵바" dontBody="같은 통보에 액션이 없다면 Toast가 맞습니다."
          dontEx={<Toast tone="positive">메모를 삭제했습니다</Toast>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['children', 'ReactNode', '—', '문구'],
          ['actionLabel', 'string', '—', "액션 라벨 — '실행 취소' 등 하나"],
          ['onAction', '() => void', '—', '액션 클릭 핸들러'],
        ]} />
      </Section>
    </Page>
  );
}
