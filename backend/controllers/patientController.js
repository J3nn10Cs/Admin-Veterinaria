import Patient from "../models/Patient.js";

//agregar paciente
const addPatient = (req,res) => {
    const patient = new Patient(req.body);
    try {
        
    } catch (error) {
        const err = new Error('Hubo un error')
        res.status(400).json({msg: err.message})
    }
}

//obtener paciente
const getPatient = (req,res) => {

}

export{
    addPatient,
    getPatient
}