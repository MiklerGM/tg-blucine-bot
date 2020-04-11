import TelegramBot from 'node-telegram-bot-api';

let bot: TelegramBot;

export const getBot = () => {
  if (!bot) throw new Error('Bot is not initialized, start it first');
  return bot;
};

export const startBot = (cb: () => void) => {
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error('Can\'t start bot without BOT_TOKEN, set it first');
  bot = new TelegramBot(token, { polling: true });
  cb();
};
