
import users from '@/modules/users'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {
    token(state) {
      return state.users.token
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    users
  }
})
