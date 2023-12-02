describe('timers', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  it('can catch timer', () => {
    const timerFunc = (delay, callback) => setTimeout(callback, delay)
    const callback = jest.fn().mockImplementation(() => console.log('done'))
    timerFunc(10 * 60 * 1000, callback)
    jest.runAllTimers()
    expect(callback).toHaveBeenCalled()
  })
  it('can stop at any time', () => {
    let counter = 0
    setInterval(() => counter ++, 100)
    jest.advanceTimersByTime(1000)
    expect(counter).toBe(10)
  })

  afterAll(() => {
    jest.useRealTimers()
  })
})
