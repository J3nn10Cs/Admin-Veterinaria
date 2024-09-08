import express from 'express';
import dotenv from 'dotenv'
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

//rutas
app.use('/api/veterinaries', router)
app.use('/api/patients', routerPatients)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});