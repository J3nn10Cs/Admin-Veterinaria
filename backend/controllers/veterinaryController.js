import Veterinary from "../models/Veterinary.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgetPassword from "../helpers/emailForgetPassword.js";

//Registrar al usuario
const register = async (req,res) => {
    const {email, name} = req.body;
    //Revisar si ya está registrado
    const userExists = await Veterinary.findOne({email})
    if(userExists){
        const error = new Error('Exists user')
        return res.status(400).json({msg: error.message})
    }
    try {
        //Guardar un nuevo veterinario
        const veterinary = Veterinary(req.body)
        const veterinarySave = await veterinary.save();
        //Enviar email
        emailRegister({
            email,
            name,
            token: veterinarySave.token
        });

        //format json
        res.json({ msg : veterinarySave})
    } catch (error) {
        const err = new Error('Hubo un error en email o password')
        res.status(404).json({msg: err.message})
    }
}

//ingresar al perfil
const profile = (req,res) => {
    const { veterinary } = req
    res.json(veterinary)
}

//actualizar perfil
const updateProfile = async (req,res) => {
    //encontrar el veterionario a editar
    const veterinary = await Veterinary.findById(req.params.id)

    if(!veterinary){
        const error = new Error('Hubo un error')
        return res.status(403).json({msg: error.message})
    }

    const {email} = req.body
    //el usuario modifica su email por uno nuevo
    if(veterinary.email !== req.body.email){
        //evaluamos si ya existe
        const existEmail = await Veterinary.findOne({email})
        if(existEmail){
            //muestra error de que ya está en uso
            const error = new Error('Email en uso')
            res.status(400).json({msg: error.message})
        }
    }

    //contiene info ya existente 
    try {
        //el nombre/email/etc va a ser igual a los datos que ingresó el veti si no, se le asigan lo que está en la bd
        // veterinary.name = req.body.name || veterinary.name
        //el nombre/email/etc va a ser igual a los datos que ingresó el veti
        veterinary.name = req.body.name
        veterinary.email = req.body.email 
        veterinary.web = req.body.web 
        veterinary.phone = req.body.phone 

        //el veterinario actualizado lo guardamos en la bd
        const veterinaryUpdate = await veterinary.save();
        res.json(veterinaryUpdate);
    } catch (error) {
        console.log(error);
    }
}

//confirmar la cuenta
const confirmAccount = async (req,res) => {
    // console.log(req.params.token);
    const {token} = req.params
    const userConfirm = await Veterinary.findOne({token});
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
    const user = await Veterinary.findOne({email});
    
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
        //almacenamos el id y traemos los campos que deseamos
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            web: user.web,
            phone: user.phone,
            token: generateJWT(user.id)
        })
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message})
    }
}

const forgotPassword = async (req,res) => {
    const {email} = req.body;
    //primero que coincide con email
    const existUser = await Veterinary.findOne({email});
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
        //Enviar email con instrucciones
        emailForgetPassword({
            email,
            name:existUser.name,
            token: existUser.token,
        })
        console.log(`Mensaje enviado ${token}`);
        res.json({msg : 'Se envió un email con las instrucciones'})
    } catch (error) {
        const err = new Error('Hubo un error en el usario')
        res.status(404).json({msg: err.message})
    }
}

const checkToken = async (req,res) => {
    const {token} = req.params
    const tokenValid = await Veterinary.findOne({token});
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

    const veterinaryExist = await Veterinary.findOne({token})
    
    if(!veterinaryExist){
        const error = new Error('Veterinario no existe');
        res.status(400).json({msg : error.message});
    }
    //en caso de que si existe
    try {
        veterinaryExist.token = null;
        veterinaryExist.password = password
        console.log('hola');
        await veterinaryExist.save()
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
    newPass,
    updateProfile
}