import { useEffect, useRef } from 'react';
import { RAYS, IMAGE } from '../lib/rays';

/**
 * 페이지 전체를 덮는 보라 빛 입자 필드.
 *
 * 입자마다 좌표를 두 벌 갖는다.
 *   focused  — hero-prism.jpg에서 실측한 광선 위 (lib/rays.ts)
 *   dispersed — 화면 전체로 흩어진 위치
 * 스크롤 진행도로 둘을 보간한다. 위에서는 프리즘을 통과한 빛이 광선을 이루고,
 * 내려갈수록 화면 전체로 흩어진다 — "One core. Infinite expressions."를 움직임으로.
 *
 * 알갱이가 아니라 빛으로 읽히도록 코어 + 후광 두 장을 겹쳐 그리고,
 * 캔버스에 약한 blur를 걸어 경계를 지운다(landing.css).
 */

const COUNT = 1100;
const MAX_DPR = 2;
const SPRITE = 32;

/** 광선 고유색을 보라로 당긴다 — 파랑·분홍 광선의 입자도 같은 계열로 */
const VIOLET: [number, number, number] = [167, 139, 250];
const violetize = ([r, g, b]: [number, number, number], k = 0.62): [number, number, number] => [
  Math.round(r + (VIOLET[0] - r) * k),
  Math.round(g + (VIOLET[1] - g) * k),
  Math.round(b + (VIOLET[2] - b) * k),
];

function bake([r, g, b]: [number, number, number], soft: boolean): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = SPRITE;
  const x = c.getContext('2d')!;
  const h = SPRITE / 2;
  const g2 = x.createRadialGradient(h, h, 0, h, h, h);
  if (soft) {
    g2.addColorStop(0, `rgba(${r},${g},${b},.30)`);
    g2.addColorStop(0.45, `rgba(${r},${g},${b},.12)`);
    g2.addColorStop(1, `rgba(${r},${g},${b},0)`);
  } else {
    g2.addColorStop(0, 'rgba(255,255,255,.68)');
    g2.addColorStop(0.3, `rgba(${r},${g},${b},.6)`);
    g2.addColorStop(1, `rgba(${r},${g},${b},0)`);
  }
  x.fillStyle = g2;
  x.fillRect(0, 0, SPRITE, SPRITE);
  return c;
}

export default function LightField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cores: HTMLCanvasElement[] = [];
    const glows: HTMLCanvasElement[] = [];
    RAYS.forEach(r => {
      const v = violetize(r.rgb);
      cores.push(bake(v, false));
      glows.push(bake(v, true));
    });

    const total = RAYS.reduce((a, r) => a + r.weight, 0);
    const ps: { ri: number; fx: number; fy: number; dx: number; dy: number; size: number; phase: number }[] = [];
    RAYS.forEach((ray, ri) => {
      const n = Math.round((ray.weight / total) * COUNT);
      for (let i = 0; i < n; i++) {
        const t = Math.random();
        const j = (Math.random() - 0.5) * 0.014;
        ps.push({
          ri,
          fx: ray.from[0] + (ray.to[0] - ray.from[0]) * t + j,
          fy: ray.from[1] + (ray.to[1] - ray.from[1]) * t + j,
          dx: Math.random(), dy: Math.random(),
          size: 0.55 + Math.random() * 1.5,
          phase: Math.random() * 6.283,
        });
      }
    });

    let w = 0, h = 0, ox = 0, oy = 0, dw = 0, dh = 0;
    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 히어로 이미지와 같은 cover 매핑 — 상단에서 입자가 실제 광선에 얹히도록
      const scale = Math.max(w / IMAGE.w, h / IMAGE.h);
      dw = IMAGE.w * scale; dh = IMAGE.h * scale;
      ox = (w - dw) / 2; oy = (h - dh) / 2;
    };
    measure();
    window.addEventListener('resize', measure);

    let progress = 0, target = 0, raf = 0, running = true;
    // 문서 전체를 구간으로 쓴다 — 하단까지 계속 번져야 하므로.
    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    readScroll();
    window.addEventListener('scroll', readScroll, { passive: true });

    const frame = (now: number) => {
      // 관성 — 스크롤을 멈춰도 잠시 더 흘러야 빛처럼 읽힌다
      progress += (target - progress) * (reduce ? 1 : 0.085);
      // 지수 0.45 곡선: 초반에 가파르게 올라 스크롤 첫 순간부터 눈에 띄고,
      // 그 뒤로도 계속 완만히 자라 문서 하단에서야 1에 닿는다.
      // (선형이면 초반이 안 보이고, 앞서 쓴 ease-out은 한 화면 만에 끝나버린다)
      const t = Math.max(0, Math.min(1, progress));
      const mix = Math.pow(t, 0.45);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const s of ps) {
        const fx = ox + s.fx * dw, fy = oy + s.fy * dh;
        const x = fx + (s.dx * w - fx) * mix;
        const y = fy + (s.dy * h - fy) * mix;

        const tw = reduce ? 1 : 0.55 + 0.45 * Math.sin(s.phase + now / 900);
        // 히어로 구간에서는 옅게 깔려 있다가 번지면서 살아난다.
        // 그래야 광선을 타고 흐르는 파티클(PrismSparks)이 위에서 주인공이 된다.
        const emerge = 0.25 + 0.75 * Math.min(1, mix * 2.2);
        const alpha = (0.92 - mix * 0.34) * tw * emerge;
        if (alpha <= 0.02) continue;

        const d = s.size * (5.4 - mix * 1.2);
        const g = d * 3.6;
        ctx.globalAlpha = alpha * 0.85;
        ctx.drawImage(glows[s.ri], x - g / 2, y - g / 2, g, g);
        ctx.globalAlpha = alpha;
        ctx.drawImage(cores[s.ri], x - d / 2, y - d / 2, d, d);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (running) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const vis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running) { running = true; raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', vis);

    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', readScroll);
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);

  return <canvas className="lf-canvas" ref={ref} aria-hidden />;
}
