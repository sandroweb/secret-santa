const app = require('./app/lib/app');
const chalk = require('chalk');

if (app.configExists()) {
  require('./app/lib/router');
} else {
  console.warn(chalk.red('No config detected...'));
  app.initConfig();
  console.log('Modify app/config/config.json as needed');
}
