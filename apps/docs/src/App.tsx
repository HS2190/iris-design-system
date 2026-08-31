import { Routes, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Toc from './components/Toc';
import ButtonPage from './pages/ButtonPage';
import TextButtonPage from './pages/TextButtonPage';
import IconButtonPage from './pages/IconButtonPage';
import ActionAreaPage from './pages/ActionAreaPage';
import IconPage from './pages/IconPage';
import ChipPage from './pages/ChipPage';
import ContentBadgePage from './pages/ContentBadgePage';
import TextFieldPage from './pages/TextFieldPage';
import CheckboxPage from './pages/CheckboxPage';
import SwitchPage from './pages/SwitchPage';
import DividerPage from './pages/DividerPage';
import RadioPage from './pages/RadioPage';
import SelectPage from './pages/SelectPage';
import SearchFieldPage from './pages/SearchFieldPage';
import SegmentedControlPage from './pages/SegmentedControlPage';
import TextAreaPage from './pages/TextAreaPage';
import SliderPage from './pages/SliderPage';
import FilterButtonPage from './pages/FilterButtonPage';
import AvatarPage from './pages/AvatarPage';
import ListCellPage from './pages/ListCellPage';
import CardPage from './pages/CardPage';
import SectionHeaderPage from './pages/SectionHeaderPage';
import AccordionPage from './pages/AccordionPage';
import TablePage from './pages/TablePage';
import AlertPage from './pages/AlertPage';
import ToastPage from './pages/ToastPage';
import SnackbarPage from './pages/SnackbarPage';
import SectionMessagePage from './pages/SectionMessagePage';
import FallbackViewPage from './pages/FallbackViewPage';
import PushBadgePage from './pages/PushBadgePage';
import TopNavigationPage from './pages/TopNavigationPage';
import BottomNavigationPage from './pages/BottomNavigationPage';
import TabPage from './pages/TabPage';
import PaginationPage from './pages/PaginationPage';
import ProgressPage from './pages/ProgressPage';
import ProgressTrackerPage from './pages/ProgressTrackerPage';
import TooltipPage from './pages/TooltipPage';
import PopoverPage from './pages/PopoverPage';
import MenuPage from './pages/MenuPage';
import PopupPage from './pages/PopupPage';
import BottomSheetPage from './pages/BottomSheetPage';
import SkeletonPage from './pages/SkeletonPage';
import ScrimPage from './pages/ScrimPage';
import GridPage from './pages/GridPage';
import FoundationsPage from './pages/FoundationsPage';
import ColorPage from './pages/ColorPage';
import TypographyPage from './pages/TypographyPage';
import SpacingPage from './pages/SpacingPage';
import ElevationPage from './pages/ElevationPage';
import PlatformPage from './pages/PlatformPage';

const componentGroups: [string, [string, string][]][] = [
  ['Actions', [['Button', 'button'], ['Text button', 'text-button'], ['Icon button', 'icon-button'], ['Chip', 'chip'], ['Filter button', 'filter-button'], ['Action area', 'action-area']]],
  ['Selection & Input', [['Text field', 'text-field'], ['Text area', 'text-area'], ['Select', 'select'], ['Search field', 'search-field'], ['Checkbox', 'checkbox'], ['Radio', 'radio'], ['Switch', 'switch'], ['Segmented control', 'segmented-control'], ['Slider', 'slider']]],
  ['Contents', [['Content badge', 'content-badge'], ['Avatar', 'avatar'], ['List cell', 'list-cell'], ['Card', 'card'], ['Section header', 'section-header'], ['Accordion', 'accordion'], ['Table', 'table']]],
  ['Feedback', [['Alert', 'alert'], ['Toast', 'toast'], ['Snackbar', 'snackbar'], ['Section message', 'section-message'], ['Fallback view', 'fallback-view'], ['Push badge', 'push-badge']]],
  ['Navigations', [['Top navigation', 'top-navigation'], ['Bottom navigation', 'bottom-navigation'], ['Tab', 'tab'], ['Pagination', 'pagination'], ['Progress', 'progress'], ['Progress tracker', 'progress-tracker']]],
  ['Presentation', [['Tooltip', 'tooltip'], ['Popover', 'popover'], ['Menu', 'menu'], ['Popup', 'popup'], ['Bottom sheet', 'bottom-sheet']]],
  ['Loading & Utilities', [['Skeleton', 'skeleton'], ['Scrim', 'scrim'], ['Grid', 'grid'], ['Divider', 'divider'], ['Icon', 'icon']]],
];

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('iris-theme') ?? 'system');
  useEffect(() => {
    if (theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('iris-theme', theme); } catch { /* private mode */ }
  }, [theme]);
  return (
    <div className="control theme-toggle">
      <label>theme</label>
      <div className="seg" role="group" aria-label="테마">
        {(['light', 'system', 'dark'] as const).map(t =>
          <button key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)}>{t}</button>)}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <div><b>Iris</b><span>Design System</span></div>
        </NavLink>
        <nav className="nav">
          <div className="nav-group">Getting started</div>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>소개</NavLink>
          <div className="nav-group">Foundations</div>
          <NavLink to="/foundations" end className={({ isActive }) => isActive ? 'active' : ''}>개요</NavLink>
          {[['Color', '/foundations/color'], ['Typography', '/foundations/typography'], ['Spacing', '/foundations/spacing'], ['Elevation', '/foundations/elevation'], ['Platform', '/foundations/platform']].map(([n, p]) => (
            <NavLink key={p} to={p} className={({ isActive }) => isActive ? 'active' : ''}>{n}</NavLink>
          ))}
          {componentGroups.map(([cat, items]) => (
            <span key={cat} style={{ display: 'contents' }}>
              <div className="nav-group">{cat}</div>
              {items.map(([name, slug]) => (
                <NavLink key={slug} to={`/components/${slug}`} className={({ isActive }) => isActive ? 'active' : ''}>{name}</NavLink>
              ))}
            </span>
          ))}
        </nav>
        <ThemeToggle />
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/button" element={<ButtonPage />} />
          <Route path="/components/text-button" element={<TextButtonPage />} />
          <Route path="/components/icon-button" element={<IconButtonPage />} />
          <Route path="/components/action-area" element={<ActionAreaPage />} />
          <Route path="/components/icon" element={<IconPage />} />
          <Route path="/components/chip" element={<ChipPage />} />
          <Route path="/components/content-badge" element={<ContentBadgePage />} />
          <Route path="/components/text-field" element={<TextFieldPage />} />
          <Route path="/components/checkbox" element={<CheckboxPage />} />
          <Route path="/components/switch" element={<SwitchPage />} />
          <Route path="/components/divider" element={<DividerPage />} />
          <Route path="/components/radio" element={<RadioPage />} />
          <Route path="/components/select" element={<SelectPage />} />
          <Route path="/components/search-field" element={<SearchFieldPage />} />
          <Route path="/components/segmented-control" element={<SegmentedControlPage />} />
          <Route path="/components/text-area" element={<TextAreaPage />} />
          <Route path="/components/slider" element={<SliderPage />} />
          <Route path="/components/filter-button" element={<FilterButtonPage />} />
          <Route path="/components/avatar" element={<AvatarPage />} />
          <Route path="/components/list-cell" element={<ListCellPage />} />
          <Route path="/components/card" element={<CardPage />} />
          <Route path="/components/section-header" element={<SectionHeaderPage />} />
          <Route path="/components/accordion" element={<AccordionPage />} />
          <Route path="/components/table" element={<TablePage />} />
          <Route path="/components/alert" element={<AlertPage />} />
          <Route path="/components/toast" element={<ToastPage />} />
          <Route path="/components/snackbar" element={<SnackbarPage />} />
          <Route path="/components/section-message" element={<SectionMessagePage />} />
          <Route path="/components/fallback-view" element={<FallbackViewPage />} />
          <Route path="/components/push-badge" element={<PushBadgePage />} />
          <Route path="/components/top-navigation" element={<TopNavigationPage />} />
          <Route path="/components/bottom-navigation" element={<BottomNavigationPage />} />
          <Route path="/components/tab" element={<TabPage />} />
          <Route path="/components/pagination" element={<PaginationPage />} />
          <Route path="/components/progress" element={<ProgressPage />} />
          <Route path="/components/progress-tracker" element={<ProgressTrackerPage />} />
          <Route path="/components/tooltip" element={<TooltipPage />} />
          <Route path="/components/popover" element={<PopoverPage />} />
          <Route path="/components/menu" element={<MenuPage />} />
          <Route path="/components/popup" element={<PopupPage />} />
          <Route path="/components/bottom-sheet" element={<BottomSheetPage />} />
          <Route path="/components/skeleton" element={<SkeletonPage />} />
          <Route path="/components/scrim" element={<ScrimPage />} />
          <Route path="/components/grid" element={<GridPage />} />
          <Route path="/foundations" element={<FoundationsPage />} />
          <Route path="/foundations/color" element={<ColorPage />} />
          <Route path="/foundations/typography" element={<TypographyPage />} />
          <Route path="/foundations/spacing" element={<SpacingPage />} />
          <Route path="/foundations/elevation" element={<ElevationPage />} />
          <Route path="/foundations/platform" element={<PlatformPage />} />
        </Routes>
      </main>
      <Toc />
    </div>
  );
}
