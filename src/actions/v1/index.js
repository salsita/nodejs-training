const Router = require("koa-router");

const skills = require("./skills");
const users = require("./users");

const router = new Router();

router.use("/skills", skills.routes(), skills.allowedMethods());
router.use("/users", users.routes(), users.allowedMethods());

module.exports = router;
