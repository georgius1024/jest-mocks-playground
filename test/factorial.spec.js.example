import factorial from '../src/factorial';
describe('factorial', () => {
  it('imports without error', () => {
    expect(typeof factorial).toBe('function');
  });
  it('factorial(0) is 1', () => {
    expect(factorial(0)).toBe(1);
  });
  it('factorial(1) is 1', () => {
    expect(factorial(1)).toBe(1);
  });
  it('factorial(3) is 6', () => {
    expect(factorial(3)).toBe(6);
  });
  it('factorial(4) is 24', () => {
    expect(factorial(4)).toBe(24);
  });
  it('factorial(8) is 40320', () => {
    expect(factorial(8)).toBe(40320);
  });
  it('throws an error when not between 0 and 100', function () {
    expect(() => factorial(-1)).toThrow();
    expect(() => factorial(101)).toThrow();
  });
  it('throws an error when not a number', function () {
    expect(function () {
      return factorial({});
    }).toThrow();
    expect(function () {
      return factorial('');
    }).toThrow();
    expect(function () {
      return factorial([]);
    }).toThrow();
    expect(function () {
      return factorial(NaN);
    }).toThrow();
  });
  it('throws an error when non-integer', function () {
    expect(() => factorial(3.14)).toThrow();
  });
});
