import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import OrderEntry from '@/components/OrderEntry'
import Shipping from '@/components/OrderShipping'
import Options from '@/components/OrderOptions'
import Summary from '@/components/Summary'
import Thanks from '@/components/Thanks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/entry',
      name: 'Entry',
      component: OrderEntry
    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: Shipping
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
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks
    }
  ]
})
