import axios from 'axios';
import to from 'await-to-js';

const defaultToken = ['Plz', 'Ban', 'Me'].join('');

let apiKey = process.env.OMDB_TOKEN || defaultToken;

const setKey = (a: string): null => {
  apiKey = a;
  return null;
};

const getKey = () => apiKey;

const getLink = (id: any) => `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

const getData = async (id: any) => {
  if (!id) return [null, {}];
  const url = getLink(id);
  const [err, res] = await to(axios.get(url));
  if (err) return [err, {}];
  return (res.data.Response && res.data.Response === 'True')
    ? [null, res.data]
    : [res.data, {}];
}

export = { getLink, getData, setKey, getKey, defaultToken };
