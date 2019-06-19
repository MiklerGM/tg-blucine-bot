const bot = require('../bot/bot');
const imdb = require('../imdb/imdb');
const { InlineKeyboard } = require('node-telegram-keyboard-wrapper');


const regexp = new RegExp(/\/movie (.+)/, 'i');

const getKeyboard = (s) => {
  const k = new InlineKeyboard();
  s.map(i => k.addRow({
    text: `${i.label}${i.year ? ` (${i.year})` : ''}`,
    callback_data: i.id
  }));
  return k;
};

const movie = async (msg, match) => {
  const [err, suggestions] = await imdb.getSuggestions(match[1]);
  const robot = bot.getBot();
  if (err) {
    robot.sendMessage(msg.from.id, 'Search Failed');
  } else {
    const keyboard = getKeyboard(suggestions);
    robot.sendMessage(msg.from.id, 'Search Results', keyboard.build());
  }
};

module.exports = { regexp, command: movie };