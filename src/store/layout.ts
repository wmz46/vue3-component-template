import { defineStore } from 'pinia'

export const useLayoutStore = defineStore({
  id:'layout',
  state: () => ({
    // 局部变量
    a:1
  }),
  getters: {
    // get方法
    getA():number {
      return this.a
    }

  },
  actions:{
    // set方法
    setA(a:number) {
      this.a = a
    }
  }
})