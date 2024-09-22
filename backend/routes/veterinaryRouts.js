import express from 'express';
import { register,profile,confirmAccount, authenticate, forgotPassword, checkToken, newPass, updateProfile, updatePassword } from '../controllers/veterinaryController.js';
import checkAuth from '../middelware/appMiddelware.js';

const router = express.Router();

//----> Area publica
//registrar
router.post("/", register)
//confirmar token
router.get('/confirm/:token', confirmAccount)
//autenticar
router.post('/login', authenticate)
//password olvidado -> validar email del usuario
router.post('/forget-password', forgotPassword)
// //con el token -> leer el token ----
// router.get('/forgot-password/:token', checkToken)
// //nuevo password -> almacenar el new pass ----
// router.post('/forgot-password/:token', newPass)

router.route('/forget-password/:token').get(checkToken).post(newPass)

//----> Area priv
//perfil -> comprobar el token
router.get('/profile', checkAuth , profile)
router.put('/profile/:id', checkAuth , updateProfile)
router.put('/update-password', checkAuth , updatePassword)

export default router;