const express = require('express');
const app = require('../lib/app');

const router = new express.Router();

router.use(app.ensureLoggedIn);

router.get('/', (req, res) => {
  console.log(app.getStorage());
  res.render('admin', {
    subscribers: app.getStorage(),
    alreadySent: app.haveEmailsAlreadySent()
  });
});

router.post('/create-send', (req, res) => {
  const list = app.createAndSendEmails();
  res.render('admin-review-send', {
    recipients: list
  });
});

router.post('/re-send', (req, res) => {
  const list = app.resendRecipientList();
  res.render('admin-review-send', {
    recipients: list
  });
});

module.exports = router;
