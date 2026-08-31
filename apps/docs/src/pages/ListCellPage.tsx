import { useState } from 'react';
import { ListCell, Icon, Avatar, Switch, SectionHeader, Divider } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function ListCellPage() {
  const [ld, setLd] = useState<'none' | 'icon' | 'avatar'>('icon');
  const [tr, setTr] = useState<'none' | 'chevron' | 'value' | 'switch'>('chevron');
  return (
    <Page kicker="Components · Contents" title="List cell" desc="리스트 한 행입니다. 리딩(아이콘·아바타) + 콘텐츠(제목·설명) + 트레일링(값·셰브론·스위치) 3슬롯 구조, 최소 높이 56.">
      <Section title="Playground">
        <Playground
          stage={<ListCell interactive title="알림 설정" description="푸시·이메일 수신 관리" style={{ width: 320 }}
            leading={ld === 'icon' ? <Icon name="settings" /> : ld === 'avatar' ? <Avatar size="m" name="안" /> : undefined}
            trailing={tr === 'chevron' ? <Icon name="chevron-right" size={20} /> : tr === 'value' ? <>사용 중<Icon name="chevron-right" size={20} /></> : tr === 'switch' ? <Switch aria-label="알림" defaultChecked /> : undefined} />}
          panel={<>
            <Seg label="leading" value={ld} options={['none', 'icon', 'avatar'] as const} onChange={setLd} />
            <Seg label="trailing" value={tr} options={['none', 'chevron', 'value', 'switch'] as const} onChange={setTr} />
          </>}
          code={`<ListCell interactive title="알림 설정" description="푸시·이메일 수신 관리"${ld !== 'none' ? ` leading={<${ld === 'icon' ? 'Icon' : 'Avatar'} ... />}` : ''}${tr !== 'none' ? ' trailing={...}' : ''} />`} />
      </Section>
      <Section title="Variants" desc="슬롯 조합으로 구성이 달라집니다. 제목·설명은 넘치면 말줄임.">
        <Canvas col style={{ gap: 4 }}>
          <ListCell title="1줄 · 제목만" style={{ width: 340 }} />
          <ListCell title="2줄 · 제목 + 설명" description="보조 설명은 caption-1" style={{ width: 340 }} />
          <ListCell title="리딩 아이콘" description="설정 진입" leading={<Icon name="settings" />} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 340 }} />
          <ListCell title="트레일링 값" trailing={<>한국어<Icon name="chevron-right" size={20} /></>} style={{ width: 340 }} />
        </Canvas>
      </Section>
      <Section title="States" desc="interactive 셀은 hover 배경 + 포커스 링. 올려보세요.">
        <Canvas col style={{ gap: 4 }}>
          <ListCell title="기본 (정적)" description="정보 표시 전용" style={{ width: 340 }} />
          <ListCell interactive title="인터랙티브" description="hover · 키보드 포커스" trailing={<Icon name="chevron-right" size={20} />} style={{ width: 340 }} />
        </Canvas>
      </Section>
      <Section title="Usage" desc="설정 화면 — 섹션 헤더 + 셀 + 그룹 경계 구분선.">
        <Canvas col>
          <div style={{ width: 340 }}>
            <SectionHeader title="알림" />
            <ListCell title="푸시 알림" trailing={<Switch aria-label="푸시" defaultChecked />} />
            <ListCell title="이메일 요약" trailing={<Switch aria-label="이메일" />} />
            <Divider style={{ margin: '8px 0' }} />
            <ListCell interactive title="로그아웃" />
          </div>
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 슬롯 간격(px). 최소 높이 56 — 내용이 길면 늘어납니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.5)', lineHeight: 1 }}>
                <ListCell title="알림 설정" description="푸시·이메일 수신 관리" leading={<Icon name="settings" />}
                  trailing={<Icon name="chevron-right" size={20} />} style={{ width: 280 }} />
                {/* H 56 · padL 16 · 리딩 24 (x16~40) · gap 12 (x40~52) · padR 16 · 트레일링 20 (right 16~36) · gap 8 (right 36~44) */}
                <span className="size-zone pad" style={{ left: 0, top: 0, width: 16, height: 56 }}>16</span>
                <span className="size-zone gap" style={{ left: 40, top: 0, width: 12, height: 56 }} />
                <span className="size-num gapnum" style={{ left: 46, top: -12, transform: 'translateX(-50%)' }}>12</span>
                <span className="size-zone pad" style={{ right: 0, top: 0, width: 16, height: 56 }}>16</span>
                <span className="size-zone gap" style={{ right: 36, top: 0, width: 8, height: 56 }} />
                <span className="size-num gapnum" style={{ right: 40, top: -12, transform: 'translateX(50%)' }}>8</span>
                <span className="size-num" style={{ left: -24, top: 26 }}>56</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본 · 리딩 + 트레일링</b>
              <span className="sub">min-H 56 · P 8 · 16 · hover R 10</span>
              <span className="sub">리딩 간격 12 · 트레일링 간격 8 (트레일링 내부 8)</span>
              <span className="sub">제목 body-1 · 설명 caption-1 · 행간 2</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 56 }}><ListCell title="알림 설정" description="푸시·이메일" leading={<Icon name="settings" />} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 300 }} /></div>
              <Chips primary="고정" items={['min-H 56', 'P 8 · 16', '리딩 G 12', '트레일링 G 8', 'body-1 / caption-1']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="제목과 설명을 분리" doBody="같은 셀 — 핵심은 제목에, 부가 정보는 설명 줄에."
          doEx={<ListCell title="알림 설정" description="푸시·이메일 수신 관리" trailing={<Icon name="chevron-right" size={20} />} style={{ width: 260 }} />}
          dontTitle="제목에 전부 욱여넣기" dontBody="같은 내용을 한 줄에 쓰면 스캔이 안 되고 말줄임됩니다."
          dontEx={<ListCell title="알림 설정 — 푸시·이메일 수신 관리" trailing={<Icon name="chevron-right" size={20} />} style={{ width: 260 }} />} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['title', 'ReactNode', '—', '제목 (필수) — 넘치면 말줄임'],
          ['description', 'ReactNode', '—', '보조 설명 줄'],
          ['leading / trailing', 'ReactNode', '—', '좌/우 슬롯'],
          ['interactive', 'boolean', 'false', 'hover 배경 + role=button + 포커스'],
        ]} />
      </Section>
    </Page>
  );
}
