import Todos from '../src/todos'


describe('Todos', () => {
  it('imports without error', () => {
    expect(Todos).toBeDefined()
    expect(typeof Todos).toBe('function')
  })

  it('creates Todos object', () => {
    const todos = new Todos()
    expect(todos).toHaveProperty('list')
    expect(todos).toHaveProperty('counter')
  })

  it('can create todo item', () => {
    const todos = new Todos()
    const id = todos.add({text: '123'})
    expect(todos.list).toHaveLength(1);
    expect(todos).toHaveProperty('list.0.text', '123')
    expect(todos).toHaveProperty('list.0.id', id)
  })

  it('can update todo item', () => {
    const todos = new Todos()
    const id = todos.add({text: '123'})
    todos.update(id, {text: '456'})
    expect(todos).toHaveProperty('list.0.text', '456')
    expect(todos).toHaveProperty('list.0.id', id)
  })

  it('can destroy todo item', () => {
    const todos = new Todos()
    const id = todos.add({text: '123'})
    todos.destroy(id)
    expect(todos.list).toHaveLength(0);
  })
})