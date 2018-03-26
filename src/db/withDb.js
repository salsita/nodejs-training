const pg = require("pg");
const connectDB = require("./connect");

module.exports = fn => (dbClient, ...args) =>
  dbClient instanceof pg.Client
    ? fn(dbClient, ...args)
    : connectDB(realDBClient => fn(realDBClient, dbClient, ...args));
