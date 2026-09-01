import { useState } from 'react';
import { Icon, iconNames, type IconName, type IconVariant } from '@hs2190.an/iris-react';
import { Article, P, H2, Fig, Aside, Pull, Code } from '../../components/Prose';
import { Seg } from '../../components/Doc';

const demoNames: IconName[] = ['home', 'search', 'heart', 'bell', 'user', 'star', 'bookmark', 'settings'];
const available = demoNames.filter(n => (iconNames as string[]).includes(n));

/** 탭 활성 표현 비교 — 왼쪽은 색만, 오른쪽은 색 + 형태(fill). */
function TabRow({ useFill }: { useFill: boolean }) {
  const items: [IconName, string][] = [['home', '홈'], ['search', '탐색'], ['heart', '찜'], ['user', '내정보']];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {items.map(([n, label], i) => {
        const active = i === 0;
        return (
          <div key={n} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 16px',
            color: active ? 'var(--iris-semantic-primary-normal)' : 'var(--iris-semantic-label-assistive)',
          }}>
            <Icon name={n} size={24} variant={useFill && active ? 'fill' : 'line'} />
            <span style={{ fontSize: 11 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function PhosphorIcons() {
  const [variant, setVariant] = useState<IconVariant>('line');
  return (
    <Article slug="phosphor-icons">
      <P>
        아이콘은 직접 그리는 게 맞다고 생각했습니다. 시스템의 인상을 가장 크게 좌우하는 요소고,
        남의 것을 쓰면 &ldquo;내 디자인 시스템&rdquo;이 아닌 것 같았습니다. 그래서 30종을 그렸습니다.
        그리고 Bottom navigation을 만들다가 갈아엎었습니다.
      </P>

      <H2>직접 그린 30종이 막힌 지점</H2>
      <P>
        탭의 활성 상태를 만들려는데, <b>채운 아이콘이 없었습니다.</b> 30종을 전부 선(line)으로만 그렸기 때문입니다.
        활성 탭을 색으로만 구분하면 색각 이상이 있는 사용자에게는 구분이 사라집니다.
        형태로도 달라야 하는데, 그러려면 30종을 한 벌 더 그려야 했습니다.
      </P>
      <P>
        그리고 다시 들여다보니 이미 만든 30종도 상태가 좋지 않았습니다.
        선 굵기가 아이콘마다 1.5와 2가 섞여 있었고, 어떤 건 20 격자에 어떤 건 24 격자에 그려져 있었습니다.
        나란히 놓기 전에는 몰랐던 문제입니다.
      </P>

      <Pull>한 벌을 더 그리는 비용보다, 이미 그린 한 벌의 품질이 더 문제였습니다.</Pull>

      <H2>무엇을 기준으로 골랐나</H2>
      <P>
        필요한 조건은 네 가지였습니다. 상업적 사용이 자유로운 라이선스,
        <b> 채움 변형의 존재</b>, 격자와 굵기의 일관성, 그리고 이름 체계.
        후보는 셋이었습니다.
      </P>

      <Fig caption="Lucide는 채움 변형이 없다는 점이 결정적이었습니다 — 탭 활성 문제를 해결하려고 갈아엎는 것이었으니까요.">
        <div className="bh-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            ['Lucide', 'ISC · 선 전용', '채움 변형 없음 — 탈락', false],
            ['Material Symbols', 'Apache 2.0 · 4축 가변', '구글 제품 인상이 강함', false],
            ['Phosphor', 'MIT · 6웨이트(fill 포함)', '256 격자 통일 · 1,500+종', true],
          ].map(([name, spec, note, on]) => (
            <div key={name as string} className={on ? 'bh-box on' : 'bh-box'} style={{ gap: 8 }}>
              <b>{name}</b>
              <small>{spec}</small>
              <small style={{ color: on ? 'var(--iris-semantic-label-primary)' : undefined }}>{note}</small>
            </div>
          ))}
        </div>
      </Fig>

      <H2>이름을 바꾸지 않는 것이 조건이었다</H2>
      <P>
        문제가 하나 있었습니다. 기존 30종의 이름은 이미 컴포넌트 곳곳에 박혀 있었습니다.
        Select의 셰브론, SearchField의 돋보기, Snackbar의 닫기 — 갈아엎으면 호출부를 전부 찾아 고쳐야 합니다.
      </P>
      <P>
        그래서 <b>이름은 그대로 두고 속만 바꾸는</b> 방식으로 옮겼습니다.
        <code>paths.ts</code>는 이름 → 경로 데이터 매핑 테이블 하나이고, 이 테이블의 값만 Phosphor 경로로 교체했습니다.
        컴포넌트 코드는 한 줄도 고치지 않았습니다.
      </P>
      <Code>{`// paths.ts — 이름은 유지, 값만 Phosphor로 교체
export const paths: Record<string, IconGlyph> = {
  'search':  { line: [...], fill: [...] },   // ← 이름 그대로
  'close':   { line: [...], fill: [...] },
  'chevron-down': { line: [...], fill: [...] },
};

// 호출부 — 수정 없음
<Icon name="search" />`}</Code>

      <P>
        결과적으로 30종이 {iconNames.length}종이 됐고, 각각 line과 fill 두 변형을 갖게 됐습니다.
        viewBox는 전부 <code>0 0 256</code>으로 통일됐고, 색은 <code>currentColor</code>라 부모의 글자색 토큰을 그대로 따릅니다.
      </P>

      <Fig caption="같은 이름, variant만 다릅니다. 이름 체계가 유지됐기 때문에 두 축이 추가돼도 호출 방식은 그대로입니다.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ maxWidth: 220 }}>
            <Seg label="variant" value={variant} options={['line', 'fill'] as const} onChange={setVariant} />
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {available.map(n => (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Icon name={n} size={30} variant={variant} />
                <small className="bh-mono" style={{ fontSize: 10.5 }}>{n}</small>
              </div>
            ))}
          </div>
        </div>
      </Fig>

      <H2>두 축을 만든 이유</H2>
      <P>
        line과 fill은 장식이 아니라 <b>상태를 형태로 표현하기 위한 축</b>입니다.
        활성 탭을 색만으로 표시하면 정보가 색 하나에 실리지만, 채움까지 바뀌면 색을 못 봐도 구분됩니다.
      </P>

      <Fig caption="왼쪽은 색만 바뀌고, 오른쪽은 색과 채움이 함께 바뀝니다. 흑백으로 인쇄해 보면 차이가 분명해집니다.">
        <div className="bh-panes">
          <div className="bh-pane">
            <TabRow useFill={false} />
            <span className="bh-pane-tag">색만 — 색을 못 보면 구분 소실</span>
          </div>
          <div className="bh-pane">
            <TabRow useFill />
            <span className="bh-pane-tag">색 + 채움 — 형태로도 구분</span>
          </div>
        </div>
      </Fig>

      <Aside label="지금도 남아 있는 문제">
        <p>
          {iconNames.length}종은 Phosphor 1,500여 종에서 골라낸 <b>발췌</b>입니다.
          필요한 아이콘이 없으면 매핑에 한 줄 추가하면 되지만, 그때마다 Figma 쪽 아이콘 컴포넌트도
          손으로 맞춰야 합니다. 코드와 Figma를 잇는 이 구간만 아직 수동입니다 —
          토큰은 Figma가 원본인데 아이콘은 코드가 원본이라, 방향이 반대인 것도 정리되지 않은 부분입니다.
        </p>
      </Aside>
    </Article>
  );
}
