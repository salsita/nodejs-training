module.exports = function createLock() {
  let lock;

  return async function lockFunction(fn) {
    if (lock) {
      try {
        await lock;
      } catch (err) {
        // we do not care about previous result
      }
    }

    lock = fn();
    return lock;
  };
};
