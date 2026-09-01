import { useState } from 'react';
import { TopNavigation, Icon, ListCell } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, Chips, Seg, Playground, DoDont, Props, CodeSpec } from '../components/Doc';

const iconBtn = (name: 'arrow-left' | 'bell' | 'search' | 'settings' | 'share', label: string) => (
  <button key={name} aria-label={label} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: 'none', background: 'none', borderRadius: 10, color: 'var(--iris-semantic-label-neutral)', cursor: 'pointer' }}>
    <Icon name={name} />
  </button>
);

export default function TopNavigationPage() {
  const [tr, setTr] = useState<'0' | '1' | '2'>('2');
  return (
    <Page kicker="Components · Navigations" title="Top navigation" desc="화면 상단 바입니다. 높이는 nav-top-height 토큰(웹 64 · iOS 44 · Android 56), 좌측 뒤로가기 · 제목 · 우측 액션 최대 2개.">
      <Section title="Playground">
        <Playground
          stage={<TopNavigation title="설정" leading={iconBtn('arrow-left', '뒤로')} style={{ width: 340 }}
            trailing={tr === '0' ? undefined : <>{iconBtn('search', '검색')}{tr === '2' && iconBtn('bell', '알림')}</>} />}
          panel={<Seg label="trailing" value={tr} options={['0', '1', '2'] as const} onChange={setTr} />}
 />
      </Section>
      <Section title="Variants">
        <Canvas col style={{ gap: 12 }}>
          <TopNavigation title="홈" style={{ width: 360 }} />
          <TopNavigation title="설정" leading={iconBtn('arrow-left', '뒤로')} style={{ width: 360 }} />
          <TopNavigation title="알림" leading={iconBtn('arrow-left', '뒤로')} trailing={<>{iconBtn('search', '검색')}{iconBtn('settings', '설정')}</>} style={{ width: 360 }} />
        </Canvas>
      </Section>
      <Section title="States" desc="제목이 길면 말줄임됩니다 — 액션은 밀리지 않습니다.">
        <Canvas col>
          <TopNavigation title="아주 긴 화면 제목은 이렇게 말줄임 처리됩니다" leading={iconBtn('arrow-left', '뒤로')} trailing={iconBtn('share', '공유')} style={{ width: 320 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="페이지 최상단 — 아래 콘텐츠와 한 화면으로.">
        <Canvas col style={{ gap: 0 }}>
          <div style={{ width: 360, border: '1px solid var(--iris-semantic-line-solid-neutral)', borderRadius: 12, overflow: 'hidden' }}>
            <TopNavigation title="알림" leading={iconBtn('arrow-left', '뒤로')} trailing={iconBtn('settings', '설정')} />
            <ListCell title="새 댓글 3개" description="디자인 시스템 문서" trailing={<Icon name="chevron-right" size={20} />} />
            <ListCell title="리뷰 요청" description="Button 컴포넌트 PR" trailing={<Icon name="chevron-right" size={20} />} />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 좌우 패딩, 청록 = 슬롯 간격(px). 높이 64(웹 토큰) · 아이콘 버튼 40.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.25)', lineHeight: 1 }}>
                <TopNavigation title="설정" leading={iconBtn('arrow-left', '뒤로')} trailing={iconBtn('bell', '알림')} style={{ width: 320 }} />
                {/* H 64 · padL/R 16 · 아이콘 버튼 40 (y12~52) · 슬롯 간격 8 */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 16, height: 64 }}>16</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 16, height: 64 }}>16</span>
                <span className="size-zone gap" style={{ left: 56, top: 12, width: 8, height: 40 }} />
                <span className="size-num gapnum" style={{ left: 60, top: -1, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-num" style={{ left: -24, top: 30 }}>64</span>
                <span className="size-num" style={{ left: 36, top: 54, transform: 'translateX(-50%)' }}>40</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>뒤로 + 제목 + 액션</b>
              <span className="sub">H nav-top-height (웹 64 · iOS 44 · Android 56) · P 16</span>
              <span className="sub">아이콘 버튼 40 (아이콘 24) · 슬롯 간격 8 · 하단 보더 1</span>
              <span className="sub">제목 heading-2 18 700 · 말줄임</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['H 64 (nav-top-height)', 'P 16', '버튼 40', 'G 8', 'heading-2 18']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="액션은 최대 2개" doBody="같은 화면 — 자주 쓰는 것만 남기고 나머지는 더보기로."
          doEx={<TopNavigation title="알림" trailing={<>{iconBtn('search', '검색')}{iconBtn('more-vertical' as never, '더보기')}</>} style={{ width: 280 }} />}
          dontTitle="액션 나열" dontBody="같은 화면에 4개를 걸면 제목이 밀리고 눌림 실수가 늘어납니다."
          dontEx={<TopNavigation title="알림" trailing={<>{iconBtn('search', '검색')}{iconBtn('bell', '알림')}{iconBtn('share', '공유')}{iconBtn('settings', '설정')}</>} style={{ width: 280 }} />} />
      </Section>
      <Section title="Code" desc="Playground에서 고른 설정이 그대로 반영됩니다.">
        <CodeSpec name="TopNavigation" code={`<TopNavigation title="설정" leading={<IconButton ... />}${tr !== '0' ? ' trailing={...}' : ''} />`} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '화면 제목 — 넘치면 말줄임'],
          ['leading', 'ReactNode', '—', '좌측 — 뒤로가기·로고'],
          ['trailing', 'ReactNode', '—', '우측 액션 1~2개'],
        ]} />
      </Section>
    </Page>
  );
}
