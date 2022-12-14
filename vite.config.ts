import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteMockPlugin from './plugins/viteMockPlugin/index';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: []
  },
  build: {
    sourcemap: true
  },
  plugins: [
    vue(),
    vueJsx(),
    // viteMockServe({
    //   mockPath: 'mock',
    //   localEnabled: true
    // }),
    Components({
      dirs: ['./src/components/library'],
      dts: 'src/components.d.ts'
    }),
    viteMockPlugin({
      mockPath: 'mock/collect.js'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    modules: {
      // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix'
    },
    preprocessorOptions: {
      less: {
        // vite中引用less全局样式，注意分号
        additionalData: `@import '@/assets/styles/variable.less';@import '@/assets/styles/mixins.less';`,
        javascriptEnabled: true
      }
    }
  }
});
