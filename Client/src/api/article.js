import axios from 'axios'

export default {
  getArticleList ({ pageIndex }) {
    return axios.get(`/doc/work/p-${pageIndex}.json`)
  },
  getSingleArt ({ id }) {
    return axios({
      method: 'get',
      url: `/doc/work/${id}/index.md`
    })
  },
  getSingleArtDesc ({ id }) {
    return axios({
      method: 'get',
      url: `/doc/work/${id}/desc.json`
    })
  },
  getTagsIndex () {
    return axios({
      methods: 'get',
      url: `/doc/work/tagsIndex.json`
    })
  }
}
