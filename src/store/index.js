import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
    cartList: []
}

const store = new Vuex.Store({
  state,
  mutations: mutations,
  actions: actions,
  getters: getters
})

export default store