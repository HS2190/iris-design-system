/**
 * 컴포넌트 CSS 모듈을 훑어 각 컴포넌트가 실제로 참조하는 토큰을 뽑는다.
 * 손으로 적으면 컴포넌트가 바뀔 때 문서만 옛 값으로 남으므로, 빌드 때마다 다시 만든다.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(R, 'packages/react/src');
const platform = JSON.parse(readFileSync(join(R, 'packages/tokens/src/platform.json'), 'utf8'));
const platformNames = Object.keys(platform);

const out = {};
for (const dir of readdirSync(SRC, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const tsx = join(SRC, dir.name, `${dir.name}.tsx`);
  if (!existsSync(tsx)) continue;
  const css = join(SRC, dir.name, `${dir.name}.module.css`);
  // Icon처럼 CSS 모듈이 없는 컴포넌트도 항목을 남긴다(플랫폼 차이 없음으로 표시됨)
  const refs = existsSync(css)
    ? [...new Set([...readFileSync(css, 'utf8')
        .matchAll(/var\(\s*--iris-([a-z0-9-]+)/g)].map(m => m[1]))]
    : [];
  out[dir.name] = {
    // 플랫폼마다 값이 달라지는 토큰 — 네이티브 구현자가 봐야 하는 것
    platform: refs.filter(r => platformNames.includes(r)).sort(),
    // 나머지 참조 토큰 개수 (전부 나열하면 노이즈라 수만)
    tokenCount: refs.length,
  };
}

const banner = `// 생성 파일 — 직접 고치지 마세요.\n`
  + `// scripts/gen-component-tokens.mjs 가 packages/react/src/*/*.module.css 에서 추출합니다.\n`;
const body = `export interface ComponentTokens { platform: string[]; tokenCount: number }\n`
  + `export const COMPONENT_TOKENS: Record<string, ComponentTokens> = ${JSON.stringify(out, null, 1)};\n\n`
  + `/** 플랫폼별 값 — packages/tokens/src/platform.json 그대로 */\n`
  + `export const PLATFORM_VALUES: Record<string, { web: number; ios: number; android: number }> = ${JSON.stringify(platform, null, 1)};\n`;

writeFileSync(join(R, 'apps/docs/src/lib/component-tokens.ts'), banner + body);
const withPlat = Object.entries(out).filter(([, v]) => v.platform.length);
console.log(`component-tokens.ts: 컴포넌트 ${Object.keys(out).length}개 · 플랫폼 토큰 쓰는 컴포넌트 ${withPlat.length}개`);
for (const [k, v] of withPlat) console.log(`  ${k} → ${v.platform.join(', ')}`);
