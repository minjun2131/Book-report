import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://openapi.naver.com/v1/search/",
  //       changeOrigin: true,
  //       secure: false, // HTTPS 요청을 HTTP로 바꿀 때 사용
  //       rewrite: (path) => path.replace(/^\/api/, ""), // "/api"를 제거하여 프록시
  //     },
  //   },
  // },
});
