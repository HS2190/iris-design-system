import { Card, Button, Icon, ContentBadge } from '@hs2190/iris-react';
import tokens from '@hs2190/iris-tokens';
import { Article, P, H2, Fig, Aside, Pull, Code } from '../../components/Prose';

/* 글에 나오는 값은 전부 토큰 소스에서 직접 읽는다 — 글과 시스템이 어긋날 수 없게. */
const shown = ['background/normal/normal', 'label/normal', 'primary/normal', 'line/solid/neutral'] as const;
const atomicCount = Object.keys(tokens.atomic).length;
const semanticCount = Object.keys(tokens.semantic).length;
const families = [...new Set(Object.keys(tokens.atomic).map(k => k.split('/')[0]))];

function Swatch({ alias }: { alias: string }) {
  return <div className="bh-swatch" style={{ background: tokens.atomic[alias] }} />;
}

function Pane({ mode }: { mode: 'light' | 'dark' }) {
  return (
    <div className="bh-pane" data-theme={mode}>
      <Card style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <ContentBadge>모집중</ContentBadge>
          <b style={{ fontSize: 15 }}>프로덕트 디자이너</b>
          <span style={{ fontSize: 13, color: 'var(--iris-semantic-label-alternative)' }}>Iris팀 · 서울</span>
          <Button size="s">지원하기</Button>
        </div>
      </Card>
      <span className="bh-pane-tag">data-theme="{mode}" · 컴포넌트 코드 동일</span>
    </div>
  );
}

