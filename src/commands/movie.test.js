const imdb = require('../imdb/imdb');
const bot = require('../bot/bot');
const strangeRes = require('../imdb/suggestion/doctor_strange.res.json');
const strangeKeys = require('../imdb/suggestion/doctor_strange.keys.json');
const movie = require('./movie');

jest.mock('../bot/bot');
jest.mock('../imdb/imdb');

const botMock = { sendMessage: jest.fn() };

test('Movie RegExp', () => {
  expect('/move'.match(movie.regexp)).toEqual(null);
  expect('/movie'.match(movie.regexp)).toEqual(null);
  expect('/movie Green Mile'.match(movie.regexp)[1]).toEqual('Green Mile');
  expect('/MOVIE Green Mile'.match(movie.regexp)[1]).toEqual('Green Mile');
});

test('Movies suggestions', async () => {
  imdb.getSuggestions.mockResolvedValue([null, strangeRes]);
  bot.getBot.mockReturnValue(botMock);
  await movie.command({ from: { id: 'id' } }, ['/movie Doctor Strange', 'Doctor Strange']);
  expect(botMock.sendMessage).toBeCalledWith('id', 'Search Results', strangeKeys);
});

test('Movies suggestions failed', async () => {
  imdb.getSuggestions.mockResolvedValue(['Error', []]);
  bot.getBot.mockReturnValue(botMock);
  await movie.command({ from: { id: 'id' } }, ['/movie Doctor Strange', 'Doctor Strange']);
  expect(botMock.sendMessage).toBeCalledWith('id', 'Search Failed');
});