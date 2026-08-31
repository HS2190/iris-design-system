/** 제작기 목록 — 랜딩·사이드바·이어읽기가 모두 이 배열 하나를 참조한다. */
export interface Post {
  slug: string;
  title: string;
  /** 랜딩 카드·인덱스에 쓰는 한 줄 요약 */
  desc: string;
  date: string;
  read: string;
}

export const posts: Post[] = [
  {
    slug: 'two-layer-tokens',
    title: '토큰을 2층으로 나눈 이유',
    desc: '다크 모드를 붙이려다 색 하나를 컴포넌트가 직접 부르면 안 된다는 걸 알았습니다.',
    date: '2026.08',
    read: '6분',
  },
  {
    slug: 'phosphor-icons',
    title: '아이콘 30종을 직접 그렸다가 갈아엎었다',
    desc: '탭 활성 상태를 만들려는데 채운 아이콘이 없었습니다. 이름은 그대로 두고 속만 바꿨습니다.',
    date: '2026.08',
    read: '5분',
  },
  {
    slug: 'platform-tokens',
    title: '컴포넌트가 플랫폼을 모르게',
    desc: 'iOS 44, Android 56, 웹 64. 이 분기를 44개 컴포넌트가 아니라 토큰 9개가 흡수합니다.',
    date: '2026.08',
    read: '5분',
  },
];

export const postIndex = (slug: string) => posts.findIndex(p => p.slug === slug);
