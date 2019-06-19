const axios = require('axios');
const to = require('await-to-js').default;

const defaultToken = ['Plz', 'Ban', 'Me'].join('');

let apiKey = process.env.OMDB_TOKEN || defaultToken;

const setKey = (a) => {
  apiKey = a;
  return null;
};

const getKey = () => apiKey;

const getLink = id => `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

const getData = async (id) => {
  if (!id) return [null, {}];
  const url = getLink(id);
  const [err, res] = await to(axios.get(url));
  if (err) return [err, {}];
  return (res.data.Response && res.data.Response === 'True')
    ? [null, res.data]
    : [res.data, {}];
}

module.exports = { getLink, getData, setKey, getKey, defaultToken };
