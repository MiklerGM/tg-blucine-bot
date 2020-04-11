const axios = require('axios');
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const godzilla = require('./api/godzilla.json');
const noData = require('./api/no_data.json');

describe('OMDb Token', () => {
  const env = { ...process.env };
  beforeEach(() => {
    jest.resetModules();
    delete process.env.OMDB_TOKEN;
  });

  afterEach(() => {
    process.env = { ...env };
  });

  test('OMDb API key', () => {
    const omdb = require('./omdb');
    expect(omdb.getKey()).toEqual(omdb.defaultToken);
    omdb.setKey('setKey');
    expect(omdb.getKey()).toEqual('setKey');
  });

  test('OMDb API key from ENV', () => {
    process.env.OMDB_TOKEN = 'envToken';
    const omdb = require('./omdb');
    expect(omdb.getKey()).toEqual('envToken');
  });
});

describe('OMDb Data', () => {
  const omdb = require('./omdb');
  beforeAll(() => {
    omdb.setKey('API_TOKEN');
  });

  test('Generate URL', () => {
    expect(omdb.getLink('tt3741700'))
      .toEqual('https://www.omdbapi.com/?i=tt3741700&apikey=API_TOKEN');
  });

  test('Data Requested', async () => {
    expect(await omdb.getData()).toEqual([null, {}]);
    axios.get.mockResolvedValue({ data: godzilla });
    const res = await omdb.getData('tt3741700');
    expect(axios.get).toBeCalledWith('https://www.omdbapi.com/?i=tt3741700&apikey=API_TOKEN')
    expect(res).toEqual([null, godzilla]);
  });

  test('No Data', async () => {
    axios.get.mockResolvedValue({ data: noData });
    const res = await omdb.getData('aaa');
    expect(res).toEqual([noData, {}]);
  });

  test('Data Request failed', async () => {
    axios.get.mockRejectedValue('Error');
    const res = await omdb.getData('tt3741700');
    expect(axios.get).toBeCalledWith('https://www.omdbapi.com/?i=tt3741700&apikey=API_TOKEN')
    expect(res).toEqual(['Error', {}]);
  });
});

export {}
