module.exports = (variable, defaultValue) => ((typeof variable === 'undefined') ? defaultValue : !!Number(variable));