export default function TwoLayerTokens() {
  return (
    <Article slug="two-layer-tokens">
      <P>
        컴포넌트를 스무 개쯤 만들었을 때 다크 모드를 붙이기 시작했습니다. 그리고 하루 만에 멈췄습니다.
        카드의 배경색을 다크에서 무엇으로 바꿔야 하는지, 카드 컴포넌트가 알아야 했기 때문입니다.
      </P>

      <H2>한 층일 때 무슨 일이 생기나</H2>
      <P>
        처음엔 색이 한 층이었습니다. 팔레트를 만들고 컴포넌트가 그걸 직접 불렀습니다.
        <code>coolNeutral/99</code> 같은 이름을 카드가, 시트가, 테이블이 각자 참조했습니다.
        라이트 모드만 있을 땐 아무 문제가 없습니다.
      </P>
      <P>
        문제는 두 번째 테마가 생기는 순간입니다. <code>coolNeutral/99</code>는 거의 흰색이라
        다크에서는 정반대 명도로 가야 하는데, <b>그 판단을 컴포넌트가 내려야 합니다.</b>
        컴포넌트마다 조건문이 생기고, 44개를 다 만들고 나면 44곳을 고쳐야 테마 하나가 추가됩니다.
      </P>

      <Fig caption="위: 컴포넌트가 색을 직접 부르면 테마 판단이 컴포넌트로 내려온다. 아래: 가운데 역할 층이 그 판단을 흡수한다.">
        <div className="bh-grid" style={{ gap: 24 }}>
          <div className="bh-flow">
            <div className="bh-box"><b>Card</b><small>컴포넌트</small></div>
            <span className="bh-arrow"><Icon name="arrow-right" size={16} /></span>
            <div className="bh-box"><b>coolNeutral/99</b><small>원료 — 라이트에선 맞음</small></div>
            <span className="bh-mono" style={{ color: 'var(--iris-semantic-status-negative)' }}>
              다크에선? → 컴포넌트가 분기
            </span>
          </div>
          <div className="bh-flow">
            <div className="bh-box"><b>Card</b><small>컴포넌트</small></div>
            <span className="bh-arrow"><Icon name="arrow-right" size={16} /></span>
            <div className="bh-box on"><b>background/normal/normal</b><small>역할 — 이 이름만 안다</small></div>
            <span className="bh-arrow"><Icon name="arrow-right" size={16} /></span>
            <div className="bh-box"><b>common/100 · coolNeutral/15</b><small>원료 — 테마가 고른다</small></div>
          </div>
        </div>
      </Fig>

      <H2>원료와 역할을 분리했다</H2>
      <P>
        그래서 층을 하나 끼워 넣었습니다. 아래층은 <b>원료</b>입니다. {atomicCount}개의 색이
        {' '}{families.length}개 패밀리({families.join(' · ')})로 명도 스케일만 갖고 있고, 쓰임에 대해서는 아무 말도 하지 않습니다.
        위층은 <b>역할</b>입니다. {semanticCount}개가 각각 &ldquo;보통 배경&rdquo;, &ldquo;기본 글자&rdquo;,
        {' '}&ldquo;주요 동작&rdquo; 같은 쓰임 이름을 갖고, 라이트와 다크에서 <b>어느 원료를 가리킬지</b>만 정합니다.
      </P>

      <Fig caption={`실제 semantic.json에서 읽어온 값입니다. 같은 역할 이름이 테마에 따라 다른 원료를 가리킵니다 — 이 표가 재매핑의 전부입니다.`}>
        <div className="bh-grid" style={{ gridTemplateColumns: '1.6fr 1fr 1fr', alignItems: 'center', gap: '14px 20px' }}>
          <span className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>역할 이름</span>
          <span className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>Light</span>
          <span className="bh-mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>Dark</span>
          {shown.map(name => {
            const v = tokens.semantic[name];
            return (
              <span key={name} style={{ display: 'contents' }}>
                <span className="bh-mono" style={{ color: 'var(--iris-semantic-label-normal)' }}>{name}</span>
                <span><Swatch alias={v.light} /><small className="bh-mono" style={{ fontSize: 11 }}>{v.light}</small></span>
                <span><Swatch alias={v.dark} /><small className="bh-mono" style={{ fontSize: 11 }}>{v.dark}</small></span>
              </span>
            );
          })}
        </div>
      </Fig>

      <P>
        빌드는 이 표를 CSS 변수로 펼칩니다. 라이트는 <code>:root</code>에, 다크는 같은 이름을 재정의하는 블록에 씁니다.
        컴포넌트가 참조하는 이름은 양쪽에서 완전히 같습니다.
      </P>
      <Code>{`:root {
  --iris-semantic-background-normal-normal: var(--iris-atomic-common-100);
}
[data-theme="dark"] {
  --iris-semantic-background-normal-normal: var(--iris-atomic-cool-neutral-15);
}`}</Code>

      <Fig caption="두 패널에 들어간 카드는 같은 컴포넌트, 같은 props입니다. 바뀐 것은 감싼 요소의 data-theme 하나뿐입니다.">
        <div className="bh-panes">
          <Pane mode="light" />
          <Pane mode="dark" />
        </div>
      </Fig>

      <Pull>테마를 바꾸는 일은 컴포넌트를 고치는 일이 아니라, 가운데 층을 다시 가리키는 일이 됐습니다.</Pull>

      <H2>이름이 곧 쓰임이다</H2>
      <P>
        2층 구조의 진짜 소득은 다크 모드가 아니라 <b>이름</b>이었습니다.
        컴포넌트 코드에 <code>violet/50</code>이 아니라 <code>primary/normal</code>이 적히면,
        그 코드를 읽는 사람은 &ldquo;보라색 버튼&rdquo;이 아니라 &ldquo;주요 동작 버튼&rdquo;으로 읽습니다.
      </P>
      <P>
        브랜드색을 바꿔야 할 때도 마찬가지입니다. <code>primary/normal</code>이 가리키는 원료 한 줄만 바꾸면
        버튼·링크·포커스 링·선택 상태가 한 번에 따라옵니다. 보라색을 쓴 곳을 전부 찾아다닐 필요가 없습니다.
      </P>

      <H2>그리고 원료 7개를 지웠다</H2>
      <P>
        솔직히 실패한 부분도 있습니다. 처음 팔레트를 만들 때 &ldquo;나중에 회색이 더 필요할 것 같아서&rdquo;
        <code>neutral</code> 램프를 7단계 깔아뒀습니다. 그리고 컴포넌트 44개를 전부 만들 때까지
        <b> 한 번도 쓰지 않았습니다.</b> <code>coolNeutral</code>이 이미 그 역할을 하고 있었기 때문입니다.
      </P>

      <Fig plain caption="쓰지 않는 원료는 자산이 아니라 부채였습니다 — 색을 고를 때마다 후보에 끼어들어 판단을 늦췄습니다.">
        <div className="bh-flow" style={{ gap: 20 }}>
          <div className="bh-box">
            <b className="bh-strike">134 원료</b>
            <small>neutral 램프 7단계 포함</small>
          </div>
          <span className="bh-arrow"><Icon name="arrow-right" size={16} /></span>
          <div className="bh-box on">
            <b>{atomicCount} 원료</b>
            <small>실제로 참조되는 것만</small>
          </div>
        </div>
      </Fig>

      <P>
        원료 층은 &ldquo;나중에 쓸지도 모르는 것&rdquo;을 미리 깔아두기 쉬운 자리입니다.
        하지만 원료가 많을수록 역할을 정할 때 후보가 늘고, 후보가 늘면 같은 상황에서 다른 색을 고르게 됩니다.
        일관성을 위해 만든 층이 일관성을 깎아먹는 셈입니다. 지금은 <b>역할이 생길 때 원료를 추가</b>하는 순서로 바꿨습니다.
      </P>

      <Aside label="지금도 남아 있는 문제">
        <p>
          2층은 공짜가 아닙니다. <code>label/normal</code>이 실제로 무슨 색인지 보려면 두 번 타고 들어가야 합니다.
          디버깅할 때 개발자 도구에 <code>var(--iris-atomic-…)</code>가 한 겹 더 찍히는 것도 그 대가입니다.
          Foundations의 Color 페이지에서 각 역할의 원료 별칭을 호버로 바로 보여주는 건 이 비용을 조금이라도 줄이려는 장치입니다.
        </p>
      </Aside>
    </Article>
  );
}
