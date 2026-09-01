import { Table, Icon } from '@hs2190.an/iris-react';
import { Page, Section, Chips } from '../components/Doc';

const rows = [
  { t: 'input-height', web: '48', ios: '48', and: '56', use: 'TextField · Select · SearchField 높이' },
  { t: 'nav-top-height', web: '64', ios: '44', and: '56', use: 'Top navigation 높이' },
  { t: 'nav-bottom-height', web: '—', ios: '49', and: '80', use: 'Bottom navigation (웹 미사용)' },
  { t: 'touch-target-min', web: '40', ios: '44', and: '48', use: '최소 터치 영역 — Slider·아이콘 버튼' },
  { t: 'page-margin', web: '24', ios: '20', and: '16', use: 'Grid 페이지 좌우 마진' },
  { t: 'radius-sheet', web: '16', ios: '20', and: '28', use: 'Bottom sheet 상단 라운드' },
  { t: 'font-base-size', web: '16', ios: '17', and: '16', use: '루트 폰트 기준' },
  { t: 'safe-area-top', web: '0', ios: '59', and: '24', use: '노치·상태바' },
  { t: 'safe-area-bottom', web: '0', ios: '34', and: '0', use: '홈 인디케이터' },
];
const mono = (s: string) => <code style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12.5 }}>{s}</code>;

export default function PlatformPage() {
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
      <Section title="Breakpoint" desc="웹 반응형 기준 — Grid 컬럼 관례(12/8/4)가 여기서 갈립니다.">
        <Chips primary="breakpoint" items={['xs 0', 'sm 768', 'md 992', 'lg 1200', 'xl 1600']} />
      </Section>
      <Section title="사용 규칙">
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--iris-semantic-label-neutral)', fontSize: 14.5, lineHeight: 1.9 }}>
          <li>플랫폼 분기를 컴포넌트 코드에 쓰지 않습니다 — 토큰 이름 하나로 흡수합니다.</li>
          <li>iOS·Android 값은 네이티브 토큰 파이프라인에서 같은 소스(Figma Variables)로 빌드됩니다.</li>
          <li>웹에서 모바일 미리보기를 만들 땐 375 캔버스 + 4컬럼 관례를 따릅니다.</li>
        </ul>
      </Section>
    </Page>
  );
}
