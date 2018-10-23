const { Router } = require('express');
const { login, register, validate } = require('../controllers/AuthController');

const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.post('/validate', validate);

module.exports = router;
