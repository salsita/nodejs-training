const passport = require("koa-passport");
const { Strategy } = require("passport-github");
const { auth } = require("../../../config");
const { usersModel } = require("../../../db");
const { getCallbackUrl, createRouter } = require("./shared");

passport.use(
  new Strategy(
    {
      ...auth.github,
      callbackURL: getCallbackUrl("github")
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0];
      const [firstName, lastName] = profile.displayName.split(/\s+/);
      try {
        const user = await usersModel.findOrCreateFromProfile(
          "github",
          profile.id,
          firstName,
          lastName,
          email && email.value
        );
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

module.exports = createRouter("github", ["user"]);
