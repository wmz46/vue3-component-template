import { MockMethod } from 'vite-plugin-mock'

const responseData = (code: number, message: string, data: any) => {
  return {
    code: code,
    success:(code == 200),
    message: message,
    data: data
  }
}
export default[
  {
    url:'/api/test',
    method:'get',
    timeout:300,
    response:() => {
      return responseData(200, 'hello', null)
    }
  },
  {
    url:'/api/login',
    method:'post',
    timeout:300,
    response:() => {
      return responseData(401, '用户名或密码错误', null)
    }
  }
] as MockMethod[]