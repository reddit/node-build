import { getTestFiles } from './getTestFiles';

export const getWebpackEntryForTest = dir => {
  console.log('   Searching for tests in', process.cwd());
  const files = getTestFiles(dir, '.test.');
  console.log('   Found ' + files.length + ' test' + (files.length > 1 ? 's' : ''));

  return files.reduce((prev, current) => {
    const moduleName = `${cur.path.split('.test')[0].split('./')[1]}.compiledtest`;
    prev[moduleName] = cur.path;
    return prev;
  }, {});
};
