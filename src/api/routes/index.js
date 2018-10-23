const auth = require('./auth');
const { Router } = require('express');

const router = new Router();

router.use('/auth', auth);

module.exports = router;
