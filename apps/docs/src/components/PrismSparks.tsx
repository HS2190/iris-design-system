import { useEffect, useRef } from 'react';
import { IMAGE, PRISM, RAYS, type Ray } from '../lib/rays';

/**
 * 히어로 프리즘 위에 얹는 빛 입자.
 * 배경 이미지가 background-size: cover라, 실측 좌표를 그 cover 변환에 맞춰
 * 캔버스 좌표로 옮겨야 입자가 실제 광선 위에 정확히 얹힌다.
 */

interface Spark {
  ray: Ray;
  /** from → to 진행도 0~1 */
  t: number;
  speed: number;
  size: number;
  /** 광선 수직 방향 흔들림(px) */
  offset: number;
  life: number;
}

const MAX_DPR = 2;
const SPRITE = 32;   // 스프라이트 한 변(px)

/**
 * 발광 원판을 한 번만 구워 둔다 — 매 프레임 그라디언트 생성 방지.
 * core는 또렷한 알갱이, glow는 크게 번지는 후광. 두 장을 겹쳐 그리면
 * 후처리 블룸 없이도 빛이 번진 느낌이 난다.
 */
function bakeSprite([r, g, b]: [number, number, number], soft: boolean): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = SPRITE;
  const x = c.getContext('2d')!;
  const h = SPRITE / 2;
  const grad = x.createRadialGradient(h, h, 0, h, h, h);
  if (soft) {
    // 후광 — 중심도 반투명하게, 가장자리까지 길게 끌어 번지게
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.34)`);
    grad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, 0.14)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  } else {
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
    grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.6)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  }
  x.fillStyle = grad;
  x.fillRect(0, 0, SPRITE, SPRITE);
  return c;
}

/** 광선 고유색을 보라 쪽으로 당긴다 — 파랑·분홍 광선의 입자도 같은 계열로 보이게 */
const VIOLET: [number, number, number] = [167, 139, 250];   // violet/60
function violetize([r, g, b]: [number, number, number], k = 0.62): [number, number, number] {
  return [
    Math.round(r + (VIOLET[0] - r) * k),
    Math.round(g + (VIOLET[1] - g) * k),
    Math.round(b + (VIOLET[2] - b) * k),
  ];
}
const PER_WEIGHT = 20;   // weight 1.0당 동시 입자 수

function makeSpark(ray: Ray): Spark {
  return {
    ray,
    t: 0,
    speed: (0.15 + Math.random() * 0.25) * (ray.inbound ? 1.3 : 1),
    size: 0.7 + Math.random() * 1.5,
    offset: (Math.random() - 0.5) * 3.0,
    life: Math.random(),
  };
}

export default function PrismSparks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;
    if (!ctx || !host) return;

    const cores = new Map<Ray, HTMLCanvasElement>();
    const glows = new Map<Ray, HTMLCanvasElement>();
    for (const ray of RAYS) {
      const v = violetize(ray.rgb);
      cores.set(ray, bakeSprite(v, false));
      glows.set(ray, bakeSprite(v, true));
    }

    const sparks: Spark[] = [];
    for (const ray of RAYS) {
      const n = Math.round(PER_WEIGHT * ray.weight);
      for (let i = 0; i < n; i++) {
        const s = makeSpark(ray);
        s.t = i / n;   // 처음부터 광선 위에 고르게 흩어놓기
        sparks.push(s);
      }
    }

    // cover 매핑 — 이미지 정규화 좌표 → 캔버스 픽셀
    let dpr = 1, cw = 0, ch = 0, ox = 0, oy = 0, dw = 0, dh = 0;
    const measure = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      cw = r.width; ch = r.height;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.max(cw / IMAGE.w, ch / IMAGE.h);
      dw = IMAGE.w * scale; dh = IMAGE.h * scale;
      ox = (cw - dw) / 2; oy = (ch - dh) / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);

    let raf = 0;
    let last = performance.now();
    let running = true;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';

      const px = (nx: number) => ox + nx * dw;
      const py = (ny: number) => oy + ny * dh;
      const cx = px(PRISM.x), cy = py(PRISM.y);

      // ③ 코어 맥동 — 프리즘이 4초 주기로 아주 약하게 숨 쉰다
      const pulse = 0.5 + 0.5 * Math.sin(now / 2000);
      const coreR = dw * (0.032 + 0.009 * pulse);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      core.addColorStop(0, `rgba(228, 216, 255, ${0.15 + 0.10 * pulse})`);
      core.addColorStop(0.45, `rgba(150, 120, 220, ${0.055 + 0.035 * pulse})`);
      core.addColorStop(1, 'rgba(120, 100, 200, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // ①② 각 광선의 from → to 를 따라 흐르는 입자
      for (const sp of sparks) {
        const { ray } = sp;
        const ax = px(ray.from[0]), ay = py(ray.from[1]);
        const bx = px(ray.to[0]), by = py(ray.to[1]);
        const vx = bx - ax, vy = by - ay;
        const len = Math.hypot(vx, vy) || 1;
        const nx = -vy / len, ny = vx / len;   // 광선 수직 방향

        sp.t += sp.speed * dt;
        if (sp.t >= 1) { Object.assign(sp, makeSpark(ray)); continue; }

        const x = ax + vx * sp.t + nx * sp.offset;
        const y = ay + vy * sp.t + ny * sp.offset;

        // 양 끝에서 사라진다 — 입사광은 프리즘에 닿으며 흡수된다
        const edge = Math.min(sp.t, 1 - sp.t) * 4.5;
        const twinkle = 0.55 + 0.45 * Math.sin(sp.life * 6.3 + now / 360);
        const alpha = Math.min(1, edge) * twinkle;
        if (alpha <= 0.015) continue;

        const d = sp.size * 5.4;
        // 후광을 크게 먼저, 그 위에 또렷한 코어를 작게
        ctx.globalAlpha = alpha * 0.85;
        const g = d * 3.6;
        ctx.drawImage(glows.get(ray)!, x - g / 2, y - g / 2, g, g);
        ctx.globalAlpha = alpha;
        ctx.drawImage(cores.get(ray)!, x - d / 2, y - d / 2, d, d);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (running) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // 히어로가 화면 밖이면 완전히 정지 — 본문 읽는 동안 비용 0
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true; last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!e.isIntersecting && running) {
        running = false; cancelAnimationFrame(raf);
      }
    });
    io.observe(host);

    return () => { running = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas className="lp-sparks" ref={ref} aria-hidden />;
}
