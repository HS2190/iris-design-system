// 생성 파일 — 직접 고치지 마세요.
// scripts/gen-component-tokens.mjs 가 packages/react/src/*/*.module.css 에서 추출합니다.
export interface ComponentTokens { platform: string[]; tokenCount: number }
export const COMPONENT_TOKENS: Record<string, ComponentTokens> = {
 "Accordion": {
  "platform": [],
  "tokenCount": 14
 },
 "ActionArea": {
  "platform": [
   "safe-area-bottom"
  ],
  "tokenCount": 6
 },
 "Alert": {
  "platform": [],
  "tokenCount": 12
 },
 "Avatar": {
  "platform": [],
  "tokenCount": 6
 },
 "BottomNavigation": {
  "platform": [],
  "tokenCount": 7
 },
 "BottomSheet": {
  "platform": [
   "radius-sheet"
  ],
  "tokenCount": 14
 },
 "Button": {
  "platform": [],
  "tokenCount": 33
 },
 "Card": {
  "platform": [],
  "tokenCount": 12
 },
 "Checkbox": {
  "platform": [],
  "tokenCount": 14
 },
 "Chip": {
  "platform": [],
  "tokenCount": 23
 },
 "ContentBadge": {
  "platform": [],
  "tokenCount": 16
 },
 "Divider": {
  "platform": [],
  "tokenCount": 3
 },
 "FallbackView": {
  "platform": [],
  "tokenCount": 10
 },
 "FilterButton": {
  "platform": [],
  "tokenCount": 18
 },
 "Grid": {
  "platform": [],
  "tokenCount": 0
 },
 "Icon": {
  "platform": [],
  "tokenCount": 0
 },
 "IconButton": {
  "platform": [],
  "tokenCount": 8
 },
 "ListCell": {
  "platform": [],
  "tokenCount": 15
 },
 "Menu": {
  "platform": [],
  "tokenCount": 13
 },
 "Pagination": {
  "platform": [],
  "tokenCount": 13
 },
 "Popover": {
  "platform": [],
  "tokenCount": 12
 },
 "Popup": {
  "platform": [],
  "tokenCount": 16
 },
 "Progress": {
  "platform": [],
  "tokenCount": 7
 },
 "ProgressTracker": {
  "platform": [],
  "tokenCount": 17
 },
 "PushBadge": {
  "platform": [],
  "tokenCount": 4
 },
 "Radio": {
  "platform": [],
  "tokenCount": 13
 },
 "Scrim": {
  "platform": [],
  "tokenCount": 1
 },
 "SearchField": {
  "platform": [
   "input-height"
  ],
  "tokenCount": 19
 },
 "SectionHeader": {
  "platform": [],
  "tokenCount": 11
 },
 "SectionMessage": {
  "platform": [],
  "tokenCount": 17
 },
 "SegmentedControl": {
  "platform": [],
  "tokenCount": 15
 },
 "Select": {
  "platform": [
   "input-height"
  ],
  "tokenCount": 24
 },
 "Skeleton": {
  "platform": [],
  "tokenCount": 3
 },
 "Slider": {
  "platform": [],
  "tokenCount": 12
 },
 "Snackbar": {
  "platform": [],
  "tokenCount": 12
 },
 "Switch": {
  "platform": [],
  "tokenCount": 13
 },
 "Table": {
  "platform": [],
  "tokenCount": 10
 },
 "Tabs": {
  "platform": [],
  "tokenCount": 10
 },
 "TextArea": {
  "platform": [],
  "tokenCount": 24
 },
 "TextButton": {
  "platform": [],
  "tokenCount": 15
 },
 "TextField": {
  "platform": [
   "input-height"
  ],
  "tokenCount": 22
 },
 "Toast": {
  "platform": [],
  "tokenCount": 11
 },
 "Tooltip": {
  "platform": [],
  "tokenCount": 5
 },
 "TopNavigation": {
  "platform": [
   "nav-top-height"
  ],
  "tokenCount": 11
 }
};

/** 플랫폼별 값 — packages/tokens/src/platform.json 그대로 */
export const PLATFORM_VALUES: Record<string, { web: number; ios: number; android: number }> = {
 "touch-target-min": {
  "web": 40,
  "ios": 44,
  "android": 48
 },
 "nav-top-height": {
  "web": 64,
  "ios": 44,
  "android": 56
 },
 "nav-bottom-height": {
  "web": 0,
  "ios": 49,
  "android": 80
 },
 "safe-area-top": {
  "web": 0,
  "ios": 59,
  "android": 24
 },
 "safe-area-bottom": {
  "web": 0,
  "ios": 34,
  "android": 0
 },
 "font-base-size": {
  "web": 16,
  "ios": 17,
  "android": 16
 },
 "radius-sheet": {
  "web": 16,
  "ios": 20,
  "android": 28
 },
 "input-height": {
  "web": 48,
  "ios": 48,
  "android": 56
 },
 "page-margin": {
  "web": 24,
  "ios": 20,
  "android": 16
 }
};
