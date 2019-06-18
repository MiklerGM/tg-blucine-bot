const axios = require('axios');
const to = require('await-to-js').default;

const apiKey = process.env.OMDB_TOKEN;

const getLink = id => `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

const getData = async (id) => {
  if (!id) return [null, {}];
  const url = getLink(id);
  const [err, res] = await to(axios.get(url));
  if (err) return [err, {}];
  return res.data.Response
    ? [null, res.data]
    : [res, {}];
}

module.exports = { getLink, getData };
