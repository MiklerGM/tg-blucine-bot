const { InlineKeyboard } = require('node-telegram-keyboard-wrapper');
import commandInterface from './commandInterface';
import { getBot } from '../bot/bot';
import imdb from '../imdb/imdb';
import omdb from '../omdb/omdb';
import { getMessage } from './movie.helper';

const regexp = new RegExp(/\/movie (.+)/, 'i');

const getKeyboard = (s: any[]) => {
  const k = new InlineKeyboard();
  s.map((i: { label: any; year: any; id: any; }) => k.addRow({
    text: `${i.label}${i.year ? ` (${i.year})` : ''}`,
    callback_data: i.id
  }));
  return k;
};

const movie = async (msg: { from: { id: any; }; }, match: any[]) => {
  const [err, suggestions] = await imdb.getSuggestions(match[1]);
  const robot = getBot();
  if (err) {
    robot.sendMessage(msg.from.id, 'Search Failed');
  } else {
    const keyboard = getKeyboard(suggestions);
    robot.sendMessage(msg.from.id, 'Search Results', keyboard.build());
  }
};

const sendResponse = async (query: { data: any; from: { id: any; }; }) => {
  const robot = getBot();
  const [err, data] = await omdb.getData(query.data);
  let message: string;
  if (err) {
    message = 'Error';
    console.error(err);
  } else {
    message = getMessage(data);
  }
  if (data.Poster !== 'N/A' && !err) {
    robot.sendPhoto(query.from.id, data.Poster, { caption: message, parse_mode: 'Markdown' });
  } else {
    robot.sendMessage(query.from.id, message, { parse_mode: 'Markdown' });
  }
}

const command: commandInterface = { regexp, command: movie, response: sendResponse };

export default command;
