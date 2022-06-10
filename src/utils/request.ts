
import axios from 'axios'
const request = axios.create({
  // API 请求的默认前缀
  baseURL: window.config.apiUrl as string | undefined,
  timeout: 60000 // 请求超时时间
})
const get = function(url:string,data:unknown):Promise<IResponse> {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'get',
      data: data
    }).then(res => {
      resolve(res.data)
    })
      .catch(err => {
        reject(err)
      })
  })
}
const post = function(url:string,data:unknown):Promise<IResponse> {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'post',
      data: data
    }).then(res => {
      resolve(res.data)
    })
      .catch(err => {
        reject(err)
      })
  })
}
export { request,get,post }