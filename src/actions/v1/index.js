const Router = require("@koa/router");

const auth = require("./auth");
const skills = require("./skills");
const users = require("./users");

const router = new Router();

router.use("/auth", auth.routes(), auth.allowedMethods());
router.use("/skills", skills.routes(), skills.allowedMethods());
router.use("/users", users.routes(), users.allowedMethods());

module.exports = router;
