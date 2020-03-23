/*
  1) In docker swarm the src folder of client-auth is missing - can't find why - and this file is required by server app
  2) CRA does not handle symlinks well (see https://github.com/moxystudio/react-with-moxy/issues/111) so contents of this
  file have to be in ES5 (http://bit.ly/2tRViJ9)
 */
/* global window */
/* eslint-disable object-shorthand */

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
  storageKey: storageKey,
  setToken: setToken,
  clearToken: clearToken,
  getToken: getToken,
};
