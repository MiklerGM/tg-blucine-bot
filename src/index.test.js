jest.mock('./bot/bot', () => ({
  startBot: jest.fn().mockImplementation(cb => cb()),
  getBot: () => ({
    on: jest.fn().mockImplementation((name, cb) => {
      if (name === 'callback_query') cb({ id: 'id' });
      if (name === 'polling_error') cb('polling_error');
    }),
    answerCallbackQuery: jest.fn().mockResolvedValue(undefined),
    onText: jest.fn(),
  }),
}));
const bot = require('./bot/bot');
jest.mock('./commands/movie', () => ({
  response: jest.fn(),
  command: 'command',
  regexp: 'regexp',
}));

const movie = require('./commands/movie');

global.console = { log: jest.fn() }

describe('Bot entry point', () => {
  require('./index');

  test('index', () => {
    expect(console.log).toBeCalledWith('polling_error')
    expect(bot.startBot).toBeCalled();
    // expect(bot.answerCallbackQuery).toBeCalledWith('id', { text: "Requesting additional data!" });
    // expect(bot.onText).toBeCalledWith('regexp', 'command');
    expect(movie.response).toBeCalledWith({ id: 'id' });
  });
});