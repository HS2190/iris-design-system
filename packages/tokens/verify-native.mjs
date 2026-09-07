// 네이티브 산출물 검증 — 생성된 값을 소스 JSON과 하나씩 대조한다.
//
// 왜 필요한가: 네이티브는 눈으로 확인할 수단이 없다(시뮬레이터·에뮬레이터가 없어도
// 돌아야 한다). 그래서 "생성됐다"가 아니라 "소스와 같은 값인가"를 기계로 확인한다.
// 특히 Android 색은 알파가 앞에 오는(#AARRGGBB) 다른 표기라, 여기가 틀려도
// 파일은 멀쩡해 보인다. 이 스크립트가 그걸 잡는 유일한 장치다.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = dirname(fileURLToPath(import.meta.url));
const read = f => JSON.parse(readFileSync(join(R, 'src', f), 'utf8'));
const atomic = read('atomic.json'), semantic = read('semantic.json'), scales = read('scales.json'),
      platform = read('platform.json'), typography = read('typography.json'), elevation = read('elevation.json');
const nat = p => readFileSync(join(R, 'dist', 'native', p), 'utf8');

let checked = 0, failed = [];
const eq = (label, got, want) => { checked++; if (String(got) !== String(want)) failed.push(`${label}: 생성 ${got} ≠ 소스 ${want}`); };
const has = (label, cond) => { checked++; if (!cond) failed.push(label); };

const parts = n => n.split(/[/-]/).filter(Boolean);
const camel = n => parts(n).map((p, i) => i === 0 ? p[0].toLowerCase() + p.slice(1) : p[0].toUpperCase() + p.slice(1)).join('');
const snake = n => parts(n).join('_').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
const pascal = n => parts(n).map(p => p[0].toUpperCase() + p.slice(1)).join('');

