# tg-blucine-bot

[![Build Status](https://travis-ci.com/MiklerGM/tg-blucine-bot.svg?branch=master)](https://travis-ci.com/MiklerGM/tg-blucine-bot)
[![codecov](https://codecov.io/gh/MiklerGM/tg-blucine-bot/branch/master/graph/badge.svg)](https://codecov.io/gh/MiklerGM/tg-blucine-bot)

Telegram bot for finding blu-ray release dates 
Information is fetched from the IMDb API and OMDb API

## Setup and run

```bash
# Install dependencies
npm i

# Set bot token obtained from @BotFather https://telegram.me/BotFather
export BOT_TOKEN=botTokenHere

# Set omdb api token. Can be obtained from https://www.omdbapi.com/apikey.aspx
export OMDB_TOKEN=PlzSetMe

# Start bot
npm start

# #
# Developer section
# To start bot with nodemon
npm run dev

# Run unit-testing suite
npm run test
# for continuos watching
npm run test-watch
# Run tests for foreign API
npm run test-integration
```