//eslint-disable-next-line
const axios = require('axios');
// eslint-disable-next-line
import Movies from '../src/movies';

describe('Movies', () => {
  it('imports without errors', () => {
    expect(typeof Movies).toBe('function')
  })
  it('loads list of movies', async () => {
    const movies = new Movies();
    const get = jest.fn().mockResolvedValue([1,2,3])
    axios.get = get
    const list = await movies.index();
    expect(list).toEqual([1,2,3])
    expect(axios.get).toHaveBeenCalled()
  })
});
