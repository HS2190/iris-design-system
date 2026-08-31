/** 사이드바·랜딩 인덱스가 함께 참조하는 컴포넌트 목록 — 개수를 두 곳에서 세지 않기 위해. */
export const componentGroups: [string, [string, string][]][] = [
  ['Actions', [['Button', 'button'], ['Text button', 'text-button'], ['Icon button', 'icon-button'], ['Chip', 'chip'], ['Filter button', 'filter-button'], ['Action area', 'action-area']]],
  ['Selection & Input', [['Text field', 'text-field'], ['Text area', 'text-area'], ['Select', 'select'], ['Search field', 'search-field'], ['Checkbox', 'checkbox'], ['Radio', 'radio'], ['Switch', 'switch'], ['Segmented control', 'segmented-control'], ['Slider', 'slider']]],
  ['Contents', [['Content badge', 'content-badge'], ['Avatar', 'avatar'], ['List cell', 'list-cell'], ['Card', 'card'], ['Section header', 'section-header'], ['Accordion', 'accordion'], ['Table', 'table']]],
  ['Feedback', [['Alert', 'alert'], ['Toast', 'toast'], ['Snackbar', 'snackbar'], ['Section message', 'section-message'], ['Fallback view', 'fallback-view'], ['Push badge', 'push-badge']]],
  ['Navigations', [['Top navigation', 'top-navigation'], ['Bottom navigation', 'bottom-navigation'], ['Tab', 'tab'], ['Pagination', 'pagination'], ['Progress', 'progress'], ['Progress tracker', 'progress-tracker']]],
  ['Presentation', [['Tooltip', 'tooltip'], ['Popover', 'popover'], ['Menu', 'menu'], ['Popup', 'popup'], ['Bottom sheet', 'bottom-sheet']]],
];

export const utilityItems: [string, string][] = [['Skeleton', 'skeleton'], ['Scrim', 'scrim'], ['Grid', 'grid'], ['Divider', 'divider']];
export const utilSlugs = utilityItems.map(([, s]) => s);

/** Icon은 Foundations에 있지만 컴포넌트로도 셈한다(44번째). */
export const componentCount =
  componentGroups.reduce((n, [, items]) => n + items.length, 0) + utilityItems.length + 1;
