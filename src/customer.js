const axios = require('axios/dist/node/axios.cjs')

export default function Customer(name, address) {
  this.data = {name, address, _id: null}
  this.isValid = function(name, address) {
    return name && address
  }
  this.validate = function() {
    if (this.data._id) {
      return true
    }
    return this.isValid(this.data.name, this.data.address)
  }
  this.save = function() {
    axios.put('localhost:4000', this.data)
  }

  this.update = function(name, address) {
    this.data = {name, address}
    if (this.validate()) {
      return this.put()
    } else {
      throw new Error('Invalid data')
    }
  }

}