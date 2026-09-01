import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { iconNames, Icon, Chip, ContentBadge, Progress, ListCell, Avatar, Button } from '@hs2190.an/iris-react';
import tokens from '@hs2190.an/iris-tokens';
import { componentGroups, utilityItems, componentCount } from '../nav';
import { posts } from './behind/posts';
import PrismSparks from '../components/PrismSparks';
import '../landing.css';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 히어로: 프리즘에 빛이 들어와(개화) 스크롤하면 가라앉는다(침강) ── */
function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    // 침강은 스크롤 구동 — 지원 브라우저에서만 붙인다(미지원 시 정지 이미지)
    const supportsScrub = typeof CSS !== 'undefined' && !!CSS.supports
      && CSS.supports('animation-timeline: scroll()');
    if (supportsScrub) el.classList.add('sink');
  }, []);
  return (
    <div className="lp-hero-media" ref={ref}>
      <div className="lp-hero-sink" aria-hidden><div className="lp-hero-img" /></div>
      <PrismSparks />
      <div className="lp-hero-copy">
        <h1 className="lp-headline">One core. Infinite expressions.</h1>
        <p className="lp-sub-kr">하나의 근원, 환경마다 다른 표현</p>
      </div>
    </div>
  );
}

/* ── 잉크 밴드: 스크롤에 따라 번진다 ── */
function InkBand() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    const supportsScrub = typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports('animation-timeline: view()');
    if (supportsScrub) { el.classList.add('scrub'); return; }
    el.classList.add('io');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div className="lp-band"><div className="lp-band-img" ref={ref} /></div>;
}

/* ── 테마 분할 쇼케이스 — 경계를 끌면 같은 화면이 라이트↔다크로 갈린다 ── */
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

const PRINCIPLES: [string, string, string][] = [
  ['01', '하나의 소스', 'Figma Variables가 원본이고, 코드는 그 빌드 결과입니다. 둘이 어긋날 수 없습니다.'],
  ['02', '역할로 부른다', '보라색이 아니라 primary/normal. 이름이 곧 쓰임이라 테마가 바뀌어도 코드는 그대로입니다.'],
  ['03', '플랫폼을 모른다', '컴포넌트는 분기하지 않습니다. 높이도 마진도 값은 플랫폼 토큰이 정합니다.'],
];
const CATS: [string, number, string][] = [
  ...componentGroups.map(([name, items]) => [name, items.length, '/components'] as [string, number, string]),
  ['Utilities', utilityItems.length, '/utilities'],
];
/* 랜딩이 자기 숫자를 틀리지 않게 — 토큰 소스에서 직접 센다. */
const tokenCount = Object.keys(tokens.atomic).length + Object.keys(tokens.semantic).length
  + tokens.typography.length + Object.keys(tokens.elevation).length;
const TOKENS: [string, string, string, string][] = [
  ['input-height', '48', '48', '56'],
  ['nav-top-height', '64', '44', '56'],
  ['page-margin', '24', '20', '16'],
];
const FAQ: [string, string, string?][] = [
  ['상업 프로젝트에 그대로 써도 되나요?',
   'MIT 라이선스입니다. 상업·비상업 모두 제한 없이 쓸 수 있고, 수정해서 자신의 시스템으로 만들어도 됩니다. 출처 표기는 의무가 아니지만 남겨주시면 감사합니다.',
   'MIT · Phosphor Icons (MIT) · Noto Sans KR (OFL)'],
  ['폰트를 Pretendard로 바꿀 수 있나요?',
   '--iris-font-family 한 줄만 바꾸면 전 컴포넌트에 적용됩니다. 폰트 패밀리를 타이포 토큰에서 분리해 둔 이유가 이것입니다.',
   '--iris-font-family: "Pretendard", …'],
  ['아이콘 라이선스는 어떻게 되나요?',
   'Phosphor Icons(MIT)에서 72종을 발췌해 line·fill 두 변형으로 씁니다. 상업적 사용과 수정이 자유롭고, 필요한 아이콘은 매핑 한 줄로 더 가져올 수 있습니다.'],
  ['iOS·Android 코드도 제공되나요?',
   '현재 제공되는 코드는 웹(React + CSS 변수)입니다. 토큰은 이미 세 플랫폼 값을 모두 갖고 있어서, 네이티브 빌드는 같은 소스에서 내보내는 것이 다음 단계입니다.'],
  ['기여하거나 이슈를 남기려면?',
   'github.com/HS2190/iris-design-system 에 이슈나 PR을 남겨주세요. 토큰 변경은 Figma Variables가 원본이라, 값 수정은 파일에서 시작해 빌드로 반영됩니다.'],
];


