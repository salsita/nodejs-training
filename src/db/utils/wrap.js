module.exports = {
  onlyRows: fn => async (...args) => {
    const { rows } = await fn(...args);
    return rows;
  },

  onlyFirstRow: fn => async (...args) => {
    const { rows } = await fn(...args);
    return rows[0];
  }
};
