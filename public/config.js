/**
 * 这里写无需编译入包的公共属性和方法，只放与安全无关且不敏感的数据。
 * 为了在写ts有更好的体验，请在env.d.ts中定义好相应的Window接口
 */
window.config = config = {
  apiUrl:'',
  appName:'我的应用',
  defaultProvice: '广东省',
  defaultCity: '汕头市',
  defaultDistrict: '澄海区'
}
// 动态设置首页标题
document.title = config.appName