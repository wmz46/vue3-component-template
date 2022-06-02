import { get,post } from '@/utils/request'

const api = {
  testUrl : '/api/test',
  loginUrl : '/api/login'
}
const login = ():Promise<IResponse> => {
  return post(api.loginUrl,null)
}
const test = ():Promise<IResponse> => {
  return get(api.testUrl,null)
}

export {
  login,
  test
}