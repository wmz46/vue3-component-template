import { defineStore } from 'pinia'
import { getLocal,setLocal } from '@/utils'
const setting = getLocal<ISetting>('setting')
export const useLayoutStore = defineStore({
  id:'layout',
  state: () => ({
    setting: {
      theme: setting.theme !== undefined ? setting.theme : 0,
      showTags: setting.showTags !== undefined ? setting.showTags : true,
      color: {
        primary: setting.color !== undefined ? setting.color.primary : '#409eff'
      },
      usePinyinSearch: setting.usePinyinSearch !== undefined ? setting.usePinyinSearch : false,
      mode: setting.mode || 'vertical',
      isPhone: document.body.offsetWidth < 768
    }
  }),
  getters: {
    getSetting():ISetting {
      return this.setting
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
    }
  }
})