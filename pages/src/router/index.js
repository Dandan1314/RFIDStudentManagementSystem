/**
 * @intro: 路由配置.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {UserLogin, FullLayout} from './auto-routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'hash', // default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

// 全局路由配置
// 路由开始之前的操作
router.beforeEach((to, from, next) => {
  // 在最开始这里可以添加错误页跳转逻辑
  if ((to.path === UserLogin.path) && !localStorage['loginInfo']) {
    next()
  }
  if ((to.path !== UserLogin.path) && !localStorage['loginInfo']) {
    router.replace(UserLogin.path)
  }
  if (localStorage['loginInfo'] && (to.path === UserLogin.path)) {
    router.replace(FullLayout.path)
  }
  if (localStorage['loginInfo'] && (to.path !== UserLogin.path)) {
    next()
  }
})

// 路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
