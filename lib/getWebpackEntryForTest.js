import colors from 'colors';
import { getTestFiles } from './getTestFiles';

const { magenta } = colors;

export const getWebpackEntryForTest = dir => {
  console.log(magenta(`Searching for tests in ${process.cwd()}`));

  const files = getTestFiles(dir, '.test.');
  console.log(magenta(`Found ${files.length} test${files.length ? 's' : ''}`));

  return files.reduce((prev, cur) => {
    const moduleName = `${cur.path.split('.test')[0].split('./')[1]}.compiledtest`;
    prev[moduleName] = cur.path;
    return prev;
  }, {});
};
