const HTTPStatus = require("http-status");
const Router = require("koa-router");
const errorMiddleware = require("./errorMiddleware");
const config = require("../config");
const NotFoundError = require("../errors/NotFoundError");

const v1 = require("./v1");

const { apiBase } = config;
const apiRouter = new Router({
  prefix: apiBase
});

apiRouter.use(errorMiddleware);
apiRouter.use("/v1", v1.routes(), v1.allowedMethods());
apiRouter.all("(.*)", () => {
  throw new NotFoundError(HTTPStatus[HTTPStatus.NOT_FOUND]);
});

// module.exports = apiRouter;
// HACK for auth demo below

const serve = require("koa-static");
const send = require("koa-send");
// eslint-disable-next-line import/no-extraneous-dependencies
const mount = require("koa-mount");

const path = "/auth";
const distDir = "./client-auth/build";
const router = new Router();
router.use(mount(path, serve(distDir)));
router.use(path, ctx => send(ctx, `${distDir}/index.html`));
router.all(`${path}(.*)`, () => {
  throw new NotFoundError(HTTPStatus[HTTPStatus.NOT_FOUND]);
});

router.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = router;
