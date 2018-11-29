const router = new express.Router();
const app = require('../lib/app');
const config = app.getConfig();

router.get('/', function (req, res) {
  res.render('index', {
    title: secretSanta.fetchConfig()['title'],
    deadline: secretSanta.fetchConfig()['deadline'],
    spendLimit: secretSanta.fetchConfig()['spend-limit']
  });
});

router.post('/save', function (req, res) {
  secretSanta.addSubscriber(req);

  res.render('registered');
});

module.exports = router;
