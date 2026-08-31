import { useState } from 'react';
import { Icon, iconNames, Button, ListCell } from '@iris/react';
import { Page, Section, Canvas, Spec, Seg, Playground, DoDont, Props } from '../components/Doc';

export default function IconPage() {
  const [copied, setCopied] = useState('');
  const [sz, setSz] = useState<'16' | '20' | '24'>('24');
  const [tn, setTn] = useState<'normal' | 'primary' | 'negative'>('normal');
  return (
    <Page kicker="Foundations · Icons" title="Icon" desc="24px 그리드의 라인 아이콘 30종. 2px round 스트로크, 색은 currentColor — 부모의 label/* 토큰을 그대로 따릅니다.">
      <Section title="Playground">
        <Playground
          stage={<span style={{ lineHeight: 0, color: tn === 'primary' ? 'var(--iris-semantic-label-primary)' : tn === 'negative' ? 'var(--iris-semantic-status-negative)' : 'var(--iris-semantic-label-normal)' }}><Icon name="star" size={Number(sz)} /></span>}
          panel={<>
            <Seg label="size" value={sz} options={['16', '20', '24'] as const} onChange={setSz} />
            <Seg label="color" value={tn} options={['normal', 'primary', 'negative'] as const} onChange={setTn} />
          </>}
          code={`<Icon name="star"${sz !== '24' ? ` size={${sz}}` : ''} />`} />
      </Section>
      <Section title="Library" desc="클릭하면 이름이 복사됩니다.">
        <Canvas style={{ gap: 8 }}>
          {iconNames.map(n => (
            <button key={n} onClick={() => { navigator.clipboard?.writeText(n); setCopied(n); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 92, padding: '14px 4px',
                background: copied === n ? 'var(--iris-semantic-fill-primary)' : 'transparent', border: 'none', borderRadius: 8,
                color: 'var(--iris-semantic-label-neutral)', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Icon name={n} />
              <span style={{ fontSize: 11, fontFamily: '"IBM Plex Mono", monospace' }}>{n}</span>
            </button>
          ))}
        </Canvas>
      </Section>
      <Section title="Usage" desc="아이콘은 단독보다 버튼·리스트 셀 안에서 라벨과 함께 씁니다.">
        <Canvas style={{ gap: 32, alignItems: 'center' }}>
          <Button variant="outlined" color="assistive" leadingIcon="share">공유</Button>
          <ListCell title="알림 설정" leading={<Icon name="bell" />} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 260 }} />
        </Canvas>
      </Section>
      <Section title="Size" desc="16 · 20 · 24가 표준입니다. 색은 감싸는 요소의 color로 정합니다.">
        <Canvas>
          <Spec label="16"><Icon name="star" size={16} /></Spec>
          <Spec label="20"><Icon name="star" size={20} /></Spec>
          <Spec label="24 · 기본"><Icon name="star" /></Spec>
          <Spec label="label/primary"><span style={{ color: 'var(--iris-semantic-label-primary)' }}><Icon name="star" /></span></Spec>
          <Spec label="status/negative"><span style={{ color: 'var(--iris-semantic-status-negative)' }}><Icon name="star" /></span></Spec>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="자명한 아이콘만 단독 사용" doBody="닫기·검색·더보기처럼 뜻이 통용되는 아이콘만 단독으로. 그 외엔 라벨과 함께." doEx={<><Button variant="outlined" color="assistive" leadingIcon="share">공유</Button><Icon name="close" /></>}
          dontTitle="모호한 아이콘을 라벨 없이" dontBody="필터·설정처럼 해석이 갈리는 아이콘을 단독으로 쓰면 학습 비용이 생깁니다." dontEx={<><Icon name="filter" /><Icon name="settings" /><Icon name="more-vertical" /></>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['name', 'IconName (30종)', '—', '아이콘 이름'],
          ['size', 'number', '24', 'px 크기'],
          ['aria-label', 'string', '—', '의미 있는 아이콘일 때만. 없으면 aria-hidden 처리'],
        ]} />
      </Section>
    </Page>
  );
}
