# Iris Design System

Web · iOS · Android를 하나의 소스로 다루는 개인 디자인 시스템.
Figma Variables가 원본이고, 코드는 그 빌드 결과입니다.

```
컴포넌트 44 · 디자인 토큰 223 · 아이콘 72×2(line·fill) · MIT
```

**문서 사이트 → https://hs2190.github.io/iris-design-system/**

## 설치

```bash
npm i @hs2190.an/iris-tokens @hs2190.an/iris-react
```

```tsx
import { Button, TextField } from '@hs2190.an/iris-react';
import '@hs2190.an/iris-tokens/css';      // CSS 변수 (테마 포함)
import '@hs2190.an/iris-react/styles.css'; // 컴포넌트 스타일

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
packages/tokens   Figma Variables → 웹 CSS 변수 · iOS Swift/Asset Catalog · Android XML
packages/react    React 컴포넌트 44종
apps/docs         문서 사이트
```

**토큰은 2층입니다.** 아래층은 원료(127개 색), 위층은 역할(73개).
컴포넌트는 `primary/normal` 같은 역할 이름만 알고, 그것이 라이트·다크에서
어느 원료를 가리킬지는 가운데 층이 정합니다.

**플랫폼 분기는 토큰이 흡수합니다.** 하나의 이름에 세 값을 두고,
한 번의 빌드에서 세 플랫폼 산출물이 함께 나옵니다.

```json
"input-height": { "web": 48, "ios": 48, "android": 56 }
```

```
웹       var(--iris-input-height)        48px
iOS      Iris.Platform.inputHeight       48
Android  @dimen/iris_input_height        56dp
```

iOS는 `IrisTokens.swift` + Asset Catalog(의미 색 73개, 라이트/다크 2벌),
Android는 `values/`·`values-night/` XML로 나옵니다.
자세한 내용은 [packages/tokens/README](packages/tokens/README.md)와
[문서 사이트 → Foundations → Platform](https://hs2190.github.io/iris-design-system/#/foundations/platform)에 있습니다.

## 알아두실 점

- **토큰은 세 플랫폼, 컴포넌트 코드는 웹뿐입니다.** 토큰은 웹·iOS·Android
  산출물이 함께 빌드되지만, SwiftUI·Compose 컴포넌트 구현은 없습니다.
  네이티브 화면은 토큰을 참조해 직접 만들어야 합니다.
- **네이티브 산출물의 검증 범위.** 생성값 1,012건을 소스 JSON과 전수 대조하고
  Swift는 `swiftc -typecheck`를 통과시킵니다(빌드에 연결돼 있어 어긋나면 실패).
  다만 Xcode·Android Studio에서 실제로 렌더링해 본 것은 아닙니다.
  Android `elevation`은 단일 dp 값이라 다층 그림자를 표현하지 못해 손실이 있습니다.
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
