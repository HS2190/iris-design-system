import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * 개발 서버(vite dev)에서는 gtag 스니펫을 아예 제거한다.
 * 전송을 막는 것을 넘어 googletagmanager.com 요청 자체가 생기지 않는다.
 * (프로덕션 빌드를 로컬에서 띄우는 vite preview는 localhost 가드가 막는다 — App.tsx)
 */
function stripAnalyticsInDev(isDev: boolean) {
  return {
    name: 'iris-strip-analytics-in-dev',
    transformIndexHtml(html: string) {
      if (!isDev) return html;
      return html.replace(/[ \t]*<!-- Google tag \(gtag\.js\) -->[\s\S]*?<!-- End Google tag -->\n?/, '');
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), stripAnalyticsInDev(command === 'serve')],
  // GitHub Pages 서브경로(/iris-design-system/) 대응.
  // HashRouter라 문서 경로가 바뀌지 않으므로 상대 base가 안전하다.
  base: './',
  server: { port: 5199 },
}));
