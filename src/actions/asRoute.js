const from = what => (fn, param) =>
  async ctx => {
    const args = ctx.request[what];
    ctx.body = fn(param ? args[param] : args);
  };

export const fromParams = from('params');
export const fromQuery = from('query');
export const fromBody = from('body');
