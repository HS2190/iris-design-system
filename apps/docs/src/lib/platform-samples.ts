// 생성 파일 — 직접 고치지 마세요.
// scripts/gen-platform-samples.mjs 가 packages/tokens/dist/** 에서 발췌합니다.
export interface TokenRef { web: string; ios: string; android: string }
/** 플랫폼 토큰을 각 플랫폼에서 부르는 이름 — 생성물에 존재하는 것만 담긴다 */
export const TOKEN_REFS: Record<string, TokenRef> = {
 "touch-target-min": {
  "web": "var(--iris-touch-target-min)",
  "ios": "Iris.Platform.touchTargetMin",
  "android": "@dimen/iris_touch_target_min"
 },
 "nav-top-height": {
  "web": "var(--iris-nav-top-height)",
  "ios": "Iris.Platform.navTopHeight",
  "android": "@dimen/iris_nav_top_height"
 },
 "nav-bottom-height": {
  "web": "var(--iris-nav-bottom-height)",
  "ios": "Iris.Platform.navBottomHeight",
  "android": "@dimen/iris_nav_bottom_height"
 },
 "safe-area-top": {
  "web": "var(--iris-safe-area-top)",
  "ios": "Iris.Platform.safeAreaTop",
  "android": "@dimen/iris_safe_area_top"
 },
 "safe-area-bottom": {
  "web": "var(--iris-safe-area-bottom)",
  "ios": "Iris.Platform.safeAreaBottom",
  "android": "@dimen/iris_safe_area_bottom"
 },
 "font-base-size": {
  "web": "var(--iris-font-base-size)",
  "ios": "Iris.Platform.fontBaseSize",
  "android": "@dimen/iris_font_base_size"
 },
 "radius-sheet": {
  "web": "var(--iris-radius-sheet)",
  "ios": "Iris.Platform.radiusSheet",
  "android": "@dimen/iris_radius_sheet"
 },
 "input-height": {
  "web": "var(--iris-input-height)",
  "ios": "Iris.Platform.inputHeight",
  "android": "@dimen/iris_input_height"
 },
 "page-margin": {
  "web": "var(--iris-page-margin)",
  "ios": "Iris.Platform.pageMargin",
  "android": "@dimen/iris_page_margin"
 }
};

