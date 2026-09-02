import { Page, Section } from '../components/Doc';

/* 단계마다 '무엇을 만지는지'와 '무엇으로 끝났다고 보는지'를 함께 적는다.
   단계만 나열하면 지켰는지 확인할 방법이 없다. */

const PLATFORM: [string, string, string, string][] = [
  ['artboard/width', '1440', '375', '360'],
  ['page/margin', '24', '20', '16'],
  ['nav/top-height', '64', '44', '56'],
  ['nav/bottom-height', '56', '49', '80'],
  ['input/height', '48', '48', '56'],
  ['touch-target/min', '40', '44', '48'],
];

const BRANCH: [string, string, boolean][] = [
  ['기존 컴포넌트 조합으로 되는가', '조합해서 이 파일의 로컬 컴포넌트로 만든다', false],
  ['정말 새로운 것인가', '로컬로 만들되 토큰만 쓴다 — 아직 시스템에 넣지 않는다', false],
  ['세 번째 화면에서 또 나왔는가', '그때 승격한다 — Figma 컴포넌트 + React 구현 + 문서 페이지', false],
  ['토큰에 없는 색·간격이 필요한가', '만들지 않는다. 가까운 토큰을 쓰거나 설계를 다시 본다', true],
];

const NEVER: [string, string][] = [
  ['인스턴스 detach', '시스템이 업데이트돼도 그 화면만 옛 모습으로 남습니다.'],
  ['hex 직접 입력', '다크 모드에서 그 자리만 깨집니다. 05에서 반드시 드러납니다.'],
  ['컴포넌트 내부 수정', '다른 화면의 같은 컴포넌트가 같이 바뀝니다.'],
  ['토큰 밖 간격', '4의 배수 리듬이 깨지고, 다음 예외가 같은 논리로 들어옵니다.'],
];

function Done({ children }: { children: React.ReactNode }) {
  return <p className="wf-done"><b>완료</b><span>{children}</span></p>;
}

