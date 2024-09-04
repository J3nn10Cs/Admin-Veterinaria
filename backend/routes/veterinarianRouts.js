import express from 'express';
import { register,profile,confirmAccount, authenticate } from '../controllers/veterinarianController.js';
import checkAuth from '../middelware/appMiddelware.js';

const router = express.Router();

//registrar
router.post("/", register)
//confirmar token
router.get('/confirm/:token', confirmAccount)
//autenticae
router.post('/login', authenticate)


//perfil -> comprobar el token
router.get('/profile', checkAuth , profile)

export default router;