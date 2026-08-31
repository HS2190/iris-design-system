import { Table } from '@iris/react';
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

export default function PlatformPage() {
  return (
    <Page kicker="Foundations" title="Platform" desc="웹·iOS·Android에서 값이 갈리는 토큰입니다. 하나의 이름을 쓰고, 값은 플랫폼 빌드가 결정합니다 — 이 CSS 패키지는 웹 값으로 빌드됩니다.">
      <Section title="Tokens" desc="컴포넌트는 --iris-input-height처럼 이름만 참조합니다.">
        <Table style={{ width: '100%', maxWidth: 720 }} data={rows.map(r => ({
          t: <code style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12.5 }}>{r.t}</code>,
          web: r.web, ios: r.ios, and: r.and, use: r.use,
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
        </ul>
      </Section>
    </Page>
  );
}
