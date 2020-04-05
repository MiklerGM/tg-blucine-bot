import commandInterface from './commandInterface';
import { getBot } from '../bot/bot';
import imdb from '../imdb/imdb';
import omdb from '../omdb/omdb';

const { InlineKeyboard } = require('node-telegram-keyboard-wrapper');


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

const parseRating = (s: { Source: any; Value: string; }) => {
  const a = s.Source;
  if ('Rotten Tomatoes' === a) return `🍅${s.Value}`;
  if ('Internet Movie Database' === a) return `⭐${s.Value.replace('/10', '')}`;
  if ('Metacritic' === a) return `Ⓜ️${s.Value}`;
  return undefined;
};

const getRating = (r: any[]) => {
  if (!Array.isArray(r) || r.length === 0) return '';
  const rating = r.map(parseRating).filter(f => f !== undefined);
  return rating.length > 0 ? `_${rating.join(' ')}_` : '';
}

const getMessage = (data: { Title: any; Ratings: any[]; Released: any; DVD: string; }) => {
  const msg = [
    `*${data.Title}* ${getRating(data.Ratings)}`,
    `🎦 Release: ${data.Released}`,
  ];
  if (data.DVD !== 'N/A') msg.push(`📀 Disk: ${data.DVD}`);

  return msg.join('\n');
}

const sendResponse = async (query: { data: any; from: { id: any; }; }) => {
  const robot = getBot();
  const [err, data] = await omdb.getData(query.data);
  const message = err
    ? 'Error'
    : getMessage(data);
  if (data.Poster !== 'N/A' && !err) {
    robot.sendPhoto(query.from.id, data.Poster, { caption: message, parse_mode: 'Markdown' });
  } else {
    robot.sendMessage(query.from.id, message, { parse_mode: 'Markdown' });
  }
}

const command: commandInterface = { regexp, command: movie, response: sendResponse };

export default command;
