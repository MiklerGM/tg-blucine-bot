let fetchRemote = process.env.FETCH_REMOTE;

jest.setTimeout(30000);

const forceFetch = (f) => {
  fetchRemote = Boolean(f);
  return null;
}

const testAPI = (name = 'test', t = () => undefined) => fetchRemote
  ? test(name, t)
  : test.skip(name, t);

module.exports = { testAPI, forceFetch };