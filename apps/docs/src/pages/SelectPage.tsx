import { useState } from 'react';
import { Select, Radio } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const jobs = [
  { value: 'pd', label: '프로덕트 디자이너' }, { value: 'ux', label: 'UX 리서처' },
  { value: 'fe', label: '프론트엔드 개발자' }, { value: 'be', label: '백엔드 개발자' },
  { value: 'pm', label: '프로덕트 매니저' }, { value: 'da', label: '데이터 분석가' },
];

export default function SelectPage() {
  const [st, setSt] = useState<'default' | 'selected' | 'error' | 'disabled'>('default');
  return (
    <Page kicker="Components · Selection & Input" title="Select" desc="목록에서 하나를 고르는 드롭다운입니다. 네이티브 select 기반이라 모바일에서는 OS 픽커가 뜹니다. 옵션 6개 이상일 때 씁니다.">
      <Section title="Playground">
        <Playground
          stage={<Select key={st} label="직무" placeholder="선택하세요" options={jobs} style={{ width: 260 }}
            defaultValue={st === 'selected' ? 'pd' : undefined}
            helper={st === 'default' ? '하나만 선택할 수 있어요' : undefined}
            error={st === 'error' ? '직무를 선택해 주세요' : undefined}
            disabled={st === 'disabled'} />}
          panel={<Seg label="state" value={st} options={['default', 'selected', 'error', 'disabled'] as const} onChange={setSt} />}
          code={`<Select label="직무" options={jobs}${st === 'selected' ? ' defaultValue="pd"' : ' placeholder="선택하세요"'}${st === 'error' ? ' error="직무를 선택해 주세요"' : ''}${st === 'disabled' ? ' disabled' : ''} />`} />
      </Section>
      <Section title="Variants" desc="시각 변형은 단일형 — 쓰임에 따라 구성이 달라집니다.">
        <Canvas style={{ gap: 40 }}>
          <Spec label="폼 필드형 · 라벨 + 헬퍼 (기본)">
            <Select label="직무" placeholder="선택하세요" options={jobs} helper="하나만 선택할 수 있어요" style={{ width: 220 }} />
          </Spec>
          <Spec label="인라인 필터형 · 라벨 없음 (aria-label 필수)">
            <div style={{ paddingTop: 23 }}>{/* 라벨(17) + 간격(6)만큼 내려 직무 필드 입력부와 정렬 */}
              <Select aria-label="정렬 기준" options={[{ value: 'new', label: '최신순' }, { value: 'pop', label: '인기순' }]} defaultValue="new" style={{ width: 140 }} />
            </div>
          </Spec>
          <Spec label="설정값형 · 기본값 선택 (placeholder 없음)">
            <Select label="언어" options={[{ value: 'ko', label: '한국어' }, { value: 'en', label: 'English' }]} defaultValue="ko" style={{ width: 180 }} />
          </Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="열어 보세요.">
        <Canvas>
          <Select label="직무" placeholder="선택하세요" options={jobs} helper="하나만 선택할 수 있어요" style={{ width: 240 }} />
          <Select label="선택됨" options={jobs} defaultValue="pd" style={{ width: 240 }} />
          <Select label="오류" placeholder="선택하세요" options={jobs} error="직무를 선택해 주세요" style={{ width: 240 }} />
          <Select label="비활성" placeholder="선택 불가" options={jobs} disabled style={{ width: 240 }} />
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 패딩, 청록 = 라벨·헬퍼 간격(px). 오른쪽 40은 셰브론 자리입니다.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(1.3)', lineHeight: 1 }}>
                <Select label="직무" placeholder="선택하세요" options={jobs} helper="하나만 선택할 수 있어요" style={{ width: 210 }} />
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 14, height: 6 }} />
                <span className="size-zone pad" style={{ left: 0, top: 20, width: 16, height: 48 }}>16</span>
                <span className="size-zone pad" style={{ right: 0, top: 20, width: 40, height: 48 }} />
                <span className="size-num" style={{ right: 20, top: 9, transform: 'translateX(50%)' }}>40</span>
                <span className="size-zone gap" style={{ left: 0, right: 0, top: 68, height: 6 }} />
                <span className="size-num gapnum" style={{ right: -16, top: 13 }}>6</span>
                <span className="size-num gapnum" style={{ right: -16, top: 67 }}>6</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>기본</b>
              <span className="sub">H input-height 48 · R 10 · body-1</span>
              <span className="sub">P 좌 16 · 우 40 (셰브론 20 · 우측 12 고정)</span>
              <span className="sub">라벨 label-1 500 · 헬퍼 caption-1 · 간격 6</span>
              <span className="legend"><i style={{ background: 'rgba(249,115,22,.5)' }} />패딩&nbsp;&nbsp;<i style={{ background: 'rgba(6,182,212,.55)' }} />간격 · px</span>
            </div>
          </div>
          <div className="size-row">
            <div className="size-item">
              <div className="size-slot" style={{ height: 'auto' }}><Select label="직무" placeholder="선택하세요" options={jobs} style={{ width: 260 }} /></div>
              <Chips primary="기본" items={['H 48 (input-height)', 'P 16 · 40', 'G 6', 'R 10', 'body-1']} />
            </div>
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="옵션 6개 이상" doBody="긴 목록을 접어서 공간을 아낍니다."
          doEx={<Select placeholder="직무 선택 (6개)" options={jobs} style={{ width: 200 }} />}
          dontTitle="옵션 2~3개" dontBody="다 보여줄 수 있으면 Radio나 Segmented control이 빠릅니다."
          dontEx={<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Radio name="s1" label="카드" defaultChecked /><Radio name="s1" label="계좌" /></div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['options', '{ value, label, disabled? }[]', '—', '옵션 목록'],
          ['placeholder', 'string', '—', '미선택 상태 문구'],
          ['label / helper / error', 'string', '—', 'Text field와 동일한 폼 규칙'],
          ['disabled', 'boolean', 'false', '비활성'],
        ]} />
      </Section>
    </Page>
  );
}
