import factorial from '../src/factorial-async';
describe('factorial', () => {
  it('imported without error', () => {
    expect(factorial).toBeDefined();
  });
  it('is function', () => {
    expect(typeof factorial).toBe('function');
  });
  it('returns promise', () => {
    expect(factorial(2)).toHaveProperty('then');
  });
});
