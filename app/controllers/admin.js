const router = new express.Router();
const app = require('../lib/app');

router.use(app.ensureLoggedIn);

router.get('/admin', (req, res) => {
  res.render('admin', {
    subscribers: secretSanta.getSubscribers(),
    alreadySent: secretSanta.haveEmailsAlreadySent()
  });
});

router.post('/admin/create-send', (req, res) => {
  const list = secretSanta.createAndSendEmails();
  res.render('admin-review-send', {
    recipients: list
  });
});

router.post('/admin/re-send', (req, res) => {
  const list = secretSanta.resendRecipientList();
  res.render('admin-review-send', {
    recipients: list
  });
});

module.exports = router;
