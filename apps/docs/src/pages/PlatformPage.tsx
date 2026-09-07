import { Table, Icon } from '@hs2190.an/iris-react';
import { Page, Section, Chips, Seg, useSeg, CodeBlock } from '../components/Doc';
import { PLATFORM_SAMPLES as N, PLATFORM_MANIFEST as M } from '../lib/platform-samples';
import { PLATFORM_VALUES } from '../lib/component-tokens';

// 쓰임 설명만 여기서 관리하고, 수치는 PLATFORM_VALUES(= platform.json 생성물)에서 읽는다.
// 이 페이지의 주장이 "값은 한 곳에서 온다"이므로, 표가 값을 복사해 두면 페이지가 스스로를 반증한다.
const USE: Record<string, string> = {
  'input-height': 'TextField · Select · SearchField 높이',
  'nav-top-height': 'Top navigation 높이',
  'nav-bottom-height': 'Bottom navigation (웹 미사용)',
  'touch-target-min': '최소 터치 영역 — Slider·아이콘 버튼',
  'page-margin': 'Grid 페이지 좌우 마진',
  'radius-sheet': 'Bottom sheet 상단 라운드',
  'font-base-size': '루트 폰트 기준',
  'safe-area-top': '노치·상태바',
  'safe-area-bottom': '홈 인디케이터',
};
const rows = Object.entries(PLATFORM_VALUES).map(([t, v]) => ({
  t, web: String(v.web), ios: String(v.ios), and: String(v.android), use: USE[t] ?? '',
}));
const mono = (s: string) => <code style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12.5 }}>{s}</code>;

