import Customer from '../src/customer'


describe('Customer', () => {
  it('imports without error', () => {
    expect(Customer).toBeDefined()
    expect(typeof Customer).toBe('function')
  })

  it('creates Customer object', () => {
    const customer = new Customer('name', 'address')
    expect(customer).toHaveProperty('data.name', 'name')
    expect(customer).toHaveProperty('data.address', 'address')
  })

  it('validate method calls isValid when _id is null', () => {
    const customer = new Customer('name', 'address')
    customer.isValid = jest.fn().mockReturnValue(true)
    expect(customer.validate()).toBe(true)
    expect(customer.isValid).toHaveBeenCalled()
  })

  it('validate method does not call isValid when _id is not null', () => {
    const customer = new Customer('name', 'address')
    customer.data._id = 1
    customer.isValid = jest.fn().mockReturnValue(true)
    expect(customer.validate()).toBe(true)
    expect(customer.isValid).not.toHaveBeenCalled()
  })


  it('update method saves when valid', () => {
    const customer = new Customer('name', 'address')
    customer.put = jest.fn()
    customer.update('new-name', 'new-address')
    expect(customer.put).toHaveBeenCalled()
  })

  it('update method throws when invalid', () => {
    const customer = new Customer('name', 'address')
    customer.put = jest.fn()
    expect(() => customer.update('', '')).toThrow()
    expect(customer.put).not.toHaveBeenCalled()
  })

})