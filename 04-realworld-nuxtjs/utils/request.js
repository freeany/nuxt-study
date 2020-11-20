import axios from 'axios'
import { getCookie } from './cookie'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 这里的token需要在cookie中或者vuex中拿，如果在cookie中拿数据，那么就用这种方式，如果要在vuex中拿数据，那么要放到plugins中。两种解决方式
    const token = getCookie()
    if (token && JSON.parse(token).token) {
      config.headers['Authorization'] = `Token ${JSON.parse(token).token}`
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
