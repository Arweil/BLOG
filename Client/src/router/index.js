import Vue from 'vue'
// import Router from 'vueRouter'
import Router from 'vue-router'

import Main from '@/views/Main'
import ArticleList from '@/views/ArticleList'
import Article from '@/views/Article'
import Tags from '@/views/Tags'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/work' },
    {
      path: '/:category',
      component: Main,
      children: [
        { path: '', component: ArticleList },
        { path: 'article', name: 'Article', component: Article },
        { path: 'tags', name: 'Tags', component: Tags }
      ]
    },
    { path: '*', redirect: '/work' }
  ]
})

export default router
