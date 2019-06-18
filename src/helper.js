const testAPI = (name, t) => process.env.FETCH_REMOTE
  ? test(name, t)
  : test.skip(name, t);

module.exports = { testAPI };