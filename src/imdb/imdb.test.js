const imdb = require('./imdb');

describe('films from suggestion', () => {
  const avengers = require('./suggestion/avengers.test.json');
  const avengersRes = [
    { label: 'Avengers: Endgame', id: 'tt4154796', year: 2019 },
    { label: 'Avengers: Infinity War', id: 'tt4154756', year: 2018 },
    { label: 'Avengers: Age of Ultron', id: 'tt2395427', year: 2015 },
    { label: 'The Avengers', id: 'tt0848228', year: 2012 },
    { label: 'The Avengers', id: 'tt0118661', year: 1998 }
  ];

  const batman = require('./suggestion/batman.test.json');
  const batmanRes = [
    { label: 'The Batman', id: 'tt1877830', year: 2021 },
    { label: "Batman vs Teenage Mutant Ninja Turtles", id: "tt9775360", year: 2019 },
    { label: 'Batman v Superman: Dawn of Justice', id: 'tt2975590', year: 2016 },
    { label: 'Batman Begins', id: 'tt0372784', year: 2005 },
    { label: 'Batman & Robin', id: 'tt0118688', year: 1997 },
    { label: 'Batman Forever', id: 'tt0112462', year: 1995 },
    { label: 'Batman Returns', id: 'tt0103776', year: 1992 },
    { label: 'Batman', id: 'tt0096895', year: 1989 },
  ];

  const strange = require('./suggestion/doctor_strange.test.json');
  const strangeRes = [
    { label: 'Doctor Strange 2', id: 'tt9419884', year: undefined },
    { label: 'Doctor Strange: Strange Company',
      id: 'tt6599680',
      year: 2017 },
    { label: 'Doctor Strange: The Score-Cerer Supreme',
      id: 'tt6599762',
      year: 2017 },
    { label: 'Doctor Strange', id: 'tt1211837', year: 2016 },
    { label: 'Doctor Strange', id: 'tt0910865', year: 2007 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      id: 'tt0057012',
      year: 1964 },
  ];

  test('Select films', () => {
    expect(imdb.filmsFromSuggestion()).toEqual([]);
    expect(imdb.filmsFromSuggestion({})).toEqual([]);
    expect(imdb.filmsFromSuggestion(avengers)).toEqual(avengersRes);
    expect(imdb.filmsFromSuggestion(batman)).toEqual(batmanRes);
    expect(imdb.filmsFromSuggestion(strange)).toEqual(strangeRes);
  });
})


