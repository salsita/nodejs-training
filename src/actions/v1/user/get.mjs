export default (ctx) => {
  ctx.body = {
    id: ctx.params.id,
    name: `user ${ctx.params.id}`,
  };
};
