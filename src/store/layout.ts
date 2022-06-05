import { defineStore } from 'pinia'
import { getLocal,setLocal } from '@/utils'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import router from '@/router/index'
enum IMenubarStatus {
  PCE, // 电脑展开
  PCN, // 电脑合并
  PHE, // 手机展开
  PHN // 手机合并
}
const setting = getLocal<ISetting>('setting')
const ACCESS_TOKEN = localStorage.getItem('token')
const module = localStorage.getItem('module')
export const useLayoutStore = defineStore({
  id:'layout',
  state: ():ILayout => ({
    menubar: {
      status: document.body.offsetWidth < 768 ? IMenubarStatus.PHN : IMenubarStatus.PCE,
      menuList: [],
      isPhone: document.body.offsetWidth < 768
    },
    setting: {
      theme: setting.theme !== undefined ? setting.theme : 0,
      showTags: setting.showTags !== undefined ? setting.showTags : true,
      color: {
        primary: setting.color !== undefined ? setting.color.primary : '#409eff'
      },
      usePinyinSearch: setting.usePinyinSearch !== undefined ? setting.usePinyinSearch : false,
      mode: setting.mode || 'vertical',
      isPhone: document.body.offsetWidth < 768
    },
    // 标签栏
    tags: {
      tagsList: [],
      cachedViews: []
    },
    // 用户信息
    userInfo: {
      name: '',
      role: [],
      avatar:''
    },
    status: {
      isLoading: false,
      ACCESS_TOKEN: ACCESS_TOKEN || '',
      module:module || ''
    }
  }),
  getters: {
    getA() {
      return 1
    },
    getSetting():ISetting {
      return this.setting
    },
    getMenubar():IMenubar {
      return this.menubar
    },
    getTags():ITags {
      return this.tags
    },
    getUserInfo():IUserInfo {
      return this.userInfo
    }

  },
  actions:{
    // 修改主题
    changeTheme(num?:number):void {
      if(num === this.setting.theme) return
      if(typeof num !== 'number') num = this.setting.theme
      this.setting.theme = num
      setLocal('setting',this.setting)
    },
    // 修改主题色
    changeThemeColor(color: string):void {
      this.setting.color.primary = color
      setLocal('setting',this.setting)
    },
    changeDeviceWidth():void {
      this.menubar.isPhone = document.body.offsetWidth < 768
      this.menubar.status = this.menubar.isPhone ? IMenubarStatus.PHN : IMenubarStatus.PCE
    },
    changeCollapsed():void {
      this.menubar.status = this.menubar.isPhone
        ? this.menubar.status === IMenubarStatus.PHN
          ? IMenubarStatus.PHE
          : IMenubarStatus.PHN
        : this.menubar.status === IMenubarStatus.PCN
          ? IMenubarStatus.PCE
          : IMenubarStatus.PCN
    },
    setRoutes(data: Array<IMenubarList>):void {
      this.menubar.menuList = data
    },
    logout():void {
      this.status.ACCESS_TOKEN = ''
      localStorage.removeItem('token')
      history.go(0)
    },
    setModule(module:string):void {
      this.status.module = module
      localStorage.setItem('module', module)
    },
    changeTagsSetting(showTags:boolean):void {
      this.setting.showTags = showTags
      setLocal('setting', this.setting)

      if(showTags) {
        const index = this.tags.tagsList.findIndex(v => v.path === router.currentRoute.value.path)
        if(index !== -1) {
          this.tags.tagsList.forEach(v => v.isActive = false)
          this.tags.tagsList[index].isActive = true
        }else{
          this.changeTagNavList(router.currentRoute.value)
        }
      }
    },
    // 切换导航，记录打开的导航
    changeTagNavList(cRouter:RouteLocationNormalizedLoaded):void {
      if(!this.setting.showTags) return // 判断是否开启多标签页
      // if(cRouter.meta.hidden && !cRouter.meta.activeMenu) return // 隐藏的菜单如果不是子菜单则不添加到标签
      if(new RegExp('^\/redirect').test(cRouter.path)) return
      const index = this.tags.tagsList.findIndex(v => v.path === cRouter.path)
      this.tags.tagsList.forEach(v => v.isActive = false)
      // 判断页面是否打开过
      if(index !== -1) {
        this.tags.tagsList[index].isActive = true
        return
      }
      const tagsList:ITagsList = {
        name: cRouter.name as string,
        title: cRouter.meta.title as string,
        path: cRouter.path,
        isActive: true
      }
      this.tags.tagsList.push(tagsList)
    },
    changePinSearchSetting(showPinyinSearch:boolean):void {
      this.setting.usePinyinSearch = showPinyinSearch
      setLocal('setting', this.setting)
    },
    changemenubarMode(mode: 'horizontal' | 'vertical'):void {
      this.setting.mode = mode
      localStorage.setItem('setting', JSON.stringify(this.setting))
    }

  }
})