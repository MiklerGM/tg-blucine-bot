import { CallbackQuery } from 'node-telegram-bot-api';
import { readEnvFile } from './updateEnv';
import {startBot, getBot } from './bot/bot';
import movie from './commands/movie';

const main = () => {
  const robot = getBot();

  robot.on('callback_query', (query: CallbackQuery) => {
    robot.answerCallbackQuery(query.id, { text: 'Requesting additional data!' })
      .then(() => movie.response(query));
  });
  robot.on('polling_error', (err: any) => console.log(err));

  robot.onText(movie.regexp, movie.command);
};

readEnvFile(true);
startBot(main);
