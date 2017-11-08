import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import indexContent from '@/components/indexContent'
import reservationList from '@/components/reservationList'
import commodityList from '@/components/commodityList'
import commodityAdd from '@/components/commodityAdd'
import commodityAddStandard from '@/components/commodityAddStandard'
import commodityStandardsList from '@/components/commodityStandardsList'
import commoditySpecificList from '@/components/commoditySpecificList'
import commoditySpecificEdit from '@/components/commoditySpecificEdit'
import commoditySpecificImages from '@/components/commoditySpecificImages'
import commoditySpecificAddImg from '@/components/commoditySpecificAddImg'
import commodityOrder from '@/components/commodityOrder'
import commodityOrderOne from '@/components/commodityOrderOne'
import commodityImages from '@/components/commodityImages'
import indexImages from '@/components/indexImages'
import companyImages from '@/components/companyImages'

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
        path: '/list/commodity/add/standard',
        name: 'commodityAddStandard',
        component: commodityAddStandard
      }, {
        path: '/list/commodity/standards',
        name: 'commodityStandardsList',
        component: commodityStandardsList
      }, {
        path: '/list/commodity/specific',
        name: 'commoditySpecificList',
        component: commoditySpecificList
      }, {
        path: '/list/commodity/specific/edit',
        name: 'commoditySpecificEdit',
        component: commoditySpecificEdit
      }, {
        path: '/list/commodity/specific/images',
        name: 'commoditySpecificImages',
        component: commoditySpecificImages
      }, {
        path: '/list/commodity/specific/images/add',
        name: 'commoditySpecificAddImg',
        component: commoditySpecificAddImg
      }, {
        path: '/list/order',
        name: 'commodityOrder',
        component: commodityOrder
      }, {
        path: '/list/order/one',
        name: 'commodityOrderOne',
        component: commodityOrderOne
      }, {
        path: '/list/commodity/images',
        name: 'commodityImages',
        component: commodityImages
      }, {
        path: '/index/images',
        name: 'indexImages',
        component: indexImages
      }, {
        path: '/company/images',
        name: 'companyImages',
        component: companyImages
      }]
    }
  ]
})
