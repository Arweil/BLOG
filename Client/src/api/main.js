import axios from 'axios'

export default {
  getBaseData () {
    return axios.get(`/doc/config.json`)
  }
}
