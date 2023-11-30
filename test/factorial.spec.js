import factorial from '../src/factorial';
describe('factorial', () => {
  it('imports without error', () => {
    expect(typeof factorial).toBe('function');
  });
  it('factorial(0) is 1', () => {
    expect(factorial(0)).toBe(1);
  });
});
