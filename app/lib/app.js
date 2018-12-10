const fs = require('fs');
const CONSTS = require('./consts');
const jsonStore = require('json-store');

module.exports = class App {
  static configExists () {
    return fs.existsSync(CONSTS.CONF_LOCATION);
  }

  static initConfig () {
    fs.copyFileSync(CONSTS.CONF_SOURCE, CONSTS.CONF_LOCATION);

    fs.writeFileSync(CONSTS.DB_LOCATION, JSON.stringify({
      subscribers: []
    }));
  }

  static getConfig () {
    return require('../../' + CONSTS.CONF_LOCATION);
  }

  static getStorage () {
    let db = fs.readFileSync(CONSTS.DB_LOCATION);
    return JSON.parse(db.toString());
  }

  static ensureLoggedIn (req, res, next) {
    if (req.session.user && req.url === '/login') {
      res.redirect('/admin');
    } else if (!req.session.user && req.url !== '/login') {
      req.session.error = 'Access denied!';
      res.status(401);
      res.render('login');
    } else {
      next();
    }
  }

  static initSession (req) {
    req.session.user = true;
  }

  static haveEmailsAlreadySent () {
    return false;
  }
};
