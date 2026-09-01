import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import ComponentsIndexPage from './pages/ComponentsIndexPage';
import UtilitiesIndexPage from './pages/UtilitiesIndexPage';
import Toc from './components/Toc';
import { componentGroups, utilityItems, utilSlugs } from './nav';
import { posts } from './pages/behind/posts';
import TwoLayerTokens from './pages/behind/TwoLayerTokens';
import PhosphorIcons from './pages/behind/PhosphorIcons';
import PlatformTokens from './pages/behind/PlatformTokens';
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

// 컴포넌트 목록은 nav.ts가 단일 소스 (랜딩 인덱스와 공유)

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


/** 랜딩 히어로가 GNB 뒤에 걸쳐 있는 동안 true — 내비를 이미지 위에 얹기 위해. */
function useHeroOverlay(active: boolean) {
  const [over, setOver] = useState(false);
  useEffect(() => {
    if (!active) { setOver(false); return; }
    setOver(true);
    let io: IntersectionObserver | undefined;
    const raf = requestAnimationFrame(() => {
      const hero = document.querySelector('.lp-hero-media');
      if (!hero) return;
      io = new IntersectionObserver(([e]) => setOver(e.isIntersecting),
        { rootMargin: '-60px 0px 0px 0px' });
      io.observe(hero);
    });
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, [active]);
  return over;
}


/**
 * HashRouter는 라우트가 바뀌어도 페이지를 다시 읽지 않는다.
 * gtag의 자동 페이지뷰는 최초 로드 1회뿐이라 문서 페이지 이동이 전혀 집계되지 않는다.
 * 그래서 index.html에서 send_page_view: false로 자동 전송을 끄고,
 * 라우트가 바뀔 때마다 여기서 직접 page_view를 보낸다(최초 진입 포함).
 *
 * 로컬 차단의 1차 방어선은 index.html의 hostname 가드(gtag config 자체를 건너뛴다)다.
 * 여기 isLocal()은 그 아래 남겨둔 2차 방어선이다 — 수동 page_view만 막을 수 있어
 * 단독으로는 session_start·first_visit 같은 자동 이벤트를 못 막는다.
 */
const isLocal = () => /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

function usePageView(pathname: string) {
  useEffect(() => {
    if (isLocal()) return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (!w.gtag) return;
    w.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const heroOver = useHeroOverlay(isHome);
  usePageView(pathname);
  const section = pathname.startsWith('/behind') ? 'behind'
    : pathname.startsWith('/foundations') || pathname === '/components/icon' ? 'foundations'
    : pathname === '/utilities' || utilSlugs.some(sl => pathname === `/components/${sl}`) ? 'utilities'
    : 'components';
  return (
    <div className="shell">
      <header className={[
        'gnb',
        heroOver ? 'over' : '',
        // 랜딩에서는 본문(.lp-wrap)과 같은 폭으로 묶어 브랜드가 섹션 내용과 정렬되게 한다.
        // 문서 페이지는 사이드바가 왼쪽 끝을 잡고 있으므로 전체 폭을 유지한다.
        isHome ? 'gnb--wrapped' : '',
      ].filter(Boolean).join(' ')}>
        <div className="gnb-inner">
          <NavLink to="/" className="gnb-brand">
            <span className="brand-mark" aria-hidden />
            <b>Iris</b>
          </NavLink>
          <nav className="gnb-nav">
            <NavLink to="/foundations" className={() => !isHome && section === 'foundations' ? 'active' : ''}>Foundations</NavLink>
            <NavLink to="/components" className={() => !isHome && section === 'components' ? 'active' : ''}>Components</NavLink>
            <NavLink to="/utilities" className={() => !isHome && section === 'utilities' ? 'active' : ''}>Utilities</NavLink>
            <NavLink to="/behind" className={() => !isHome && section === 'behind' ? 'active' : ''}>Behind</NavLink>
          </nav>
          <div className="gnb-right"><ThemeToggle /></div>
        </div>
      </header>
      {isHome ? (
        <main className="landing">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      ) : (
        <div className="layout">
          <aside className="sidebar">
            <nav className="nav">
              {section === 'foundations' && <>
                <div className="nav-group">Foundations</div>
                <NavLink to="/foundations" end className={({ isActive }) => isActive ? 'active' : ''}>개요</NavLink>
                {[['Color', '/foundations/color'], ['Typography', '/foundations/typography'], ['Spacing', '/foundations/spacing'], ['Elevation', '/foundations/elevation'], ['Platform', '/foundations/platform'], ['Icon', '/components/icon']].map(([n, p]) => (
                  <NavLink key={p} to={p} className={({ isActive }) => isActive ? 'active' : ''}>{n}</NavLink>
                ))}
              </>}
              {section === 'components' && componentGroups.map(([cat, items]) => (
                <span key={cat} style={{ display: 'contents' }}>
                  <div className="nav-group">{cat}</div>
                  {items.map(([name, slug]) => (
                    <NavLink key={slug} to={`/components/${slug}`} className={({ isActive }) => isActive ? 'active' : ''}>{name}</NavLink>
                  ))}
                </span>
              ))}
              {section === 'behind' && <>
                <div className="nav-group">Behind</div>
                {posts.map(post => (
                  <NavLink key={post.slug} to={`/behind/${post.slug}`} className={({ isActive }) => isActive ? 'active' : ''}>{post.title}</NavLink>
                ))}
              </>}
              {section === 'utilities' && <>
                <div className="nav-group">Utilities</div>
                <NavLink to="/utilities" end className={({ isActive }) => isActive ? 'active' : ''}>개요</NavLink>
                {utilityItems.map(([name, slug]) => (
                  <NavLink key={slug} to={`/components/${slug}`} className={({ isActive }) => isActive ? 'active' : ''}>{name}</NavLink>
                ))}
              </>}
            </nav>
          </aside>
          <main className="main">
            <Routes>
              <Route path="/components" element={<ComponentsIndexPage />} />
              <Route path="/utilities" element={<UtilitiesIndexPage />} />
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
              <Route path="/behind" element={<Navigate to={`/behind/${posts[0].slug}`} replace />} />
              <Route path="/behind/two-layer-tokens" element={<TwoLayerTokens />} />
              <Route path="/behind/phosphor-icons" element={<PhosphorIcons />} />
              <Route path="/behind/platform-tokens" element={<PlatformTokens />} />
            </Routes>
          </main>
          <Toc />
        </div>
      )}
    </div>
  );
}
