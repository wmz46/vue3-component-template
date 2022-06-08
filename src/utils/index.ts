
import dayjs from 'dayjs'
/**
 * localStorage设置有效期
 * @param name localStorage设置名称
 * @param data 数据对象
 */
export function setLocal(name: string, data: unknown): void {
  localStorage.setItem(name, JSON.stringify(data))
}
/**
* 获取localStorage对象并转成对应的类型
* @param name localStorage设置名称
*/
export function getLocal<T>(name: string): T {
  const l = localStorage.getItem(name)
  const local = JSON.parse(l !== null ? l : '{}') as unknown as T
  return local
}

/**
 * 函数节流
 * @param time 间隔时间
 */
export function throttle(time = 500): () => Promise<void> {
  let timer: NodeJS.Timeout | null = null
  let firstTime = true
  return () => {
    return new Promise(resolve => {
      if (firstTime) {
        resolve()
        return firstTime = false
      }
      if (timer) return false
      timer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        timer = null
        resolve()
      }, time)
    })
  }
}

/**
 * 格式化日期
 * @param input
 * @param format
 * @returns
 */
export function formatDate(input: Date | string | number, format?: string): string {
  if (!input) {
    return ''
  }
  let date
  if (!format) {
    format = 'yyyy-MM-dd'
  }
  format = format.replace(/y/g, 'Y').replace(/([^d]|^)(d)([^d]|$)/g, '$1D$3')
    .replace(/([^d]|^)(dd)([^d]|$)/g, '$1DD$3') // 不区分大小写
  if (input instanceof Date) {
    date = input
  } else if (typeof (input) != 'string') {
  } else if (input.indexOf('Date') > -1) {
    // 从字符串 /Date(1448864369815)/ 得到时间戳 1448864369815
    const timestamp = Number(input.replace(/\/Date\((\d+)\)\//, '$1'))
    if (!timestamp) {
      return input
    }
    date = new Date().setTime(timestamp)
  } else {
    date = input
  }

  // 转成指定格式
  return dayjs(date).format(format)

}
/**
 * 格式化数字
 * @param input
 * @param format
 * @returns
 */
export function formatNumber(input: string | number, format: string): string | number {
  const f = parseFloat((`${input}`).replaceAll(',', ''))
  let digits = 0
  if (/^[pP](\d*)$/.test(format)) {
    const group = format.match(/^[pP](\d*)$/)
    if (!group || !group[1] || group[1].length == 0) {
      digits = 2
    }
    const multiple = Math.pow(10, digits)
    return `${Math.round(f * 100 * multiple) / multiple}%`
  } else if (/^[fF](\d*)$/.test(format)) {
    const group = format.match(/^[fF](\d*)$/)
    if (!group || !group[1] || group[1].length == 0) {
      digits = 2
    }
    const multiple = Math.pow(10, digits)
    let num = `${Math.round(f * multiple) / multiple}`
    if (digits > 0) {
      let n = digits
      if (num.indexOf('.') > -1) {
        n -= num.split('.')[1].length
      } else {
        num += '.'
      }
      for (let i = 0; i < n; i++) {
        num += '0'
      }
    }
    return num
  } else if (/^[nN](\d*)$/.test(format)) {
    const group = format.match(/^[nN](\d*)$/)
    if (!group || !group[1] || group[1].length == 0) {
      digits = 2
    }
    const multiple = Math.pow(10, digits)
    const num = `${Math.round(f * multiple) / multiple}`
    const res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
        return `${$1},`
      })
    })
    return res
  } else {
    return f
  }
}