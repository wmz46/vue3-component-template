import { App } from 'vue'
// 使用同步方法
const components = import.meta.globEager('../components/*/index.vue')
// 自动导入当前文件夹下的所有自定义组件
export default (app:App<Element>):void => {
  for (const path in components) {
    const component = components[path].default
    // 如果组件未定义名称，则根据文件夹名称命名
    const name = component.name || path.split('/').slice(-2,-1)
    app.component(name,component)
  }
}