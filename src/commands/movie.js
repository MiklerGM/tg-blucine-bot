const bot = require('../bot/bot');
const imdb = require('../imdb/imdb');
const omdb = require('../omdb/omdb');

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

const getRating = (r = []) => {
  if (!Array.isArray(r) || r.length === 0) return '';
  const rating = r.map((s) => {
    switch (s.Source) {
      case 'Rotten Tomatoes': return `🍅${s.Value}`;
      case 'Internet Movie Database': return `⭐${s.Value.replace('/10', '')}`;
      case 'Metacritic': return `Ⓜ️${s.Value}`;
      default: return '';
    }
  }).filter(f => f !== '');
  return rating.length > 0 ? `_${rating.join(' ')}_` : '';
}

const getMessage = (data) => {
  const msg = [
    `*${data.Title}* ${getRating(data.Ratings)}`,
    `🎦 Release: ${data.Released}`,
  ];
  if (data.DVD !== 'N/A') msg.push(`📀 Disk: ${data.DVD}`);

  return msg.join('\n');
}

const info = async (query) => {
  const robot = bot.getBot();
  const [err, data] = await omdb.getData(query.data);
  const message = err
    ? 'Error'
    : getMessage(data);
  if (data.Poster !== 'N/A') {
    robot.sendPhoto(query.from.id, data.Poster, { caption: message, parse_mode: 'Markdown' });
  } else {
    robot.sendMessage(query.from.id, message, { parse_mode: 'Markdown' });
  }
}

module.exports = { regexp, command: movie, response: info };