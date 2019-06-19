const TelegramBot = require('node-telegram-bot-api');

let bot = undefined;

const getBot = () => {
  if (bot === undefined) throw new Error('Bot is not initialized, start it first');
  return bot;
};

const startBot = (cb) => {
  const token = process.env.BOT_TOKEN;
  bot = new TelegramBot(token, { polling: true });
  cb();
};

module.exports = { getBot, startBot };
