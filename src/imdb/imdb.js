// https://v2.sg.media-imdb.com/suggestion/b/avengers.json


const filmsFromSuggestion = (json) => {
  if (!json || json.v !== 1 || !Array.isArray(json.d)) return [];
  const arr = json.d
    .filter(f => (f.q === 'feature' || f.q === 'video'))
    .map(f => ({ label: f.l, id: f.id, year: f.y }));
  return arr;
}

module.exports = { filmsFromSuggestion };
