import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import nesting from 'tailwindcss/nesting'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'




// https://vitejs.dev/config/
export default defineConfig ({
  plugins: [vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 兼容旧版本浏览器
    }),
    viteMockServe()
    // 按需导入element-plus组件
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })

  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        nesting,
        autoprefixer,
        tailwindcss
      ]
    }
  },
  build:{
    chunkSizeWarningLimit: 1500
  }

})
