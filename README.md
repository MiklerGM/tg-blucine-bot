# tg-blucine-bot

[![Build Status](https://travis-ci.com/MiklerGM/tg-blucine-bot.svg?branch=master)](https://travis-ci.com/MiklerGM/tg-blucine-bot)

Telegram bot for finding blu-ray release dates 
Information is fetched from the IMDb API and OMDb API

## Setup and run

```bash
# Install dependencies
npm i

# Run unit-testing suite
npm run test

# Set omdb api token. Can be obtained from https://www.omdbapi.com/apikey.aspx
export OMDB_TOKEN=PlzSetMe

# Run tests for foreign API
npm run test-integration
```