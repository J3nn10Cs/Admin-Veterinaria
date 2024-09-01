import mongoose from "mongoose";
import generateId from "../helpers/generateId.js";
//crear el schema
const veterinarianSchema = mongoose.Schema({
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

//registrar en mongo0se
const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

export default Veterinarian;