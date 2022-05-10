import { defineConfig ,loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

const config = loadEnv('','./')
const name = config.VITE_COMPONENT_NAME
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify:false,
    lib: {
      entry: './build/core.entry.ts',
      formats: ['umd'],
      name: name,
      fileName:() => 'core.js'
    }
  }
})
