import express from 'express';
import { register, login, getUsers, getUserById} from '../controllers/auth.js';
import { getUserOrganisations } from '../controllers/auth.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

// routes
router.post('/register', register)
router.post('/login', login)
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/organisations', isLoggedIn, getUserOrganisations);



export default router