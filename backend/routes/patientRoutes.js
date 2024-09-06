import express from "express";
import { addPatient, getPatient } from "../controllers/patientController.js";
import checkAuth from "../middelware/appMiddelware.js";
const routerPatients = express.Router();

//rutas

routerPatients.route('/')
    //proteger el endpoint
    .post(checkAuth,addPatient).get(getPatient)

export default routerPatients