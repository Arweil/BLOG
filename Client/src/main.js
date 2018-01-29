import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
// import _ from 'lodash'
import infiniteScroll from 'vue-infinite-scroll'

import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.use(infiniteScroll)

router.beforeEach((to, from, next) => {
  console.log(`beforeEach`)
  store.dispatch('changeCategory', { category: to.params.category }).then(next)
})

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
