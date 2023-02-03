export default function Todos() {
  this.counter = 0
  this.list = []
  this.add = function (item) {
    this.counter++
    this.list.push({...item, id: this.counter})
    return this.counter
  }
  this.update = function (id, updated) {
    this.list = this.list.map(item => {
      if (item.id === id) {
        return {...updated, id}
      }
      return item
    })
  }
  this.destroy = function (id) {
    this.list = this.list.filter(item => item.id !== id)
  }
}