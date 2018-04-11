import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    garment: ''
  },
  getters: {
    grament: state => {
      return state.garment
    }
  },
  mutations: {
    updateGarment: (state, payload) => {
      state.garment = payload
    }
  },
  actions: {
    updateGarment ({commit}, payload) {
      commit('updateGarment', payload)
    }
  }
})
