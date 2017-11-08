export default (variable, defaultValue) => ((typeof variable === 'undefined') ? defaultValue : !!Number(variable));
