import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * 라이브러리 빌드 — 소비자가 번들러 설정 없이 쓸 수 있게 만든다.
 * CSS Modules는 여기서 처리해 단일 iris-react.css로 뽑는다(소비자 설정 의존 제거).
 */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'index.js' },
    // React는 소비자 것을 쓴다
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      // exports 맵에 선언한 이름과 일치시킨다
      output: { assetFileNames: 'iris-react.[ext]' },
    },
    // 컴포넌트별로 쪼개지 않고 한 파일로 — import 한 줄이면 끝나게
    cssCodeSplit: false,
    cssMinify: true,
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      // 소비자 CSS와 충돌하지 않게 접두사를 붙인다
      generateScopedName: 'iris-[local]-[hash:base64:5]',
    },
  },
});
