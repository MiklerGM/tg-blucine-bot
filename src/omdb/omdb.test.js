const axios = require('axios');
jest.mock('axios');

const token = 'PlzBanMe';
process.env.OMDB_TOKEN = token;

const omdb = require('./omdb');
const godzilla = require('./api/godzilla');

test('Generate URL', () => {
  expect(omdb.getLink('tt3741700'))
    .toEqual('https://www.omdbapi.com/?i=tt3741700&apikey=PlzBanMe');
});

test('Data Requested', async () => {
  expect(await omdb.getData()).toEqual([null, {}]);
  axios.get.mockResolvedValue({ data: godzilla });
  const res = await omdb.getData('tt3741700');
  expect(axios.get).toBeCalledWith('https://www.omdbapi.com/?i=tt3741700&apikey=PlzBanMe')
  expect(res).toEqual([null, godzilla]);
});

test('Data Request failed', async () => {
  axios.get.mockRejectedValue('Error');
  const res = await omdb.getData('tt3741700');
  expect(axios.get).toBeCalledWith('https://www.omdbapi.com/?i=tt3741700&apikey=PlzBanMe')
  expect(res).toEqual(['Error', {}]);
});
