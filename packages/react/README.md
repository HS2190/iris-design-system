# @iris/react

[Iris Design System](https://github.com/) 의 React 컴포넌트 44종.

```bash
npm i @iris/tokens @iris/react
```

```tsx
import { Button, TextField } from '@iris/react';
import '@iris/tokens/css';       // CSS 변수 (테마 포함)
import '@iris/react/styles.css';  // 컴포넌트 스타일

<TextField label="이메일" placeholder="example@email.com" />
<Button>지원하기</Button>
```

React 18 이상이 필요합니다(peer dependency).
CSS Modules는 이미 처리되어 단일 CSS 파일로 들어 있으므로 번들러 설정은 필요 없습니다.

## 테마

```html
<html data-theme="dark">   <!-- 이 한 줄이 전부입니다 -->
```

`data-theme`이 없으면 `prefers-color-scheme`을 따릅니다.
문서 안 일부 영역만 다른 테마로 두는 것도 됩니다 — `<div data-theme="light">`.

## 컴포넌트

Actions · Selection & Input · Contents · Feedback · Navigations · Presentation ·
Utilities 7개 범주. 전체 목록과 Props는 문서 사이트를 참고하세요.

색은 `currentColor`, 크기는 토큰을 따릅니다. 컴포넌트는 플랫폼을 모르고,
높이·마진 같은 플랫폼별 값은 `@iris/tokens`가 정합니다.

## 라이선스

MIT. 아이콘은 [Phosphor Icons](https://phosphoricons.com)(MIT) 발췌.
