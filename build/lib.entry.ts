import { App } from 'vue'
import HelloWorld from '../src/components/HelloWorld.vue'


// 让组件可以通过 app.use() 的形式使用
export function install(app: App):void {
  app.component(HelloWorld.name, HelloWorld)
}
export { HelloWorld }
export default{
  install
}