export default function PlatformPage() {
  const [plat, setPlat] = useSeg<'웹' | 'iOS' | 'Android'>('웹');
  return (
    <Page kicker="Foundations" title="Platform" desc="하나의 토큰 이름, 세 개의 값. 컴포넌트 코드는 플랫폼을 몰라도 되고 — 값은 각 플랫폼 빌드가 결정합니다. 이 CSS 패키지는 웹 값으로 빌드됩니다.">
      <Section title="원리" desc="플랫폼 분기가 코드가 아니라 토큰 층에서 흡수되는 구조입니다.">
        <div className="fnd-diagram">
          <div className="fnd-node">
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, padding: '10px 14px', borderRadius: 10, border: '1px solid var(--iris-semantic-line-primary-normal)', color: 'var(--iris-semantic-label-primary)', background: 'var(--iris-semantic-fill-primary)' }}>input-height</span>
            <small>하나의 이름</small>
          </div>
          <span className="fnd-arrow"><Icon name="arrow-right" size={18} /></span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[['웹', '48'], ['iOS', '48'], ['Android', '56']].map(([p, v]) => (
              <span key={p} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, padding: '4px 10px', borderRadius: 8, background: 'var(--iris-semantic-fill-normal)', color: 'var(--iris-semantic-label-neutral)' }}>{p} {v}</span>
            ))}
          </div>
          <span className="fnd-arrow"><Icon name="arrow-right" size={18} /></span>
          <div className="fnd-node">
            <span style={{ fontSize: 13, padding: '13px 16px', borderRadius: 10, border: '1px solid var(--iris-semantic-line-normal-normal)', color: 'var(--iris-semantic-label-assistive)' }}>이메일 입력</span>
            <small>같은 TextField 코드</small>
          </div>
        </div>
      </Section>
      <Section title="작업 캔버스" desc="디자인 시안의 아트보드 기준 — Figma와 구현이 같은 폭을 봅니다.">
        <Table style={{ width: '100%', maxWidth: 640 }} columns={[
          { key: 'p', header: '플랫폼' }, { key: 'a', header: '아트보드', align: 'right' }, { key: 'n', header: '비고' },
        ]} data={[
          { p: '웹 데스크톱', a: '1440 × 1024', n: '12컬럼 · 마진 24' },
          { p: '웹 태블릿', a: '768 × 1024', n: '8컬럼 (breakpoint sm)' },
          { p: '웹 모바일', a: '375 × 812', n: '4컬럼 (breakpoint xs)' },
          { p: 'iOS', a: '375 × 812', n: '세이프에어리어 상 59 · 하 34' },
          { p: 'Android', a: '360 × 800', n: '상태바 24' },
        ]} />
      </Section>
      <Section title="Tokens" desc="플랫폼에서 값이 갈리는 토큰 전체 — 컴포넌트는 --iris-input-height처럼 이름만 참조합니다.">
        <Table style={{ width: '100%', maxWidth: 720 }} data={rows.map(r => ({
          t: mono(r.t), web: r.web, ios: r.ios, and: r.and, use: r.use,
        }))} columns={[
          { key: 't', header: '토큰' },
          { key: 'web', header: '웹', align: 'right' },
          { key: 'ios', header: 'iOS', align: 'right' },
          { key: 'and', header: 'Android', align: 'right' },
          { key: 'use', header: '쓰임' },
        ]} />
      </Section>
      <Section title="플랫폼 산출물" desc="한 번의 빌드에서 세 플랫폼 파일이 함께 나옵니다. 탭을 바꿔도 같은 토큰이 나오도록 골랐습니다 — 배경색 4개, 플랫폼 토큰 4개, display-1. 아래 코드는 옮겨 적은 게 아니라 생성물에서 그대로 잘라 온 것입니다.">
        <Seg label="플랫폼" value={plat} options={['웹', 'iOS', 'Android']} onChange={setPlat} />
        {plat === '웹' && (
          <>
            <p className="nat-note">의미 색은 원자 색을 가리킵니다 — 값을 직접 쓰지 않습니다.</p>
            <CodeBlock code={`:root {\n${N.webColor}\n}`} />
            <p className="nat-note">다크는 의미 색만 다시 가리킵니다. 원자 색은 테마와 무관해 재정의하지 않습니다.</p>
            <CodeBlock code={`[data-theme="dark"] {\n${N.webDark}\n}`} />
            <p className="nat-note">플랫폼마다 값이 갈리는 토큰은 웹 값으로 채워집니다.</p>
            <CodeBlock code={`:root {\n${N.webPlatform}\n}`} />
            <p className="nat-note">자간은 em, 행간은 px입니다.</p>
            <CodeBlock code={`:root {\n${N.webTypo}\n}`} />
          </>
        )}
        {plat === 'iOS' && (
          <>
            <p className="nat-note">의미 색은 Asset Catalog가 라이트/다크를 자동으로 고릅니다 — 코드로 분기하지 않습니다.</p>
            <CodeBlock code={N.swiftColor} />
            <p className="nat-note">플랫폼마다 값이 갈리는 토큰은 iOS 값으로 채워집니다. 웹의 40이 여기서는 44입니다.</p>
            <CodeBlock code={N.swiftPlatform} />
            <p className="nat-note">SwiftUI에는 line-height가 없어 <code>lineSpacing</code>(행간 − 글자크기)으로, 자간은 em이 아니라 pt(<code>tracking</code>)로 환산합니다.</p>
            <CodeBlock code={N.swiftTypo} />
            <p className="nat-note">색 하나의 Asset Catalog 정의 — 두 번째 항목이 다크입니다.</p>
            <CodeBlock code={N.colorset} />
          </>
        )}
        {plat === 'Android' && (
          <>
            <p className="nat-note">Android 색은 알파가 <b>앞</b>에 옵니다(<code>#AARRGGBB</code>) — 웹의 <code>#RRGGBBAA</code>와 순서가 반대라 변환에서 가장 틀리기 쉬운 지점입니다.</p>
            <CodeBlock code={N.androidLight} />
            <p className="nat-note">다크는 <code>values-night/</code>가 의미 색만 덮어씁니다 — 웹 CSS와 같은 규칙입니다.</p>
            <CodeBlock code={N.androidNight} />
            <p className="nat-note">치수는 Android 값으로 채워집니다. 웹 40 · iOS 44가 여기서는 48입니다.</p>
            <CodeBlock code={N.androidDimens} />
          </>
        )}
        <Table style={{ width: '100%', maxWidth: 640, marginTop: 20 }} columns={[
          { key: 'f', header: '파일' }, { key: 'b', header: '크기', align: 'right' },
        ]} data={(plat === '웹'
          ? M.web.files.map(f => ({ f: f.path, b: `${(f.bytes / 1024).toFixed(1)} KB` }))
          : plat === 'iOS'
          ? [...M.ios.files.map(f => ({ f: f.path, b: `${(f.bytes / 1024).toFixed(1)} KB` })),
             { f: 'ios/IrisColors.xcassets/*.colorset', b: `${M.ios.colorsets}개` }]
          : M.android.files.map(f => ({ f: f.path, b: `${(f.bytes / 1024).toFixed(1)} KB` })))} />
        <p className="nat-note" style={{ marginTop: 14 }}>
          {plat === '웹'
            ? <>npm 패키지 <code>@hs2190.an/iris-tokens</code>의 <code>dist/</code>에 들어 있습니다. <code>import '@hs2190.an/iris-tokens/css'</code> 한 줄이면 됩니다.</>
            : <>npm 패키지 <code>@hs2190.an/iris-tokens</code>의 <code>dist/native/</code>에 들어 있습니다.
               Xcode에서는 <code>.xcassets</code>와 <code>.swift</code>를 타깃에 추가하고,
               Android에서는 <code>values/</code>·<code>values-night/</code>를 <code>res/</code>에 넣습니다.</>}
        </p>
      </Section>
      <Section title="Breakpoint" desc="웹 반응형 기준 — Grid 컬럼 관례(12/8/4)가 여기서 갈립니다.">
        <Chips primary="breakpoint" items={['xs 0', 'sm 768', 'md 992', 'lg 1200', 'xl 1600']} />
      </Section>
      <Section title="사용 규칙">
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--iris-semantic-label-neutral)', fontSize: 14.5, lineHeight: 1.9 }}>
          <li>플랫폼 분기를 컴포넌트 코드에 쓰지 않습니다 — 토큰 이름 하나로 흡수합니다.</li>
          <li>iOS·Android 산출물은 웹 CSS와 <b>같은 빌드</b>에서 나옵니다 — <code>npm run build</code> 한 번에 세 플랫폼이 함께 생성되고, 생성값은 소스 JSON과 전수 대조로 검증됩니다.</li>
          <li>웹에서 모바일 미리보기를 만들 땐 375 캔버스 + 4컬럼 관례를 따릅니다.</li>
        </ul>
      </Section>
    </Page>
  );
}
