const {startBot, getBot } = require('./bot/bot');
const movie = require('./commands/movie');

const main = () => {
  const robot = getBot();

  robot.on("callback_query", (query) => {
    robot.answerCallbackQuery(query.id, { text: "Requesting additional data!" })
      .then(() => movie.response(query));
  });
  robot.on("polling_error", (err) => console.log(err));

  robot.onText(movie.regexp, movie.command);
};

startBot(main);