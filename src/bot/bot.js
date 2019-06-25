const TelegramBot = require('node-telegram-bot-api');

let bot = undefined;

const getBot = () => {
  if (bot === undefined) throw new Error('Bot is not initialized, start it first');
  return bot;
};

const startBot = (cb) => {
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error('Can\'t start bot without BOT_TOKEN, set it first');
  bot = new TelegramBot(token, { polling: true });
  cb();
};

module.exports = { getBot, startBot };
