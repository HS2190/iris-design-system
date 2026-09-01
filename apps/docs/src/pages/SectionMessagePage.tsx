import { useState } from 'react';
import { SectionMessage, TextField, Toast } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const tones = ['info', 'positive', 'cautionary', 'negative'] as const;
const COPY = {
  info: ['알아두세요', '초안은 30일 동안 보관됩니다.'],
  positive: ['제출 완료', '검토 결과는 이메일로 알려드려요.'],
  cautionary: ['저장 공간 부족', '10GB 중 9.5GB를 사용 중입니다. 오래된 파일을 정리해 주세요.'],
  negative: ['저장 실패', '네트워크 확인 후 다시 시도해 주세요.'],
} as const;

export default function SectionMessagePage() {
  const [tone, setTone] = useState<(typeof tones)[number]>('info');
  const [cl, setCl] = useState<'없음' | '있음'>('없음');
  return (
    <Page kicker="Components · Feedback" title="Section message" desc="화면 맥락 안에 남는 인라인 안내 배너입니다. 잠깐 통보는 Toast, 흐름 차단은 Alert.">
      <Section title="Playground">
        <Playground
          stage={<SectionMessage tone={tone} title={COPY[tone][0]} onClose={cl === '있음' ? () => {} : undefined} style={{ width: 340 }}>{COPY[tone][1]}</SectionMessage>}
          panel={<>
            <Seg label="tone" value={tone} options={tones} onChange={setTone} />
            <Seg label="close" value={cl} options={['없음', '있음'] as const} onChange={setCl} />
          </>}
 />
      </Section>
      <Section title="Variants" desc="Tone 4종 — status/* 토큰 8% 틴트 + 아이콘 색.">
        <Canvas col style={{ gap: 12 }}>
          {tones.map(t => <SectionMessage key={t} tone={t} title={COPY[t][0]} style={{ width: 380 }}>{COPY[t][1]}</SectionMessage>)}
        </Canvas>
      </Section>
      <Section title="States" desc="제목 없이 본문만 · 닫기 버튼 포함.">
        <Canvas col style={{ gap: 12 }}>
          <SectionMessage tone="info" style={{ width: 380 }}>초안은 30일 동안 보관됩니다.</SectionMessage>
          <SectionMessage tone="info" title="알아두세요" onClose={() => {}} style={{ width: 380 }}>초안은 30일 동안 보관됩니다.</SectionMessage>
        </Canvas>
      </Section>
      <Section title="Usage" desc="폼 상단 오류 요약 — 문제 필드와 같은 화면에 남습니다.">
        <Canvas col>
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionMessage tone="negative" title="저장 실패">네트워크 확인 후 다시 시도해 주세요.</SectionMessage>
            <TextField label="이메일" defaultValue="hs@example" error="이메일 형식이 올바르지 않습니다" />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 아이콘·본문 간격(px).">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <SectionMessage tone="info" style={{ width: 260, whiteSpace: 'nowrap' }}>초안은 30일 보관됩니다</SectionMessage>
                {/* H 44 · padT/B 12 · padL/R 16 · 아이콘 20 (16~36) · G8 (36~44) */}
                <span className="size-zone pad" style={{ left: 0, top: 12, width: 16, height: 20 }} />
                <span className="size-num" style={{ left: -10, top: 19 }}>16</span>
                <span className="size-zone pad" style={{ left: 16, right: 16, top: 0, height: 12 }}>12</span>
                <span className="size-zone pad" style={{ left: 16, right: 16, bottom: 0, height: 12 }}>12</span>
                <span className="size-zone gap" style={{ left: 36, top: 12, width: 8, height: 20 }} />
                <span className="size-num gapnum" style={{ left: 40, top: -12, transform: 'translateX(-50%)' }}>8</span>
              </div>
            </div>
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <SectionMessage tone="info" title="알아두세요" onClose={() => {}} style={{ width: 260 }}>초안은 30일 보관됩니다</SectionMessage>
                {/* 실측: H63 · 제목 13~27 · 간격 2 · 본문 29~51 · 닫기 20×20 @224 (본문↔닫기 8 · 우측 16) */}
                <span className="size-zone gap" style={{ left: 216, top: 12, width: 8, height: 20 }} />
                <span className="size-num gapnum" style={{ left: 220, top: -12, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-zone pad" style={{ right: 0, top: 12, width: 16, height: 20 }}>16</span>
                <span className="size-num" style={{ left: 234, top: 34, transform: 'translateX(-50%)' }}>20</span>
                <span className="size-zone gap" style={{ left: 44, width: 120, top: 27, height: 2 }} />
                <span className="size-num gapnum" style={{ left: 170, top: 23 }}>2</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>info · 본문만 / 닫기 포함</b>
              <span className="sub">P 12 · 16 · R 10 · 아이콘 20 · 간격 8</span>
              <span className="sub">틴트 = status 8% · 제목 label-1 700 · 본문 body-2 · 제목↔본문 2</span>
              <span className="sub">닫기 버튼 20 (아이콘 16) · 본문↔닫기 8 · 우측 16 · 상단 12 정렬</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['P 12 · 16', 'G 8', 'R 10', '아이콘 20', 'label-1 / body-2']} />
            </div>
            <div className="size-item">
              <Chips primary="닫기" items={['버튼 20 · 아이콘 16', 'G 8', '우측 16 · 상단 12']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="해결 방법까지 안내" doBody="같은 실패 — 원인과 다음 행동이 맥락 안에 남습니다."
          doEx={<SectionMessage tone="negative" title="저장 실패" style={{ width: 300 }}>네트워크 확인 후 다시 시도해 주세요.</SectionMessage>}
          dontTitle="사라지는 오류 통보" dontBody="같은 실패를 토스트로 흘리면 사용자가 놓칩니다."
          dontEx={<Toast tone="negative">저장 실패</Toast>} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="SectionMessage" code={`<SectionMessage tone="${tone}" title="${COPY[tone][0]}"${cl === '있음' ? ' onClose={dismiss}' : ''}>...</SectionMessage>`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['tone', "'info' | 'positive' | 'cautionary' | 'negative'", "'info'", 'status/* 토큰 매핑 · negative는 role=alert'],
          ['title', 'ReactNode', '—', '한 줄 요약'],
          ['children', 'ReactNode', '—', '본문 — 원인 + 다음 행동'],
          ['onClose', '() => void', '—', '있으면 닫기 버튼 표시'],
        ]} />
      </Section>
    </Page>
  );
}
