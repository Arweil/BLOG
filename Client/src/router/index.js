import Vue from 'vue'
// import Router from 'vueRouter'
import Router from 'vue-router'

import Main from '@/views/Main'
import ArticleList from '@/views/ArticleList'
import Article from '@/views/Article'
import Life from '@/views/Life'
import Tags from '@/views/Tags'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/work' },
    {
      path: '/work',
      component: Main,
      children: [
        { path: '', component: ArticleList },
        { path: 'article', name: 'Article', component: Article },
        { path: 'tags', name: 'Tags', component: Tags }
      ]
    },
    {
      path: '/life',
      component: Main,
      children: [
        { path: '', component: Life }
      ]
    },
    { path: '*', redirect: '/work' }
  ]
})

export default router
