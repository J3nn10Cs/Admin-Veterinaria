import mongoose from "mongoose";
import generateId from "../helpers/generateId.js";
import bcrypt from 'bcrypt'
//crear el schema
const veterinarySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone:{
        type: String,
        default: null,
        trim: true
    },
    web :{
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generateId()
    },
    confirmed:{
        type: Boolean,
        //cambia una vez iniciada la cuenta
        default: false
    }
})

//antes de guardar hasjaer el password
veterinarySchema.pre('save', async function(next){
    //evaluar si ya fue hasheado
    if(!this.isModified('password')){
        //middleware
        next(); 
    }
    //hashear
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

//comprobar pass
veterinarySchema.methods.checkPassword = async function(password) {
    //comprobar pss y hash
    return await bcrypt.compare(password,this.password)
}

//registrar en mongo0se
const veterinary = mongoose.model('veterinary', veterinarySchema);

export default veterinary;