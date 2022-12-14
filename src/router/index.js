
import store from '@/store'

import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login'),
    meta: {
      t: true
    },
  }, {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/Home.vue'),
    meta: {
      title: '主页',
      t: false
    },
    children: [
      {
        path: '/users',
        component: () => import('../view/users.vue'),
        meta: {
          title: '用户列表',
        },
      },
      {
        path: '/roles',
        component: () => import('../view/roles.vue'),
        meta: {
          title: '角色列表',
        },
      },
      {
        path: '/rights',
        component: () => import('../view/rights.vue'),
        meta: {
          title: '权限列表',
        },
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  if (to.meta.t == true) {
    next()
  } else {
    if (store.getters.token) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router
