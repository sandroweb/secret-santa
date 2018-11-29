const fs = require('fs');
const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('./app');

describe('App', function () {

  describe('configExists', function () {
    const CONSTS = require('./consts');
    const originalValue = CONSTS.CONF_LOCATION;
    const dummyConfigLocation = './app/config/test.json';

    after(function () {
      fs.unlinkSync(dummyConfigLocation);
      CONSTS.CONF_LOCATION = originalValue;
    });

    it('configExists() should report correct status', function () {
      CONSTS.CONF_LOCATION = dummyConfigLocation;

      expect(app.configExists()).to.equal(false);
      fs.writeFileSync(CONSTS.CONF_LOCATION, 'test-file');
      expect(app.configExists()).to.equal(true);
    });
  });



});