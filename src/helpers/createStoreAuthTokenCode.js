const { storageKey, setToken } = require("../../shared/login");

module.exports = (sessionToken) => `
var storageKey='${storageKey}';
${setToken.toString()};
${setToken.name}('${sessionToken}');
`;
