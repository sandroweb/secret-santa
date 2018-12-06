const prompt = require('prompt');
const fs = require('fs');
const CONSTS = require('./consts');

console.log('Running installation...');

console.log('Creating storage...');

if (!fs.lstatSync(CONSTS.DB_LOCATION).isDirectory()) {
  fs.mkdirSync(CONSTS.DB_LOCATION);
}

fs.writeFileSync(CONSTS.DB_LOCATION, '{}');

console.log('Config options required (Default values appear in brackets)');

prompt.message = '>';
prompt.delimiter = ' ';

prompt.start();

prompt.get([
  {
    name: 'title',
    description: 'Title text (Secret Santa)'
  },
  {
    name: 'admin-password',
    description: 'Password to access admin area',
    required: true
  },
  {
    name: 'deadline',
    description: 'The deadline for signing up'
  },
  {
    name: 'spend-limit',
    description: 'The spend limit'
  },
  {
    name: 'email-type',
    description: 'Which email service should be used? (smtp | sendgrid | mailgun)'
  }
], function (err, result) {
  if (result['email-type'] === 'smtp') {
    this.writeConfig(result);
    console.log('Please manually enter SMTP details into app/config/config.json when done');
  } else {
    prompt.get([
      {
        name: 'api-key',
        description: 'Mailgun API key'
      }
    ], function (err, mailgunResult) {
      if (!err) {
        this.writeConfig(result, mailgunResult);
      } else {
        console.error(err);
      }
    }.bind(this));
  }
}.bind(this));