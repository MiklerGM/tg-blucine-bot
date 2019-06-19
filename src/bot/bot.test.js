const TelegramBot = require('node-telegram-bot-api');
jest.mock('node-telegram-bot-api');

describe('Bot creation', () => {
  const env = process.env;
  beforeAll(() => {
    process.env.BOT_TOKEN = 'dummyToken';
  });

  afterAll(() => {
    process.env = { ...env };
  });

  test('No bot', () => {
    const bot = require('./bot');
    expect(bot.getBot).toThrow();
  });

  test('Init Bot', (done) => {
    const bot = require('./bot');
    bot.startBot(done);
    expect(TelegramBot).toHaveBeenCalledTimes(1)
    expect(TelegramBot).toBeCalledWith('dummyToken', { polling: true });
  });

  test('Get Bot', () => {
    const bot = require('./bot');
    expect(bot.getBot()).toBeDefined();
  });
});
