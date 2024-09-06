import Veterinarian from "../models/Veterinarian.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";

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
    const { veterinarian } = req
    res.json({profile: veterinarian})
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

const forgotPassword = async (req,res) => {
    const {email} = req.body;
    //primero que coincide con email
    const existUser = await Veterinarian.findOne({email});
    if(!existUser){
        const error = new Error('El usario no existe')
        return res.status(403).json({msg: error.message})
    }
    //en caso existe
    try {
        //generar un id unico y lo agrega al token
        existUser.token = generateId();
        //guardar en la bd
        await existUser.save()
        res.json({msg : 'Se envió un email con las instrucciones'})
    } catch (error) {
        const err = new Error('Hubo un error en el usario')
        res.status(404).json({msg: err.message})
    }
}

const checkToken = async (req,res) => {
    const {token} = req.params
    const tokenValid = await Veterinarian.findOne({token});
    if(tokenValid){
        //el token es valido y el usuario existe
        res.json({msg:'Token válido y el usario existe'})
    }else{
        const error = new Error('Token no valido')
        res.status(400).json({msg: error.message})
    }
}

//una vez verificado que token y user exist
const newPass = async (req,res) => {
    const {token } = req.params;
    const {password} = req.body;

    const veterinarianExist = await Veterinarian.findOne({token})
    
    if(!veterinarianExist){
        const error = new Error('Veterinario no existe');
        res.status(400).json({msg : error.message});
    }
    //en caso de que si existe
    try {
        veterinarianExist.token = null;
        veterinarianExist.password = password
        console.log('hola');
        await veterinarianExist.save()
        res.json({msg:'Pass modificado correctamente'})
    } catch (error) {
        console.log(error);
    }
}

export {
    register ,
    profile,
    confirmAccount,
    authenticate,
    forgotPassword,
    checkToken,
    newPass
}