import Vue from 'vue'
import Vuex from 'vuex'
import article from '@/store/modules/article'
import APIMain from '@/api/main'
import * as types from '@/store/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteName: '',
    yourName: '', // 你的名字
    sign: '', // 个性签名
    addr: '',
    email: '',
    company: '',
    job: '',
    git: '',
    sina: '',
    category: ''
  },
  actions: {
    getBaseData ({ commit }) {
      APIMain.getBaseData().then((data) => {
        data = data.data
        commit(types.getBaseDataSuccess, data)
      }, () => {
        commit(types.getBaseDataError)
      })
    },
    changeCategory ({ commit }, { category }) {
      commit('changeCategory', category)
    }
  },
  mutations: {
    [types.getBaseDataSuccess] (state, data) {
      state.siteName = data.siteName
      state.yourName = data.yourName
      state.sign = data.sign
      state.addr = data.addr
      state.email = data.email
      state.company = data.company
      state.job = data.job
      state.git = data.git
      state.sina = data.sina
    },
    [types.getBaseDataError] (state) {
      console.log('getBaseDataError')
    },
    changeCategory (state, category) {
      console.log(category)
      state.category = category
    }
  },
  modules: {
    article
  }
})
