

import express from 'express'
import { createAccount, loginUser, deleteUser, getAllUsers, editUser } from '../controllers/auth.js';

const router = express.Router();


router.route('/register').post(createAccount);
router.route('/login').post(loginUser)
router.route('/delete').delete(deleteUser)

router.route('/').get(getAllUsers).post(editUser)

export default router