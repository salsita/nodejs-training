const Router = require("@koa/router");

const list = require("./list");

const router = new Router();

router.get("/", ...list);

module.exports = router;
