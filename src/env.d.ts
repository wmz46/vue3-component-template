// / <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 环境变量智能提示
interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
}

declare module 'postcss-import'
declare module 'tailwindcss'
declare module 'tailwindcss/nesting'
declare module 'rollup-plugin-external-globals'

declare interface Window {
  config: {
    apiUrl:string
    defaultProvice:string
    defaultCity:string
    defaultDistrict:string
  }

}
