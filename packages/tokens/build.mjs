// @hs/tokens build — Figma export(src/*.json) → dist/hs.css · tokens.json · tokens.js
// 규칙: atomic은 --hs-atomic-*, semantic은 --hs-semantic-*(Light가 :root, Dark는 [data-theme=dark] + 시스템 다크 가드)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const R = dirname(fileURLToPath(import.meta.url));
const read = f => JSON.parse(readFileSync(join(R, 'src', f), 'utf8'));
const atomic = read('atomic.json'), semantic = read('semantic.json'), scales = read('scales.json'),
      platform = read('platform.json'), typography = read('typography.json'), elevation = read('elevation.json');

const kebab = n => n.replace(/\//g, '-');
const hexToRgba = h => { const x = h.slice(1); const v = i => parseInt(x.slice(i, i + 2), 16);
  return x.length === 8 ? `rgba(${v(0)}, ${v(2)}, ${v(4)}, ${(v(6) / 255).toFixed(3).replace(/0+$/,'').replace(/\.$/,'')})` : h; };
const resolve = name => { const h = atomic[name]; if (!h) throw new Error('unknown atomic: ' + name); return hexToRgba(h); };

let css = `/* @hs/tokens — generated ${new Date().toISOString().slice(0,10)} from Figma k6EMzf6Q9nM7J1gkAt4ZYo. 수정 금지: Figma → build로만 변경 */\n`;
// ── atomic + semantic(light) + scales on :root
css += ':root {\n  color-scheme: light dark;\n';
css += `  --hs-font-family: "Noto Sans KR", "Apple SD Gothic Neo", "Roboto", sans-serif;\n`;
for (const [n, h] of Object.entries(atomic)) css += `  --hs-atomic-${kebab(n)}: ${hexToRgba(h)};\n`;
for (const [n, v] of Object.entries(semantic)) css += `  --hs-semantic-${kebab(n)}: var(--hs-atomic-${kebab(v.light)});\n`;
for (const [n, v] of Object.entries(scales.space)) css += `  --hs-space-${n}: ${v}px;\n`;
for (const [n, v] of Object.entries(scales.radius)) css += `  --hs-radius-${n}: ${v}px;\n`;
for (const [n, v] of Object.entries(scales.opacity)) css += `  --hs-opacity-${n}: ${v};\n`;
for (const [n, v] of Object.entries(scales.stroke)) css += `  --hs-stroke-${n}: ${v}px;\n`;
for (const t of typography) { css += `  --hs-font-size-${t.n}: ${t.s}px;\n  --hs-line-height-${t.n}: ${t.lh}px;\n  --hs-letter-spacing-${t.n}: ${t.ls / 100}em;\n  --hs-font-weight-${t.n}: ${t.w};\n`; }
for (const [n, layers] of Object.entries(elevation)) css += `  --hs-elevation-${n}: ${layers.map(l => `0 ${l.y}px ${l.b}px ${l.s}px rgba(23, 23, 23, ${l.a})`).join(', ')};\n`;
for (const [n, v] of Object.entries(platform)) css += `  --hs-${n}: ${v.web}px;\n`;
for (const [n, v] of Object.entries(scales.breakpoint)) css += `  --hs-breakpoint-${n}: ${v}px;\n`;
for (const [n, v] of Object.entries(scales.layout)) css += `  --hs-${n}: ${v}px;\n`;
css += '}\n\n';
// ── dark: semantic만 재정의 (atomic·scale은 테마 무관)
const darkBlock = Object.entries(semantic).map(([n, v]) => `  --hs-semantic-${kebab(n)}: var(--hs-atomic-${kebab(v.dark)});`).join('\n');
css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${darkBlock.replace(/^/gm, '  ')}\n  }\n}\n\n`;
css += `[data-theme="dark"] {\n${darkBlock}\n}\n\n`;
// ── 타이포 유틸리티 클래스
for (const t of typography) css += `.hs-${t.n} { font-family: var(--hs-font-family); font-size: var(--hs-font-size-${t.n}); line-height: var(--hs-line-height-${t.n}); letter-spacing: var(--hs-letter-spacing-${t.n}); font-weight: var(--hs-font-weight-${t.n}); }\n`;

mkdirSync(join(R, 'dist'), { recursive: true });
writeFileSync(join(R, 'dist', 'hs.css'), css);
const merged = { atomic, semantic, scales, platform, typography, elevation };
writeFileSync(join(R, 'dist', 'tokens.json'), JSON.stringify(merged, null, 1));
writeFileSync(join(R, 'dist', 'tokens.js'), 'export default ' + JSON.stringify(merged) + ';\n');
const counts = { atomic: Object.keys(atomic).length, semantic: Object.keys(semantic).length, typography: typography.length, elevation: Object.keys(elevation).length };
console.log('built dist/hs.css', css.length, 'bytes ·', JSON.stringify(counts));
