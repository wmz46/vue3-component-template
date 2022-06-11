import { App } from 'vue'
import { formatDate, formatNumber, speak } from '@/utils'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $formatDate: (input: Date | string | number, format?: string) => string,
    $formatNumber: (input: string | number, format: string) => string | number,
    $speak:(text:string,rate?:number,lang?:string)=>void
  }
}
export default (app:App<Element>):void => {
  app.config.globalProperties.$formatDate = formatDate
  app.config.globalProperties.$formatNumber = formatNumber
  app.config.globalProperties.$speak = speak
}