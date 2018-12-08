const app = require('./app/lib/app');
const chalk = require('chalk');

if (app.configExists()) {
  require('./app/lib/router');
} else {
  console.warn(chalk.red('No config detected...'));
  console.log('copy app/config/default.json to app/config/config.json and amend as needed');
}
