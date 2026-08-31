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
        </Routes>
      </main>
      <Toc />
    </div>
  );
}
