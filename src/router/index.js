import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import Shipping from '@/components/OrderShipping'
import Details from '@/components/OrderDetails'
import Options from '@/components/OrderOptions'
import Summary from '@/components/Summary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: Shipping
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/options',
      name: 'Options',
      component: Options
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    }
  ]
})
