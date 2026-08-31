import { useState } from 'react';
import { FallbackView, Button, Card } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function FallbackViewPage() {
  const [ty, setTy] = useState<'검색 없음' | '빈 목록' | '오류'>('검색 없음');
  return (
    <Page kicker="Components · Feedback" title="Fallback view" desc="빈 목록·검색 결과 없음·오류를 채우는 중앙 안내입니다. 왜 비었는지와 다음 행동을 함께 제시합니다.">
      <Section title="Playground">
        <Playground
          stage={ty === '검색 없음'
            ? <FallbackView icon="search" title="검색 결과가 없어요" description={'다른 키워드로 검색해 보세요.'} />
            : ty === '빈 목록'
              ? <FallbackView icon="edit" title="아직 메모가 없어요" description="첫 메모를 작성해 보세요." action={<Button size="s">새 메모</Button>} />
              : <FallbackView icon="warning" title="불러오지 못했어요" description="네트워크 확인 후 다시 시도해 주세요." action={<Button size="s" variant="outlined" color="assistive">다시 시도</Button>} />}
          panel={<Seg label="type" value={ty} options={['검색 없음', '빈 목록', '오류'] as const} onChange={setTy} />}
          code={`<FallbackView icon="..." title="..." description="..." action={<Button ... />} />`} />
      </Section>
      <Section title="Variants" desc="같은 구조(아이콘·제목·설명·액션)로 세 상황을 커버합니다.">
        <Canvas style={{ gap: 24 }}>
          <Spec label="빈 목록 · 첫 사용"><FallbackView icon="edit" title="아직 메모가 없어요" description="첫 메모를 작성해 보세요." action={<Button size="s">새 메모</Button>} style={{ width: 220 }} /></Spec>
          <Spec label="검색 결과 없음"><FallbackView icon="search" title="검색 결과가 없어요" description="다른 키워드로 검색해 보세요." style={{ width: 220 }} /></Spec>
          <Spec label="로드 오류"><FallbackView icon="warning" title="불러오지 못했어요" description="네트워크를 확인해 주세요." action={<Button size="s" variant="outlined" color="assistive">다시 시도</Button>} style={{ width: 220 }} /></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="패널·카드 안을 채웁니다 — 목록이 있어야 할 자리 그대로.">
        <Canvas>
          <Card variant="outlined" style={{ width: 340 }}>
            <FallbackView icon="search" title="검색 결과가 없어요" description="다른 키워드로 검색해 보세요." style={{ padding: '16px 8px' }} />
          </Card>
        </Canvas>
      </Section>
      <Section title="Size" desc="청록 = 블록 간격(px). 아이콘 40 · 중앙 정렬.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <FallbackView icon="edit" title="아직 메모가 없어요" description="첫 메모를 작성해 보세요." action={<Button size="s">새 메모</Button>} style={{ width: 220, padding: 0 }} />
                {/* P0 기준: 아이콘 40 (0~40) · G12 · 제목 16 (52~68) · G4 · 설명 lh22 (72~94) · G16 · 버튼 34 (110~144) */}
                <span className="size-zone gap" style={{ left: 40, right: 40, top: 40, height: 12 }} />
                <span className="size-num gapnum" style={{ right: 20, top: 42 }}>12</span>
                <span className="size-zone gap" style={{ left: 40, right: 40, top: 68, height: 4 }} />
                <span className="size-num gapnum" style={{ right: 20, top: 66 }}>4</span>
                <span className="size-zone gap" style={{ left: 40, right: 40, top: 94, height: 16 }} />
                <span className="size-num gapnum" style={{ right: 20, top: 98 }}>16</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>빈 목록 · 액션 포함</b>
              <span className="sub">아이콘 40 (label-assistive) · 기본 P 32 · 16</span>
              <span className="sub">아이콘→제목 12 · 제목→설명 4 · 설명→액션 16</span>
              <span className="sub">제목 body-1 700 · 설명 body-2 alternative</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><FallbackView icon="search" title="검색 결과가 없어요" description="다른 키워드로 검색해 보세요." style={{ width: 240 }} /></div>
              <Chips primary="고정" items={['아이콘 40', 'G 12 · 4 · 16', 'P 32 · 16', 'body-1 / body-2']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="다음 행동을 제시" doBody="같은 빈 목록 — 왜 비었는지 + 무엇을 하면 되는지."
          doEx={<FallbackView icon="edit" title="아직 메모가 없어요" description="첫 메모를 작성해 보세요." action={<Button size="s">새 메모</Button>} style={{ width: 220, padding: '16px 8px' }} />}
          dontTitle="'없음'만 던지기" dontBody="같은 상황인데 막다른 골목이 됩니다 — 행동 없는 빈 화면."
          dontEx={<FallbackView title="데이터 없음" style={{ width: 220, padding: '16px 8px' }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['icon', 'IconName', "'search'", '상황을 나타내는 아이콘 (40px)'],
          ['title', 'ReactNode', '—', '상황 한 줄 (필수)'],
          ['description', 'ReactNode', '—', '이유 · 안내'],
          ['action', 'ReactNode', '—', '다음 행동 버튼 하나 권장'],
        ]} />
      </Section>
    </Page>
  );
}
