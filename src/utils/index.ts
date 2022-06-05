
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