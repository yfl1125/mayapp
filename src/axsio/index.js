import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index'
// 公共参数 地址前缀
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = store.getters.token
    return config
}, function (error) {
    return Promise.reject(error)
})
// 请求拦截 token 开启loading

axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    if (response.data.meta.status == 200 || response.data.meta.status == 201 || response.data.meta.status == 204) {
        Message.success(response.data.meta.msg)
    } else {
        Message.error(response.data.meta.msg)
    }
    return response
}), function (err) {
    return Promise.reject(err)
}
// 响应拦截  数据处理 处理错误 关闭loading
export default axios