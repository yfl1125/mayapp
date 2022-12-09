import axios from 'axios'
// 公共参数 地址前缀
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"



// 请求拦截 token 开启loading


// 响应拦截  数据处理 处理错误 关闭loading
export default axios