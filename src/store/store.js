import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    rep: '',
    garment: '',
    method: '',
    splitDetails: [{address: '', detail: ''}]
  },
  getters,
  mutations,
  actions
})
