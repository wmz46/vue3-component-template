import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import nesting from 'tailwindcss/nesting'
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
  }
})
