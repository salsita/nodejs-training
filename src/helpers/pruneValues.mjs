export default values =>
  Object.entries(values)
    .reduce(
      (acc, [key, val]) =>
        (val === undefined
          ? acc
          : {
            ...acc,
            [key]: val,
          }),
      {}
    );
