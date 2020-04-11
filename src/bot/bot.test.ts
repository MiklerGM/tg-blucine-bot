const TelegramBot = require('node-telegram-bot-api');
jest.mock('node-telegram-bot-api');

const mockedBot = TelegramBot as jest.Mocked<typeof TelegramBot>;

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
    expect(mockedBot).toHaveBeenCalledTimes(1)
    expect(mockedBot).toBeCalledWith('dummyToken', { polling: true });
  });

  test('Get Bot', () => {
    const bot = require('./bot');
    expect(bot.getBot()).toBeDefined();
  });
});

export {}
