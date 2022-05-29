import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import nesting from 'tailwindcss/nesting'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    legacy({
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 兼容旧版本浏览器
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  css:{
    postcss:{
      plugins:[
        postcssImport,
        nesting,
        autoprefixer,
        tailwindcss
      ]
    }
  }
})
