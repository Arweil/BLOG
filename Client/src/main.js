import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
// import _ from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

// function isMobile () {
//   const reg = /(nokia|iphone|android|ipad|motorola|^mot-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i

//   if (reg.test(navigator.userAgent)) {
//     return true
//   } else {
//     return false
//   }
// }

router.beforeEach((to, from, next) => {
  const arrPath = to.path.split('/')
  const category = arrPath.length > 1 ? to.path.split('/')[1] : 'work'

  store.dispatch('changeCategory', { category }).then(() => {
    // const flag = isMobile()
    // if (flag && to.path !== '/mobile') {
    //   console.log(`beforeEach --- /mobile`)
    //   next('/mobile')
    // } else if (!flag && to.path === '/mobile') {
    //   console.log(`beforeEach --- /work`)
    //   next('/work')
    // } else {
    //   console.log(`beforeEach`)
    //   next()
    // }
    next()
  })
})

// window.onresize = _.throttle(() => {
//   console.log(router.history.current.path)
//   const flag = isMobile()
//   if (flag) {
//     router.push('/mobile')
//   } else {
//     router.push('/work')
//   }
// }, 1000)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
