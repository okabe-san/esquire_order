// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import {ClientTable} from 'vue-tables-2'
import VueClip from 'vue-clip'

import './assets/css/main_lib.css'

Vue.use(ClientTable)
Vue.use(VueClip)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
