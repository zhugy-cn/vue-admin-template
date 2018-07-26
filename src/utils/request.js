import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import config from '@/config'

// 创建axios实例
const request = axios.create({
    baseURL: config.baseURL,
    timeout: 5000
})


// request 拦截器
request.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['token'] = store.getters.token
    }
    return config;
}, error => {
    console.log('请求拦截器', error)
});


// response 拦截器
request.interceptors.response.use(response => {
    const { data, status } = response
    if (data.code === 0) {
        return response.data
    } else {
        return Promise.reject('code码不等于 0')
    }
}, error => {
    // 包含错误信息，只要服务器返回的状态码不是 2 开头都走这
    const { data, status } = error.response;
    console.log('响应拦截器错误')
    Message.error(error.message)
    return Promise.reject()
});

export default request;
