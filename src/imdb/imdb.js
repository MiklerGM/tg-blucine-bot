const filmsFromSuggestion = (json) => {
  if (!json || json.v !== 1 || !Array.isArray(json.d)) return [];
  const arr = json.d
    .filter(f => (f.q === 'feature' || f.q === 'video'))
    .sort((a, b) => {
      const r = b.y - a.y;
      if (Number.isNaN(r)) {
        if (b.y === undefined) return 1;
      }
      return r;
    })
    .map(f => ({ label: f.l, id: f.id, year: f.y }));
  return arr;
}

const escapeSearchString = (a) => {
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

module.exports = { filmsFromSuggestion, escapeSearchString, getLink };
