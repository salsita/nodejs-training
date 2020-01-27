const Router = require("@koa/router");

const list = require("./list");
const create = require("./create");
const get = require("./get");
const patch = require("./patch");
const remove = require("./remove");

const router = new Router();

router.get("/", ...list);
router.post("/", ...create);
router.get("/:id", ...get);
router.patch("/:id", ...patch);
router.del("/:id", ...remove);

module.exports = router;
