import express from 'express';
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import router from './routes/veterinarianRouts.js';
//manda a llamar la función de express
const app = express();
//para poder pasar datos
app.use(express.json());
const port = process.env.port || 400;

//leer el archivo
dotenv.config();

//Conectar a la bd
connectDb()

//rutas
app.use('/api/veterinarians', router)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});