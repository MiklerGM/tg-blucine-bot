const TelegramBot = require('node-telegram-bot-api');
jest.mock('node-telegram-bot-api');

const env = process.env;

test('No token', () => {
  delete process.env.BOT_TOKEN;
  const bot = require('./bot');
  expect(bot.startBot).toThrow();
});

describe('Bot creation', () => {
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
