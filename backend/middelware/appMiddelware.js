
import jwt from 'jsonwebtoken'
import Veterinarian from '../models/Veterinarian.js';

const checkAuth = async (req,res,next) => {
    let token;
    //solo trae el token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //separar cuando hay espacio
            token = req.headers.authorization.split(' ')[1]
            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //trae todo menos pass -> sesion con veterinario
            req.veterinarian = await Veterinarian.findById(decoded.id).select("-password -token -confirmed")
            return next()
        } catch (error) {
            //si no hubo token
            const err = new Error('Token no valido ');
            return res.status(403).json({msg: err.message})
        }
    }
    if(!token){
        //si no hubo token
        const error = new Error('Token no valido o existente');
        res.status(403).json({msg: error.message})
    }
    //se va al siguiente middelware
    next();
}

export default checkAuth