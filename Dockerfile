FROM node:10.21-alpine

LABEL maintainer="jando@salsitasoft.com"

RUN apk update && apk add curl

RUN mkdir -p /srv/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3001
ENV PORT $PORT
EXPOSE $PORT 9229

HEALTHCHECK --start-period=5s --interval=10s --timeout=5s CMD curl -fs http://localhost:$PORT/ || exit 1

WORKDIR /srv
COPY package.json package-lock.json .snyk ./
RUN npm install --unsafe-perm && npm cache clean --force
ENV PATH /srv/node_modules/.bin:$PATH

WORKDIR /srv/app
COPY . /srv/app

CMD [ "node", "src/index.js" ]
