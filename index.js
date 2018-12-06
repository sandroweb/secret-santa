const app = require('./app/lib/app');

console.log(app.getConfig());

if (app.configExists()) {
  require('./app/lib/router');
} else {
  console.warn('No config detected...');
  require('./app/lib/installer');
}
