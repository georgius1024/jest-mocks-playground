import factorial from '../src/factorial';

describe('Factorial function', () => {
  it('imports without errors', () => {
    expect(factorial).toBeDefined();
    expect(typeof factorial).toBe('function');
  });
  it('factorial(0) is 1', () => {
    expect(factorial(0)).toBe(1);
  });
});
