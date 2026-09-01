import { useState } from 'react';
import { Icon } from '@hs2190/iris-react';
import tokens from '@hs2190/iris-tokens';
import { COMPONENT_TOKENS } from '../../lib/component-tokens';
import { Article, P, H2, Fig, Aside, Pull, Code } from '../../components/Prose';
import { Seg } from '../../components/Doc';

type Plat = 'web' | 'ios' | 'android';
const plats: readonly Plat[] = ['web', 'ios', 'android'] as const;
const platform = tokens.platform;
const platformCount = Object.keys(platform).length;

/* 어느 플랫폼 토큰이 실제로 어느 컴포넌트에 배선됐는지 — CSS에서 추출한 값이라
   글이 코드보다 앞서갈 수 없다. */
const wiring = Object.fromEntries(
  Object.keys(platform).map(t => [
    t,
    Object.entries(COMPONENT_TOKENS).filter(([, v]) => v.platform.includes(t)).map(([n]) => n),
  ]),
) as Record<string, string[]>;
const wiredCount = Object.values(wiring).filter(v => v.length).length;

/** 실제 platform 토큰 값으로 높이만 바뀌는 입력 필드 — 컴포넌트 코드는 하나. */
function InputPreview({ p }: { p: Plat }) {
  const h = platform['input-height'][p];
  const m = platform['page-margin'][p];
  return (
    <div style={{ width: '100%', maxWidth: 380 }}>
      <div style={{
        padding: `0 ${m}px`, border: '1px dashed var(--iris-semantic-line-solid-normal)',
        borderRadius: 'var(--iris-radius-sm)', paddingTop: 20, paddingBottom: 20,
      }}>
        <div style={{
          height: h, display: 'flex', alignItems: 'center', padding: '0 16px',
          border: '1px solid var(--iris-semantic-line-normal-normal)',
          borderRadius: 'var(--iris-radius-xs)',
          background: 'var(--iris-semantic-background-normal-normal)',
          color: 'var(--iris-semantic-label-assistive)', fontSize: 14,
          transition: 'height 220ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}>이메일을 입력하세요</div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
        <small className="bh-mono">input-height {h}</small>
        <small className="bh-mono">page-margin {m}</small>
      </div>
    </div>
  );
}

export default function PlatformTokens() {
  const [p, setP] = useState<Plat>('web');
  return (
    <Article slug="platform-tokens">
      <P>
        iOS의 상단 내비게이션은 44입니다. Android는 56이고, 웹은 64로 잡았습니다.
        이건 취향이 아니라 각 플랫폼의 가이드라인이라 없앨 수 없는 차이입니다.
        그래서 질문은 &ldquo;어떻게 통일할까&rdquo;가 아니라 <b>&ldquo;이 분기를 어디서 흡수할까&rdquo;</b>였습니다.
      </P>

      <H2>컴포넌트에 넣으면 생기는 일</H2>
      <P>
        가장 쉬운 답은 컴포넌트가 플랫폼을 아는 것입니다. TopNavigation이 플랫폼을 받아서 높이를 정하면 됩니다.
        한 컴포넌트만 보면 문제가 없어 보입니다.
      </P>
      <Code>{`// 이렇게 하지 않기로 했습니다
function TopNavigation({ platform }) {
  const height = platform === 'ios' ? 44
               : platform === 'android' ? 56
               : 64;
}`}</Code>
      <P>
        문제는 이게 한 곳으로 끝나지 않는다는 점입니다. 높이가 다른 컴포넌트마다 같은 조건문이 복제되고,
        테스트는 컴포넌트마다 세 배가 됩니다. 그리고 네 번째 플랫폼이 생기면
        <b> 조건문이 있는 모든 곳을 찾아다녀야 합니다.</b> 컴포넌트가 44개인 시스템에서 이건 감당이 안 됩니다.
      </P>

      <Pull>분기를 없앨 수는 없습니다. 다만 한 층 아래로 내려보낼 수는 있습니다.</Pull>

      <H2>토큰 층이 흡수한다</H2>
      <P>
        그래서 분기를 토큰으로 내렸습니다. <code>platform.json</code>에 {platformCount}개의 토큰이 있고,
        각각 <b>하나의 이름에 세 개의 값</b>을 갖습니다. 컴포넌트는 이름만 참조하고,
        어떤 값이 들어갈지는 <b>빌드가 플랫폼별로</b> 정합니다.
      </P>
      <Code>{`// platform.json — 하나의 이름, 세 값
"nav-top-height": { "web": 64, "ios": 44, "android": 56 }

// 컴포넌트 — 플랫폼을 모른다
height: var(--iris-nav-top-height);`}</Code>

      <Fig caption="플랫폼을 바꿔도 마크업과 클래스는 그대로입니다. 바뀌는 것은 토큰이 내놓는 값뿐입니다.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ maxWidth: 280 }}>
            <Seg label="platform" value={p} options={plats} onChange={setP} />
          </div>
          <InputPreview p={p} />
        </div>
      </Fig>

      <Fig caption={`${platformCount}개 전부입니다. 이 표가 세 플랫폼의 차이를 전부 담고 있고, 컴포넌트 쪽에는 플랫폼이라는 단어가 없습니다.`}>
        <div className="bh-grid" style={{ gridTemplateColumns: '1.6fr repeat(3, 1fr)', gap: '10px 20px', alignItems: 'center' }}>
          <span className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>토큰</span>
          {plats.map(x => (
            <span key={x} className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', textAlign: 'right' }}>{x}</span>
          ))}
          {Object.entries(platform).map(([name, v]) => (
            <span key={name} style={{ display: 'contents' }}>
              <span className="bh-mono" style={{ color: 'var(--iris-semantic-label-normal)' }}>{name}</span>
              {plats.map(x => (
                <span key={x} className="bh-mono" style={{
                  textAlign: 'right', fontVariantNumeric: 'tabular-nums',
                }}>{v[x]}</span>
              ))}
            </span>
          ))}
        </div>
      </Fig>

      <Fig caption="이 표는 손으로 적은 것이 아니라 각 컴포넌트의 CSS에서 var(--iris-*)를 추출한 결과입니다. 배선이 끊기면 이 자리에 바로 드러납니다.">
        <div className="bh-grid" style={{ gridTemplateColumns: '1.1fr 1.6fr', gap: '10px 20px', alignItems: 'center' }}>
          <span className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>토큰</span>
          <span className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>배선된 컴포넌트</span>
          {Object.entries(wiring).map(([t, comps]) => (
            <span key={t} style={{ display: 'contents' }}>
              <span className="bh-mono" style={{ color: comps.length ? 'var(--iris-semantic-label-normal)' : 'var(--iris-semantic-label-disable)' }}>{t}</span>
              <span style={{ fontSize: 13, color: comps.length ? 'var(--iris-semantic-label-neutral)' : 'var(--iris-semantic-label-disable)' }}>
                {comps.length ? comps.join(' · ') : '— 아직 없음'}
              </span>
            </span>
          ))}
        </div>
      </Fig>

      <P>
        {platformCount}개 중 <b>{wiredCount}개</b>가 실제로 컴포넌트에 배선돼 있습니다.
        남은 <code>safe-area-top</code>과 <code>font-base-size</code>는 웹에서 대응물이 없어
        (노치가 없고, CSS가 rem이 아니라 px 기반이라) 네이티브 빌드가 생길 때 쓰입니다.
        구조를 만들어 두는 것과 실제로 쓰는 것은 다른 일이고, 이 표가 그 차이를 숨기지 않습니다.
      </P>

      <H2>0은 값이 아니라 규칙이었다</H2>
      <P>
        처음 <code>nav-bottom-height</code>의 웹 값은 <b>0</b>이었습니다.
        &ldquo;웹에는 하단 내비게이션이 없다&rdquo;는 뜻으로 넣은 값이었는데, 배선하려는 순간 문제가 드러났습니다.
        그 토큰을 실제로 참조하면 웹에서 컴포넌트 높이가 0으로 무너집니다.
        그래서 <code>BottomNavigation</code>은 <code>56px</code>을 하드코딩한 채였고, 토큰 층을 우회하고 있었습니다.
      </P>
      <P>
        원인은 한 칸에 두 가지를 담은 것이었습니다 — <b>기하</b>(높이가 얼마인가)와
        <b>사용 규칙</b>(이 플랫폼이 이걸 쓰는가). 토큰은 기하만 담아야 합니다.
        웹 값을 56으로 고치고 컴포넌트를 배선했습니다. 웹에서 하단 내비를 쓰지 않는다는 것은
        값이 아니라 사용 지침으로 남습니다.
      </P>

      <Fig plain caption="분기가 사라진 게 아니라 자리를 옮겼습니다. 컴포넌트 44개가 아니라 토큰 9개가 그것을 압니다.">
        <div className="bh-flow">
          <div className="bh-box"><b>컴포넌트 44</b><small>플랫폼을 모름</small></div>
          <span className="bh-arrow"><Icon name="arrow-right" size={16} /></span>
          <div className="bh-box on"><b>platform 토큰 {platformCount}</b><small>분기를 흡수</small></div>
          <span className="bh-arrow"><Icon name="arrow-right" size={16} /></span>
          <div className="bh-box"><b>웹 · iOS · Android</b><small>빌드가 값을 고름</small></div>
        </div>
      </Fig>

      <Aside label="정직하게 — 아직 증명되지 않았다">
        <p>
          지금 배포되는 CSS는 <b>웹 값으로만</b> 빌드됩니다. <code>build.mjs</code>가 각 토큰의
          <code>web</code> 값만 읽어 CSS 변수로 내보내기 때문입니다. iOS와 Android 값은
          <code>tokens.json</code>에 들어 있지만, 그 값을 소비하는 네이티브 빌드는 아직 없습니다.
          위 배선 표도 결국 <b>웹 컴포넌트가 토큰을 경유한다</b>는 것까지만 증명합니다.
        </p>
        <p>
          그러니까 이 구조는 지금 <b>준비된 구조</b>이지 <b>증명된 구조</b>가 아닙니다.
          같은 소스에서 Swift 상수와 Compose 값을 내보내고, 실제 네이티브 화면에서 44와 56이
          나오는 걸 확인해야 비로소 증명됩니다. 그게 다음 단계입니다.
        </p>
      </Aside>
    </Article>
  );
}
