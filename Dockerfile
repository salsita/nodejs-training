FROM node:10.8-alpine

RUN mkdir -p /srv/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229

HEALTHCHECK CMD curl -fs http://localhost:$PORT/ || exit 1

WORKDIR /srv
COPY package.json package-lock.json* .snyk ./
RUN npm install --unsafe-perm && npm cache clean --force
ENV PATH /srv/node_modules/.bin:$PATH

WORKDIR /srv/app
COPY . /srv/app

CMD [ "node", "src/index.js" ]