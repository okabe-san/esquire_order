import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    garmet: ''
  },
  getters: {
    updateGramet: state => {
      return state.garmet + ''
    }
  },
  mutations: {
    getGarment: state => {
      state.garment = 'hi'
    }
  }
})
