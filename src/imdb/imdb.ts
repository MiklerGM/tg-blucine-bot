import axios from 'axios';
import to from 'await-to-js';

const filmsFromSuggestion = (json: { v: number; d: any[]; }) => {
  if (!json || json.v !== 1 || !Array.isArray(json.d)) return [];
  const arr = json.d
    .filter((f: { q: string; }) => (f.q === 'feature' || f.q === 'video'))
    .sort((a: { y: number; }, b: { y: number; }) => {
      if (b.y === a.y) return 0;
      if (b.y === undefined) return 1;
      if (a.y === undefined) return -1;
      return b.y - a.y;
    })
    .map((f: { l: any; id: any; y: any; }) => ({ label: f.l, id: f.id, year: f.y }));
  return arr;
}

const escapeSearchString = (a: string) => {
  const G = /[àÀáÁâÂãÃäÄåÅæÆçÇèÈéÉêÊëËìÍíÍîÎïÏðÐñÑòÒóÓôÔõÕöÖøØùÙúÚûÛüÜýÝÿþÞß]/;
  if (a) {
    let b = a.toLowerCase();
    return b.length > 20 && (b = b.substr(0, 20)),
    b = b.replace(/^\s*/, "").replace(/[ ]+/g, "_"),
    G.test(b) && (
      b = b.replace(/[àÀáÁâÂãÃäÄåÅæÆ]/g, "a").replace(/[çÇ]/g, "c")
        .replace(/[èÈéÉêÊëË]/g, "e").replace(/[ìÍíÍîÎïÏ]/g, "i").replace(/[ðÐ]/g, "d")
        .replace(/[ñÑ]/g, "n").replace(/[òÒóÓôÔõÕöÖøØ]/g, "o").replace(/[ùÙúÚûÛüÜ]/g, "u")
        .replace(/[ýÝÿ]/g, "y").replace(/[þÞ]/g, "t").replace(/[ß]/g, "ss")),
    b = b.replace(/[\W]/g, "");
  }
  return '';
}

const getLink = (s = '', u = '') => ([
  'https://v2.sg.media-imdb.com',
  `suggestion${u ? `/${u}` : ''}`,
  s.substr(0, 1),
  `${s}.json`]).join('/');

const getSuggestions = async (s: string): Promise<any> => {
  const es = escapeSearchString(s);
  if (es.length < 1) return [null, []];
  const url = getLink(es);
  const [err, res] = await to(axios.get(url));
  if (err) return [err, []];
  return [null, filmsFromSuggestion(res.data)];
}

export = {
  filmsFromSuggestion, escapeSearchString, getLink, getSuggestions
};
