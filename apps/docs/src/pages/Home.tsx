import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { iconNames } from '@iris/react';
import tokens from '@iris/tokens';
import { componentGroups, utilityItems, componentCount } from '../nav';
import { posts } from './behind/posts';
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
   'GitHub 저장소에 이슈나 PR을 남겨주세요. 토큰 변경은 Figma Variables가 원본이라, 값 수정은 파일에서 시작해 빌드로 반영됩니다.'],
];

export default function Home() {
  const [faq, setFaq] = useState(0);
  useEffect(() => { document.title = 'Iris Design System'; }, []);

  return (
    <>
      <section className="lp-hero">
        <HeroMedia />
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker">Principles</p>
        <h2 className="lp-h2 lp-h2-kr">매번 처음부터<br />정하지 않기 위해.</h2>
        <div className="lp-principles">
          {PRINCIPLES.map(([n, t, d]) => (
            <div className="lp-principle" key={n}>
              <span className="n">{n}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <InkBand />

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker">What’s Inside</p>
        <h2 className="lp-h2">What’s Inside</h2>
        <div className="lp-inside">
          <div>
            <div className="lp-stat"><b>{componentCount}</b><span>Components</span></div>
            <div className="lp-stat"><b>{tokenCount}</b><span>Design tokens</span></div>
            <div className="lp-stat"><b>{iconNames.length}×2</b><span>Icons · line·fill</span></div>
            <Link to="/components" className="lp-inline-link">컴포넌트 문서 보기 ↗</Link>
          </div>
          <div className="lp-catlist">
            {CATS.map(([n, c, to]) => <Link key={n} to={to}>{n}<small>{c}</small></Link>)}
          </div>
        </div>
      </section>

      <section className="lp-sec--alt">
        <div className="lp-wrap lp-center">
          <p className="lp-kicker">One Source</p>
          <h2 className="lp-h2">One Source, Every Platform</h2>
          <p className="lp-lede">컴포넌트는 플랫폼을 모릅니다. 높이도 마진도, 값은 토큰이 정합니다.</p>
          <div className="lp-table">
            <div className="lp-trow head"><span>TOKEN</span><span>WEB</span><span>iOS</span><span>ANDROID</span></div>
            {TOKENS.map(([t, w, i, a]) => (
              <div className="lp-trow" key={t}><code>{t}</code><b>{w}</b><b>{i}</b><b>{a}</b></div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec lp-wrap lp-center">
        <p className="lp-kicker">Themeable</p>
        <h2 className="lp-h2">Light, Dark, and Yours</h2>
        <p className="lp-lede">컴포넌트는 역할 토큰만 참조합니다. 테마가 바뀌면 가운데 층이 재매핑될 뿐입니다.</p>
        <div className="lp-themes">
          {(['light', 'dark'] as const).map(mode => (
            <div className="lp-theme-pane" data-theme={mode} key={mode}>
              <h4>오늘의 채용</h4>
              <div className="lp-theme-card">
                <span className="t1">프로덕트 디자이너</span>
                <span className="t2">Iris팀 · 서울 · 경력 5년+</span>
                <span style={{ height: 4, borderRadius: 2, background: 'var(--iris-semantic-fill-strong)', display: 'block' }}>
                  <span style={{ display: 'block', width: '68%', height: '100%', borderRadius: 2, background: 'var(--iris-semantic-primary-normal)' }} />
                </span>
              </div>
              <span className="lp-theme-tag">data-theme="{mode}"</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker">Get Started</p>
        <h2 className="lp-h2">Get Started</h2>
        <div className="lp-rows">
          <a className="lp-row" href="https://www.figma.com/design/k6EMzf6Q9nM7J1gkAt4ZYo/" target="_blank" rel="noreferrer">
            <b>Figma</b><span>UI 킷 파일 · 컴포넌트 44종 · 변수 8컬렉션</span><i>↗</i>
          </a>
          <div className="lp-row"><b>npm</b><span>npm i @iris/tokens @iris/react</span><i>↗</i></div>
          <div className="lp-row"><b>GitHub</b><span>소스와 이슈 · MIT</span><i>↗</i></div>
        </div>
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker">Behind</p>
        <h2 className="lp-h2 lp-h2-kr">제작기</h2>
        <div className="lp-posts">
          {posts.map(post => (
            <Link className="lp-post" to={`/behind/${post.slug}`} key={post.slug}>
              <div className="lp-post-thumb" />
              <h3>{post.title}</h3><p>{post.desc}</p>
              <small>{post.date} · {post.read}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="lp-sec lp-wrap">
        <p className="lp-kicker">FAQ</p>
        <h2 className="lp-h2">Frequently Asked</h2>
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
