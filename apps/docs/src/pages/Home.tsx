import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button, Chip, ContentBadge, Switch, TextField, Checkbox, Radio, Slider, Progress,
  SegmentedControl, Avatar, AvatarGroup, Toast, FilterButton, Skeleton, Pagination,
  Icon, ListCell, iconNames,
} from '@iris/react';
import '../landing.css';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 숫자 카운트업 — 뷰에 들어올 때 1회 ── */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || !('IntersectionObserver' in window)) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 900;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <b ref={ref}>{n}{suffix}</b>;
}

/* ── 히어로 스테이지 — 실컴포넌트 + 포인터 시차 ── */
function HeroStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'전체' | '완료'>('전체');
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>('.lp-depth'));
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(l => {
        const d = Number(l.dataset.depth || 1);
        l.style.transform = `translate3d(${(-x * 14 * d).toFixed(2)}px, ${(-y * 10 * d).toFixed(2)}px, 0)`;
      });
    };
    const onLeave = () => layers.forEach(l => { l.style.transform = 'translate3d(0,0,0)'; });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  }, []);
  return (
    <div className="lp-stage" ref={wrap}>
      <div className="lp-depth lp-rise" data-depth="0.6" style={{ animationDelay: '260ms' }}>
        <div className="lp-card">
          <span className="lp-card-label">Actions</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button size="s">저장</Button>
            <Button size="s" variant="outlined" color="assistive">취소</Button>
          </div>
        </div>
        <div className="lp-card">
          <span className="lp-card-label">Selection</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Switch label="알림 받기" defaultChecked />
            <Checkbox label="이메일 수신" defaultChecked />
          </div>
        </div>
        <div className="lp-card">
          <span className="lp-card-label">Feedback</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <ContentBadge tone="positive">완료</ContentBadge>
            <ContentBadge tone="cautionary">주의</ContentBadge>
          </div>
        </div>
      </div>
      <div className="lp-depth lp-rise" data-depth="1.35" style={{ animationDelay: '340ms', marginTop: 34 }}>
        <div className="lp-card">
          <span className="lp-card-label">Navigation</span>
          <SegmentedControl options={['전체', '완료'] as const} value={view} onChange={setView} aria-label="보기" />
        </div>
        <div className="lp-card">
          <span className="lp-card-label">Input</span>
          <Slider label="가격대" defaultValue={38} formatValue={v => `${v}만`} />
        </div>
        <div className="lp-card">
          <span className="lp-card-label">Contents</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AvatarGroup max={3} size="m">
              <Avatar size="m" name="안" /><Avatar size="m" name="김" /><Avatar size="m" name="이" /><Avatar size="m" name="박" />
            </AvatarGroup>
            <span style={{ fontSize: 12.5, color: 'var(--iris-semantic-label-alternative)' }}>외 1명</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 테마 분할 쇼케이스 ── */
function Mock() {
  return (
    <div className="lp-mock">
      <div className="lp-mock-bar">
        <span className="lp-mock-title">오늘의 채용</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <Icon name="search" size={20} style={{ color: 'var(--iris-semantic-label-neutral)' }} />
          <Icon name="bell" size={20} style={{ color: 'var(--iris-semantic-label-neutral)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Chip size="s" selected>재택</Chip><Chip size="s">신입</Chip><Chip size="s">정규직</Chip>
      </div>
      <div className="lp-mock-card">
        <div className="lp-mock-row" style={{ justifyContent: 'space-between' }}>
          <span className="lp-mock-t1">프로덕트 디자이너</span>
          <ContentBadge tone="positive">신규</ContentBadge>
        </div>
        <span className="lp-mock-t2">Iris팀 · 서울 · 경력 5년+</span>
        <Progress value={68} label="지원 진행" showValue />
      </div>
      <ListCell title="UX 라이터" description="Iris팀 · 어제" style={{ padding: '8px 0' }}
        leading={<Avatar size="m" name="라" />} trailing={<Icon name="chevron-right" size={20} />} />
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <Button size="s" variant="outlined" color="assistive" style={{ flex: 1 }}>나중에</Button>
        <Button size="s" style={{ flex: 1 }}>지원하기</Button>
      </div>
    </div>
  );
}

function ThemeSplit() {
  const box = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(52);
  const set = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPct(Math.min(94, Math.max(6, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className="lp-split" ref={box} style={{ ['--split' as string]: `${pct}%` }}
      onPointerDown={e => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); set(e.clientX); }}
      onPointerMove={e => { if (e.buttons === 1) set(e.clientX); }}>
      <div className="lp-split-layer" data-theme="light"><Mock /></div>
      <div className="lp-split-layer lp-split-top" data-theme="dark"><Mock /></div>
      <span className="lp-split-tag l">data-theme="light"</span>
      <span className="lp-split-tag d">data-theme="dark"</span>
      <button className="lp-split-handle" aria-label="테마 경계 이동" role="slider"
        aria-valuemin={6} aria-valuemax={94} aria-valuenow={Math.round(pct)}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') setPct(p => Math.max(6, p - 4));
          if (e.key === 'ArrowRight') setPct(p => Math.min(94, p + 4));
        }} />
    </div>
  );
}

/* ── 컴포넌트 마키 ── */
type MarqItem = [string, string, React.ReactNode];
const ROW1: MarqItem[] = [
  ['Button', 'button', <Button size="s">버튼</Button>],
  ['Switch', 'switch', <Switch defaultChecked aria-label="s" />],
  ['Chip', 'chip', <><Chip size="s" selected>선택</Chip><Chip size="s">칩</Chip></>],
  ['Content badge', 'content-badge', <ContentBadge tone="positive">완료</ContentBadge>],
  ['Progress', 'progress', <span style={{ width: 96, display: 'block' }}><Progress value={62} /></span>],
  ['Avatar', 'avatar', <AvatarGroup max={3} size="s"><Avatar size="s" name="안" /><Avatar size="s" name="김" /><Avatar size="s" name="이" /><Avatar size="s" name="박" /></AvatarGroup>],
  ['Segmented control', 'segmented-control', <SegmentedControl options={['월', '주'] as const} value="월" onChange={() => {}} aria-label="m" />],
  ['Filter button', 'filter-button', <FilterButton active count={2}>직무</FilterButton>],
];
const ROW2: MarqItem[] = [
  ['Text field', 'text-field', <span style={{ width: 150, display: 'block' }}><TextField placeholder="이메일" /></span>],
  ['Checkbox', 'checkbox', <Checkbox label="동의" defaultChecked />],
  ['Radio', 'radio', <Radio name="mq" label="카드" defaultChecked />],
  ['Toast', 'toast', <Toast tone="positive">저장되었습니다</Toast>],
  ['Pagination', 'pagination', <Pagination variant="dot" page={2} total={4} />],
  ['Skeleton', 'skeleton', <span style={{ width: 110, display: 'flex', gap: 8, alignItems: 'center' }}><Skeleton variant="circle" width={28} /><Skeleton width={70} /></span>],
  ['Slider', 'slider', <span style={{ width: 120, display: 'block' }}><Slider defaultValue={45} aria-label="s" /></span>],
  ['Icon', 'icon', <span style={{ display: 'flex', gap: 8, color: 'var(--iris-semantic-label-neutral)' }}><Icon name="star" variant="fill" size={20} /><Icon name="heart" size={20} /><Icon name="bell" size={20} /></span>],
];

function Marquee({ items, reverse }: { items: MarqItem[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="lp-marq">
      <div className={`lp-marq-track${reverse ? ' rev' : ''}`}>
        {row.map(([name, slug, node], i) => (
          <Link key={`${slug}-${i}`} to={`/components/${slug}`} className="lp-chipcard" aria-label={name}>
            <span className="demo">{node}</span>
            <span className="n">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const nav = useNavigate();
  useEffect(() => { document.title = 'Iris Design System'; }, []);
  return (
    <>
      <section className="lp-wrap lp-hero">
        <div>
          <span className="lp-eyebrow lp-rise" style={{ animationDelay: '40ms' }}><i />v0.1 · 웹 · iOS · Android</span>
          <h1 className="lp-h1 lp-rise" style={{ animationDelay: '100ms' }}>From screens<br />to <em>systems.</em></h1>
          <p className="lp-lede lp-rise" style={{ animationDelay: '170ms' }}>
            보라색 붓꽃, 빛을 조절하는 홍채, 플랫폼 사이를 오가는 전령 — 세 은유에서 이름을 얻은 범용 디자인 시스템입니다.
            색·간격·타이포가 Figma Variables 단일 소스에서 빌드되고, 그대로 설치해 쓰는 코드가 됩니다.
          </p>
          <div className="lp-cta lp-rise" style={{ animationDelay: '230ms' }}>
            <Button size="l" onClick={() => nav('/components')}>컴포넌트 보기</Button>
            <Button size="l" variant="outlined" color="assistive" onClick={() => nav('/foundations')}>Foundations</Button>
          </div>
          <div className="lp-stats lp-rise" style={{ animationDelay: '300ms' }}>
            <span><CountUp to={44} /><small>Components</small></span>
            <span><CountUp to={200} /><small>Design tokens</small></span>
            <span><CountUp to={iconNames.length} suffix="×2" /><small>Icons · line·fill</small></span>
            <span><CountUp to={3} /><small>Platforms, one source</small></span>
          </div>
        </div>
        <HeroStage />
      </section>

      <section className="lp-wrap lp-section">
        <p className="lp-kicker">Themeable</p>
        <h2 className="lp-h2">다크 모드는 속성 하나입니다</h2>
        <p className="lp-sub">
          컴포넌트는 역할(시멘틱) 토큰만 참조합니다. 테마가 바뀌면 가운데 토큰 층이 재매핑될 뿐, 코드는 그대로예요.
          경계를 잡고 끌어보세요 — 같은 화면, 같은 마크업입니다.
        </p>
        <ThemeSplit />
        <div className="codeline" style={{ marginTop: 14 }}>{'<html data-theme="dark">  /* 이 한 줄이 전부입니다 */'}</div>
      </section>

      <section className="lp-section">
        <div className="lp-wrap">
          <p className="lp-kicker">Components</p>
          <h2 className="lp-h2">44개, 전부 살아 있습니다</h2>
          <p className="lp-sub">
            아래는 스크린샷이 아니라 실제로 렌더된 컴포넌트입니다. 하나를 눌러 문서로 들어가면
            Playground · 수치 스펙 · Do/Don&apos;t가 기다립니다.
          </p>
        </div>
        <Marquee items={ROW1} />
        <div style={{ height: 12 }} />
        <Marquee items={ROW2} reverse />
      </section>

      <section className="lp-wrap lp-section">
        <p className="lp-kicker">Get started</p>
        <h2 className="lp-h2">설치하고 바로 쓰기</h2>
        <p className="lp-sub">토큰 CSS를 한 번 불러오면 모든 컴포넌트가 라이트/다크에 반응합니다.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="codeline">npm i @iris/tokens @iris/react</div>
          <div className="codeline">{`import '@iris/tokens/css';  // 앱 진입점에서 1회`}</div>
          <div className="codeline">{`import { Button } from '@iris/react';`}</div>
        </div>
        <div className="home-grid" style={{ marginTop: 32 }}>
          {([['Foundations', '/foundations', '색·글자·간격·그림자·플랫폼'],
            ['Components', '/components', '44개 · 카테고리별'],
            ['Utilities', '/utilities', 'Skeleton · Scrim · Grid · Divider']] as const).map(([n, p, d]) => (
            <Link key={p} to={p} className="home-link">{n}<small>{d}</small></Link>
          ))}
        </div>
      </section>
    </>
  );
}
