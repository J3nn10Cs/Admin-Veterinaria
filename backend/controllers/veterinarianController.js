
import Veterinarian from "../models/Veterinarian.js";

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
        res.json({ msg : 'Registrando usuario...'})
    } catch (error) {
        console.log(error);
    }
}

const profile = (req,res) => {
    res.json({url : 'Desde api perfil'})
}

const confirmAccount = async (req,res) => {
    console.log(req.params.token);
    const {token} = req.params
    const userConfirm = await Veterinarian.findOne({token});
    res.json({msg: userConfirm})
    if(!userConfirm){

    }
    res.json({msg: 'hola COnfirmando cuenta'})
}

export {
    register ,
    profile,
    confirmAccount
}