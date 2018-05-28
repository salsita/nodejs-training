const { storageKey, setToken } = require("../../client-auth/src/login");

module.exports = sessionToken => `
var storageKey='${storageKey}';
${setToken.toString()};
${setToken.name}('${sessionToken}');
`;
