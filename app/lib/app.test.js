const fs = require('fs');
const expect = require('chai').expect;
const app = require('./app');

describe('App', function () {
  describe('configExists()', () => {
    const CONSTS = require('./consts');
    const originalValue = CONSTS.CONF_LOCATION;
    const dummyConfigLocation = './app/config/test.json';

    after(function () {
      fs.unlinkSync(dummyConfigLocation);
      CONSTS.CONF_LOCATION = originalValue;
    });

    it('should report correct status', () => {
      CONSTS.CONF_LOCATION = dummyConfigLocation;

      expect(app.configExists()).to.equal(false);
      fs.writeFileSync(CONSTS.CONF_LOCATION, 'test-file');
      expect(app.configExists()).to.equal(true);
    });
  });

  describe('ensureLoggedIn()', () => {
    it('should redirect to admin if a user is present and /login is requested', () => {
      let req = {
        session: {
          user: true
        },
        url: '/login'
      };

      let res = {
        redirect: (route) => {
          expect(route).to.equal('/admin');
        }
      };

      app.ensureLoggedIn(req, res);
    });

    it('should issue a 401 when not logged in, then render login page', () => {
      let req = {
        session: {
          user: null
        },
        url: '/secret-page'
      };

      let res = {
        status: (code) => {
          expect(code).to.equal(401);
        },
        render: (page) => {
          expect(page).to.equal('login');
        }
      };

      app.ensureLoggedIn(req, res);
    });

    it('should continue to next middleware if authenticated', (done) => {
      let req = {
        session: {
          user: true
        },
        url: '/secret-page'
      };

      let next = () => {
        done();
      };

      app.ensureLoggedIn(req, null, next);
    });
  });

  describe('initSession()', () => {
    it('should set the session var', () => {
      let req = {
        session: {}
      };

      app.initSession(req);

      expect(req.session.user).to.equal(true);
    });
  });
});
