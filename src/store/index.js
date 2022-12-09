import { loginpost } from '@/http/user'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('PUSHTOKEN') || ''
  },
  getters: {
  },
  mutations: {
    gaiToken(state, m) {
      state.token = m
      sessionStorage.setItem('PUSHTOKEN', m)
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

      } else {
        alert('登录失败')
      }
    }
  },
  modules: {
  }
})
