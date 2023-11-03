const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController.js');
const authenticate = require('../middlewares/authenticate.js');

router.post('/sendmail',  authenticate, mailController.send);

module.exports = router;