const storageKey = "__token";

function setToken(token) {
  if (token && token.length > 0) {
    window.localStorage.setItem(storageKey, token);
  } else {
    window.localStorage.removeItem(storageKey);
  }
}

function clearToken() {
  setToken(null);
}

function getToken() {
  return window.localStorage.getItem(storageKey);
}

module.exports = {
  storageKey,
  setToken,
  clearToken,
  getToken
};
