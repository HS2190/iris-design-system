import { useState } from 'react';
import { BottomNavigation, type BottomNavItem } from '@iris/react';
import { Page, Section, Canvas, Chips, Playground, DoDont, Props } from '../components/Doc';

const items: BottomNavItem[] = [
  { id: 'home', label: '홈', icon: 'home' },
  { id: 'search', label: '검색', icon: 'search' },
  { id: 'noti', label: '알림', icon: 'bell', badge: 3 },
  { id: 'me', label: '마이', icon: 'user' },
];

export default function BottomNavigationPage() {
  const [tab, setTab] = useState('home');
  return (
    <Page kicker="Components · Navigations" title="Bottom navigation" desc="모바일 하단 탭 바입니다. 3~5탭, 아이콘 24 + 라벨 10, 활성 탭은 primary + aria-current로 노출됩니다.">
      <Section title="Playground" desc="탭을 눌러보세요 — 알림 탭엔 Push badge가 얹혀 있습니다.">
        <Playground
          stage={<BottomNavigation items={items} value={tab} onChange={setTab} style={{ width: 340 }} />}
          panel={<div style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)', lineHeight: 1.6 }}>현재 탭: <b>{tab}</b></div>}
          code={`<BottomNavigation items={items} value="${tab}" onChange={setTab} />`} />
      </Section>
      <Section title="Variants" desc="기본 4탭 · 미확인 알림은 Push badge로.">
        <Canvas col style={{ gap: 16 }}>
          <BottomNavigation items={items.map(i => ({ ...i, badge: undefined }))} value="home" style={{ width: 360 }} />
          <BottomNavigation items={items} value="home" style={{ width: 360 }} />
        </Canvas>
      </Section>
      <Section title="States" desc="활성 = primary 색 + 라벨 700. 한 번에 하나만 활성.">
        <Canvas col>
          <BottomNavigation items={items} value="noti" style={{ width: 360 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="모바일 프레임 최하단 고정.">
        <Canvas>
          <div style={{ width: 300, border: '1px solid var(--iris-semantic-line-solid-neutral)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--iris-semantic-label-assistive)', fontSize: 13 }}>콘텐츠 영역</div>
            <BottomNavigation items={items} value="home" />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 상단 패딩, 청록 = 아이콘·라벨 간격(px). 높이 56 · 탭 폭 균등.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <BottomNavigation items={items.slice(0, 3)} value="home" style={{ width: 270 }} />
                {/* H 56 · padT 8 · 아이콘 24 (8~32) · G 4 (32~36) · 라벨 10 (36~46) */}
                <span className="size-zone pad" style={{ left: 0, right: 0, top: 0, height: 8 }}>8</span>
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 32, height: 4 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 30 }}>4</span>
                <span className="size-num" style={{ left: -24, top: 26 }}>56</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>3탭 · 홈 활성</b>
              <span className="sub">H 56 · padT 8 · 아이콘 24 · 라벨 caption-2 10</span>
              <span className="sub">아이콘↔라벨 4 · 탭 폭 균등 · 상단 보더 1</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <Chips primary="고정" items={['H 56', 'padT 8', '아이콘 24', 'G 4', '라벨 10', '탭 균등']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="3~5탭 + 라벨" doBody="같은 앱 — 최상위 목적지만 탭으로, 전부 라벨과 함께."
          doEx={<BottomNavigation items={items} value="home" style={{ width: 280 }} />}
          dontTitle="6탭 이상" dontBody="같은 앱에 탭을 더 얹으면 눌림 영역이 좁아지고 위계가 무너집니다."
          dontEx={<BottomNavigation items={[...items, { id: 'set', label: '설정', icon: 'settings' }, { id: 'cal', label: '캘린더', icon: 'calendar' }]} value="home" style={{ width: 280 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['items', '{ id, label, icon, badge? }[]', '—', '탭 3~5개 — badge는 미확인 수'],
          ['value / onChange', 'string · (id) => void', '—', '활성 탭 (aria-current=page)'],
        ]} />
      </Section>
    </Page>
  );
}
