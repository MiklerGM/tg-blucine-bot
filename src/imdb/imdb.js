// https://v2.sg.media-imdb.com/suggestion/b/avengers.json


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

module.exports = { filmsFromSuggestion };
