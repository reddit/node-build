import fs from 'fs';

export const getTestFiles = (dir, ext) => {
  if (dir.indexOf('node_modules') > -1) { return; }
  if (dir.indexOf('.git') > -1) { return; }

  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    files = [];
  }

  return files
    .map(file => {
      const path = `${dir}${file}`;

      try {
        const stats = fs.statSync(path);
        if (stats.isDirectory()) { return getTestFiles(`${path}/${ext}`); }
        if (file.indexOf(ext) > -1) { return { file, path }; }
        return null;
      }
      catch (e) {
        return null;
      }
    })
    .filter(x => x)
    .reduce((prev, cur) => {
      if (Array.isArray(curr)) {
        return prev.concat(cur);
      } else {
        return prev.concat([cur]);
      }
    }, []);
};
