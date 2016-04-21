module.exports = function(options) {
  console.log('options?', options);
  return {
    extensions: options.extensions,
  };
}
