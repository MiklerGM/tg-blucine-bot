const { testAPI } = require('../helper')
const omdb = require('./omdb');

beforeAll(() => {
  if (omdb.getKey() === omdb.defaultToken) {
    console.warn('Using open key OMDb token');
  }
});

testAPI('fetch data from OMDb API', async () => {
  const [err, res] = await omdb.getData('tt0120689');
  expect(err).toEqual(null);
  expect(res.Response).toBeDefined();
});