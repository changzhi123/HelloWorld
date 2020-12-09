import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import user from './modules/user'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView' 

import project from './modules/project'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    settings,
    tagsView,
    project,
  },
  getters
})

export default store