/* ── 1. Android 색: #RRGGBBAA → #AARRGGBB 변환이 맞는가 ── */
const parseColors = xml => Object.fromEntries([...xml.matchAll(/<color name="([^"]+)">([^<]+)<\/color>/g)].map(m => [m[1], m[2]]));
const light = parseColors(nat('android/values/colors.xml'));
const dark = parseColors(nat('android/values-night/colors.xml'));

const expectAndroid = hex => {                       // 소스 hex를 Android 표기로 직접 다시 계산해 비교
  const x = hex.replace('#', ''), v = i => parseInt(x.slice(i, i + 2), 16);
  const a = x.length === 8 ? v(6) : 255;
  const h2 = n => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${h2(a)}${h2(v(0))}${h2(v(2))}${h2(v(4))}`;
};
for (const [n, hex] of Object.entries(atomic)) eq(`android atomic ${n}`, light[`iris_atomic_${snake(n)}`], expectAndroid(hex));
for (const [n, v] of Object.entries(semantic)) {
  eq(`android semantic(light) ${n}`, light[`iris_semantic_${snake(n)}`], expectAndroid(atomic[v.light]));
  eq(`android semantic(dark) ${n}`, dark[`iris_semantic_${snake(n)}`], expectAndroid(atomic[v.dark]));
}
// 다크에 atomic이 새어 들어가지 않았는가 (테마 무관 값은 재정의하지 않는 게 규칙)
has('android values-night에 atomic이 들어감', !Object.keys(dark).some(k => k.startsWith('iris_atomic_')));

/* ── 2. Android 치수: 플랫폼 토큰이 android 값을 쓰는가 (web/ios가 새면 안 된다) ── */
const dimens = Object.fromEntries([...nat('android/values/dimens.xml').matchAll(/<dimen name="([^"]+)">([\d.]+)(dp|sp)<\/dimen>/g)].map(m => [m[1], m[2]]));
for (const [n, v] of Object.entries(platform)) eq(`android platform ${n}`, dimens[`iris_${snake(n)}`], v.android);
for (const [k, v] of Object.entries(scales.space)) eq(`android space ${k}`, dimens[`iris_space_${snake(k)}`], v);
for (const [k, v] of Object.entries(scales.radius)) eq(`android radius ${k}`, dimens[`iris_radius_${snake(k)}`], v);
for (const t of typography) {
  eq(`android font-size ${t.n}`, dimens[`iris_font_size_${snake(t.n)}`], t.s);
  eq(`android line-height ${t.n}`, dimens[`iris_line_height_${snake(t.n)}`], t.lh);
}

/* ── 3. Android 실수값: 자간은 em 그대로 ── */
const floats = Object.fromEntries([...nat('android/values/floats.xml').matchAll(/<item name="([^"]+)"[^>]*>([\d.-]+)<\/item>/g)].map(m => [m[1], m[2]]));
for (const t of typography) eq(`android letter-spacing ${t.n}`, floats[`iris_letter_spacing_${snake(t.n)}`], (t.ls / 100).toFixed(4));
for (const [k, v] of Object.entries(scales.opacity)) eq(`android opacity ${k}`, floats[`iris_opacity_${k}`], v);

/* ── 4. Swift: 플랫폼 토큰이 ios 값인가 ── */
const swift = nat('ios/IrisTokens.swift');
const swiftLet = name => { const m = swift.match(new RegExp(`static let ${name}: CGFloat = ([\\d.]+)`)); return m && m[1]; };
for (const [n, v] of Object.entries(platform)) eq(`swift platform ${n}`, swiftLet(camel(n)), v.ios);
for (const [k, v] of Object.entries(scales.radius)) eq(`swift radius ${k}`, swiftLet(/^\d/.test(k) ? 'r' + k : camel(k)), v);

/* ── 5. Swift 타이포: tracking(pt) = size × em ── */
for (const t of typography) {
  const m = swift.match(new RegExp(`static let ${camel(t.n)} = TextStyle\\(size: ([\\d.]+), weight: (\\.\\w+), lineHeight: ([\\d.]+), lineSpacing: ([\\d.]+), tracking: (-?[\\d.]+)\\)`));
  if (!m) { checked++; failed.push(`swift typography ${t.n} 없음`); continue; }
  eq(`swift ${t.n} size`, m[1], t.s);
  eq(`swift ${t.n} lineSpacing`, m[4], t.lh - t.s);
  eq(`swift ${t.n} tracking`, m[5], (t.s * t.ls / 100).toFixed(3));
}

/* ── 6. Swift 원자색: 0-1 정규화가 맞는가 ── */
for (const [n, hex] of Object.entries(atomic)) {
  const m = swift.match(new RegExp(`static let ${camel(n)} = SwiftUI\\.Color\\(\\.sRGB, red: ([\\d.]+), green: ([\\d.]+), blue: ([\\d.]+), opacity: ([\\d.]+)\\)`));
  if (!m) { checked++; failed.push(`swift atomic ${n} 없음`); continue; }
  const x = hex.replace('#', ''), v = i => parseInt(x.slice(i, i + 2), 16);
  eq(`swift atomic ${n} r`, m[1], (v(0) / 255).toFixed(4));
  eq(`swift atomic ${n} a`, m[4], ((x.length === 8 ? v(6) / 255 : 1)).toFixed(4));
}

/* ── 7. Swift 그림자: radius = blur ÷ 2 ── */
for (const [n, layers] of Object.entries(elevation)) {
  const m = swift.match(new RegExp(`static let ${camel(n)}: \\[Shadow\\] = \\[(.+)\\]`));
  if (!m) { checked++; failed.push(`swift elevation ${n} 없음`); continue; }
  const radii = [...m[1].matchAll(/radius: ([\d.]+)/g)].map(r => r[1]);
  eq(`swift elevation ${n} 레이어 수`, radii.length, layers.length);
  layers.forEach((l, i) => eq(`swift elevation ${n}[${i}] radius`, radii[i], l.b / 2));
}

/* ── 8. Asset Catalog: 의미 색마다 라이트+다크 두 벌이 있는가 ── */
for (const [n, v] of Object.entries(semantic)) {
  const name = 'Iris' + pascal(n);
  let cs;
  try { cs = JSON.parse(nat(`ios/IrisColors.xcassets/${name}.colorset/Contents.json`)); }
  catch { checked++; failed.push(`colorset ${name} 없음`); continue; }
  eq(`colorset ${name} 항목 수`, cs.colors.length, 2);
  has(`colorset ${name} 다크 appearance 누락`, cs.colors[1]?.appearances?.[0]?.value === 'dark');
  const want = i => { const x = atomic[i].replace('#', ''), g = j => parseInt(x.slice(j, j + 2), 16).toString(16).padStart(2, '0').toUpperCase(); return `0x${g(0)}`; };
  eq(`colorset ${name} light red`, cs.colors[0].color.components.red, want(v.light));
  eq(`colorset ${name} dark red`, cs.colors[1].color.components.red, want(v.dark));
}

/* ── 9. XML 형식 ── */
for (const p of ['android/values/colors.xml', 'android/values-night/colors.xml', 'android/values/dimens.xml', 'android/values/floats.xml', 'android/values/styles.xml']) {
  const s = nat(p);
  has(`${p} 선언 누락`, s.startsWith('<?xml'));
  has(`${p} resources 미종료`, s.trimEnd().endsWith('</resources>'));
  has(`${p} 대문자 리소스명`, !/name="[^"]*[A-Z]/.test(s.replace(/<style[\s\S]*?<\/style>/g, '')));  // style 이름만 PascalCase 허용
}

/* ── 결과 ── */
if (failed.length) {
  console.error(`✗ 네이티브 검증 실패 — ${failed.length}건 / 총 ${checked}건`);
  failed.slice(0, 20).forEach(m => console.error('  ·', m));
  if (failed.length > 20) console.error(`  … 외 ${failed.length - 20}건`);
  process.exit(1);
}
console.log(`✓ 네이티브 검증 통과 — ${checked}건 대조 (소스 JSON ↔ 생성물)`);
