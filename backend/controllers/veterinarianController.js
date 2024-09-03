import Veterinarian from "../models/Veterinarian.js";
import generateJWT from "../helpers/generateJWT.js";

//Registrar al usuario
const register = async (req,res) => {
    const {email} = req.body;
    //Revisar si ya está registrado
    const userExists = await Veterinarian.findOne({email})
    if(userExists){
        const error = new Error('Exists user')
        return res.status(400).json({msg: error.message})
    }
    try {
        //Guardar un nuevo veterinario
        const veterinarian = Veterinarian(req.body)
        const veterinarianSave = await veterinarian.save();
        //format json
        res.json({ msg : veterinarianSave})
    } catch (error) {
        console.log(error);
    }
}

const profile = (req,res) => {
    res.json({msg:'Desde profile'})
}

//confirmar la cuenta
const confirmAccount = async (req,res) => {
    // console.log(req.params.token);
    const {token} = req.params
    const userConfirm = await Veterinarian.findOne({token});
    if(!userConfirm){
        const error = new Error('Invalid tonken')
        return res.status(404).json({msg: `Error en ${error.message}`})
    }
    try {
        userConfirm.token = null
        userConfirm.confirmed = true
        await userConfirm.save()
        res.json({msg: 'User confirmed'})
    } catch (error) {
        console.log(error);
    }
}

//autenticar usuario
const authenticate = async (req,res) => {
    const {email,password} = req.body;
    //comprobar si el usuario existe
    const user = await Veterinarian.findOne({email});
    
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg : error.message})
    }

    //comprobar si el usurio está comporbado
    if(!user.confirmed){
        const error = new Error('Usuario no confirmado')
        return res.status(404).json({msg: error.message})
    }

    //revisar pass
    if(await user.checkPassword(password)){
        //almacenamos el id
        res.json({token: generateJWT(user.id) })
    }else{
        console.log('Pass incorrect');
    }
}

export {
    register ,
    profile,
    confirmAccount,
    authenticate
}