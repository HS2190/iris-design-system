import { useState } from 'react';
import { Avatar, AvatarGroup, ListCell, Icon } from '@iris/react';
import { Page, Section, Canvas, Spec, Chips, Seg, Playground, DoDont, Props } from '../components/Doc';

const IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#EC4899"/></linearGradient></defs><rect width="112" height="112" fill="url(#g)"/></svg>');

export default function AvatarPage() {
  const [sz, setSz] = useState<'s' | 'm' | 'l' | 'xl'>('l');
  const [ty, setTy] = useState<'이니셜' | '이미지'>('이니셜');
  return (
    <Page kicker="Components · Contents" title="Avatar" desc="사용자·대상을 나타내는 원형 아이덴티티입니다. 이미지가 없거나 로드에 실패하면 이름 첫 글자 이니셜로 폴백합니다.">
      <Section title="Playground">
        <Playground
          stage={<Avatar size={sz} name="안현서" src={ty === '이미지' ? IMG : undefined} />}
          panel={<>
            <Seg label="size" value={sz} options={['s', 'm', 'l', 'xl'] as const} onChange={setSz} />
            <Seg label="type" value={ty} options={['이니셜', '이미지'] as const} onChange={setTy} />
          </>}
          code={`<Avatar size="${sz}" name="안현서"${ty === '이미지' ? ' src={imageUrl}' : ''} />`} />
      </Section>
      <Section title="Variants" desc="단일 아바타와 그룹. 그룹은 -8 겹침 + 2px 배경 링, max 초과분은 +N으로 접습니다.">
        <Canvas style={{ gap: 40 }}>
          <Spec label="이니셜"><Avatar size="l" name="안현서" /></Spec>
          <Spec label="이미지"><Avatar size="l" name="안현서" src={IMG} /></Spec>
          <Spec label="그룹 · max 3 → +2">
            <AvatarGroup max={3} size="m">
              <Avatar size="m" name="안" src={IMG} /><Avatar size="m" name="김" /><Avatar size="m" name="이" /><Avatar size="m" name="박" /><Avatar size="m" name="최" />
            </AvatarGroup>
          </Spec>
        </Canvas>
      </Section>
      <Section title="States" desc="이미지 로드 실패 시 자동으로 이니셜 폴백 — 깨진 이미지를 보여주지 않습니다.">
        <Canvas style={{ gap: 40 }}>
          <Spec label="이미지 정상"><Avatar size="l" name="안현서" src={IMG} /></Spec>
          <Spec label="로드 실패 → 이니셜"><Avatar size="l" name="안현서" src="/broken.png" /></Spec>
          <Spec label="이름 없음"><Avatar size="l" /></Spec>
        </Canvas>
      </Section>
      <Section title="Usage" desc="리스트 셀 리딩 — 사람이 주어인 목록의 기본 조합.">
        <Canvas col style={{ gap: 4 }}>
          <ListCell title="안현서" description="프로덕트 디자이너" leading={<Avatar size="l" name="안" src={IMG} />} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 320 }} />
          <ListCell title="김하나" description="프론트엔드 개발자" leading={<Avatar size="l" name="김" />} trailing={<Icon name="chevron-right" size={20} />} style={{ width: 320 }} />
        </Canvas>
      </Section>
      <Section title="Size" desc="주황 = 그룹 겹침 -8(px), 링 2는 배경색. 크기 4단계 고정.">
        <Canvas col style={{ gap: 8 }}>
          <div className="size-hero-wrap">
            <div className="size-hero">
              <div className="stage" style={{ transform: 'scale(2)', lineHeight: 1 }}>
                <AvatarGroup max={3} size="m">
                  <Avatar size="m" name="안" src={IMG} /><Avatar size="m" name="김" /><Avatar size="m" name="이" />
                </AvatarGroup>
                {/* m 32 · step 24 → 겹침 8: x24~32, x48~56 */}
                <span className="size-zone gap" style={{ left: 24, top: 0, width: 8, height: 32 }} />
                <span className="size-zone gap" style={{ left: 48, top: 0, width: 8, height: 32 }} />
                <span className="size-num gapnum" style={{ left: 28, top: -12, transform: 'translateX(-50%)' }}>8</span>
                <span className="size-num gapnum" style={{ left: 52, top: -12, transform: 'translateX(-50%)' }}>8</span>
              </div>
            </div>
            <div className="size-hero-caption">
              <b>그룹 · M</b>
              <span className="sub">겹침 -8 · 링 2 (background/normal)</span>
              <span className="sub">XL 56 · L 40 · M 32 · S 24 — R full 고정</span>
              <span className="legend"><i style={{ background: 'rgba(6,182,212,.55)' }} />겹침 · px</span>
            </div>
          </div>
          <div className="size-row">
            {([['xl', '56', '이니셜 20'], ['l', '40', '이니셜 16'], ['m', '32 · 기본', '이니셜 13'], ['s', '24', '이니셜 11']] as const).map(([k, h, f]) => (
              <div className="size-item" key={k}>
                <Chips primary={k.toUpperCase()} items={[h, f, 'R full']} />
              </div>
            ))}
          </div>
        </Canvas>
      </Section>
      <Section title="How to use">
        <DoDont doTitle="많은 인원은 그룹 + N" doBody="같은 참여자 5명 — 3명까지 보여주고 나머지는 +N으로 접습니다."
          doEx={<AvatarGroup max={3} size="m"><Avatar size="m" name="안" src={IMG} /><Avatar size="m" name="김" /><Avatar size="m" name="이" /><Avatar size="m" name="박" /><Avatar size="m" name="최" /></AvatarGroup>}
          dontTitle="아바타 전부 나열" dontBody="같은 5명을 다 펼치면 공간을 잡아먹고 수를 셀 수도 없습니다."
          dontEx={<div style={{ display: 'flex', gap: 4 }}><Avatar size="m" name="안" src={IMG} /><Avatar size="m" name="김" /><Avatar size="m" name="이" /><Avatar size="m" name="박" /><Avatar size="m" name="최" /></div>} />
      </Section>
      <Section title="Props">
        <Props rows={[
          ['size', "'xl' | 'l' | 'm' | 's'", "'m'", '56 / 40 / 32 / 24'],
          ['src', 'string', '—', '이미지 URL — 실패 시 이니셜 폴백'],
          ['name', 'string', '—', '이니셜 소스 + 접근성 라벨'],
          ['(Group) max', 'number', '4', '표시 한도, 초과분 +N'],
          ['(Group) size', "AvatarProps['size']", "'m'", '+N 뱃지 크기'],
        ]} />
      </Section>
    </Page>
  );
}
