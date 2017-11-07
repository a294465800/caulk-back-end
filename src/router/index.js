import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import indexContent from '@/components/indexContent'
import reservationList from '@/components/reservationList'
import commodityList from '@/components/commodityList'
import commodityAdd from '@/components/commodityAdd'
import commodityAddStandard from '@/components/commodityAddStandard'
import commodityOrder from '@/components/commodityOrder'
import commodityImages from '@/components/commodityImages'

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
      }, {
        path: '/list/reservation',
        name: 'reservationList',
        component: reservationList
      }, {
        path: '/list/commodity',
        name: 'commodityList',
        component: commodityList
      }, {
        path: '/list/commodity/add',
        name: 'commodityAdd',
        component: commodityAdd
      }, {
        path: '/list/commodity/addStandard',
        name: 'commodityAddStandard',
        component: commodityAddStandard
      }, {
        path: '/list/order',
        name: 'commodityOrder',
        component: commodityOrder
      }, {
        path: '/list/commodity/images',
        name: 'commodityImages',
        component: commodityImages
      }]
    }
  ]
})
