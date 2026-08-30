import { Routes, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Toc from './components/Toc';
import ButtonPage from './pages/ButtonPage';

const components = [
  { path: '/components/button', name: 'Button', ready: true },
  { name: 'Icon', ready: false }, { name: 'Chip', ready: false }, { name: 'Content badge', ready: false },
  { name: 'Text field', ready: false }, { name: 'Checkbox', ready: false }, { name: 'Switch', ready: false }, { name: 'Divider', ready: false },
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
        </Routes>
      </main>
      <Toc />
    </div>
  );
}
