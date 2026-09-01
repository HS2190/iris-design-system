# Iris Design System

Web · iOS · Android를 하나의 소스로 다루는 개인 디자인 시스템.
Figma Variables가 원본이고, 코드는 그 빌드 결과입니다.

```
컴포넌트 44 · 디자인 토큰 223 · 아이콘 72×2(line·fill) · MIT
```

## 설치

```bash
npm i @hs2190/iris-tokens @hs2190/iris-react
```

```tsx
import { Button, TextField } from '@hs2190/iris-react';
import '@hs2190/iris-tokens/css';      // CSS 변수 (테마 포함)
import '@hs2190/iris-react/styles.css'; // 컴포넌트 스타일

export default function App() {
  return (
    <form>
      <TextField label="이메일" placeholder="example@email.com" />
      <Button>지원하기</Button>
    </form>
  );
}
```

React 18 이상이 필요합니다(peer dependency). 번들러 설정은 필요 없습니다 —
CSS Modules는 이미 처리되어 단일 CSS 파일로 들어 있습니다.

## 테마

컴포넌트는 역할 토큰만 참조합니다. 테마를 바꾸는 일은 컴포넌트를 고치는 일이 아니라
가운데 층을 다시 가리키는 일입니다.

```html
<html data-theme="dark">   <!-- 이 한 줄이 전부입니다 -->
```

`data-theme`이 없으면 `prefers-color-scheme`을 따릅니다.
문서 안 일부 영역만 다른 테마로 두는 것도 됩니다(`<div data-theme="light">`).

## 구조

```
packages/tokens   Figma Variables → CSS 변수 · tokens.json · tokens.js
packages/react    React 컴포넌트 44종
apps/docs         문서 사이트
```

**토큰은 2층입니다.** 아래층은 원료(127개 색), 위층은 역할(73개).
컴포넌트는 `primary/normal` 같은 역할 이름만 알고, 그것이 라이트·다크에서
어느 원료를 가리킬지는 가운데 층이 정합니다.

**플랫폼 분기는 토큰이 흡수합니다.** 하나의 이름에 세 값을 둡니다.

```json
"input-height": { "web": 48, "ios": 48, "android": 56 }
```

## 알아두실 점

- **제공되는 코드는 웹뿐입니다.** iOS·Android 값은 `tokens.json`에 들어 있지만
  그 값을 소비하는 네이티브 빌드는 아직 없습니다. 플랫폼 토큰 9개 중 7개가
  실제 컴포넌트에 배선돼 있습니다 — 준비된 구조이지 증명된 구조는 아닙니다.
- **토큰 값은 Figma가 원본입니다.** `packages/tokens/dist`는 생성물이니
  직접 고치지 마세요. `src/*.json`을 고치고 `npm run tokens`를 돌립니다.
- 폰트는 `--iris-font-family` 한 줄로 교체됩니다.

## 개발

```bash
npm install
npm run dev     # 문서 사이트 (localhost:5199)
npm run build   # 토큰 → 라이브러리 → 문서 순으로 빌드
```

## 라이선스

MIT — 상업·비상업 모두 제한 없이 쓰고 수정할 수 있습니다.
아이콘은 [Phosphor Icons](https://phosphoricons.com)(MIT)에서 발췌했습니다.
