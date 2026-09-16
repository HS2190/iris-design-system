import { Button, TextField, Alert, Toast, Snackbar, SectionMessage, FallbackView, Table } from '@hs2190.an/iris-react';
import { Page, Section, Canvas, DoDont, Chips } from '../components/Doc';

/* 컴포넌트가 문구를 받는 자리 — packages/react/src의 Props에서 추린 것.
   표시 방식(색·모양)이 아니라 "이 자리에 무슨 말을 담는가"만 다룬다. */
const SLOTS: [string, string, string, string][] = [
  ['Button', 'children', '동사. 누르면 일어나는 일을 그대로.', '저장 / 삭제 / 초대 보내기'],
  ['TextField', 'label', '명사. 무엇을 넣는 칸인지.', '이메일'],
  ['TextField', 'placeholder', '형식이나 예시. 라벨을 대체하지 않는다.', 'example@company.com'],
  ['TextField', 'helper', '입력 규칙을 미리.', '영문·숫자 8자 이상'],
  ['TextField', 'error', '무엇이 잘못됐고 어떻게 고치는지.', '이메일 형식을 확인해 주세요'],
  ['Alert', 'title', '질문 또는 결과. 버튼이 답이 되게.', '메모를 삭제할까요?'],
  ['Alert', 'actions', '동사. 예/아니요 금지.', '삭제 · 취소'],
  ['Toast', 'children', '끝난 사실 한 줄. 감탄 금지.', '저장했습니다'],
  ['Snackbar', 'actionLabel', '되돌릴 행동 하나.', '실행 취소'],
  ['SectionMessage', 'title·children', '상황 + 다음 행동.', '토큰이 갱신되었습니다'],
  ['Tooltip', 'children', '이름 한 줄. 필수 정보는 담지 않는다.', '즐겨찾기'],
  ['FallbackView', 'title·description·action', '왜 비었는지 + 무엇을 하면 되는지.', '검색 결과가 없습니다'],
  ['Menu', 'items', '동사. 위험한 항목은 분리.', '이름 바꾸기 · 삭제'],
  ['ProgressTracker', 'steps', '명사. 지금 어디인지.', '배송지 · 결제 · 완료'],
  ['Tabs · SegmentedControl', 'labels', '명사. 같은 길이대로.', '전체 · 진행 · 완료'],
  ['Table', 'emptyText', '빈 이유. 표 안이라 짧게.', '조건에 맞는 항목이 없습니다'],
  ['IconButton', 'aria-label', '아이콘의 이름. 필수 prop.', '닫기'],
];

const BANNED: [string, string, string][] = [
  ['잘못된 값을 입력했습니다', '원인을 사용자 탓으로 돌린다', '이메일 형식을 확인해 주세요'],
  ['저장에 실패했습니다', '실패만 알리고 다음이 없다', '저장하지 못했습니다. 다시 시도해 주세요'],
  ['입력하세요', '무엇을 넣는지 말하지 않는다', '라벨로 이름을, placeholder로 형식을'],
  ['클릭하세요', '마우스에만 성립한다', '선택하세요 · 누르세요'],
  ['정상적으로 저장했습니다', '"정상적으로"가 정보를 더하지 않는다', '저장했습니다'],
  ['~의 경우 · 본 서비스 · 귀하', '번역투·과한 격식', '~하면 · 이 서비스 · (주어 생략)'],
  ['완벽하게 · 100% 안전 · 절대', '시스템이 보장하지 않는 것을 약속한다', '실제 동작만 그대로 서술'],
  ['완료되었습니다!!', '감탄과 수동태가 겹친다', '완료했습니다'],
];

