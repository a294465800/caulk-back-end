// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from '@/assets/api.js'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.prototype.$api = api

/**
 * 全局钩子
 */
router.beforeEach((to, from, next) => {
  if (sessionStorage.username) {
    if (to.name === 'login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (to.name !== 'login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
