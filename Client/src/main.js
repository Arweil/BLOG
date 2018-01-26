import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
// import _ from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   const arrPath = to.path.split('/')
//   const category = arrPath.length > 1 ? to.path.split('/')[1] : 'work'

//   store.dispatch('changeCategory', { category }).then(() => {
//     next()
//   })
// })

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-milk-blog.js')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
