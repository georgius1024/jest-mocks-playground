import Movies from '../src/movies';

describe('Movies', () => {
  it('imports without error', () => {
    expect(Movies).toBeDefined();
    expect(typeof Movies).toBe('function');
  });

  it('can list movies', async () => {
    const movies = new Movies();
    movies.request = jest.fn().mockResolvedValue([1, 2, 3]);
    const list = await movies.index();
    expect(list).toEqual([1, 2, 3]);
    expect(movies.request).toHaveBeenCalledWith('localhost:4000/movies');
  });

  it('can show movies item', async () => {
    const movies = new Movies();
    movies.request = jest.fn().mockResolvedValue({ name: '123' });
    const item = await movies.show(123);
    expect(item).toEqual({ name: '123' });
    expect(movies.request).toHaveBeenCalledWith('localhost:4000/movies/123');
  });

  it('can create movies item', async () => {
    const movies = new Movies();
    movies.request = jest.fn().mockResolvedValue();
    await movies.create({ text: '123' });
    expect(movies.request).toHaveBeenCalledWith(
      'localhost:4000/movies',
      'post',
      { text: '123' }
    );
  });

  it('can update movies item', async () => {
    const movies = new Movies();
    movies.request = jest.fn().mockResolvedValue();
    await movies.update(123, { text: '123' });
    expect(movies.request).toHaveBeenCalledWith(
      'localhost:4000/movies/123',
      'put',
      { text: '123' }
    );
  });

  it('can destroy movies item', async () => {
    const movies = new Movies();
    movies.request = jest.fn().mockResolvedValue();
    await movies.destroy(123);
    expect(movies.request).toHaveBeenCalledWith(
      'localhost:4000/movies/123',
      'delete'
    );
  });
});
