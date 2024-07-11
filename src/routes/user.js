import express from 'express';
import {getUsers, getUserById} from '../controllers/user.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

// routes
router.get('/', isLoggedIn, getUsers);
router.get('/:id', isLoggedIn, getUserById);



export default router