import { App } from 'vue'
// 使用同步方法
const modules = import.meta.globEager('../directive/**/**.ts')
// 自动导入当前文件夹下的所有自定义指令(默认导出项)
export default (app:App<Element>):void => {
  for (const path in modules) {
    // 排除当前文件
    if(path !== '../directive/index.ts') {
      modules[path].default(app)
    }
  }
}