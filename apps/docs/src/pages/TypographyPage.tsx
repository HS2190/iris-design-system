import { Page, Section, Chips, useCssVars } from '../components/Doc';

const GROUPS: [string, string, string[]][] = [
  ['Display', '히어로·마케팅 — 큰 화면 전용', ['display-1', 'display-2', 'display-3']],
  ['Title', '화면 제목', ['title-1', 'title-2', 'title-3']],
  ['Headline', '큰 소제목', ['headline-1', 'headline-2']],
  ['Heading', '섹션 제목 — Section header·모달 제목', ['heading-1', 'heading-2']],
  ['Body', '본문 — 입력·리스트 제목', ['body-1', 'body-2']],
  ['Label', '컨트롤 라벨 — 버튼·탭·입력 라벨', ['label-1', 'label-2']],
  ['Caption', '보조 정보 — 헬퍼·메타·뱃지', ['caption-1', 'caption-2']],
];
const ALL = GROUPS.flatMap(g => g[2]);
const fmt = (v?: string) => v ? v.replace(/-?\d+\.\d+/g, m => String(parseFloat(parseFloat(m).toFixed(3)))) : '—';
const VARS = ALL.flatMap(s => [`--iris-font-size-${s}`, `--iris-line-height-${s}`, `--iris-letter-spacing-${s}`, `--iris-font-weight-${s}`]);

export default function TypographyPage() {
  const vals = useCssVars(VARS);
  return (
    <Page kicker="Foundations" title="Typography" desc="16개 텍스트 스타일. 현재 Noto Sans KR — --iris-font-family 한 줄로 Pretendard 교체 가능합니다. 각 스타일은 .iris-* 유틸리티 클래스로 빌드됩니다.">
      {GROUPS.map(([t, d, styles]) => (
        <Section title={t} desc={d} key={t}>
          {styles.map(s => (
            <div className="type-row" key={s}>
              <div className={`type-sample iris-${s}`}>흐름을 만드는 디자인 Aa 123</div>
              <Chips primary={s} items={[
                `${fmt(vals[`--iris-font-size-${s}`])} / ${fmt(vals[`--iris-line-height-${s}`])}`,
                `w ${fmt(vals[`--iris-font-weight-${s}`])}`,
                `ls ${fmt(vals[`--iris-letter-spacing-${s}`]) === '—' ? '0' : fmt(vals[`--iris-letter-spacing-${s}`])}`,
              ]} />
            </div>
          ))}
        </Section>
      ))}
      <Section title="사용법">
        <div className="codeline">{'<p className="iris-body-1">본문</p>  ·  font-size: var(--iris-font-size-body-1)'}</div>
        <p className="section-desc" style={{ marginTop: 12 }}>
          폰트 패밀리는 <code>--iris-font-family</code> 하나로 제어됩니다 — Pretendard 도입 시 이 변수만 재정의하면 전 컴포넌트에 적용됩니다.
        </p>
      </Section>
    </Page>
  );
}
