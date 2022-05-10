import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import nesting from 'tailwindcss/nesting'


const config = loadEnv('','./')
const name = config.VITE_COMPONENT_NAME
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css:{
    postcss:{
      plugins:[
        postcssImport,
        nesting,
        autoprefixer,
        tailwindcss
      ]
    }
  },
  build: {
    lib: {
      entry: './build/lib.entry.ts',
      formats: ['es', 'umd'],
      name: name,
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
