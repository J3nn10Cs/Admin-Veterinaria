
import jwt, { decode } from 'jsonwebtoken'
import Veterinarian from '../models/Veterinarian.js';

const checkAuth = async (req,res,nex) => {
    let token;
    //solo trae el token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log();
    }
    
    try {
        //separar cuando hay espacio
        token = req.headers.authorization.split(' ')[1]
        //verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const veterinarian = await Veterinarian.findById(decoded.id)

        console.log(veterinarian);
    } catch (error) {
        //si no hubo token
        const err = new Error('Token no valido ');
        res.status(403).json({msg: err.message})
        nex();
    }
    //si no hubo token
    const error = new Error('Token no valido o existente');
    res.status(403).json({msg: error.message})
    nex();

}

export default checkAuth