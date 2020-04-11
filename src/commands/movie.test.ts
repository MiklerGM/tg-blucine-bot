import rewire from 'rewire';

jest.mock('../imdb/imdb');
jest.mock('../omdb/omdb');
jest.mock('../bot/bot');

const imdb = require('../imdb/imdb');
const omdb = require('../omdb/omdb');
const bot = require('../bot/bot');

const mockBot = { sendMessage: jest.fn(), sendPhoto: jest.fn() };
bot.getBot.mockReturnValue(mockBot);

const godzilla = require('../omdb/api/godzilla.json');

const strangeRes = require('../imdb/suggestion/doctor_strange.res.json');
const strangeKeys = require('../imdb/suggestion/doctor_strange.keys.json');

import movie from './movie';
import { parseRating, getRating, getMessage } from './movie.helper';

test('Movie RegExp', () => {
  expect('/move'.match(movie.regexp)).toEqual(null);
  expect('/movie'.match(movie.regexp)).toEqual(null);
  expect('/movie Green Mile'.match(movie.regexp)[1]).toEqual('Green Mile');
  expect('/MOVIE Green Mile'.match(movie.regexp)[1]).toEqual('Green Mile');
});

test('Movies suggestions', async () => {
  imdb.getSuggestions.mockResolvedValue([null, strangeRes]);
  await movie.command({ from: { id: 'id' } }, ['/movie Doctor Strange', 'Doctor Strange']);
  expect(mockBot.sendMessage).toBeCalledWith('id', 'Search Results', strangeKeys);
});

test('Movies suggestions failed', async () => {
  imdb.getSuggestions.mockResolvedValue(['Error', []]);
  await movie.command({ from: { id: 'id' } }, ['/movie Doctor Strange', 'Doctor Strange']);
  expect(mockBot.sendMessage).toBeCalledWith('id', 'Search Failed');
});

describe('Movie Rating', () => {
  const ratings = godzilla.Ratings;
  test('Rating Parser', () => {
    expect(parseRating({Source: 'AAA', 'Value': 'BBB' })).toEqual(undefined);
    expect(parseRating({
      'Source': 'Internet Movie Database',
      'Value': '7.7/10'
    })).toEqual('⭐7.7');
    expect(parseRating({
      "Source": "Rotten Tomatoes",
      "Value": "84%"
    })).toEqual('🍅84%');
    expect(parseRating({
      "Source": "Metacritic",
      "Value": "67/100"
    })).toEqual('Ⓜ️67/100')
  });

  test('Movie Ratings String', () => {
    // expect(getRating()).toEqual('');
    expect(getRating([])).toEqual('');
    expect(getRating(ratings)).toEqual('_⭐8.3 🍅39% Ⓜ️50/100_');
    expect(getRating([ratings[0], ratings[1]])).toEqual('_⭐8.3 🍅39%_');
    expect(getRating([ratings[0], ratings[2]])).toEqual('_⭐8.3 Ⓜ️50/100_');
    expect(getRating([ratings[1], ratings[2]])).toEqual('_🍅39% Ⓜ️50/100_');
    expect(getRating([ratings[2], {}])).toEqual('_Ⓜ️50/100_');
    expect(getRating([{ Source: 'ccc' }, { Source: 'unsupported' }])).toEqual('');
    expect(getRating([...ratings, { ...ratings[0], Source: 'pimpdb' }])).toEqual('_⭐8.3 🍅39% Ⓜ️50/100_');
  });
});

describe('getMessage', () => {
  test('Response Message', async () => {
    expect(getMessage(godzilla)).toEqual([
      '*Godzilla: King of the Monsters* _⭐8.3 🍅39% Ⓜ️50/100_',
      '🎦 Release: 31 May 2019',
    ].join('\n'));
    
    expect(getMessage({ ...godzilla, DVD: '10 Sep 2019'})).toEqual([
      '*Godzilla: King of the Monsters* _⭐8.3 🍅39% Ⓜ️50/100_',
      '🎦 Release: 31 May 2019',
      '📀 Disk: 10 Sep 2019'
    ].join('\n'));
  });

  describe('omdb response', () => {
    test('Response with Poster', async () => {
      omdb.getData.mockResolvedValue([null, { ...godzilla }]);
      await movie.response({ from: { id: 'id' } });
      expect(mockBot.sendPhoto).lastCalledWith(
        'id',
        godzilla.Poster,
        { caption: getMessage(godzilla), parse_mode: 'Markdown' }
      );
    });

    test('Response w/o Poster', async () => {
      omdb.getData.mockResolvedValue([null, { ...godzilla, Poster: 'N/A' }]);
      await movie.response({ from: { id: 'id' } });
      expect(mockBot.sendMessage).lastCalledWith(
        'id',
        getMessage(godzilla),
        { parse_mode: 'Markdown' }
      );
    });

    test('Response Error', async () => {
      omdb.getData.mockResolvedValue([true, { Title: 'No no no'}]);
      await movie.response({ from: { id: 'id' } });
      expect(mockBot.sendMessage).lastCalledWith(
        'id',
        'Error',
        { parse_mode: 'Markdown' }
      );
    });
  });
});

export {}
