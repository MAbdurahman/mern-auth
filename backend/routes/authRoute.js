import express from "express";
import { signUp, signIn, signOut, signInWithGoogle } from "../controllers/authController.js";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-in-with-google', signInWithGoogle);
router.get('/sign-out', signOut);



export default router;