/** [data-rv] 요소를 시야에 들어올 때 한 번씩 등장시킨다. --i로 순번 지연. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]'));
    if (reduceMotion()) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  const [faq, setFaq] = useState(0);
  useReveal();
  useEffect(() => { document.title = 'Iris Design System'; }, []);

  return (
    <>
      <section className="lp-hero">
        <HeroMedia />
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker" data-rv>Principles</p>
        <h2 className="lp-h2 lp-h2-kr" data-rv style={{ ["--i" as string]: 1 }}>매번 처음부터<br />정하지 않기 위해.</h2>
        <div className="lp-principles">
          {PRINCIPLES.map(([n, t, d], i) => (
            <div className="lp-principle" key={n} data-rv style={{ ["--i" as string]: i }}>
              <span className="n">{n}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <InkBand />

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker" data-rv>What’s Inside</p>
        <h2 className="lp-h2" data-rv style={{ ["--i" as string]: 1 }}>What’s Inside</h2>
        <div className="lp-inside">
          <div>
            <div className="lp-stat" data-rv style={{ ["--i" as string]: 0 }}><b>{componentCount}</b><span>Components</span></div>
            <div className="lp-stat" data-rv style={{ ["--i" as string]: 1 }}><b>{tokenCount}</b><span>Design tokens</span></div>
            <div className="lp-stat" data-rv style={{ ["--i" as string]: 2 }}><b>{iconNames.length}×2</b><span>Icons · line·fill</span></div>
            <Link to="/components" className="lp-inline-link" data-rv style={{ ["--i" as string]: 3 }}>컴포넌트 문서 보기 ↗</Link>
          </div>
          <div className="lp-catlist">
            {CATS.map(([n, c, to], i) => (
              <Link key={n} to={to} data-rv style={{ ["--i" as string]: i }}>{n}<small>{c}</small></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec--alt">
        <div className="lp-wrap lp-center">
          <p className="lp-kicker" data-rv>One Source</p>
          <h2 className="lp-h2" data-rv style={{ ["--i" as string]: 1 }}>One Source, Every Platform</h2>
          <p className="lp-lede" data-rv style={{ ["--i" as string]: 2 }}>컴포넌트는 플랫폼을 모릅니다. 높이도 마진도, 값은 토큰이 정합니다.</p>
          <div className="lp-table">
            <div className="lp-trow head" data-rv><span>TOKEN</span><span>WEB</span><span>iOS</span><span>ANDROID</span></div>
            {TOKENS.map(([t, w, i, a], n) => (
              <div className="lp-trow" key={t} data-rv style={{ ["--i" as string]: n + 1 }}>
                <code>{t}</code><b>{w}</b><b>{i}</b><b>{a}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec lp-wrap lp-center">
        <p className="lp-kicker" data-rv>Themeable</p>
        <h2 className="lp-h2" data-rv style={{ ["--i" as string]: 1 }}>Light, Dark, and Yours</h2>
        <p className="lp-lede" data-rv style={{ ["--i" as string]: 2 }}>컴포넌트는 역할 토큰만 참조합니다. 테마가 바뀌면 가운데 층이 재매핑될 뿐입니다.</p>
        <ThemeSplit />
        <div className="codeline" style={{ marginTop: 16, textAlign: 'left' }}>
          {'<html data-theme="dark">  /* 이 한 줄이 전부입니다 */'}
        </div>
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker" data-rv>Get Started</p>
        <h2 className="lp-h2" data-rv style={{ ["--i" as string]: 1 }}>Get Started</h2>
        <div className="lp-rows">
          <a className="lp-row" href="https://www.figma.com/design/k6EMzf6Q9nM7J1gkAt4ZYo/" target="_blank" rel="noreferrer"
            data-rv style={{ ["--i" as string]: 0 }}>
            <b>Figma</b><span>UI 킷 파일 · 컴포넌트 44종 · 변수 8컬렉션</span><i>↗</i>
          </a>
          <a className="lp-row" data-rv style={{ ["--i" as string]: 1 }}
            href="https://www.npmjs.com/package/@hs2190.an/iris-react" target="_blank" rel="noreferrer">
            <b>npm</b><span>npm i @hs2190.an/iris-tokens @hs2190.an/iris-react</span><i>↗</i>
          </a>
          <a className="lp-row" data-rv style={{ ["--i" as string]: 2 }}
            href="https://github.com/HS2190/iris-design-system" target="_blank" rel="noreferrer">
            <b>GitHub</b><span>소스와 이슈 · MIT</span><i>↗</i>
          </a>
        </div>
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker" data-rv>Behind</p>
        <h2 className="lp-h2 lp-h2-kr" data-rv style={{ ["--i" as string]: 1 }}>제작기</h2>
        <div className="lp-posts">
          {posts.map((post, i) => (
            <Link className="lp-post" to={`/behind/${post.slug}`} key={post.slug}
              data-rv style={{ ["--i" as string]: i }}>
              <div className="lp-post-thumb" />
              <h3>{post.title}</h3><p>{post.desc}</p>
              <small>{post.date} · {post.read}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker" data-rv>FAQ</p>
        <h2 className="lp-h2" data-rv style={{ ["--i" as string]: 1 }}>Frequently Asked</h2>
        <div className="lp-faq">
          <div className="lp-faq-q" role="tablist" aria-orientation="vertical">
            {FAQ.map(([q], i) => (
              <button key={q} role="tab" aria-selected={faq === i} onClick={() => setFaq(i)}>{q}</button>
            ))}
          </div>
          <div className="lp-faq-divider" aria-hidden />
          <div className="lp-faq-a" key={faq} role="tabpanel">
            {FAQ[faq][1]}
            {FAQ[faq][2] && <small>{FAQ[faq][2]}</small>}
          </div>
        </div>
      </section>

      <footer className="lp-footer lp-wrap">
        <b>Iris</b>
        <span>© 2026 안현서</span>
        <nav>
          <a href="https://www.figma.com/design/k6EMzf6Q9nM7J1gkAt4ZYo/" target="_blank" rel="noreferrer">Figma</a>
          <a href="#/components">Components</a>
          <span>MIT</span>
        </nav>
      </footer>
    </>
  );
}
