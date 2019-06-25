# Dockerfile (tag: v3)
FROM mhart/alpine-node:slim-12
WORKDIR /bot
# use travis cache for node-modules
COPY . .
ENV OMDB_TOKEN=''
ENV BOT_TOKEN=''
CMD ["node", "./src/index.js"]