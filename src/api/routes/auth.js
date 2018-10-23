import { Router } from 'express';
import { login, register, validate } from '../controllers/AuthController';

const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.post('/validate', validate);

export default router;
