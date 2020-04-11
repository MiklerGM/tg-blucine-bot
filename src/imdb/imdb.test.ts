import axios from 'axios';
jest.mock('axios');
import imdb from './imdb';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('imdb suggestions', () => {

  const avengers = require('./suggestion/avengers.test.json');
  const avengersRes = require('./suggestion/avengers.res.json');
  const batman = require('./suggestion/batman.test.json');
  const batmanRes = require('./suggestion/batman.res.json');

  const strange = require('./suggestion/doctor_strange.test.json');
  const strangeRes = require('./suggestion/doctor_strange.res.json');

  test('Select films', () => {  
    // expect(imdb.filmsFromSuggestion()).toEqual([]);
    // expect(imdb.filmsFromSuggestion({})).toEqual([]);
    expect(imdb.filmsFromSuggestion(avengers)).toEqual(avengersRes);
    expect(imdb.filmsFromSuggestion(batman)).toEqual(batmanRes);
    expect(imdb.filmsFromSuggestion(strange)).toEqual(strangeRes);
  });

  test('Escape Search Phrase', () => {
    // expect(imdb.escapeSearchString()).toEqual('');
    expect(imdb.escapeSearchString('The Batman')).toEqual('the_batman');
    expect(imdb.escapeSearchString('Let\'s Dance')).toEqual('lets_dance');
    expect(imdb.escapeSearchString('Mädchen in Uniform')).toEqual('madchen_in_uniform');
    expect(imdb.escapeSearchString('Das weiße Band')).toEqual('das_weisse_band');
    const long = 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb';
    expect(imdb.escapeSearchString(long)).toEqual('dr_strangelove_or_');
  });

  test('Generate link', () => {
    expect(imdb.getLink())
      .toEqual('https://v2.sg.media-imdb.com/suggestion//.json');
    expect(imdb.getLink('vampyr'))
      .toEqual('https://v2.sg.media-imdb.com/suggestion/v/vampyr.json');
    expect(imdb.getLink('vampyr', undefined))
      .toEqual('https://v2.sg.media-imdb.com/suggestion/v/vampyr.json');
    expect(imdb.getLink('batman', 'title'))
      .toEqual('https://v2.sg.media-imdb.com/suggestion/title/b/batman.json');
  });

  describe('Mocked IMDB call', () => {
    // https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
    test('Suggestions received', async () => {
      mockedAxios.get.mockResolvedValue({ data: strange });
      let res = await imdb.getSuggestions('Doctor Strange');
      expect(mockedAxios.get).toBeCalledWith('https://v2.sg.media-imdb.com/suggestion/d/doctor_strange.json');
      expect(res).toEqual([null, strangeRes]);
      res = await imdb.getSuggestions('');
      expect(res).toEqual([null, []]);
    });

    test('Suggestions failed', async () => {
      mockedAxios.get.mockRejectedValue('Error');
      expect(await imdb.getSuggestions('avengers')).toEqual(['Error', []]);
    });
  });
});

export {}
