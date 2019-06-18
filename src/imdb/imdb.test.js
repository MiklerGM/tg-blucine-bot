const imdb = require('./imdb');

describe('imdb suggestions', () => {
  test('Select films', () => {
    const avengers = require('./suggestion/avengers.test.json');
    const avengersRes = require('./suggestion/avengers.res.json');
  
    const batman = require('./suggestion/batman.test.json');
    const batmanRes = require('./suggestion/batman.res.json');
  
    const strange = require('./suggestion/doctor_strange.test.json');
    const strangeRes = require('./suggestion/doctor_strange.res.json');

    expect(imdb.filmsFromSuggestion()).toEqual([]);
    expect(imdb.filmsFromSuggestion({})).toEqual([]);
    expect(imdb.filmsFromSuggestion(avengers)).toEqual(avengersRes);
    expect(imdb.filmsFromSuggestion(batman)).toEqual(batmanRes);
    expect(imdb.filmsFromSuggestion(strange)).toEqual(strangeRes);
  });

  test('Escape Search Phrase', () => {
    expect(imdb.escapeSearchString()).toEqual('');
    expect(imdb.escapeSearchString('The Batman')).toEqual('the_batman');
    expect(imdb.escapeSearchString('Let\'s Dance')).toEqual('lets_dance');
    expect(imdb.escapeSearchString('Mädchen in Uniform')).toEqual('madchen_in_uniform');
    expect(imdb.escapeSearchString('Das weiße Band')).toEqual('das_weisse_band');
  });

  test('Generate link', () => {
    expect(imdb.getLink('vampyr'))
      .toEqual('https://v2.sg.media-imdb.com/suggestion/v/vampyr.json');
    expect(imdb.getLink('batman', 'title'))
      .toEqual('https://v2.sg.media-imdb.com/suggestion/title/b/batman.json');
  });
})


