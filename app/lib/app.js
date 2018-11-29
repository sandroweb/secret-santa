const fs = require('fs');
const CONSTS = require('./consts');

module.exports = class App {
  static configExists() {
    return fs.existsSync(CONSTS.CONF_LOCATION);
  }

  static getConfig() {
    return require('../../' + CONSTS.CONF_LOCATION);
  }
};
