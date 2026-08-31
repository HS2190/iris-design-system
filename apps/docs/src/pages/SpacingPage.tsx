import { ListCell, Icon } from '@iris/react';
import { Page, Section, Chips, DoDont } from '../components/Doc';

const SPACE = [2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 120];
const RADIUS: [string, string, string][] = [
  ['xs', '8', '뱃지 · 칩 내부 · 메뉴 항목 · 세그먼트'],
  ['sm', '10', '입력 · 버튼 M · 아이콘 버튼 · 셀 hover'],
  ['md', '12', '카드 내부 · 토스트 · 메뉴 · 팝오버'],
  ['lg', '16', '카드 · 모달(Alert·Popup)'],
  ['xl', '20', '큰 컨테이너'],
  ['sheet', '16*', 'Bottom sheet 상단 (iOS 20 · And 28)'],
  ['full', '999', '필 · 아바타 · 스위치 · dot'],
];

export default function SpacingPage() {
  return (
    <Page kicker="Foundations" title="Spacing" desc="4 기반 스케일 하나로 모든 간격을 만듭니다(2는 미세 조정 전용). 컴포넌트의 모든 패딩·간격 수치가 이 스케일 위에 있어서, 화면 어디를 잘라도 리듬이 같습니다.">
      <Section title="원리" desc="4의 배수만 씁니다 — 8·12·16이 컴포넌트 내부의 주력이고, 20~32가 블록, 40+가 섹션 리듬입니다.">
        <div className="fnd-diagram" style={{ gap: 6, alignItems: 'flex-end' }}>
          {[4, 8, 12, 16, 20, 24, 32].map(v => (
            <div key={v} className="fnd-node">
              <span style={{ width: 28, height: v * 2.2, background: 'var(--iris-semantic-fill-primary)', border: '1px solid var(--iris-semantic-line-primary-normal)', borderRadius: 4 }} />
              <small>{v}</small>
            </div>
          ))}
          <span style={{ marginLeft: 16, fontSize: 12.5, color: 'var(--iris-semantic-label-assistive)', maxWidth: 260, lineHeight: 1.6, alignSelf: 'center' }}>
            임의 수치(13·18…)가 없으니 "이 간격 몇이었지?"가 사라집니다.
          </span>
        </div>
      </Section>
      <Section title="Scale" desc="--iris-space-N — 값이 곧 이름입니다.">
        {SPACE.map(v => (
          <div className="space-row" key={v}>
            <span className="space-label">{v}</span>
            <span className="space-bar" style={{ width: v * 2.6 }} />
          </div>
        ))}
      </Section>
      <Section title="실컴포넌트 해부" desc="List cell 하나에 스케일이 어떻게 배치되는지 — 주황 = 패딩, 청록 = 간격.">
        <div className="canvas col" style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.25)', lineHeight: 1 }}>
                <ListCell title="알림 설정" description="푸시·이메일 수신 관리" leading={<Icon name="settings" />}
                  trailing={<Icon name="chevron-right" size={20} />} style={{ width: 280 }} />
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 16, height: 56 }}>16</span>
                <span className="size-zone gap" style={{ left: 40, top: 0, width: 12, height: 56 }} />
                <span className="size-num gapnum" style={{ left: 46, top: -12, transform: 'translateX(-50%)' }}>12</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 16, height: 56 }}>16</span>
                <span className="size-zone gap" style={{ right: 36, top: 0, width: 8, height: 56 }} />
                <span className="size-num gapnum" style={{ right: 40, top: -12, transform: 'translateX(50%)' }}>8</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>List cell</b>
              <span className="sub">패딩 16 · 리딩 간격 12 · 트레일링 간격 8 — 전부 스케일 값</span>
              <span className="sub">모든 컴포넌트 문서의 Size 섹션이 같은 표기법을 씁니다</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
        </div>
      </Section>
      <Section title="쓰임" desc="어림 규칙 — 컴포넌트들이 실제로 쓰는 구간.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Chips primary="2–6" items={['미세 정렬', '제목↔설명 2', '세그 간 2', '아이콘↔라벨 4']} />
          <Chips primary="8–16" items={['컴포넌트 내부 패딩·간격', '입력 P 16', '리딩 G 12', '아이콘 G 8']} />
          <Chips primary="20–32" items={['블록 간·컨테이너 패딩', 'Alert P 20', '섹션 하위 24']} />
          <Chips primary="40+" items={['섹션 간·페이지 리듬', '히어로 상하 48+']} />
        </div>
      </Section>
      <Section title="Radius" desc="컴포넌트 체급이 클수록 라운드도 커집니다 — 어떤 컴포넌트가 어느 단계인지가 규칙입니다.">
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 16 }}>
          {RADIUS.map(([n]) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <span style={{ width: 64, height: 64, background: 'var(--iris-semantic-fill-normal)', border: '1px solid var(--iris-semantic-line-solid-normal)', borderRadius: `var(--iris-radius-${n})` }} />
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: 'var(--iris-semantic-label-neutral)' }}>{n}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RADIUS.map(([n, v, use]) => <Chips key={n} primary={`${n} · ${v}`} items={[use]} />)}
        </div>
      </Section>
      <Section title="Stroke">
        <Chips primary="stroke" items={['hairline 1 — 구분선·보더', 'bar 2 — 탭 인디케이터·트래커 커넥터']} />
      </Section>
      <Section title="How to use">
        <DoDont doTitle="스케일에 스냅" doBody="같은 리스트 — gap: var(--iris-space-12)처럼 토큰으로 쓰면 화면 전체 리듬이 맞습니다."
          doEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 180 }}>
            {[1, 2, 3].map(i => <span key={i} style={{ height: 34, borderRadius: 8, background: 'var(--iris-semantic-fill-normal)' }} />)}
          </div>}
          dontTitle="임의 수치" dontBody="같은 리스트를 13px·18px로 벌리면 다른 화면과 리듬이 어긋납니다."
          dontEx={<div style={{ display: 'flex', flexDirection: 'column', width: 180 }}>
            <span style={{ height: 34, borderRadius: 8, background: 'var(--iris-semantic-fill-normal)', marginBottom: 13 }} />
            <span style={{ height: 34, borderRadius: 8, background: 'var(--iris-semantic-fill-normal)', marginBottom: 19 }} />
            <span style={{ height: 34, borderRadius: 8, background: 'var(--iris-semantic-fill-normal)' }} />
          </div>} />
        <div className="codeline" style={{ marginTop: 16 }}>{'gap: var(--iris-space-12);  padding: var(--iris-space-16);'}</div>
      </Section>
    </Page>
  );
}
