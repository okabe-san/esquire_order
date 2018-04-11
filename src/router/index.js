import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import Shipping from '@/components/OrderShipping'
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
      path: '/summary',
      name: 'Summary',
      component: Summary
    }
  ]
})
