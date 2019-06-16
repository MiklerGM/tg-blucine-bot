const imdb = require('./imdb');

describe('films from suggestion', () => {
  const avengers = require('./suggestion/avengers.test.json');
  const avengersRes = [
    { label: 'Avengers: Endgame', id: 'tt4154796', year: 2019 },
    { label: 'Avengers: Infinity War', id: 'tt4154756', year: 2018 },
    { label: 'Avengers: Age of Ultron', id: 'tt2395427', year: 2015 },
    { label: 'The Avengers', id: 'tt0848228', year: 2012 },
    { label: 'The Avengers', id: 'tt0118661', year: 1998 } ];

  const batman = require('./suggestion/batman.test.json');
  const batmanRes = [
    { label: 'The Batman', id: 'tt1877830', year: 2021 },
    { label: 'Batman Begins', id: 'tt0372784', year: 2005 },
    { label: "Batman vs Teenage Mutant Ninja Turtles", id: "tt9775360", year: 2019 },
    { label: 'Batman', id: 'tt0096895', year: 1989 },
    { label: 'Batman v Superman: Dawn of Justice', id: 'tt2975590', year: 2016 },
    { label: 'Batman Returns', id: 'tt0103776', year: 1992 },
    { label: 'Batman Forever', id: 'tt0112462', year: 1995 },
    { label: 'Batman & Robin', id: 'tt0118688', year: 1997 } ]

  test('Select films', () => {
    expect(imdb.filmsFromSuggestion()).toEqual([]);
    expect(imdb.filmsFromSuggestion({})).toEqual([]);
    expect(imdb.filmsFromSuggestion(avengers)).toEqual(avengersRes);
    expect(imdb.filmsFromSuggestion(batman)).toEqual(batmanRes);
  });
})


