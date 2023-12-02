const Controller = require('../src/Controller.js')
const flow = [
  {
    id: '101',
    parent: null,
    type: 'trigger',
    text: 'Running',
    next: '102'
  },

  {
    id: '102',
    parent: '101',
    type: 'message',
    text: 'Continue',
    next: '103'
  },

  {
    id: '103',
    parent: '102',
    type: 'delay',
    value: '500',
    next: '104'
  },
  {
    id: '104',
    parent: '103',
    text: 'done',
    type: 'exit'
  }
]
describe('Controller', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  it('imports without error', () => {
    expect(Controller).toBeDefined()
    expect(typeof Controller).toBe('function')
  })
  it('creates Controller object', () => {
    const controller = new Controller(flow)
    expect(controller).toBeDefined()
    expect(typeof controller).toBe('object')
    expect(controller).toHaveProperty('terminate')
    expect(controller).toHaveProperty('pause')
    expect(controller).toHaveProperty('on')
    expect(controller.paused()).toBe(true)
  })
  it('Starts from trigger node', () => {
    const controller = new Controller(flow, 100)
    controller.run()
    expect(controller.currentNode).not.toBeDefined()
    jest.runTimersToTime(100)
    expect(controller.currentNode).toBeDefined()
  })

  it('Emits ticks', () => {
    const controller = new Controller(flow, 100)
    const run = jest.fn()
    const tick = jest.fn()
    controller.on('run', run)
    controller.on('tick', tick)
    controller.run()
    expect(controller.paused()).toBe(false)
    expect(run).toBeCalledTimes(1)
    expect(tick).not.toBeCalled()
    jest.runTimersToTime(100)
    expect(tick).toBeCalledTimes(1)
    jest.runTimersToTime(200)
    expect(tick).toBeCalledTimes(3)
  })

  it('Emits nodes', () => {
    const controller = new Controller(flow, 100)
    const node = jest.fn()
    controller.on('node', node)
    controller.run()
    jest.runAllTimers()
    expect(node).toBeCalledTimes(4)
  })

  it('Terminates on pass', () => {
    const controller = new Controller(flow, 100)
    const terminated = jest.fn()
    controller.on('terminated', terminated)
    controller.run()
    jest.runAllTimers()
    expect(terminated).toBeCalledTimes(1)
  })

  it('Emits texts', () => {
    const controller = new Controller(flow, 100)
    const text = jest.fn()
    controller.on('text', text)
    controller.run()
    jest.runAllTimers()
    expect(text).toBeCalledTimes(3)
    expect(text).toHaveBeenNthCalledWith(1, 'Running')
    expect(text).toHaveBeenNthCalledWith(2, 'Continue')
    expect(text).toHaveBeenNthCalledWith(3, 'done')
  })

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('Makes pause on delay nodes (real time)', async () => {
    jest.useRealTimers()
    const controller = new Controller(flow)
    const terminated = jest.fn()
    controller.on('terminated', terminated)
    controller.run()
    await delay(100)
    expect(controller.currentNode).toHaveProperty('type', 'message')
    await delay(100)
    expect(controller.currentNode).toHaveProperty('type', 'delay')
    await delay(500)
    expect(controller.currentNode).toHaveProperty('type', 'exit')
    await delay(100)
    expect(terminated).toBeCalledTimes(1)
  })

  it('Makes pause on delay nodes (fake time)', async () => {
    const controller = new Controller(flow)
    const terminated = jest.fn()
    controller.on('tick', () => {
      const now = new Date().valueOf()
      jest.setSystemTime(new Date(now + 100))
    })
    controller.run()
    jest.runTimersToTime(100)
    expect(controller.currentNode).toHaveProperty('type', 'message')
    // await delay(100)
    // expect(controller.currentNode).toHaveProperty('type', 'delay')
    // await delay(500)
    // expect(controller.currentNode).toHaveProperty('type', 'exit')
    // await delay(100)
    // expect(terminated).toBeCalledTimes(1)
  })

  it('can make pause', () => {
    jest.useRealTimers()
    const controller = new Controller(flow)
    const terminated = jest.fn()
    controller.on('terminated', terminated)

    controller.run()
    jest.runTimersToTime(200)
    expect(controller.currentNode).toHaveProperty('type', 'delay')
    controller.pause()

    expect(controller.paused()).toBe(true)
    //expect(controller.delay).toBe(400)

  })
  afterAll(() => {
    jest.useRealTimers()
  })
})
