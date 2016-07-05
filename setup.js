const path = require('path');
const extract = require('extract-zip')
require('shelljs/global');

const WORKDIR = path.join(__dirname, 'selenium');
const BASEDIR = __dirname;
const CHROMEDRIVER_URL = 'http://chromedriver.storage.googleapis.com/2.22/chromedriver_mac32.zip';
const SELENIUM_URL = 'http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar';
const CHROMEDRIVER_FILE = 'chromedriver.zip';

mkdir('-p', WORKDIR);
cd(WORKDIR);
exec(`curl ${CHROMEDRIVER_URL} -o ${CHROMEDRIVER_FILE}`);
exec(`curl ${SELENIUM_URL} -o selenium.jar`);

extract(CHROMEDRIVER_FILE, {dir: WORKDIR}, err => console.log(err));
