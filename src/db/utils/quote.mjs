export default obj =>
  Object.entries(obj)
    .reduce(
      (acc, [key, val]) => ({
        ...acc,
        [`"${key}"`]: val,
      }),
      {}
    );
