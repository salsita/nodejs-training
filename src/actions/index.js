const HTTPStatus = require("http-status");
const Router = require("koa-router");
const errorMiddleware = require("./errorMiddleware");
const config = require("../config");
const NotFoundError = require("../errors/NotFoundError");

const v1 = require("./v1");

const { apiBase } = config;
const router = new Router({
  prefix: apiBase
});

router.use(errorMiddleware);
router.use("/v1", v1.routes(), v1.allowedMethods());
router.all("(.*)", () => {
  throw new NotFoundError(HTTPStatus[HTTPStatus.NOT_FOUND]);
});

module.exports = router;
