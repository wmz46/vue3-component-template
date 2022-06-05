
/**
 * localStorage设置有效期
 * @param name localStorage设置名称
 * @param data 数据对象
 */
export function setLocal(name:string, data:unknown):void {
  localStorage.setItem(name, JSON.stringify(data))
}
/**
* 获取localStorage对象并转成对应的类型
* @param name localStorage设置名称
*/
export function getLocal<T>(name:string):T {
  const l = localStorage.getItem(name)
  const local = JSON.parse(l !== null ? l : '{}') as unknown as T
  return local
}

/**
 * 函数节流
 * @param time 间隔时间
 */
export function throttle(time = 500):()=>Promise<void> {
  let timer:NodeJS.Timeout | null = null
  let firstTime = true
  return () => {
    return new Promise(resolve => {
      if(firstTime) {
        resolve()
        return firstTime = false
      }
      if(timer) return false
      timer = setTimeout(() => {
        if(timer) clearTimeout(timer)
        timer = null
        resolve()
      }, time)
    })
  }
}