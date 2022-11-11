import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['./src/components/library'],
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // vite中引用less全局样式，注意分号
        additionalData: `@import '@/assets/styles/variable.less';@import '@/assets/styles/mixins.less';`,
        javascriptEnabled: true
      }
    }
  }
});
