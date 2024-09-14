import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDb from './config/db.js';
import router from './routes/veterinaryRouts.js';
import routerPatients from './routes/patientRoutes.js';
//manda a llamar la función de express
const app = express();
//para poder pasar datos
app.use(express.json());
const port = process.env.port || 4000;

//leer el archivo
dotenv.config();

//Conectar a la bd
connectDb()

//pasamos url a enviar datos del front
const allowedDomains = [process.env.FRONT_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(allowedDomains.indexOf(origin) !== -1) {
            //El origen de request está permitido
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

//rutas
app.use('/api/veterinaries', router)
app.use('/api/patients', routerPatients)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});