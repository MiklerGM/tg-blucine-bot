const {startBot, getBot } = require('./bot/bot');
const movie = require('./commands/movie');
const omdb = require('./omdb/omdb');

const main = () => {
  const robot = getBot();

  robot.on("callback_query", (query) => {
    robot.answerCallbackQuery(query.id, { text: "Requesting additional data!" })
      .then(async () => {
        console.log('Callback', query.data);
        const [err, data] = await omdb.getData(query.data);
        if (err) {
          robot.sendMessage(query.from.id, 'Error occured');
        } else {
          robot.sendMessage(
            query.from.id,
            [`Title: ${data.Title}`, `Released: ${data.Released}`, `Disk: ${data.DVD}`, data.Poster].join('\n')
          );
        }
      });
  });
  robot.on("polling_error", (err) => console.log(err));

  robot.onText(movie.regexp, movie.command);
};

startBot(main);