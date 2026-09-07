// @hs2190.an/iris-tokens — 네이티브 이미터 (src/*.json → dist/native/**)
//
// 웹 CSS와 같은 소스에서 iOS·Android 산출물을 만든다. 값을 새로 정하는 곳이 아니라
// 포맷만 바꾸는 곳이다 — 플랫폼별로 값이 갈리는 건 platform.json 하나뿐이고,
// 나머지(atomic·semantic·scales·typography·elevation)는 세 플랫폼이 같은 수를 쓴다.
//
// 플랫폼 경계에서 실제로 달라지는 것들(여기서 흡수한다):
//  · 색 표기   웹 #RRGGBBAA ↔ Android #AARRGGBB (알파 위치가 다르다)
//  · 자간      웹 em ↔ iOS tracking(pt = size × em) ↔ Android em
//  · 행간      웹 line-height(px) ↔ iOS lineSpacing(= lh − size) ↔ Android lineHeight(sp)
//  · 그림자    웹 blur ↔ SwiftUI radius(= blur ÷ 2). spread는 SwiftUI에 없어 버린다
//  · 다크모드  웹 미디어쿼리 ↔ iOS Asset Catalog appearance ↔ Android values-night/

import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

/* ── 이름 변환 ── */
const parts = n => n.split(/[/-]/).filter(Boolean);
// blue/50 → blue50 · cool-neutral/50a8 → coolNeutral50a8 · touch-target-min → touchTargetMin
const camel = n => parts(n).map((p, i) => i === 0 ? p[0].toLowerCase() + p.slice(1) : p[0].toUpperCase() + p.slice(1)).join('');
// coolNeutral/50a8 → cool_neutral_50a8 (Android 리소스명은 소문자·언더스코어만 허용)
const snake = n => parts(n).join('_').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
// 숫자로 시작하는 스케일 키는 식별자가 될 수 없다: space "16" → x16 · opacity "5" → o5
const ident = (prefix, k) => /^\d/.test(k) ? prefix + k : camel(k);

/* ── 색 변환 ── */
const rgba = hex => {                       // #RRGGBB(AA) → {r,g,b,a} (0-255, a는 0-1)
  const x = hex.replace('#', '');
  const v = i => parseInt(x.slice(i, i + 2), 16);
  return { r: v(0), g: v(2), b: v(4), a: x.length === 8 ? v(6) / 255 : 1 };
};
const hex2 = n => n.toString(16).padStart(2, '0').toUpperCase();
// Android는 알파가 앞에 온다 — 이 한 줄을 틀리면 색이 통째로 뒤집힌다
const androidHex = hex => { const c = rgba(hex); return `#${hex2(Math.round(c.a * 255))}${hex2(c.r)}${hex2(c.g)}${hex2(c.b)}`; };

const f = n => Number.isInteger(n) ? n.toString() : n.toString();