export const PLATFORM_SAMPLES = {
 "webColor": "  --iris-semantic-background-normal-normal: var(--iris-atomic-common-100);\n  --iris-semantic-background-normal-alternative: var(--iris-atomic-coolNeutral-99);\n  --iris-semantic-fill-normal: var(--iris-atomic-coolNeutral-50a8);\n  --iris-semantic-inverse-background: var(--iris-atomic-coolNeutral-15);",
 "webDark": "  --iris-semantic-background-normal-normal: var(--iris-atomic-coolNeutral-15);\n  --iris-semantic-background-normal-alternative: var(--iris-atomic-coolNeutral-5);\n  --iris-semantic-fill-normal: var(--iris-atomic-coolNeutral-50a22);\n  --iris-semantic-inverse-background: var(--iris-atomic-common-100);",
 "webPlatform": "  --iris-touch-target-min: 40px;\n  --iris-nav-top-height: 64px;\n  --iris-nav-bottom-height: 56px;\n  --iris-safe-area-top: 0px;",
 "webTypo": "  --iris-font-size-display-1: 56px;\n  --iris-line-height-display-1: 72px;\n  --iris-letter-spacing-display-1: -0.0319em;\n  --iris-font-weight-display-1: 700;",
 "swiftColor": "  public enum Color {\n    public static var backgroundNormalNormal: SwiftUI.Color { SwiftUI.Color(\"IrisBackgroundNormalNormal\", bundle: Iris.bundle) }\n    public static var backgroundNormalAlternative: SwiftUI.Color { SwiftUI.Color(\"IrisBackgroundNormalAlternative\", bundle: Iris.bundle) }\n    public static var fillNormal: SwiftUI.Color { SwiftUI.Color(\"IrisFillNormal\", bundle: Iris.bundle) }\n    public static var inverseBackground: SwiftUI.Color { SwiftUI.Color(\"IrisInverseBackground\", bundle: Iris.bundle) }",
 "swiftPlatform": "  public enum Platform {\n    public static let touchTargetMin: CGFloat = 44\n    public static let navTopHeight: CGFloat = 44\n    public static let navBottomHeight: CGFloat = 49\n    public static let safeAreaTop: CGFloat = 59",
 "swiftTypo": "  public enum Typography {\n    public static let display1 = TextStyle(size: 56, weight: .bold, lineHeight: 72, lineSpacing: 16, tracking: -1.786)\n    public static let display2 = TextStyle(size: 40, weight: .bold, lineHeight: 52, lineSpacing: 12, tracking: -1.128)\n    public static let display3 = TextStyle(size: 36, weight: .bold, lineHeight: 48, lineSpacing: 12, tracking: -0.972)",
 "androidLight": "  <color name=\"iris_semantic_background_normal_normal\">#FFFFFFFF</color>\n  <color name=\"iris_semantic_background_normal_alternative\">#FFF7F7F8</color>\n  <color name=\"iris_semantic_fill_normal\">#1470737C</color>\n  <color name=\"iris_semantic_inverse_background\">#FF1B1C1E</color>",
 "androidNight": "  <color name=\"iris_semantic_background_normal_normal\">#FF1B1C1E</color>\n  <color name=\"iris_semantic_background_normal_alternative\">#FF0F0F10</color>\n  <color name=\"iris_semantic_fill_normal\">#3870737C</color>\n  <color name=\"iris_semantic_inverse_background\">#FFFFFFFF</color>",
 "androidDimens": "  <dimen name=\"iris_touch_target_min\">48dp</dimen>\n  <dimen name=\"iris_nav_top_height\">56dp</dimen>\n  <dimen name=\"iris_nav_bottom_height\">80dp</dimen>\n  <dimen name=\"iris_safe_area_top\">24dp</dimen>",
 "colorset": "{\n  \"colors\": [\n    {\n      \"idiom\": \"universal\",\n      \"color\": {\n        \"color-space\": \"srgb\",\n        \"components\": {\n          \"red\": \"0xFF\",\n          \"green\": \"0xFF\",\n          \"blue\": \"0xFF\",\n          \"alpha\": \"1.000\"\n        }\n      }\n    },\n    {\n      \"idiom\": \"universal\",\n      \"appearances\": [\n        {\n          \"appearance\": \"luminosity\",\n          \"value\": \"dark\"\n        }\n      ],\n      \"color\": {\n        \"color-space\": \"srgb\",\n        \"components\": {\n          \"red\": \"0x1B\",\n          \"green\": \"0x1C\",\n          \"blue\": \"0x1E\",\n          \"alpha\": \"1.000\"\n        }\n      }\n    }\n  ],\n  \"info\": {\n    \"author\": \"xcode\",\n    \"version\": 1\n  }\n}"
} as const;

export interface PlatformFile { path: string; bytes: number }
export const PLATFORM_MANIFEST = {
 "web": {
  "files": [
   {
    "path": "iris.css",
    "bytes": 36601
   },
   {
    "path": "tokens.json",
    "bytes": 13616
   }
  ],
  "bytes": 50217
 },
 "ios": {
  "files": [
   {
    "path": "ios/IrisColors.xcassets/Contents.json",
    "bytes": 60
   },
   {
    "path": "ios/IrisTokens.swift",
    "bytes": 30878
   }
  ],
  "colorsets": 73,
  "bytes": 79556
 },
 "android": {
  "files": [
   {
    "path": "android/values/colors.xml",
    "bytes": 12602
   },
   {
    "path": "android/values/dimens.xml",
    "bytes": 4611
   },
   {
    "path": "android/values/floats.xml",
    "bytes": 2411
   },
   {
    "path": "android/values/styles.xml",
    "bytes": 6189
   },
   {
    "path": "android/values-night/colors.xml",
    "bytes": 5209
   }
  ],
  "bytes": 31022
 }
} as const;
