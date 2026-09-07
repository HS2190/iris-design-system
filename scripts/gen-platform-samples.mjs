// dist/** → apps/docs/src/lib/platform-samples.ts
//
// 문서에 플랫폼별 산출물을 "보여주기" 위한 발췌를 만든다. 전문(CSS 36KB,
// Swift 30KB, colors.xml 200줄)을 붙이면 읽히지 않으므로 대표 구간만 잘라 온다.
// 손으로 옮겨 적으면 반드시 어긋나므로 생성물에서 직접 잘라낸다.
//
// 세 플랫폼에서 **같은 토큰**을 뽑는 게 핵심이다 — 배경색·터치영역·display-1을
// 나란히 놓아야 "이름 하나, 값 셋"이 눈으로 확인된다.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(R, 'packages/tokens/dist');
const NAT = join(DIST, 'native');
const read = p => readFileSync(join(NAT, p), 'utf8');
const readDist = p => readFileSync(join(DIST, p), 'utf8');

/** CSS에서 지정한 변수 줄만 순서대로 뽑는다 (블록 안에서만 찾는다). */
const cssVars = (css, names, blockStart) => {
  const from = blockStart ? css.indexOf(blockStart) : 0;
  const end = css.indexOf('}', from);
  const block = css.slice(from, end);
  return names.map(n => (block.match(new RegExp(`^\\s*--iris-${n}:.*$`, 'm')) ?? [''])[0].trim()).filter(Boolean).map(l => '  ' + l).join('\n');
};

/** 파일에서 특정 구간만 뽑는다 — 시작 표식부터 n줄. */
const slice = (src, startsWith, n) => {
  const lines = src.split('\n');
  const i = lines.findIndex(l => l.includes(startsWith));
  return i < 0 ? '' : lines.slice(i, i + n).join('\n');
};
const strip = s => s.split('\n').filter(l => !l.trim().startsWith('//') && !l.trim().startsWith('<!--')).join('\n');

const swift = read('ios/IrisTokens.swift');
const colors = read('android/values/colors.xml');
const night = read('android/values-night/colors.xml');
const dimens = read('android/values/dimens.xml');

/* ── 발췌: 같은 토큰(background/normal/normal, touch-target-min, title-1)을
      세 플랫폼에서 나란히 보여줘야 "한 소스"라는 게 눈에 보인다. ── */
const css = readDist('iris.css');
const SEM = ['semantic-background-normal-normal', 'semantic-background-normal-alternative', 'semantic-fill-normal', 'semantic-inverse-background'];
const PLAT = ['touch-target-min', 'nav-top-height', 'nav-bottom-height', 'safe-area-top'];

const samples = {
  webColor: cssVars(css, SEM, ':root {'),
  webDark: cssVars(css, SEM, '[data-theme="dark"] {'),
  webPlatform: cssVars(css, PLAT, ':root {'),
  webTypo: cssVars(css, ['font-size-display-1', 'line-height-display-1', 'letter-spacing-display-1', 'font-weight-display-1'], ':root {'),
  swiftColor: slice(swift, 'public enum Color {', 5).trimEnd(),
  swiftPlatform: slice(swift, 'public enum Platform {', 5).trimEnd(),
  swiftTypo: slice(swift, 'public enum Typography {', 4).trimEnd(),
  androidLight: strip(slice(colors, 'iris_semantic_background_normal_normal', 4)).trimEnd(),
  androidNight: strip(slice(night, 'iris_semantic_background_normal_normal', 4)).trimEnd(),
  androidDimens: strip(slice(dimens, 'iris_touch_target_min', 4)).trimEnd(),
  colorset: JSON.stringify(JSON.parse(read('ios/IrisColors.xcassets/IrisBackgroundNormalNormal.colorset/Contents.json')), null, 2),
};

/* ── 파일 목록·크기 — "정말 있다"를 보여주는 근거 ── */
const walk = (dir, base = '') => readdirSync(join(NAT, dir), { withFileTypes: true }).flatMap(e => {
  const rel = base ? `${base}/${e.name}` : e.name;
  return e.isDirectory() ? walk(join(dir, e.name), rel) : [{ path: rel, bytes: statSync(join(NAT, dir, e.name)).size }];
});
const iosFiles = walk('ios', '');
const androidFiles = walk('android', '');
const { size: cssBytes } = statSync(join(DIST, 'iris.css'));
const { size: jsonBytes } = statSync(join(DIST, 'tokens.json'));

const manifest = {
  web: { files: [{ path: 'iris.css', bytes: cssBytes }, { path: 'tokens.json', bytes: jsonBytes }], bytes: cssBytes + jsonBytes },
  ios: {
    files: iosFiles.filter(f => !f.path.includes('.colorset')).map(f => ({ ...f, path: 'ios/' + f.path })),
    colorsets: iosFiles.filter(f => f.path.includes('.colorset')).length,
    bytes: iosFiles.reduce((a, f) => a + f.bytes, 0),
  },
  android: {
    files: androidFiles.map(f => ({ ...f, path: 'android/' + f.path })),
    bytes: androidFiles.reduce((a, f) => a + f.bytes, 0),
  },
};

const banner = '// 생성 파일 — 직접 고치지 마세요.\n'
  + '// scripts/gen-platform-samples.mjs 가 packages/tokens/dist/** 에서 발췌합니다.\n';
const body = `export const PLATFORM_SAMPLES = ${JSON.stringify(samples, null, 1)} as const;\n\n`
  + `export interface PlatformFile { path: string; bytes: number }\n`
  + `export const PLATFORM_MANIFEST = ${JSON.stringify(manifest, null, 1)} as const;\n`;

writeFileSync(join(R, 'apps/docs/src/lib/platform-samples.ts'), banner + body);
console.log(`platform-samples.ts: 웹 ${manifest.web.files.length}파일 · iOS ${manifest.ios.files.length}파일 + colorset ${manifest.ios.colorsets}개 · Android ${manifest.android.files.length}파일`);
