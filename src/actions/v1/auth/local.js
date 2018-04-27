const Router = require("koa-router");
const { Strategy } = require("passport-local");
const { usersModel } = require("../../../db");
const passport = require("../../../auth/passport");
const { encryptPassword } = require("../../../auth/utils");
const { authConfig, successResponse } = require("./shared");

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      try {
        const user = await usersModel.findByLogin(username);
        if (
          user &&
          encryptPassword(password, user.salt, user.hashConfig) ===
            user.password
        ) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

const router = new Router();

router.post(
  "/login",
  passport.authenticate("local", authConfig),
  successResponse
);

module.exports = router;
