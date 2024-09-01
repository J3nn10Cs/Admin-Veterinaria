import express from 'express';
import { register,profile,confirmAccount } from '../controllers/veterinarianController.js';

const router = express.Router();

router.post("/", register)

router.get('/profile',profile)

router.get('/confirm/:token', confirmAccount)

export default router;