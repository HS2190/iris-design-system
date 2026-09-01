import tokens from '@hs2190/iris-tokens';
import { Page, Section, Chips, DoDont, useCssVars } from '../components/Doc';

const GROUPS: [string, string, [string, string][]][] = [
  ['Display', '히어로·마케팅 — 큰 화면 전용, UI 본문에는 쓰지 않습니다', [['display-1', '랜딩 히어로'], ['display-2', '마케팅 배너'], ['display-3', '온보딩 타이틀']]],
  ['Title', '화면 제목 — 한 화면에 하나', [['title-1', '큰 화면 제목'], ['title-2', '화면 제목'], ['title-3', '서브 화면 제목']]],
  ['Headline', '큰 소제목 — 콘텐츠 블록의 머리', [['headline-1', '큰 콘텐츠 제목'], ['headline-2', '콘텐츠 제목']]],
  ['Heading', '섹션 제목 — Section header·모달·시트 제목', [['heading-1', '큰 섹션 제목'], ['heading-2', 'Section header · Alert · Popup 제목']]],
  ['Body', '본문 — 읽는 글과 입력', [['body-1', '입력 텍스트 · 리스트 제목 · 본문'], ['body-2', '보조 본문 · 셀 내용 · 메뉴']]],
  ['Label', '컨트롤 라벨 — 눌리는 것들의 글자', [['label-1', '버튼 · 탭 · 입력 라벨 · 칩'], ['label-2', '작은 버튼 · 세그먼트']]],
  ['Caption', '보조 정보 — 읽지 않아도 되는 것', [['caption-1', '헬퍼 · 메타 · 테이블 헤더'], ['caption-2', '뱃지 · 하단 탭 라벨']]],
];
const ALL = GROUPS.flatMap(g => g[2].map(x => x[0]));
const VARS = ALL.flatMap(s => [`--iris-font-size-${s}`, `--iris-line-height-${s}`, `--iris-letter-spacing-${s}`, `--iris-font-weight-${s}`]);
const fmt = (v?: string) => v ? v.replace(/-?\d+\.\d+/g, m => String(parseFloat(parseFloat(m).toFixed(3)))) : '—';
const sizeOf = (n: string) => tokens.typography.find(t => t.n === n);

const Tag = ({ n }: { n: string }) => (
  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'var(--iris-semantic-fill-primary)', color: 'var(--iris-semantic-label-primary)', flex: 'none', alignSelf: 'center' }}>{n}</span>
);

