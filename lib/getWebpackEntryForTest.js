var path = require('path');

var getTestFiles = require('./getTestFiles');

module.exports = function getWebpackEntryForTest(dir) {
  console.log('   Searching for tests in', path.join(process.cwd(), dir));
  var files = getTestFiles(dir, '.test.');
  console.log('   Found ' + files.length + ' test' + (files.length > 1 ? 's' : ''));

  return files.reduce(function(prev, cur) {
    var moduleName = cur.path.split('.test')[0].split('./')[1] + '.compiledtest';
    prev[moduleName] = cur.path;
    return prev;
  }, {});
};
