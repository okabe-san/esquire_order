import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
