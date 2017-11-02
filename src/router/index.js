import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import indexContent from '@/components/indexContent'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: index,
      children: [{
        path: '',
        name: 'indexContent',
        component: indexContent
      }]
    }
  ]
})
