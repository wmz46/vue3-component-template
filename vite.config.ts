import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import nesting from 'tailwindcss/nesting'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {

  const prodMock = true
  return {
    plugins: [vue(),
      legacy({
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 兼容旧版本浏览器
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
      import { setupProdMockServer } from '/mock/mockProdServer';
      setupProdMockServer();
      `
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
    css: {
      postcss: {
        plugins: [
          postcssImport,
          nesting,
          autoprefixer,
          tailwindcss
        ]
      }
    }
  }
}