export default function WorkflowPage() {
  return (
    <Page kicker="Guide" title="Workflow"
      desc="Iris로 화면을 만들 때의 작업 순서입니다. 각 단계마다 어느 자산을 만지는지와 무엇으로 끝났다고 판단하는지를 함께 적었습니다. 순서를 지키면 개발 이관에서 넘길 것이 크게 줄어듭니다.">

      <div className="wf-prep">
        <b>0 · 준비 — 프로젝트마다 한 번</b>
        <p>이걸 안 하면 이후 단계가 전부 성립하지 않습니다. 컴포넌트도 토큰도 보이지 않습니다.</p>
        <ol>
          <li>Iris 파일에서 <code>Assets → 라이브러리 → 게시</code>. 컴포넌트와 변수 8컬렉션이 함께 게시됩니다.</li>
          <li>새 프로젝트 파일을 만들고, 같은 메뉴에서 Iris 라이브러리를 <b>사용 설정</b>합니다.</li>
          <li>확인: Assets 패널에 컴포넌트가 보이고, 색 선택기에 <code>iris/semantic</code>이 뜹니다.</li>
        </ol>
      </div>

      <Section title="01 · 플랫폼을 먼저 정한다" desc="Figma · 새 프로젝트 파일">
        <p className="wf-p">
          Iris는 하나의 토큰 이름에 세 값을 갖습니다. 그래서 <b>무엇을 만드는지 정하기 전에는 아트보드 크기조차
          정할 수 없습니다.</b> 화면을 그리기 시작한 뒤에 플랫폼을 바꾸면 마진·내비 높이·입력 높이가 전부 어긋납니다.
        </p>
        <table className="props wf-table">
          <thead><tr><th>토큰</th><th>Web</th><th>iOS</th><th>Android</th></tr></thead>
          <tbody>
            {PLATFORM.map(([t, w, i, a]) => (
              <tr key={t}><td>{t}</td><td>{w}</td><td>{i}</td><td>{a}</td></tr>
            ))}
          </tbody>
        </table>
        <Done>아트보드 폭이 <code>artboard/width</code> 값과 같다. 임의로 정한 숫자가 아니다.</Done>
      </Section>

      <Section title="02 · 뼈대부터 — 그리드와 내비게이션" desc="Figma · Grid · Top/Bottom navigation">
        <p className="wf-p">
          내용을 채우기 전에 골격을 먼저 놓습니다. Grid는 <code>page/margin</code>을 참조하므로
          플랫폼 모드만 바꾸면 좌우 마진이 알아서 따라옵니다. 여기서 여백을 손으로 넣으면 그 이점이 사라집니다.
        </p>
        <Done>화면 어디에도 직접 입력한 좌우 여백 숫자가 없다.</Done>
      </Section>

      <Section title="03 · 조립한다 — 그리지 않는다" desc="Figma · All components 시트 · Assets 패널">
        <p className="wf-p">
          각 페이지 맨 왼쪽의 <b>All components</b>·<b>All utilities</b>에 전체가 모여 있습니다.
          먼저 훑어보고 쓸 것을 고른 다음 Assets 패널에서 꺼내 씁니다. 이 단계의 규칙은 셋뿐입니다.
        </p>
        <ul className="wf-list">
          <li>색·간격·라운드는 <b>값을 입력하지 말고 변수를 고른다</b></li>
          <li>인스턴스를 분리(detach)하지 않는다</li>
          <li>컴포넌트 내부를 열어 고치지 않는다 — 필요하면 04로</li>
        </ul>
        <Done>요소를 선택했을 때 색·간격 필드에 숫자가 아니라 토큰 이름이 떠 있다.</Done>
      </Section>

      <Section title="04 · 시스템에 없는 것을 만났을 때" desc="판단 → 로컬 컴포넌트 또는 시스템 승격">
        <p className="wf-p">
          반드시 생깁니다. 중요한 건 <b>여기서 시스템을 깨지 않는 것</b>입니다. 순서대로 물어보세요.
        </p>
        <div className="wf-branch">
          {BRANCH.map(([q, a, stop]) => (
            <div className={stop ? 'wf-row stop' : 'wf-row'} key={q}>
              <span className="q">{q}</span>
              <span className="arrow">{stop ? '✕' : '→'}</span>
              <span className="a">{a}</span>
            </div>
          ))}
        </div>
        <p className="wf-p">
          한 번 쓰인 것을 곧바로 시스템에 넣으면 쓰레기가 쌓입니다. 실제로 Iris에서도
          “나중에 쓸 것 같아서” 미리 깔아둔 색 램프 7개를 한 번도 못 쓰고 지운 적이 있습니다.
        </p>
        <Done>새로 만든 요소도 색·간격이 전부 토큰에 묶여 있다.</Done>
      </Section>

      <Section title="05 · 다크 모드로 한 번 훑는다" desc="Figma · iris/semantic 컬렉션 모드 전환">
        <p className="wf-p">
          장식이 아니라 <b>검사 도구</b>입니다. 모드를 Dark로 바꿨을 때 깨지는 곳이 곧
          하드코딩된 색이 남아 있는 곳입니다. 어디를 고쳐야 하는지 정확히 알려줍니다.
        </p>
        <Done>모드만 바꿨는데 읽히지 않는 텍스트나 사라지는 경계가 없다.</Done>
      </Section>

      <Section title="06 · 개발에 넘긴다" desc="Figma → 개발자">
        <p className="wf-p">넘길 것과 넘기지 않아도 되는 것이 분명히 갈립니다.</p>
        <ul className="wf-list">
          <li><b>넘긴다</b> — 화면 파일, 각 화면이 어떤 컴포넌트 조합인지, 04에서 새로 만든 것의 명세</li>
          <li><b>넘기지 않는다</b> — 색값·간격 수치·폰트 크기. 전부 토큰에 있고 코드가 같은 소스를 씁니다</li>
        </ul>
        <p className="wf-p">레드라인을 그릴 일이 거의 없어집니다. 그게 앞 단계를 지킨 대가로 얻는 것입니다.</p>
        <Done>전달 문서에 hex 색상값이 하나도 없다.</Done>
      </Section>

      <Section title="07 · 구현한다" desc="코드 · npm">
        <pre className="codeblock">{`npm i @hs2190.an/iris-tokens @hs2190.an/iris-react

import { Button, TextField } from '@hs2190.an/iris-react';
import '@hs2190.an/iris-tokens/css';
import '@hs2190.an/iris-react/styles.css';`}</pre>
        <p className="wf-p">
          테마 전환은 <code>{'<html data-theme="dark">'}</code> 한 줄입니다.
          커스텀 스타일이 필요하면 hex를 쓰지 말고 CSS 변수를 참조합니다 —
          <code>var(--iris-semantic-primary-normal)</code>.
        </p>
        <Done>새로 쓴 CSS에 hex 색상 리터럴이 없다.</Done>
      </Section>

      <Section title="네이티브는 아직 코드가 없습니다" desc="알아둘 것">
        <div className="wf-warn">
          토큰은 Web · iOS · Android 세 값을 모두 갖고 있지만, 배포되는 코드는 <b>웹(React + CSS 변수)뿐</b>입니다.
          iOS·Android로 만든다면 디자인은 이 순서대로 가되, 구현은 개발자가 플랫폼 토큰 수치를 보고 직접 작성해야 합니다.
          준비된 구조이지 증명된 구조는 아닙니다.
        </div>
      </Section>

      <Section title="하지 말 것" desc="네 가지가 시스템을 무너뜨립니다. 전부 ‘지금 당장은 더 빠른’ 선택입니다.">
        <div className="wf-never">
          {NEVER.map(([t, d]) => (
            <div className="wf-never-item" key={t}><b>{t}</b><span>{d}</span></div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
