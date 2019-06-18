const { testAPI } = require('../helper')

beforeAll(() => {
  if (!process.env.OMDB_TOKEN) {
    console.warn('Using open key OMDb token');
    process.env.OMDB_TOKEN = 'PlzBanMe';
  }
});

testAPI('fetch data from OMDb API', async () => {
  const omdb = require('./omdb');
  const [err, res] = await omdb.getData('tt0120689');
  console.log(err, res);
  expect(err).toEqual(null);
  expect(res.Response).toBeDefined();
});