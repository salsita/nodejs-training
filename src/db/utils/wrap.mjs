export const onlyRows = fn => async (...args) => {
  const { rows } = await fn(...args);
  return rows;
};

export const onlyFirstRow = fn => async (...args) => {
  const { rows } = await fn(...args);
  return rows[0];
};
