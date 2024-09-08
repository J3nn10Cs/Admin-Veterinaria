import express from "express";
import { addPatients, deletePatient, getPatient, getPatients, updatePatient } from "../controllers/patientController.js";
import checkAuth from "../middelware/appMiddelware.js";
const routerPatients = express.Router();

//rutas

routerPatients.route('/')
    //proteger el endpoint
    //obtener y agregar pacientes
    .post(checkAuth,addPatients)
    .get(checkAuth,getPatients)

routerPatients.route('/:id')
    //obtener un paciente
    .get(checkAuth,getPatient)
    //actualizar paciente
    .put(checkAuth,updatePatient)
    //eliminar un paciente
    .delete(checkAuth,deletePatient)
export default routerPatients