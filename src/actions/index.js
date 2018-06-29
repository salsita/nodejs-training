const HTTPStatus = require("http-status");
const Router = require("koa-router");
const { NotFoundError } = require("@salsita/errors");
const errorMiddleware = require("@salsita/koa-error-middleware");
const config = require("../config");
const log = require("../helpers/log");

const v1 = require("./v1");

const { apiBase } = config;
const apiRouter = new Router({
  prefix: apiBase
});

apiRouter.use(errorMiddleware(log));
apiRouter.use("/v1", v1.routes(), v1.allowedMethods());
apiRouter.all("(.*)", () => {
  throw new NotFoundError(HTTPStatus[HTTPStatus.NOT_FOUND]);
});

// module.exports = apiRouter;
// "HACK" for auth demo below
/* eslint-disable import/order,import/no-extraneous-dependencies */

const distDir = "./client-auth/build";
const authPrefix = "/auth";

const serve = require("koa-static")(distDir);
const send = require("koa-send");

const authRouter = new Router({
  prefix: authPrefix
});
authRouter.use(async (ctx, next) => {
  ctx.path = ctx.path.replace(authPrefix, "") || "/";
  await serve(ctx, next);
});
authRouter.use("(.*)", ctx => send(ctx, `${distDir}/index.html`));
authRouter.all("(.*)", () => {});

const router = new Router();
router.use(apiRouter.routes(), apiRouter.allowedMethods());
router.use(authRouter.routes(), authRouter.allowedMethods());

module.exports = router;
