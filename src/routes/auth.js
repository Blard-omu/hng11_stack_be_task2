import express from 'express';
import { register, login, getUsers, getUserById} from '../controllers/auth.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';

const router = express.Router();

// routes
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/users', getUsers);
router.get('/users/:id', getUserById);



export default router