import validation from '../src/validation';
describe('validate', () => {
  it('calls additionalCheck when argument over 10', () => {
    const spy = jest.spyOn(validation, 'additionalCheck');
    expect(validation.validate(11)).toBe(true);
    expect(validation.validate(101)).toBe(true);
    console.log(spy.mock);
    expect(spy).toHaveBeenCalled();
  });
});
