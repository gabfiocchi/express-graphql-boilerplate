import { Router } from 'express';
import auth from './auth';

const router = new Router();

router.use('/auth', auth);

module.exports = router;
