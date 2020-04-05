let fetchRemote: boolean = Boolean(process.env.FETCH_REMOTE);

jest.setTimeout(30000);

const forceFetch = (f: any): null => {
  fetchRemote = Boolean(f);
  return null;
}

const testAPI = (name = 'test', t = (): void => undefined) => fetchRemote
  ? test(name, t)
  : test.skip(name, t);

export = { testAPI, forceFetch };