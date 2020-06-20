/**
 * Api 配置
 * Created by Administrator on 2017/5/18 0018.
 */

import axios from 'axios'
// 默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  // baseURL: 'http://172.17.16.64:8083/Liems/',
  baseURL: 'http://172.17.16.246:8080/Liems/',
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 8000 // request timeout
})
// 接收token
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  let token = localStorage.getItem('token') //localStorage.setItem('token',)
  // config.headers['Authorization'] = token
  // return config
  if (token) {
    config.headers['Authorization'] = 'bearer ' + token
  }
  return config
}, function (error) {
  router.push('/')
  return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.push('/')
    }
  }
  return Promise.reject(error)
})

export default service
