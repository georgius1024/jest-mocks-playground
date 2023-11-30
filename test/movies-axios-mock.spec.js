//eslint-disable-next-line
const axios = require('axios/dist/node/axios.cjs');
// eslint-disable-next-line
import Movies from '../src/movies';

describe('Movies', () => {
  it('fetch movies list from backend', async () => {
    const movies = new Movies();
    axios['get'] = jest.fn().mockResolvedValue([1, 2, 3]);
    const response = await movies.index();
    expect(response).toBeDefined();
  });
  it('creates movie', async () => {
    const movies = new Movies();
    axios['post'] = jest.fn().mockResolvedValue(42);
    const response = await movies.create({ name: 'New!' });
    expect(response).toBe(42);
    expect(axios['post']).toHaveBeenCalled();
    expect(axios['post']).toHaveBeenCalledWith('localhost:4000/movies', {
      name: 'New!'
    });
  });
});
