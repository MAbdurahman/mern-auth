import express from 'express';
import {test } from '../controllers/userController.js';

const router = express.Router();

//**************** user routes ****************//
router.get('/test', test);




export default router;