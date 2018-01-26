import axios from 'axios'

export default {
  getArticleList ({ category, pageIndex }) {
    return axios.get(`/doc/${category}/p-${pageIndex}.json`)
  },
  getSingleArt ({ category, id }) {
    return axios({
      method: 'get',
      url: `/doc/${category}/${id}/index.md`
    })
  },
  getSingleArtDesc ({ category, id }) {
    return axios({
      method: 'get',
      url: `/doc/${category}/${id}/desc.json`
    })
  },
  getTagsIndex ({ category }) {
    return axios({
      methods: 'get',
      url: `/doc/${category}/tagsIndex.json`
    })
  }
}
