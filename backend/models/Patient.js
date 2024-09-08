import mongoose from "mongoose";

const PatientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    proprietor: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    symptoms:{
        type: String,
        required: true
    },
    veterinary:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'veterinary'
    }
},{
    timestamps: true
})

const Patient = mongoose.model('Patient', PatientsSchema)

export default Patient