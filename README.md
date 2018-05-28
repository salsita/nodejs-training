# nodejs-training

backend part for our frontend (react/angular) trainings

* [REST API docs](http://salsita.github.io/nodejs-training/apidoc/)

## Deployment/Running:

Create new OAuth App at Github ( https://github.com/settings/developers )
and Google ( https://console.developers.google.com/apis/dashboard ) and use client id
and secret to configure nodejs app.

### Heroku

```
heroku addons:create papertrail:choklad
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set PGSSLMODE=require
heroku config:set JWT_KEY=<some random string>
heroku config:set DOMAIN=<url of your app>
heroku config:set GITHUB_CLIENT_ID=<insert>
heroku config:set GITHUB_CLIENT_SECRET=<insert>
heroku config:set GOOGLE_CLIENT_ID=<insert>
heroku config:set GOOGLE_CLIENT_SECRET=<insert>
```

### Outside Heroku

Copy `.env.dev` to `.env` and update settings:

* `ALLOW_UNSECURE` - do not try to redirect http to https
* `PORT` - port where API will be running
* `DOMAIN` - url where API will be running
* `SSL_KEY_FILE` - path to SSL key file
* `SSL_KEY` - SSL key file contents
* `CERT_SSL_FILE` - path to SSL cert file
* `CERT_SSL` - SSL cert file contents
* `DATABASE_URL` - connection string to postgres DB
* `JWT_KEY` - random secure key for signing session payload
* `GITHUB_CLIENT_ID` - from OAuth app you created
* `GITHUB_CLIENT_SECRET` - from OAuth app you created
* `GOOGLE_CLIENT_ID` - from OAuth app you created
* `GOOGLE_CLIENT_SECRET` - from OAuth app you created

And run either via `npm run start:dev` or `npm start`

## Training plan

**There is no nodejs way (like there is an Angular way or React way etc.). Just pick framework (we like `Koa`)
and it comes with a function signature for writing middleware function (all frameworks have similar structure -
request in, response out). All other depends on type of project, used technologies (REST/SOAP/GraphQL,
Postgres/Mongo/Redis/ElasticSearch/Kafka/...) and on you. Here I present some patterns you may find useful.**

## What we use:

### Dependencies:

* [koa](http://koajs.com/) - server
* [koa-router](https://www.npmjs.com/package/koa-router) - routing
* [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) - parse json/form/text request
* [koa-compress](https://www.npmjs.com/package/koa-compress) - zipping response
* [koa-cors](https://www.npmjs.com/package/koa-cors) - enabling [Cross-origin resource sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
* [koa-helmet](https://www.npmjs.com/package/koa-helmet) - securing HTTP(s) communication
* [koa-morgan](https://www.npmjs.com/package/koa-morgan) - HTTP(s) request logger (also see [koa-logger](https://www.npmjs.com/package/koa-logger) and [koa-json](https://www.npmjs.com/package/koa-json))
* [koa-send](https://www.npmjs.com/package/koa-send) - serving static files
* [koa-static](https://www.npmjs.com/package/koa-static) - serving static directories
* [joi](https://www.npmjs.com/package/joi) - validation
* [pg](https://node-postgres.com/) - DB
* [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate) - DB migrations
* [squel](https://hiddentao.com/squel/) - SQL building (also see [knex](http://knexjs.org/) and [sequelize](http://docs.sequelizejs.com/))
* [winston](https://www.npmjs.com/package/winston) - logging
* [snyk](https://snyk.io/docs/using-snyk/) - protect against vulnerabilities
* [dotenv](https://www.npmjs.com/package/dotenv) - reading .env file

### Dev:

* [apidoc](http://apidocjs.com/) - API documentation
* [nodemon](http://nodemon.io/) - restarting dev server on change
* [supertest](https://www.npmjs.com/package/supertest) - API tests
* [cross-env](https://www.npmjs.com/package/cross-env) - environment variables across platforms
* [prettier](https://www.npmjs.com/package/prettier) - automatic code formatting
* [eslint](https://eslint.org/) - code linting
* [husky](https://www.npmjs.com/package/husky) - git hooks
* [mocha](https://mochajs.org/) - test runner
* [sinon](http://sinonjs.org/) - spies, stubs and mocks
* [chai](http://www.chaijs.com/) - assertions

### Others:

* [luxon](https://moment.github.io/luxon/) - date and time
* [koa-passport](https://www.npmjs.com/package/koa-passport) - authentication via [passport](http://www.passportjs.org/)
* [node-schedule](https://www.npmjs.com/package/node-schedule) - task scheduling
* [socket.io](https://socket.io/) - WebSockets
* [mongoose](http://mongoosejs.com/) - MongoDB object modeling
* [redis](https://www.npmjs.com/package/redis) - Redis client
* [apollo-server-koa](https://www.apollographql.com/docs/apollo-server/) - GraphQL server
* [webpack](https://webpack.js.org/) - module bundler (also see [rollbar](https://rollbar.com/docs/notifier/rollbar.js/) and [parcel-bundler](https://parceljs.org/))
* [babel](https://babeljs.io/) - JS transpiler

## Links

* [node compatibility table](https://node.green/)
* [API docs](https://nodejs.org/docs/latest/api/)
* [Awesome node.js](https://node.cool) (aka node.cool)
