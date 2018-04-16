import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // for step 1
    rep: '',
    garment: '',
    method: '',
    split: false,
    addresses: [{address: '', detail: ''}],
    // for step 2
    re_order: null,
    edit_order: false,
    order_picked: '',
    // for step 3
    option_checked: [],
    comments: ''
  },
  mutations,
  actions
})
