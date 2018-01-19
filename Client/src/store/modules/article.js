import marked from 'marked'
import { APIArticle } from '@/api/index'
import * as types from '@/store/mutation-types'

export default {
  state: {
    articleList: [],
    curArticle: {
      id: '',
      title: '',
      desc: '',
      time: '',
      tags: [],
      mdContent: ''
    },
    artsTag: []
  },
  getters: {
    ArticleContent (state) {
      return marked(state.curArticle.mdContent, { sanitize: true })
    }
  },
  actions: {
    getArticleList ({ commit }, { pageIndex }) {
      APIArticle.getArticleList({ pageIndex }).then((data) => {
        const articleList = data.data
        commit(types.getArticleListSuccess, articleList)
      }, () => {
        commit(types.getArticleListError)
      })
    },
    getSingleArticleById ({ commit }, { id }) {
      if (!id) {
        commit(types.getArticleByIdError)
        return
      }

      let curArticle = {
        id: '',
        title: '',
        desc: '',
        time: '',
        tags: [],
        mdContent: ''
      }

      APIArticle.getSingleArt({ id })
      .then((data) => {
        curArticle.mdContent = data.data
      })
      .then(() => {
        return APIArticle.getSingleArtDesc({ id })
      })
      .then((data) => {
        data = data.data
        curArticle.id = data.id
        curArticle.title = data.title
        curArticle.desc = data.desc
        curArticle.time = data.time.split('T')[0]
        curArticle.tags = data.tags

        commit(types.getArticleByIdSuccess, curArticle)
      }, () => {
        commit(types.getArticleByIdError)
      })
    },
    getArticlesByTags ({ commit }, { tag }) {
      APIArticle.getTagsIndex().then((data) => {
        const arts = data.data[tag]
        commit(types.getArticlesByTagSuccess, arts)
      }, () => {
        commit(types.getArticlesByTagError)
      })
    },
    clearArticle ({ commit }) {
      commit(types.clearArticle)
    }
  },
  mutations: {
    [types.getArticleListSuccess] (state, articleList) {
      articleList.forEach((item) => {
        item.time = item.time.split('T')[0]
      })
      state.articleList = state.articleList.concat(articleList)
    },
    [types.getArticleListError] (state) {
    },
    [types.getArticleByIdSuccess] (state, curArt) {
      state.curArticle = curArt
    },
    [types.getArticleByIdError] (state) {
    },
    [types.getArticlesByTagSuccess] (state, arts) {
      state.artsTag = []
      const arrYear = Object.keys(arts).sort().reverse()
      arrYear.forEach((year) => {
        arts[year].forEach((item) => {
          item['time'] = item['time'].split('T')[0]
        })
        state.artsTag.push({
          year,
          data: arts[year]
        })
      })
    },
    [types.getArticlesByTagError] (state) {
    },
    [types.clearArticle] (state) {
      state.curArticle = {
        id: '',
        title: '',
        desc: '',
        time: '',
        tags: [],
        mdContent: ''
      }
    }
  }
}
