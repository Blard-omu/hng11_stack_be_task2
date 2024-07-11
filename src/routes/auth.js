import express from 'express';
import { register, login} from '../controllers/auth.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';

const router = express.Router();

// routes
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)



export default router