export default function TypographyPage() {
  const vals = useCssVars(VARS);
  return (
    <Page kicker="Foundations" title="Typography" desc="16개 스타일이 Display(전시) → Title(화면) → Heading(섹션) → Body(본문) → Label(컨트롤) → Caption(보조)의 위계를 이룹니다. 폰트는 --iris-font-family 하나로 제어됩니다.">
      <Section title="폰트" desc="현재 Noto Sans KR — 변수 한 줄로 Pretendard 교체가 가능하도록 설계돼 있습니다.">
        <div className="fnd-diagram" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 10 }}>
          <span className="iris-heading-1">디자인은 흐름을 만드는 일 Aa 123</span>
          <span style={{ fontSize: 13, color: 'var(--iris-semantic-label-alternative)' }}>
            한국어·영문·숫자 — 모든 스타일에 <code>word-break: keep-all</code>이 적용되어 어절 단위로 줄바꿈됩니다. 수동 줄바꿈이 필요 없습니다.
          </span>
          <div className="codeline" style={{ width: '100%' }}>{`--iris-font-family: "Noto Sans KR", …;  /* Pretendard 도입 시 이 한 줄만 교체 */`}</div>
        </div>
      </Section>
      <Section title="스케일 한눈에" desc="같은 문장을 16단계로 — 크기 차이가 곧 위계입니다.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ALL.map(n => {
            const t = sizeOf(n);
            return (
              <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: '1px solid var(--iris-semantic-line-normal-alternative)', padding: '6px 0' }}>
                <span style={{ width: 92, fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: 'var(--iris-semantic-label-assistive)', flex: 'none' }}>{n}</span>
                <span style={{ width: 30, textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: 'var(--iris-semantic-label-neutral)', flex: 'none' }}>{t?.s}</span>
                <span className={`iris-${n}`} style={{ color: 'var(--iris-semantic-label-normal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>흐름을 만드는 디자인</span>
              </div>
            );
          })}
        </div>
      </Section>
      {GROUPS.map(([t, d, styles]) => (
        <Section title={t} desc={d} key={t}>
          {styles.map(([s, use]) => (
            <div className="type-row" key={s}>
              <div className={`type-sample iris-${s}`}>흐름을 만드는 디자인 Aa 123</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <Chips primary={s} items={[
                  `${fmt(vals[`--iris-font-size-${s}`])} / ${fmt(vals[`--iris-line-height-${s}`])}`,
                  `w ${fmt(vals[`--iris-font-weight-${s}`])}`,
                  `ls ${fmt(vals[`--iris-letter-spacing-${s}`]) === '—' ? '0' : fmt(vals[`--iris-letter-spacing-${s}`])}`,
                ]} />
                <span style={{ fontSize: 12, color: 'var(--iris-semantic-label-assistive)' }}>{use}</span>
              </div>
            </div>
          ))}
        </Section>
      ))}
      <Section title="실화면 적용" desc="한 카드 안에서 스타일이 어떻게 짝지어지는지 — 보라 태그가 스타일 이름입니다.">
        <div style={{ maxWidth: 480, border: '1px solid var(--iris-semantic-line-solid-neutral)', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span className="iris-heading-2" style={{ color: 'var(--iris-semantic-label-normal)' }}>오늘의 채용</span>
            <Tag n="heading-2" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span className="iris-body-1" style={{ color: 'var(--iris-semantic-label-normal)' }}>프로덕트 디자이너 · Iris팀</span>
            <Tag n="body-1" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span className="iris-body-2" style={{ color: 'var(--iris-semantic-label-neutral)' }}>디자인 시스템을 함께 만들 동료를 찾습니다. 웹·iOS·Android를 한 소스로.</span>
            <Tag n="body-2" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span className="iris-caption-1" style={{ color: 'var(--iris-semantic-label-alternative)' }}>어제 · 서울 · 경력 5년+</span>
            <Tag n="caption-1" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <span className="iris-label-1" style={{ color: 'var(--iris-semantic-static-white)', background: 'var(--iris-semantic-primary-normal)', padding: '10px 20px', borderRadius: 10 }}>지원하기</span>
            <Tag n="label-1" />
          </div>
        </div>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="위계는 3~4단계로" doBody="같은 카드 — 제목·본문·메타가 서로 다른 단계라 스캔이 됩니다."
          doEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="iris-heading-2" style={{ color: 'var(--iris-semantic-label-normal)' }}>섹션 제목</span>
            <span className="iris-body-2" style={{ color: 'var(--iris-semantic-label-neutral)' }}>본문이 그 아래 위계로.</span>
            <span className="iris-caption-1" style={{ color: 'var(--iris-semantic-label-alternative)' }}>메타 · 보조</span>
          </div>}
          dontTitle="수동 볼드로 위계 흉내" dontBody="같은 카드를 body-1에 굵기만 바꿔 만들면 스케일이 무너집니다."
          dontEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="iris-body-1" style={{ fontWeight: 700, color: 'var(--iris-semantic-label-normal)' }}>섹션 제목</span>
            <span className="iris-body-1" style={{ color: 'var(--iris-semantic-label-neutral)' }}>본문도 같은 크기.</span>
            <span className="iris-body-1" style={{ color: 'var(--iris-semantic-label-alternative)' }}>메타도 같은 크기</span>
          </div>} />
        <div className="codeline" style={{ marginTop: 16 }}>{'<p className="iris-body-1">본문</p>  ·  font-size: var(--iris-font-size-body-1)'}</div>
      </Section>
    </Page>
  );
}
