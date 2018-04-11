import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './modules/getters'
import * as mutations from './modules/mutations'
import * as actions from './modules/actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    garment: ''
  },
  getters,
  mutations,
  actions
})