export function buildNative({ atomic, semantic, scales, platform, typography, elevation }, R, stamp) {
  const out = join(R, 'dist', 'native');
  rmSync(out, { recursive: true, force: true });   // 이름이 바뀐 토큰의 잔재가 남지 않게 매번 새로 만든다
  const write = (p, s) => { const full = join(out, p); mkdirSync(join(full, '..'), { recursive: true }); writeFileSync(full, s); };
  const head = c => `${c} Iris Design System — generated ${stamp} from packages/tokens/src.\n${c} 이 파일은 생성물이다. 값을 바꾸려면 Figma → src/*.json → build를 거친다.\n`;

  /* ══════════ iOS ══════════ */

  // 1) semantic 색 → Asset Catalog. 코드로 라이트/다크를 분기하지 않는 게 iOS의 정공법이다.
  //    (분기를 코드로 쓰면 UIKit 의존이 생기고, 그 가지는 컴파일 검증도 안 된다.)
  const assetName = n => 'Iris' + parts(n).map(p => p[0].toUpperCase() + p.slice(1)).join('');
  write('ios/IrisColors.xcassets/Contents.json', JSON.stringify({ info: { author: 'xcode', version: 1 } }, null, 2) + '\n');
  const colorEntry = (hex, dark) => {
    const c = rgba(atomic[hex]);
    return {
      idiom: 'universal',
      ...(dark ? { appearances: [{ appearance: 'luminosity', value: 'dark' }] } : {}),
      color: { 'color-space': 'srgb', components: { red: `0x${hex2(c.r)}`, green: `0x${hex2(c.g)}`, blue: `0x${hex2(c.b)}`, alpha: c.a.toFixed(3) } },
    };
  };
  for (const [n, v] of Object.entries(semantic)) {
    write(`ios/IrisColors.xcassets/${assetName(n)}.colorset/Contents.json`,
      JSON.stringify({ colors: [colorEntry(v.light, false), colorEntry(v.dark, true)], info: { author: 'xcode', version: 1 } }, null, 2) + '\n');
  }

  // 2) Swift — 수치 토큰 + 카탈로그를 가리키는 색 접근자
  // enum Iris 안에는 중첩 enum Color가 있어 SwiftUI.Color가 가려진다 — 내부에서는 항상 정규화해 쓴다
  const swiftColor = hex => { const c = rgba(hex); return `SwiftUI.Color(.sRGB, red: ${(c.r / 255).toFixed(4)}, green: ${(c.g / 255).toFixed(4)}, blue: ${(c.b / 255).toFixed(4)}, opacity: ${c.a.toFixed(4)})`; };
  const weightName = w => ({ 400: '.regular', 500: '.medium', 600: '.semibold', 700: '.bold' })[w] ?? '.regular';
  let sw = head('//') + `\nimport SwiftUI\n\npublic enum Iris {\n`;
  sw += `  /// 색 에셋이 든 번들. SwiftPM 타깃으로 쓸 때는 앱 시작 시 \`Iris.bundle = .module\`로 바꾼다.\n  public static var bundle: Bundle = .main\n\n`;

  sw += `  /// 원자 색 — 테마와 무관한 팔레트. 화면에는 되도록 \`Iris.Color\`(의미 토큰)를 쓴다.\n  public enum Atomic {\n`;
  for (const [n, h] of Object.entries(atomic)) sw += `    public static let ${camel(n)} = ${swiftColor(h)}\n`;
  sw += `  }\n\n`;

  sw += `  /// 의미 색 — 라이트/다크는 Asset Catalog가 자동으로 고른다.\n  public enum Color {\n`;
  for (const n of Object.keys(semantic)) sw += `    public static var ${camel(n)}: SwiftUI.Color { SwiftUI.Color("${assetName(n)}", bundle: Iris.bundle) }\n`;
  sw += `  }\n\n`;

  const numGroup = (name, obj, prefix, doc, type = 'CGFloat') => {
    let s = `  /// ${doc}\n  public enum ${name} {\n`;
    for (const [k, v] of Object.entries(obj)) s += `    public static let ${ident(prefix, k)}: ${type} = ${f(v)}\n`;
    return s + `  }\n\n`;
  };
  sw += numGroup('Space', scales.space, 'x', '간격 스케일 (pt)');
  sw += numGroup('Radius', scales.radius, 'r', '모서리 반경 (pt)');
  sw += numGroup('Opacity', scales.opacity, 'o', '불투명도', 'Double');
  sw += numGroup('Stroke', scales.stroke, 's', '선 두께 (pt)');
  sw += numGroup('Layout', scales.layout, 'l', '레이아웃 수치 (pt)');
  sw += `  /// 플랫폼마다 값이 갈리는 토큰 — 여기 값은 iOS 것이다.\n  public enum Platform {\n`;
  for (const [n, v] of Object.entries(platform)) sw += `    public static let ${camel(n)}: CGFloat = ${f(v.ios)}\n`;
  sw += `  }\n\n`;

  sw += `  /// 텍스트 스타일. SwiftUI에는 line-height가 없어 \`lineSpacing\`(= 행간 − 글자크기)으로 환산해 둔다.\n`;
  sw += `  public struct TextStyle {\n    public let size: CGFloat\n    public let weight: Font.Weight\n    public let lineHeight: CGFloat\n    public let lineSpacing: CGFloat\n    public let tracking: CGFloat\n    public var font: Font { .system(size: size, weight: weight) }\n  }\n\n`;
  sw += `  public enum Typography {\n`;
  for (const t of typography) {
    const tracking = (t.s * t.ls / 100).toFixed(3);   // em → pt
    sw += `    public static let ${camel(t.n)} = TextStyle(size: ${t.s}, weight: ${weightName(t.w)}, lineHeight: ${t.lh}, lineSpacing: ${t.lh - t.s}, tracking: ${tracking})\n`;
  }
  sw += `  }\n\n`;

  sw += `  /// 그림자. SwiftUI의 radius는 CSS blur의 절반이고, spread에 해당하는 개념이 없어 버린다.\n`;
  sw += `  public struct Shadow {\n    public let color: SwiftUI.Color\n    public let radius: CGFloat\n    public let x: CGFloat\n    public let y: CGFloat\n  }\n\n`;
  sw += `  public enum Elevation {\n`;
  for (const [n, layers] of Object.entries(elevation)) {
    const ls = layers.map(l => `Shadow(color: SwiftUI.Color(.sRGB, red: 0.0902, green: 0.0902, blue: 0.0902, opacity: ${l.a}), radius: ${l.b / 2}, x: 0, y: ${l.y})`).join(', ');
    sw += `    public static let ${camel(n)}: [Shadow] = [${ls}]\n`;
  }
  sw += `  }\n}\n`;
  write('ios/IrisTokens.swift', sw);

  /* ══════════ Android ══════════ */

  const xml = body => `<?xml version="1.0" encoding="utf-8"?>\n<!--\n${head('  ').replace(/^/gm, '')}-->\n<resources>\n${body}</resources>\n`;

  let colorsLight = '';
  for (const [n, h] of Object.entries(atomic)) colorsLight += `  <color name="iris_atomic_${snake(n)}">${androidHex(h)}</color>\n`;
  colorsLight += '\n';
  for (const [n, v] of Object.entries(semantic)) colorsLight += `  <color name="iris_semantic_${snake(n)}">${androidHex(atomic[v.light])}</color>\n`;
  write('android/values/colors.xml', xml(colorsLight));

  // 다크는 semantic만 덮어쓴다 — atomic은 테마 무관이라 재정의하지 않는다(웹 CSS와 같은 규칙).
  let colorsDark = '';
  for (const [n, v] of Object.entries(semantic)) colorsDark += `  <color name="iris_semantic_${snake(n)}">${androidHex(atomic[v.dark])}</color>\n`;
  write('android/values-night/colors.xml', xml(colorsDark));

  let dim = '';
  const dimGroup = (obj, prefix, unit) => { let s = ''; for (const [k, v] of Object.entries(obj)) s += `  <dimen name="iris_${prefix}_${snake(k)}">${f(v)}${unit}</dimen>\n`; return s + '\n'; };
  dim += dimGroup(scales.space, 'space', 'dp');
  dim += dimGroup(scales.radius, 'radius', 'dp');
  dim += dimGroup(scales.stroke, 'stroke', 'dp');
  dim += dimGroup(scales.layout, 'layout', 'dp');
  dim += dimGroup(scales.breakpoint, 'breakpoint', 'dp');
  for (const [n, v] of Object.entries(platform)) dim += `  <dimen name="iris_${snake(n)}">${f(v.android)}dp</dimen>\n`;   // Android 값
  dim += '\n';
  for (const t of typography) dim += `  <dimen name="iris_font_size_${snake(t.n)}">${t.s}sp</dimen>\n  <dimen name="iris_line_height_${snake(t.n)}">${t.lh}sp</dimen>\n`;
  dim += '\n';
  // 다층 그림자를 표현할 수단이 없다 — 가장 바깥 레이어의 y를 대표 elevation으로 삼는다(손실 있음).
  for (const [n, layers] of Object.entries(elevation)) dim += `  <dimen name="iris_elevation_${snake(n)}">${Math.max(...layers.map(l => l.y))}dp</dimen>\n`;
  write('android/values/dimens.xml', xml(dim));

  let flo = '';
  for (const [k, v] of Object.entries(scales.opacity)) flo += `  <item name="iris_opacity_${k}" type="dimen" format="float">${v}</item>\n`;
  for (const t of typography) flo += `  <item name="iris_letter_spacing_${snake(t.n)}" type="dimen" format="float">${(t.ls / 100).toFixed(4)}</item>\n`;
  write('android/values/floats.xml', xml(flo));

  let sty = '';
  for (const t of typography) {
    sty += `  <style name="Iris.TextAppearance.${parts(t.n).map(p => p[0].toUpperCase() + p.slice(1)).join('')}" parent="TextAppearance.AppCompat">\n`;
    sty += `    <item name="android:textSize">@dimen/iris_font_size_${snake(t.n)}</item>\n`;
    sty += `    <item name="android:lineHeight">@dimen/iris_line_height_${snake(t.n)}</item>\n`;
    sty += `    <item name="android:letterSpacing">@dimen/iris_letter_spacing_${snake(t.n)}</item>\n`;
    sty += `    <item name="android:textFontWeight">${t.w}</item>\n  </style>\n`;
  }
  write('android/values/styles.xml', xml(sty));

  return {
    ios: { colorsets: Object.keys(semantic).length, swiftBytes: sw.length },
    android: { colors: Object.keys(atomic).length + Object.keys(semantic).length, night: Object.keys(semantic).length },
  };
}
