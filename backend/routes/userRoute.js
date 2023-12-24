import express from 'express';
import {test, updateUser, deleteUser } from '../controllers/userController.js';
import {authenticateToken} from "../utils/authenticateUser.js";

const router = express.Router();

//**************** user routes ****************//
router.get('/test', test);
router.put('/update-user/:id', authenticateToken, updateUser);
router.delete('/delete-user/:id', authenticateToken, deleteUser);

export default router;