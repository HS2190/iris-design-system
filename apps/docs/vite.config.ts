import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 서브경로(/iris-design-system/) 대응.
  // HashRouter라 문서 경로가 바뀌지 않으므로 상대 base가 안전하다.
  base: './',
  server: { port: 5199 },
});
