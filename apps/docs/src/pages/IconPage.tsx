import { useState } from 'react';
import { Icon, iconNames, Button, ListCell, type IconName, type IconVariant } from '@iris/react';
import { Page, Section, Canvas, Spec, Seg, Playground, DoDont, Props } from '../components/Doc';

const CATS: [string, IconName[]][] = [
  ['Navigation', ['chevron-up', 'chevron-down', 'chevron-left', 'chevron-right', 'arrow-left', 'arrow-right', 'external-link', 'menu', 'more-horizontal', 'more-vertical', 'home', 'sign-out', 'refresh', 'sort', 'sliders']],
  ['Actions', ['search', 'close', 'plus', 'minus', 'check', 'check-circle', 'x-circle', 'edit', 'trash', 'copy', 'link', 'download', 'upload', 'share', 'send', 'filter', 'qr-code']],
  ['Objects', ['file', 'folder', 'image', 'camera', 'calendar', 'clock', 'tag', 'gift', 'bag', 'cart', 'card', 'map-pin', 'globe', 'bookmark']],
  ['Communication', ['bell', 'mail', 'chat', 'phone', 'user']],
  ['Media', ['play', 'pause', 'mic', 'volume', 'eye', 'eye-off', 'wifi']],
  ['Status & Symbols', ['info', 'warning', 'star', 'heart', 'thumbs-up', 'flag', 'shield', 'lock', 'unlock', 'lightning', 'sun', 'moon', 'cloud', 'settings']],
];
const listed = new Set(CATS.flatMap(c => c[1]));
const rest = iconNames.filter(n => !listed.has(n));
if (rest.length) CATS.push(['기타', rest]);

export default function IconPage() {
  const [copied, setCopied] = useState('');
  const [va, setVa] = useState<IconVariant>('line');
  const [sz, setSz] = useState<'16' | '20' | '24'>('24');
  return (
    <Page kicker="Foundations · Icons" title="Icon" desc={`Phosphor 기반 아이콘 ${iconNames.length}종 × line/fill 2변형. 색은 currentColor — 부모의 label/* 토큰을 그대로 따릅니다. (MIT · phosphoricons.com)`}>
      <Section title="Playground">
        <Playground
          stage={<Icon name="star" size={Number(sz)} variant={va} style={{ color: 'var(--iris-semantic-label-normal)' }} />}
          panel={<>
            <Seg label="variant" value={va} options={['line', 'fill'] as const} onChange={setVa} />
            <Seg label="size" value={sz} options={['16', '20', '24'] as const} onChange={setSz} />
          </>}
          code={`<Icon name="star"${va === 'fill' ? ' variant="fill"' : ''}${sz !== '24' ? ` size={${sz}}` : ''} />`} />
      </Section>
      <Section title="Library" desc="클릭하면 이름이 복사됩니다. 우측 상단에서 변형을 전환해 보세요.">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <div style={{ width: 180 }}><Seg label="variant" value={va} options={['line', 'fill'] as const} onChange={setVa} /></div>
        </div>
        {CATS.map(([cat, names]) => (
          <div key={cat}>
            <div className="home-cat">{cat} · {names.length}</div>
            <Canvas style={{ gap: 4, marginBottom: 16 }}>
              {names.map(n => (
                <button key={n} onClick={() => { navigator.clipboard?.writeText(n); setCopied(n); }}
                  title={copied === n ? '복사됨!' : n}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 88, padding: '12px 4px',
                    background: copied === n ? 'var(--iris-semantic-fill-primary)' : 'transparent', border: 'none', borderRadius: 8,
                    color: 'var(--iris-semantic-label-neutral)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Icon name={n} variant={va} />
                  <span style={{ fontSize: 10.5, fontFamily: '"IBM Plex Mono", monospace', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 84, whiteSpace: 'nowrap' }}>{n}</span>
                </button>
              ))}
            </Canvas>
          </div>
        ))}
      </Section>
      <Section title="Size" desc="16 · 20 · 24가 표준. 색은 감싸는 요소의 color로 정합니다.">
        <Canvas>
          <Spec label="16"><Icon name="star" size={16} /></Spec>
          <Spec label="20"><Icon name="star" size={20} /></Spec>
          <Spec label="24 · 기본"><Icon name="star" /></Spec>
          <Spec label="fill"><span style={{ color: 'var(--iris-semantic-label-primary)' }}><Icon name="star" variant="fill" /></span></Spec>
          <Spec label="status/negative"><span style={{ color: 'var(--iris-semantic-status-negative)' }}><Icon name="heart" variant="fill" /></span></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="line이 기본 — fill은 활성·선택 상태 표현에 씁니다.">
        <Canvas col style={{ gap: 4 }}>
          <ListCell title="즐겨찾기 전" leading={<Icon name="star" />} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 300 }} />
          <ListCell title="즐겨찾기 됨" leading={<span style={{ color: 'var(--iris-semantic-primary-normal)', display: 'inline-flex' }}><Icon name="star" variant="fill" /></span>} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 300 }} />
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="자명한 아이콘만 단독 사용" doBody="닫기·검색·더보기처럼 뜻이 통용되는 아이콘만 단독으로. 그 외엔 라벨과 함께." doEx={<><Button variant="outlined" color="assistive" leadingIcon="share">공유</Button><Icon name="close" /></>}
          dontTitle="모호한 아이콘을 라벨 없이" dontBody="필터·설정처럼 해석이 갈리는 아이콘을 단독으로 쓰면 학습 비용이 생깁니다." dontEx={<><Icon name="filter" /><Icon name="settings" /><Icon name="more-vertical" /></>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['name', `IconName (${iconNames.length}종)`, '—', '아이콘 이름'],
          ['variant', "'line' | 'fill'", "'line'", '기본 라인 / 활성·선택 상태용 채움'],
          ['size', 'number', '24', 'px 크기'],
          ['aria-label', 'string', '—', '의미 있는 아이콘일 때만. 없으면 aria-hidden 처리'],
        ]} />
      </Section>
    </Page>
  );
}
