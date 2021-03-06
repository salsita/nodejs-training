# nodejs-training

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-training.svg)](https://david-dm.org/salsita/nodejs-training)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-training.svg)](https://david-dm.org/salsita/nodejs-training?type=dev)
![Licence](https://img.shields.io/github/license/salsita/nodejs-training.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/salsita/nodejs-training/badge.svg)](https://snyk.io/test/github/salsita/nodejs-training)
[![CircleCI](https://img.shields.io/circleci/project/github/salsita/nodejs-training.svg)](https://circleci.com/gh/salsita/workflows/nodejs-training)

Backend part for our frontend (react/angular) training

- [REST API docs](http://salsita.github.io/nodejs-training/apidoc/) (generated with [http://apidocjs.com/](apidoc))
- See [nodejs-modules](https://github.com/salsita/nodejs-modules) for common packages.

## Deployment/Running:

Create a new OAuth App at Github ( https://github.com/settings/developers )
and Google ( https://console.developers.google.com/apis/dashboard ) and use the client id
and the secret to configure the nodejs app.

For local development it is better to use [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
for managing installed (and used) local node versions (instead of installing Node manually).

### Heroku

```
heroku addons:create papertrail:choklad
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set PGSSLMODE=require
heroku config:set NPM_CONFIG_PRODUCTION=false # to install dev dependencies
heroku config:set JWT_KEY=<some random string>
heroku config:set DOMAIN=<url of your app>
heroku config:set GITHUB_CLIENT_ID=<insert>
heroku config:set GITHUB_CLIENT_SECRET=<insert>
heroku config:set GOOGLE_CLIENT_ID=<insert>
heroku config:set GOOGLE_CLIENT_SECRET=<insert>
```

### Outside Heroku

Copy `.env.dev` to `.env` and update settings:

- `ALLOW_UNSECURE` - do not try to redirect http to https
- `PORT` - the port where API will be running
- `DOMAIN` - URL where API will be running
- `DATABASE_URL` - connection string to Postgres DB

Create files

- `secret_jwt_key.txt` - random secure key for signing session payload
- `secret_github_client_id.txt`, `secret_github_client_secret.txt`, `secret_google_client_id.txt`,
  `secret_google_client_secret.txt` with OAuth credentials from [apps you created](#deploymentrunning)

Optionally you can update .env file with SSL settings (but running LB or proxy is recommended):

- `SSL_KEY_FILE` - path to SSL key file
- `SSL_KEY` - SSL key file contents
- `CERT_SSL_FILE` - path to SSL cert file
- `CERT_SSL` - SSL cert file contents

And run either via

- `npm run start:dev` or `npm start` (you need to have node, Postgres and everything installed locally)
- (`docker-compose build` when dependencies change) and `docker-compose up` (you need only docker and
  there should be no "works on my machine" issue :tada:)
- for running in production use app docker image directly or use [docker swarm](https://docs.docker.com/engine/swarm/)
  - change image in docker-compose.production.yml
  - run `docker-compose -f docker-compose.yml -f docker-compose.production.yml config > docker-compose.prod.yml` to
    squash config files together (check `docker-compose.prod.yml` secrets section - there should be relative paths)
  - create files `secret_database_url.txt` and `secret_db_password.txt` with DB connection url/password
  - create swarm cluster and deploy (see [Brownbag presentation](https://docs.google.com/presentation/d/1szeWrDIFZmzHSecqQrYbdADOgMVCepiWE9k3Y7avknI/edit?usp=sharing))
  - enjoy :)

## Training plan

**There is no nodejs way (like there is an Angular way or React way etc.). Just pick framework (we like `Koa`)
and it comes with a function signature for writing middleware function (all frameworks have a similar structure -
request in, response out). All other depends on the type of project, used technologies (REST/SOAP/GraphQL,
Postgres/Mongo/Redis/ElasticSearch/Kafka/...) and on you. Here I present some patterns you may find useful.**

Try to stick with [The Twelve-Factor App](https://12factor.net/) paradigm.

App's entry point is in [`/src/index.js`](./src/index.js) where http(s) server is configured, routes are added and server
starts listening on the specified port.
Routes/Actions are defined in [`/src/actions`](./src/actions), directory structure on disk represents directory structure
of URLs.

### Koa middleware TL;DR

Koa middleware is async function with `ctx` parameter and optional `next` parameter (must be called to process
next middlewares, if present). Value assigned to `ctx.body` is returned to client with `ctx.status` status code
(if `ctx.body` is set defaults to 200, if `ctx.body` is not set defaults to 404). You can read route params from `ctx.params`
and POST params from `ctx.request.body`.
All thrown exceptions will be caught and transformed to JSON for the client (see [`errorMiddleware`](./src/actions/errorMiddleware.js)).

### Authentication

The authentication layer is provided via [passport](http://www.passportjs.org/) package, using JWT authentication header (no cookie, no session).
OAuth examples provided through Google and Github, also logging in via local user/password is present.
After successful authentication JS code is sent to the client which stores JWT token to local storage and reloads page
(so client app can retrieve and use this token). (You should use cookies for storing JWT if all your client apps support it,
as [cookies are usually more secure than local storage](https://dev.to/rdegges/please-stop-using-local-storage-1i04))
Secured endpoints should use [`authMiddleware`](./src/actions/v1/authMiddleware.js) (Checks JWT token in the header
and tries to populate `ctx.state.user` with user object).

Authorization layer not provided. (Usually, [Role Based Access Control](https://en.wikipedia.org/wiki/Role-based_access_control) is sufficient)

### Testing

Use mocha/jest/ava/... whatever you want.

I can recommend using `supertest` (see testing users API [`/src/actions/v1/users/index.spec.js`](./src/actions/v1/users/index.spec.js))
for testing your API calls and `puppeteer` for testing front-end code (see puppeteer example at [`/tests/puppeteer.spec.js`](./tests/puppeteer.spec.js)).

### Request data

We are using [`cls-hooked`](https://www.npmjs.com/package/cls-hooked) to share context inside a request. It is used for keeping a request id
accessible for logging even on places where you do not have direct access to the request. If you are requesting external (micro)services,
you should keep this request id for better logging. e.g.

```js
const axios = require("axios");
const { getRequestId } = require("@salsita/koa-server");
axios.get("http://example.com", {
  headers: { "x-request-id": getRequestId() },
});
```

If really necessary you can also use this storage for your data. e.g.

```js
const { getNamespace } = require("cls-hooked");
const { requestNSName } = require("@salsita/koa-server");

const request = getNamespace(requestNSName);

const data = {};
request.set("mydata", data);

// somewhere else
const { getNamespace } = require("cls-hooked");
const { requestNSName } = require("@salsita/koa-server");

const request = getNamespace(requestNSName);
const data = request.get("mydata");
```

## What we use:

### Services:

- [Circle CI](https://circleci.com/docs/2.0/basics/) - CI/test server
- [Renovate](https://renovatebot.com/) - Automated dependency management
- [Docker](https://docs.docker.com/get-started/) - For united development experience
- [Heroku](https://devcenter.heroku.com/categories/heroku-architecture) - For deployment and review apps
- [Snyk](https://snyk.io/docs/using-snyk/) - Find/Protect against vulnerabilities in 3rd party code
- [ngrok](https://www.npmjs.com/package/ngrok) - Public URL for your localhost (https://ngrok.com/)

### Dependencies:

- [koa](http://koajs.com/) - server
- [@koa/router](https://www.npmjs.com/package/@koa/router) - routing
- [koa-passport](https://www.npmjs.com/package/koa-passport) - authentication via [passport](http://www.passportjs.org/)
- [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) - parse json/form/text request
- [koa-compress](https://www.npmjs.com/package/koa-compress) - zipping response
- [koa-cors](https://www.npmjs.com/package/koa-cors) - enabling [Cross-origin resource sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
- [koa-helmet](https://www.npmjs.com/package/koa-helmet) - securing HTTP(s) communication
- [koa-morgan](https://www.npmjs.com/package/koa-morgan) - HTTP(s) request logger (also see [koa-logger](https://www.npmjs.com/package/koa-logger) and [koa-json](https://www.npmjs.com/package/koa-json))
- [koa-send](https://www.npmjs.com/package/koa-send) - serving static files
- [koa-static](https://www.npmjs.com/package/koa-static) - serving static directories
- [joi](https://www.npmjs.com/package/@hapi/joi) - validation (e.g. [io-ts](https://gcanti.github.io/io-ts/) is better suited for TypeScript projects)
- [pg](https://node-postgres.com/) - DB
- [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate) - DB migrations
- [squel](https://hiddentao.com/squel/) - SQL building (also see [knex](http://knexjs.org/) and [sequelize](http://docs.sequelizejs.com/))
- [winston](https://www.npmjs.com/package/winston) - logging
- [pretty-error](https://www.npmjs.com/package/pretty-error) - formatting node.js errors
- [snyk](https://snyk.io/docs/using-snyk/) - protect against vulnerabilities
- [dotenv](https://www.npmjs.com/package/dotenv) - reading .env file
- [uuid](https://www.npmjs.com/package/uuid) - generating uuids

### Dev:

- [apidoc](http://apidocjs.com/) - API documentation
- [nodemon](http://nodemon.io/) - restarting dev server on change
- [supertest](https://www.npmjs.com/package/supertest) - API tests
- [cross-env](https://www.npmjs.com/package/cross-env) - environment variables across platforms
- [prettier](https://www.npmjs.com/package/prettier) - automatic code formatting
- [eslint](https://eslint.org/) - code linting
- [husky](https://www.npmjs.com/package/husky) - git hooks
- [mocha](https://mochajs.org/) - test runner
- [sinon](http://sinonjs.org/) - spies, stubs and mocks
- [chai](http://www.chaijs.com/) - assertions
- [puppeteer](https://github.com/GoogleChrome/puppeteer) - headless Chrome API

### Others:

- [luxon](https://moment.github.io/luxon/) or [date-fns](https://date-fns.org/) - date and time
- [node-schedule](https://www.npmjs.com/package/node-schedule) - task scheduling
- [socket.io](https://socket.io/) - WebSockets
- [mongoose](http://mongoosejs.com/) - MongoDB object modeling
- [ioredis](https://www.npmjs.com/package/ioredis) - Redis client
- [apollo-server-koa](https://www.apollographql.com/docs/apollo-server/) - GraphQL server
- [webpack](https://webpack.js.org/) - module bundler (also see [rollbar](https://rollbar.com/docs/notifier/rollbar.js/) and [parcel-bundler](https://parceljs.org/))
- [babel](https://babeljs.io/) - JS transpiler
- [kue](http://automattic.github.io/kue/) - priority job queue

## Links

- [node compatibility table](https://node.green/)
- [API docs](https://nodejs.org/docs/latest/api/)
- [Awesome node.js](https://node.cool) (aka node.cool)
- [Node.JS best practices list](https://github.com/i0natan/nodebestpractices)