export default function WritingPage() {
  return (
    <Page kicker="Foundations" title="Writing"
      desc="아이리스로 만든 제품이 어떻게 말할지 정하는 층입니다. 색을 원료와 역할로 나눈 것과 같은 방식으로, 문구도 제품 불문 지켜야 할 규칙과 제품이 스스로 정할 축으로 나눕니다.">

      <Section title="두 층" desc="색과 같은 구조입니다. 아래층은 바꿀 수 없고, 위층은 제품이 정합니다.">
        <div className="wr-layers">
          <div className="wr-layer">
            <span className="wr-layer-tag">아이리스가 정합니다</span>
            <b>불변 규칙</b>
            <p>제품이 무엇이든 성립하는 여섯 가지. 브랜드 톤과 무관하게 지킵니다.</p>
            <Chips primary="불변" items={['능동태', '한 문장 한 메시지', '사용자 탓 금지', '에러엔 다음 행동', '디바이스 중립', '동작과 일치']} />
          </div>
          <div className="wr-layer">
            <span className="wr-layer-tag">제품이 정합니다</span>
            <b>보이스</b>
            <p>어투·온도·격식은 브랜드마다 다릅니다. 아이리스는 고르라고 요구할 뿐 값을 정하지 않습니다.</p>
            <Chips items={['어투 · -습니다 ↔ -해요', '온도 · 담백 ↔ 친근', '격식 · 사무 ↔ 구어']} />
          </div>
        </div>
        <p className="wr-note">
          토큰에서 <code>blue/50</code>이 무슨 색인지는 고정이고 그것이 <code>primary/normal</code>인지는
          제품이 정하는 것과 같습니다. <b>규칙은 시스템이, 목소리는 제품이</b> 갖습니다.
          이 문서 사이트는 그 축에서 <code>-습니다</code>체 · 담백 · 사무를 골라 쓴 하나의 사례입니다.
        </p>
      </Section>

      <Section title="불변 규칙" desc="여섯 가지는 예외 없이 지킵니다. 예외가 필요하게 느껴지면 원칙이 아니라 문장을 다시 써야 한다는 신호입니다.">
        <DoDont
          doTitle="행동이 끝났다고 말한다" doBody="누가 했는지가 남아 있어 사용자의 행동이 결과를 만들었다는 감각이 유지됩니다."
          doEx={<Toast tone="positive">저장했습니다</Toast>}
          dontTitle="저장되었습니다" dontBody="수동태는 행위자를 지웁니다. 시스템이 혼자 한 일처럼 읽힙니다."
          dontEx={<Toast tone="positive">저장되었습니다</Toast>} />

        <DoDont
          doTitle="원인과 해결을 함께" doBody="무엇이 잘못됐고 어떻게 고치는지가 한 줄에 다 있습니다."
          doEx={<TextField label="이메일" defaultValue="hs2190" error="이메일 형식을 확인해 주세요" style={{ width: 260 }} />}
          dontTitle="잘못된 입력입니다" dontBody="사용자를 탓하고, 무엇을 고쳐야 하는지도 말하지 않습니다."
          dontEx={<TextField label="이메일" defaultValue="hs2190" error="잘못된 입력입니다" style={{ width: 260 }} />} />

        <DoDont
          doTitle="실패에는 다음 행동을" doBody="실패를 알리는 것으로 끝내지 않고 지금 무엇을 하면 되는지까지 말합니다."
          doEx={<SectionMessage tone="negative" title="저장하지 못했습니다">잠시 후 다시 시도해 주세요.</SectionMessage>}
          dontTitle="저장 실패" dontBody="사실만 남고 사용자는 멈춥니다."
          dontEx={<SectionMessage tone="negative">저장 실패</SectionMessage>} />

        <DoDont
          doTitle="디바이스를 가리지 않는 동사" doBody="마우스·터치·키보드 어디서든 성립합니다."
          doEx={<Button size="s">선택하세요</Button>}
          dontTitle="클릭하세요" dontBody="터치와 키보드 사용자에게는 맞지 않는 말입니다."
          dontEx={<Button size="s">클릭하세요</Button>} />

        <p className="wr-note">
          나머지 둘은 예시보다 규칙이 분명합니다. <b>한 문장 한 메시지</b> — 문장이 길어질수록 핵심 행동이 뒤로 밀립니다.
          <b> 동작과 일치</b> — 문구가 실제 동작보다 크게 약속하지 않습니다.
          데모에서 알림을 보내지 않는데 &ldquo;알림을 보냈습니다&rdquo;라고 쓰면 그건 톤 문제가 아니라 거짓입니다.
        </p>
      </Section>

      <Section title="동사인가 명사인가" desc="컴포넌트마다 갈리는 이 판단에는 기준이 하나 있습니다.">
        <div className="wr-split">
          <div>
            <b className="wr-split-h">동사 — 누르면 일어나는 일</b>
            <p>Button · Menu · Alert의 액션. 사용자가 무언가를 하게 만드는 자리입니다.</p>
            <Canvas><Button size="s">삭제</Button><Button size="s" variant="outlined" color="assistive">취소</Button></Canvas>
          </div>
          <div>
            <b className="wr-split-h">명사 — 지금 어디인가</b>
            <p>Tabs · ProgressTracker · Chip. 상태나 위치를 가리키는 자리입니다.</p>
            <Canvas><Chips items={['배송지', '결제', '완료']} primary="결제" /></Canvas>
          </div>
        </div>
        <p className="wr-note">
          Alert의 버튼이 <b>예 / 아니요</b>가 되면 안 되는 이유가 여기 있습니다 —
          질문을 다시 읽어야 무엇에 동의하는지 알 수 있습니다. 버튼이 답이 되게 씁니다.
        </p>
        <DoDont
          doTitle="버튼이 답이 된다" doBody="제목을 다시 읽지 않아도 무엇이 일어날지 압니다."
          doEx={<Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">취소</Button><Button size="s">삭제</Button></>}>삭제하면 되돌릴 수 없습니다.</Alert>}
          dontTitle="예 / 아니요" dontBody="라벨이 행동을 담지 않으면 확인 창을 두 번 읽게 됩니다."
          dontEx={<Alert title="메모를 삭제할까요?" actions={<><Button size="s" variant="outlined" color="assistive">아니요</Button><Button size="s">예</Button></>}>삭제하면 되돌릴 수 없습니다.</Alert>} />
      </Section>

      <Section title="상태의 온도" desc="빈 상태·에러·로딩을 모두 '문제'로 뭉뚱그리면, 정말 문제가 생겼을 때 사용자가 구분하지 못합니다.">
        <div className="wr-states">
          <div className="wr-state">
            <div className="wr-state-txt">
              <span className="wr-state-tag">Empty</span>
              <p>비어 있음은 실패가 아니라 &ldquo;아직 이만큼&rdquo;이라는 사실입니다. 왜 비었는지와 무엇을 하면 되는지를 담백하게.</p>
            </div>
            <Canvas><FallbackView icon="search" title="검색 결과가 없습니다" description="다른 키워드로 찾아보세요."
              action={<Button size="s" variant="outlined" color="assistive">검색어 지우기</Button>} /></Canvas>
          </div>
          <div className="wr-state">
            <div className="wr-state-txt">
              <span className="wr-state-tag">Error</span>
              <p>에러는 사용자 탓이 아니라 시스템이 지금 하지 못한 일에 대한 사실 고지입니다. 원인을 짧게, 다음 행동을 반드시.</p>
            </div>
            <Canvas><Snackbar actionLabel="다시 시도">복사하지 못했습니다</Snackbar></Canvas>
          </div>
          <div className="wr-state">
            <div className="wr-state-txt">
              <span className="wr-state-tag">Loading</span>
              <p>로딩은 멈춤이 아니라 진행 중이라는 안심입니다. 오래 걸릴 때만 말하고, 아니면 Skeleton만으로 충분합니다.</p>
            </div>
            <Canvas><Toast tone="neutral">불러오는 중입니다</Toast></Canvas>
          </div>
        </div>
      </Section>

      <Section title="슬롯 규칙" desc="문구를 받는 컴포넌트는 42개 중 28개입니다. 자주 쓰는 자리의 규칙을 모았습니다.">
        <Table style={{ width: '100%' }} columns={[
          { key: 'c', header: '컴포넌트' }, { key: 's', header: '슬롯' },
          { key: 'r', header: '규칙' }, { key: 'e', header: '예' },
        ]} data={SLOTS.map(([c, s, r, e]) => ({
          c, s: <code className="wr-code">{s}</code>, r, e: <span className="wr-ex">{e}</span>,
        }))} />
      </Section>

      <Section title="쓰지 않는 표현" desc="이유가 있어 쓰지 않습니다. 무엇으로 바꾸는지까지 함께 둡니다.">
        <Table style={{ width: '100%' }} columns={[
          { key: 'x', header: '쓰지 않음' }, { key: 'w', header: '이유' }, { key: 'o', header: '대신' },
        ]} data={BANNED.map(([x, w, o]) => ({
          x: <span className="wr-ban">{x}</span>, w, o: <span className="wr-ex">{o}</span>,
        }))} />
      </Section>

      <Section title="배포 전 확인" desc="문구를 내보내기 전 마지막으로 훑습니다.">
        <ul className="wr-check">
          <li>어투가 제품이 선언한 하나로 통일되어 있는가</li>
          <li>수동태가 섞이지 않았는가</li>
          <li>한 문장에 하나의 메시지만 담았는가</li>
          <li>에러에 원인과 다음 행동이 모두 있는가</li>
          <li>사용자를 탓하는 표현이 없는가</li>
          <li>문구가 실제 동작과 일치하는가 — 더 크게 약속하지 않는가</li>
          <li>디바이스에 종속된 동사가 없는가</li>
          <li>버튼·메뉴는 동사, 탭·단계는 명사인가</li>
          <li>빈 상태·에러·로딩이 각각 다른 온도로 구분되는가</li>
          <li>아이콘만 있는 버튼에 <code>aria-label</code>이 있는가</li>
        </ul>
      </Section>
    </Page>
  );
}
