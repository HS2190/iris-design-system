import { Routes, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Toc from './components/Toc';
import ButtonPage from './pages/ButtonPage';
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
import TooltipPage from './pages/TooltipPage';
import PopoverPage from './pages/PopoverPage';
import MenuPage from './pages/MenuPage';
import PopupPage from './pages/PopupPage';
import BottomSheetPage from './pages/BottomSheetPage';
import SkeletonPage from './pages/SkeletonPage';
import ScrimPage from './pages/ScrimPage';
import GridPage from './pages/GridPage';

const components = [
  { path: '/components/button', name: 'Button', ready: true },
  { path: '/components/icon', name: 'Icon', ready: true },
  { path: '/components/chip', name: 'Chip', ready: true },
  { path: '/components/content-badge', name: 'Content badge', ready: true },
  { path: '/components/text-field', name: 'Text field', ready: true },
  { path: '/components/checkbox', name: 'Checkbox', ready: true },
  { path: '/components/switch', name: 'Switch', ready: true },
  { path: '/components/divider', name: 'Divider', ready: true },
  { path: '/components/radio', name: 'Radio', ready: true },
  { path: '/components/select', name: 'Select', ready: true },
  { path: '/components/search-field', name: 'Search field', ready: true },
  { path: '/components/segmented-control', name: 'Segmented control', ready: true },
  { path: '/components/text-area', name: 'Text area', ready: true },
  { path: '/components/slider', name: 'Slider', ready: true },
  { path: '/components/filter-button', name: 'Filter button', ready: true },
  { path: '/components/avatar', name: 'Avatar', ready: true },
  { path: '/components/list-cell', name: 'List cell', ready: true },
  { path: '/components/card', name: 'Card', ready: true },
  { path: '/components/section-header', name: 'Section header', ready: true },
  { path: '/components/accordion', name: 'Accordion', ready: true },
  { path: '/components/table', name: 'Table', ready: true },
  { path: '/components/alert', name: 'Alert', ready: true },
  { path: '/components/toast', name: 'Toast', ready: true },
  { path: '/components/snackbar', name: 'Snackbar', ready: true },
  { path: '/components/section-message', name: 'Section message', ready: true },
  { path: '/components/fallback-view', name: 'Fallback view', ready: true },
  { path: '/components/push-badge', name: 'Push badge', ready: true },
  { path: '/components/top-navigation', name: 'Top navigation', ready: true },
  { path: '/components/bottom-navigation', name: 'Bottom navigation', ready: true },
  { path: '/components/tab', name: 'Tab', ready: true },
  { path: '/components/pagination', name: 'Pagination', ready: true },
  { path: '/components/progress', name: 'Progress', ready: true },
  { path: '/components/tooltip', name: 'Tooltip', ready: true },
  { path: '/components/popover', name: 'Popover', ready: true },
  { path: '/components/menu', name: 'Menu', ready: true },
  { path: '/components/popup', name: 'Popup', ready: true },
  { path: '/components/bottom-sheet', name: 'Bottom sheet', ready: true },
  { path: '/components/skeleton', name: 'Skeleton', ready: true },
  { path: '/components/scrim', name: 'Scrim', ready: true },
  { path: '/components/grid', name: 'Grid', ready: true },
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
          <a className="soon">Color</a><a className="soon">Typography</a><a className="soon">Spacing</a>
          <div className="nav-group">Components</div>
          {components.map(c => c.ready
            ? <NavLink key={c.name} to={c.path!} className={({ isActive }) => isActive ? 'active' : ''}>{c.name}</NavLink>
            : <a key={c.name} className="soon">{c.name}</a>)}
        </nav>
        <ThemeToggle />
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/button" element={<ButtonPage />} />
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
          <Route path="/components/tooltip" element={<TooltipPage />} />
          <Route path="/components/popover" element={<PopoverPage />} />
          <Route path="/components/menu" element={<MenuPage />} />
          <Route path="/components/popup" element={<PopupPage />} />
          <Route path="/components/bottom-sheet" element={<BottomSheetPage />} />
          <Route path="/components/skeleton" element={<SkeletonPage />} />
          <Route path="/components/scrim" element={<ScrimPage />} />
          <Route path="/components/grid" element={<GridPage />} />
        </Routes>
      </main>
      <Toc />
    </div>
  );
}
