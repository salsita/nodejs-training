const Router = require("koa-router");
const passport = require("../../../auth/passport");
const { createSessionToken } = require("../../../auth/utils");
const { apiBase } = require("../../../config");
const baseUrl = require("../../../helpers/baseUrl");
const createStoreAuthTokenCode = require("../../../helpers/createStoreAuthTokenCode");

const getCallbackUrl = serviceName =>
  `${baseUrl}${apiBase}/v1/auth/${serviceName}/callback`;

const authConfig = {
  failureRedirect: "/auth/login",
  session: false
};

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
