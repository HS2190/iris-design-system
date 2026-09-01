# @hs2190/iris-tokens

[Iris Design System](https://github.com/HS2190/iris-design-system) 의 디자인 토큰.
Figma Variables가 원본이고 이 패키지는 그 빌드 결과입니다.

```bash
npm i @hs2190/iris-tokens
```

```js
import '@hs2190/iris-tokens/css';          // CSS 변수 — 이것만으로 충분한 경우가 많습니다
import tokens from '@hs2190/iris-tokens';   // 값이 필요할 때 (JS 객체)
```

## 담긴 것

| | 개수 | 설명 |
|---|---|---|
| atomic | 127 | 원료 — 명도 스케일만 갖고 쓰임을 말하지 않음 |
| semantic | 73 | 역할 — 라이트/다크에서 어느 원료를 가리킬지 정함 |
| typography | 16 | 크기·행간·자간·굵기 |
| elevation | 7 | ambient + key 2겹 그림자 |
| scales | 50 | space · radius · opacity · breakpoint · layout · stroke |
| platform | 9 | 하나의 이름에 web·iOS·Android 세 값 |

## 2층 구조

컴포넌트는 역할 이름만 참조합니다. 테마가 바뀌면 가운데 층이 재매핑될 뿐입니다.

```css
:root                 { --iris-semantic-background-normal-normal: var(--iris-atomic-common-100); }
[data-theme="dark"]   { --iris-semantic-background-normal-normal: var(--iris-atomic-cool-neutral-15); }
```

## 플랫폼 값

`import tokens from '@hs2190/iris-tokens'` 의 `tokens.platform` 에 세 플랫폼 값이 모두 있습니다.
**CSS로 빌드되는 것은 웹 값뿐입니다** — 네이티브 빌드는 아직 없습니다.

```json
"input-height": { "web": 48, "ios": 48, "android": 56 }
```

## 라이선스

MIT
