# @hs2190.an/iris-tokens

[Iris Design System](https://github.com/HS2190/iris-design-system) 의 디자인 토큰.
Figma Variables가 원본이고 이 패키지는 그 빌드 결과입니다.

```bash
npm i @hs2190.an/iris-tokens
```

```js
import '@hs2190.an/iris-tokens/css';          // CSS 변수 — 이것만으로 충분한 경우가 많습니다
import tokens from '@hs2190.an/iris-tokens';   // 값이 필요할 때 (JS 객체)
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


## iOS · Android

웹 CSS와 **같은 빌드**에서 네이티브 산출물도 함께 나옵니다. `dist/native/`에 들어 있습니다.

```
dist/native/
  ios/IrisTokens.swift              수치·타이포·그림자 + 색 접근자
  ios/IrisColors.xcassets/          의미 색 73개 (라이트/다크 2벌)
  android/values/colors.xml         원자 127 + 의미 73 (라이트)
  android/values-night/colors.xml   의미 73 (다크)
  android/values/dimens.xml         간격·반경·타이포·플랫폼 값
  android/values/floats.xml         불투명도·자간
  android/values/styles.xml         TextAppearance 16종
```

**Xcode** — `.xcassets`와 `IrisTokens.swift`를 타깃에 추가합니다.
SwiftPM 타깃이면 앱 시작 시 `Iris.bundle = .module`로 바꿉니다.

```swift
Text("안녕하세요")
  .font(Iris.Typography.body1.font)
  .tracking(Iris.Typography.body1.tracking)
  .foregroundStyle(Iris.Color.labelNormal)
  .padding(Iris.Space.x16)
```

**Android** — `values/`·`values-night/`를 `res/`에 넣습니다.

```xml
<TextView
  android:textAppearance="@style/Iris.TextAppearance.Body1"
  android:textColor="@color/iris_semantic_label_normal"
  android:minHeight="@dimen/iris_touch_target_min" />
```

### 플랫폼 경계에서 달라지는 것

값을 새로 정하는 게 아니라 표기를 바꾸는 것이라, 어긋나기 쉬운 지점만 정리합니다.

| | 웹 | iOS | Android |
|---|---|---|---|
| 색 표기 | `#RRGGBBAA` | 0–1 정규화 | `#AARRGGBB` (알파가 **앞**) |
| 자간 | `em` | `tracking` (pt) | `letterSpacing` (em) |
| 행간 | `line-height` (px) | `lineSpacing` (= 행간 − 글자크기) | `lineHeight` (sp) |
| 그림자 | `blur` | `radius` (= blur ÷ 2), spread 없음 | `elevation` 단일값 (다층 표현 불가) |
| 다크 | 미디어쿼리 | Asset Catalog appearance | `values-night/` |

생성값은 빌드마다 소스 JSON과 전수 대조합니다(`npm run verify`). 값이 어긋나면 빌드가 실패합니다.

## 2층 구조

컴포넌트는 역할 이름만 참조합니다. 테마가 바뀌면 가운데 층이 재매핑될 뿐입니다.

```css
:root                 { --iris-semantic-background-normal-normal: var(--iris-atomic-common-100); }
[data-theme="dark"]   { --iris-semantic-background-normal-normal: var(--iris-atomic-cool-neutral-15); }
```

## 플랫폼 값

`import tokens from '@hs2190.an/iris-tokens'` 의 `tokens.platform` 에 세 플랫폼 값이 모두 있습니다.
**CSS로 빌드되는 것은 웹 값뿐입니다** — 네이티브 빌드는 아직 없습니다.

```json
"input-height": { "web": 48, "ios": 48, "android": 56 }
```

## 라이선스

MIT
