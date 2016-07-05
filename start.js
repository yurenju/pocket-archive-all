const path = require('path');
require('shelljs/global');

const WORKDIR = path.join(__dirname, 'selenium')
const SELENIUM_FILE = path.join(WORKDIR, 'selenium.jar');

const seleniumProcess = exec(`java -jar ${SELENIUM_FILE}`,
                             {async: true, cwd: WORKDIR});

setTimeout(() => {
  exec('./node_modules/.bin/nightwatch -t ./index.js', (code, stdout, stderr) => {
    seleniumProcess.kill();
  });
}, 5000)
