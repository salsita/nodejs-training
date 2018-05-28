const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("../../auth/passport");
const {
  idFromSession,
  algorithm,
  isSessionValid
} = require("../../auth/utils");
const AuthError = require("../../errors/AuthError");

const { auth } = require("../../config");
const { usersModel } = require("../../db");

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: auth.jwtKey,
      algorithms: [algorithm]
    },
    async (jwtPayload, done) => {
      if (!isSessionValid(jwtPayload)) {
        return done(null, false);
      }
      try {
        const user = await usersModel.findById(idFromSession(jwtPayload));
        done(null, user || false);
      } catch (err) {
        done(err);
      }
      return null;
    }
  )
);

module.exports = [
  async (ctx, next) => {
    await passport.authenticate(
      "jwt",
      { session: false },
      async (authErr, user) => {
        if (authErr) {
          throw authErr;
        }
        if (!user) {
          throw new AuthError("Unauthorized");
        }
        return ctx.logIn(user, { session: false });
      }
    )(ctx);
    return next();
  }
];
