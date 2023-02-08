import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteMockPlugin from './plugins/vite-mock-plugin/index';
import viteCompression from 'vite-plugin-compression';
import imagemin from 'unplugin-imagemin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: []
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vee: ['vee-validate']
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    // viteMockServe({
    //   mockPath: 'mock',
    //   localEnabled: true
    // }),
    viteCompression(),
    imagemin({
      // Default mode squoosh. support squoosh and sharp
      mode: 'squoosh',
      // Default configuration options for compressing different pictures
      compress: {
        jpg: {
          quality: 0,
        },
        jpeg: {
          quality: 70,
        },
        png: {
          quality: 70,
        },
        webp: {
          quality: 70,
        },
      },
      // The type of picture converted after the build
      conversion: [
        { from: 'png', to: 'jpeg' },
        { from: 'jpeg', to: 'webp' },
      ]
    }),
    Components({
      dirs: ['./src/components/library'],
      dts: 'src/components.d.ts'
    }),
    viteMockPlugin({
      mockPath: 'mock/collect.js'
    }),
    visualizer()
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
