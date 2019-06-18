const imdb = require('./imdb');

const { testAPI } = require('../helper')

testAPI('fetch suggestion from IMDb', async () => {
  const [err, res] = await imdb.getSuggestions('Green Mile');
  expect(err).toEqual(null);
  expect(Array.isArray(res)).toEqual(true);
  expect(res.length).toBeGreaterThan(0);
  expect(res.find(t => t.id === 'tt0120689'))
    .toEqual({ label: 'The Green Mile', id: 'tt0120689', year: 1999 });
});