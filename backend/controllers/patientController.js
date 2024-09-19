import Patient from "../models/Patient.js";

//agregar paciente
const addPatients = async (req,res) => {
    const patient = new Patient(req.body);
    //solo el id
    patient.veterinary = req.veterinary._id
    try {
        const storedpatient = await patient.save();
        res.json(storedpatient)
    } catch (error) {
        const err = new Error('Hubo un error')
        res.status(400).json({msg: err.message})
    }
}

//obtener pacientes
const getPatients = async (req,res) => {
    //traer todos los pacientes
    // const patients = await Patient.find();
    const patients = await Patient.find().where('veterinary').equals(req.veterinary);
    //obtener los pacientes
    res.json(patients)
}

//Obtener un paciente en especifico
const getPatient = async (req,res) => {
    const {id} = req.params;
    try {
        //filtro por id
        const patient = await Patient.findById(id)
        
        //revisar si el paciente fue agregado por v autenticado y convertir a string
        if(patient.veterinary._id.toString() !== req.veterinary._id.toString()){
            return res.json({msg:'Acción no válida'})
        }
        res.json({patient:patient})
    } catch (error) {
        const err = new Error('Error al obtener el paciente')
        res.json({msg:err})
    }
}

//actualizar un paciente
const updatePatient = async (req,res) => {
    const {id} = req.params;
    //filtro por id
    const patient = await Patient.findById(id)

    if(!patient){
        return res.status(404).json({msg:'Paciente no encontrado'})
    }

    //revisar si el paciente fue agregado por v autenticado y convertir a string
    if(patient.veterinary._id.toString() !== req.veterinary._id.toString()){
        return res.json({msg:'Acción no válida'})
    }
    
    //actualizar paciente
    patient.name = req.body.name || patient.name;
    patient.proprietor = req.body.proprietor || patient.proprietor;
    patient.email = req.body.email || patient.email;
    patient.date = req.body.date || patient.date;
    patient.symptoms = req.body.symptoms || patient.symptoms;

    try {
        //guardar al paciente
        const updatedPatient = await patient.save();
        res.json(updatedPatient)
    } catch (error) {
        const err = new Error('Hubo un error')
        res.json({msg:err})
    }
}

//eliminar un paciente
const deletePatient = async (req,res) => {
    const {id} = req.params;
    //filtro por id
    const patient = await Patient.findById(id)

    if(!patient){
        return res.status(404).json({msg:'Paciente no encontrado'})
    }

    //revisar si el paciente fue agregado por v autenticado y convertir a string
    if(patient.veterinary._id.toString() !== req.veterinary._id.toString()){
        return res.json({msg:'Acción no válida'})
    }

    try {
        await patient.deleteOne();
        res.json({msg: 'Paciente eliminado'})
    } catch (error) {
        const err = new Error('Hubo un error')
        res.json({msg:err})
    }
}

export{
    addPatients,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
}