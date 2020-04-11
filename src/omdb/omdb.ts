import axios from 'axios';
import to from 'await-to-js';

const defaultToken = ['Plz', 'Ban', 'Me'].join('');

let apiKey: string;

const setKey = (a: string): null => {
  apiKey = a;
  return null;
};

const getKey = () => {
  if (apiKey) return apiKey;
  return process.env.OMDB_TOKEN || defaultToken;
};

const getLink = (id: string) => `https://www.omdbapi.com/?i=${id}&apikey=${getKey()}`;

const getData = async (id: string) => {
  if (!id) return [null, {}];
  const url = getLink(id);
  const [err, res] = await to(axios.get(url));
  if (err) return [err, {}];
  return (res.data.Response && res.data.Response === 'True')
    ? [null, res.data]
    : [res.data, {}];
}

export = { getLink, getData, setKey, getKey, defaultToken };
