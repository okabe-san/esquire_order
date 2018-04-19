import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // for step 1
    re_order: null,
    edit_order: false,
    order_picked: '',
    // for step 2
    rep: '',
    garment: '',
    split: false,
    addresses: [{address: '', method: '', detail: ''}],
    // for step 3
    option_checked: [],
    comments: ''
  },
  mutations,
  actions
})
