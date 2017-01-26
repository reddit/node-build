var path = require('path');
var url = require('url');
var superagent = require('superagent');

var HEADERS = { Authorization: 'Bearer ' + process.env.SENTRY_KEY };
var BASE_URL = process.env.SENTRY_RELEASE_BASE_URL;

function makeUrl(project, org) {
  return BASE_URL + '/api/0/projects/' + org + '/' + project + '/releases/';
}

/**
 * Creates a Sentry release, a versioned collection of compiled js and their
 * sourcemaps.
 * @param {String} endpoint
 *        The endpoint this release is being pushed to
 * @param {String} version
 *        The version for this release
 */
function createRelease(endpoint, version) {
  return new Promise(function(resolve, reject) {
    superagent
      .post(endpoint)
      .set(HEADERS)
      .send({ version: version })
      .end(function(err, res) {
        if (!err) {
          console.log('Sentry - Pushed release. Version: ' + version);
          resolve(res);
        } else {
          reject(err);
        }
      });
  });
}

/**
 * Uploads a single file to a selected release.
 * @param {String} endpoint
 *        The endpoint to push these files to
 * @param {String} releaseVersion
 *        The release version for this file
 * @param {String} filePath
 *        The absolute file path for the file we want to upload to the release
 */
function uploadFile(endpoint, releaseVersion, filePath) {
  // sentry lets you use the tilde to indicate it just looks at relative locations
  // instead of relying on the host/domain.
  var IGNORE_DOMAIN = '~';
  var staticBase = process.env.STATIC_BASE;
  var IGNORE_PATH = staticBase ? url.parse(staticBase).path + '/' : '';
  var CONFLICT_CODE = 409;

  var fileData = path.parse(filePath);
  var fileName = fileData.name + fileData.ext;
  var sentryFilePath = IGNORE_DOMAIN + IGNORE_PATH + fileName;

  return new Promise(function(resolve, reject) {
    superagent
      .post(endpoint)
      .set(HEADERS)
      .attach('file', filePath)
      .field('name', sentryFilePath)
      .end(function(err, res) {
        if (!err) {
          console.log('Sentry (release: ' + releaseVersion +
            ') - Successfully uploaded ' + name);
          resolve();
        } if (err && err.response && err.response.statusCode === CONFLICT_CODE) {
          console.log('Sentry (' + releaseVersion + ') - ' + name +
            ' already exists.');
          resolve();
        } else {
          reject(err);
        }
      });
  });
}

/**
 * Creates a Sentry release and pushes the relevant assets to that release.
 * @param {String} projectName
 *        The Sentry project this release belongs to
 * @param {String} releaseVersion
 *        The release version for the js assets
 * @param {Array} assets
 *        An array of filepaths to the assets that will be uploaded
 */
function uploadToSentry(projectSlug, orgSlug, releaseVersion, assets) {
  var releaseEndpoint = makeUrl(projectSlug, orgSlug);
  var uploadEndpoint = releaseEndpoint + releaseVersion + '/files/';

  createRelease(releaseEndpoint, releaseVersion)
    .then(function() {
      return Promise.all(assets.map(uploadFile.bind(null,
                                                    uploadEndpoint,
                                                    releaseVersion
                                                    )));
    })
    .catch(function(e) {
      console.log('Release failed with error: ', e);
    });
}


module.exports = uploadToSentry;
