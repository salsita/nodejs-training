const Router = require("@koa/router");
const passport = require("koa-passport");
const { createSessionToken } = require("../../../auth/jwt");
const { apiBase } = require("../../../config");
const baseUrl = require("../../../helpers/baseUrl");
const createStoreAuthTokenCode = require("../../../helpers/createStoreAuthTokenCode");

const getCallbackUrl = serviceName =>
  `${baseUrl}${apiBase}/v1/auth/${serviceName}/callback`;

const authConfig = {
  failureRedirect: "/auth/login",
  session: false
};

// also see http://nmajor.com/posts/access-and-refresh-token-handling-with-redux
const successResponse = async ctx => {
  const sessionToken = await createSessionToken(ctx.state.user);
  ctx.body = `
<html>
<script>
  ${createStoreAuthTokenCode(sessionToken)}
  window.location.assign('/auth');
</script>
</html>
`;
};

const createRouter = (serviceName, scope) => {
  const router = new Router();

  router.get(
    "/",
    passport.authenticate(serviceName, {
      scope
    })
  );
  router.get(
    "/callback",
    passport.authenticate(serviceName, authConfig),
    successResponse
  );

  return router;
};

module.exports = {
  createRouter,
  getCallbackUrl,
  authConfig,
  successResponse
};
