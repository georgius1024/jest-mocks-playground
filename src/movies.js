const axios = require('axios/dist/node/axios.cjs')

export default function Movies() {
  this.url = function(id = null) {
    if (id) {
      return `localhost:4000/movies/${id}`
    }
    return 'localhost:4000/movies'
  }
  this.request = function(url, method = 'get', payload = null) {
    return axios[method](url, payload)
  }
  this.index = function() {
    return this.request(this.url())
  }
  this.show = function(id) {
    return this.request(this.url(id))
  }
  this.create = function(payload) {
    return this.request(this.url(), 'post', payload)
  }
  this.update = function(id, payload) {
    return this.request(this.url(id), 'put', payload)
  }
  this.destroy = function(id) {
    return this.request(this.url(id), 'delete')
  }
}