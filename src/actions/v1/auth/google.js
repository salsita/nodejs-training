const passport = require("koa-passport");
const { OAuth2Strategy: Strategy } = require("passport-google-oauth");
const { auth } = require("../../../config");
const { usersModel } = require("../../../db");
const { getCallbackUrl, createRouter } = require("./shared");

passport.use(
  new Strategy(
    {
      ...auth.google,
      callbackURL: getCallbackUrl("google"),
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails && profile.emails[0];
      const { familyName, givenName } = profile.name || {};
      const [firstName, lastName] = profile.displayName.split(/\s+/);

      try {
        const user = await usersModel.findOrCreateFromProfile(
          "google",
          profile.id,
          familyName || firstName,
          givenName || lastName,
          email && email.value
        );
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

module.exports = createRouter("google", ["email"]);
