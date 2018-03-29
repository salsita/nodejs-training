const from = what => (fn, param) => async ctx => {
  const args = ctx.request[what];
  ctx.body = fn(param ? args[param] : args);
};

module.exports = {
  fromParams: from("params"),
  fromQuery: from("query"),
  fromBody: from("body")
};
