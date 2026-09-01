import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@hs2190.an/iris-react';
import { posts, postIndex } from '../pages/behind/posts';

/** 제작기 글 공용 빌딩블록 — 문서 페이지(Doc.tsx)와 같은 토큰을 쓰되 읽기용 조판. */

export function Article({ slug, children }: { slug: string; children: React.ReactNode }) {
  const i = postIndex(slug);
  const post = posts[i];
  useEffect(() => {
    document.title = `${post.title} · Iris`;
    return () => { document.title = 'Iris Design System'; };
  }, [post.title]);
  return (
    <article className="prose">
      <p className="page-kicker">Behind · {post.date} · {post.read}</p>
      <h1 className="prose-title">{post.title}</h1>
      <p className="prose-lede">{post.desc}</p>
      {children}
      <Foot slug={slug} />
    </article>
  );
}

/** 본문 문단. */
export function P({ children }: { children: React.ReactNode }) {
  return <p className="prose-p">{children}</p>;
}

/** 소제목 — Doc의 h2.section을 그대로 써서 우측 목차가 자동으로 잡는다. */
export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="section">{children}</h2>;
}

/** 실물 데모 — 캡션이 무엇을 보라는 것인지 지시한다. */
export function Fig({ caption, children, plain }:
  { caption: string; children: React.ReactNode; plain?: boolean }) {
  return (
    <figure className="prose-fig">
      <div className={plain ? 'prose-fig-body plain' : 'prose-fig-body'}>{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** 본문 흐름에서 빠지는 곁가지 — 결정의 배경, 지금은 안 하기로 한 것. */
export function Aside({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <aside className="prose-aside">
      <b>{label}</b>
      <div>{children}</div>
    </aside>
  );
}

/** 한 줄로 압축되는 규칙. */
export function Pull({ children }: { children: React.ReactNode }) {
  return <p className="prose-pull">{children}</p>;
}

export function Code({ children }: { children: string }) {
  return <pre className="prose-code">{children}</pre>;
}

/** 이어 읽기 — 목록의 앞뒤 글. */
function Foot({ slug }: { slug: string }) {
  const i = postIndex(slug);
  const prev = posts[i - 1];
  const next = posts[i + 1];
  if (!prev && !next) return null;
  return (
    <nav className="prose-foot" aria-label="다른 제작기">
      {prev ? (
        <Link to={`/behind/${prev.slug}`} className="prose-foot-link prev">
          <span><Icon name="arrow-left" size={14} /> 이전 글</span>
          <b>{prev.title}</b>
        </Link>
      ) : <span />}
      {next && (
        <Link to={`/behind/${next.slug}`} className="prose-foot-link next">
          <span>다음 글 <Icon name="arrow-right" size={14} /></span>
          <b>{next.title}</b>
        </Link>
      )}
    </nav>
  );
}
