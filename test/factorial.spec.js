import factorial from '../src/factorial'

const thrower = (param) => async () => await factorial(param);
describe("factorial", () => {
  it("imported without error", () => {
    expect(factorial).toBeDefined();
  });
  it("is function", () => {
    expect(typeof factorial).toBe("function");
  });
  it('returns promise', () => {
    expect(factorial(0)).toHaveProperty('then')
  })
  it('factorial(0) is 1', async () => {
    expect(await factorial(0)).toBe(1)
  })
  it('factorial(1) is 1', async () => {
    expect(await factorial(1)).toBe(1)
  })
  it('factorial(8) is 40320', async () => {
    expect(await factorial(8)).toBe(40320)
  })
  it('factorial(-1) throws an error', (done) => {
    factorial(-1).catch(error => {
      expect(error).toContain('range')
      done()
    })
  })
  it('factorial(-1) throws an error', async () => {
    await expect(thrower(-1)()).rejects.toContain('range')
  })
  it('factorial(-1) throws an error', async () => {
    try {
      await thrower(-1)()  
    } catch (error) {
      expect(error).toContain('range')
    }
  })
});
