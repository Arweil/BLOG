import axios from 'axios'

export default {
  getArticleList () {
    return axios.get(`/doc/work/p-index.json`)
  },
  getSingleArt ({ title }) {
    return axios({
      method: 'get',
      url: `/doc/work/${title}/index.md`
    })
  },
  getSingleArtDesc ({ title }) {
    return axios({
      method: 'get',
      url: `/doc/work/${title}/desc.json`
    })
  },
  getTagsIndex () {
    return axios({
      methods: 'get',
      url: `/doc/work/tagsIndex.json`
    })
  }
}
