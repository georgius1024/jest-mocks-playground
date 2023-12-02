const { EventEmitter } = require('events')

function Controller(flow = [], timerInterval = 100) {
  const bus = new EventEmitter()
  const root = flow.find(e => !e.parent)
  const startNode = (node) => {
    this.currentNode = node
    bus.emit('node', node)
    if (node.type === 'delay') {
      this.delay = +node.value
    } else {
      delete this.delay
    }
  }

  const onText = (text) => {
    this.text = text
    bus.emit('text', text)
  }

  const nextNode = () => {
    if (this.currentNode.next) {
      const next = flow.find(e => e.id === this.currentNode.next)
      next && startNode(next)
      if (!next) {
        throw new Error(`can't find next node for ${this.currentNode.id}`)
      }
    } else {
      this.terminate()
    }
  }

  bus.on('tick', () => {
    if (!this.currentNode) {
      startNode(root)
    }
    this.currentNode.text && onText(this.currentNode.text)
    if (this.delay) {
      const delta = new Date().valueOf() - this.lastTick
      this.delay -= delta
    }

    if (!this.delay || this.delay <= 0) {
      nextNode()
    }
    this.lastTick = new Date().valueOf()
  })

  this.terminate = () => {
    clearInterval(this.timer)
    delete this.timer
    bus.emit('terminated')
  }
  this.pause = () => {
    clearInterval(this.timer)
    delete this.timer
    bus.emit('paused')
  }
  this.run = () => {
    this.lastTick = new Date().valueOf()
    this.timer = setInterval(() => {
      bus.emit('tick')
    }, timerInterval)
    bus.emit('run')
  }
  this.on = (event, callback) => bus.on(event, callback)
  this.off = (event, callback) => bus.off(event, callback)
  this.paused = () => !Boolean(this.timer)
}

module.exports = Controller
