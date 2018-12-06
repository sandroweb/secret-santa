const fs = require('fs');
const CONSTS = require('./consts');

module.exports = class App {
  static configExists() {
    return fs.existsSync(CONSTS.CONF_LOCATION);
  }

  static getConfig() {
    return require('../../' + CONSTS.CONF_LOCATION);
  }

  static ensureLoggedIn(req, res, next) {
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

  static initSession(req) {
    req.session.user = true;
  }

  static addSubscriber() {
    // todo
  }

};
