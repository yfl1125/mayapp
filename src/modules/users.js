
import { loginpost } from '@/http/user'
export default {
    state: {
        get token() {
            return sessionStorage.getItem('PUSHTOKEN') || ''
        },
        set token(v) {
            if (v) {
                sessionStorage.setItem('PUSHTOKEN', v)
            } else {
                sessionStorage.removeItem('PUSHTOKEN')
            }

        }
    },
    getters: {},
    mutations: {
        gaiToken(state, m) {
            state.token = m
        },
        // 退出，清空token值
        del_token(state) {
            state.token = ''
        }
    },
    actions: {
        // 请求登录接口--成功了委托给mutations 改变state中的token
        async denglu({ commit }, obj) {
            let { data: res } = await loginpost(obj)
            console.log(obj);
            console.log(res);
            if (res.meta.status == 200) {
                commit('gaiToken', res.data.token)
                return Promise.resolve(res.meta.msg)

            } else {
                // alert('登录失败')
                return Promise.reject(res.meta.msg)
            }
        }
    },

}