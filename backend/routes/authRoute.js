import express from "express";
import { signUp, signIn, signInWithGoogle } from "../controllers/authController.js";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-in-with-google', signInWithGoogle);



export default router;