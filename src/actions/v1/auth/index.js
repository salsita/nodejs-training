const Router = require("koa-router");

const { middleware: authMiddleware } = require("../../../auth/jwt");

const google = require("./google");
const github = require("./github");
const local = require("./local");

const router = new Router();

router.use("/github", github.routes(), github.allowedMethods());
router.use("/google", google.routes(), google.allowedMethods());
router.use("/login", local.routes(), local.allowedMethods());

router.get("/test", authMiddleware, async ctx => {
  ctx.body = { message: "ok" };
});

module.exports = router;
