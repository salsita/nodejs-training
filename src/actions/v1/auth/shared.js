const Router = require("koa-router");
const passport = require("../../../auth/passport");
const { createSessionToken } = require("../../../auth/utils");
const { apiBase, domain, allowUnsecure } = require("../../../config");
const { storageKey, setToken } = require("../../../../client-auth/src/login");

const protocol = `http${allowUnsecure ? "" : "s"}`;

const getCallbackUrl = serviceName =>
  `${protocol}://${domain}${apiBase}/v1/auth/${serviceName}/callback`;

const authConfig = {
  failureRedirect: "/auth/login",
  session: false
};

const successResponse = async ctx => {
  const sessionToken = await createSessionToken(ctx.state.user);
  ctx.body = `
<html>
<script>
  var storageKey='${storageKey}';
  ${setToken.toString()};
  ${setToken.name}('${sessionToken}');
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
