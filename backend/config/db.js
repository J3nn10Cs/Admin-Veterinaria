
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_MONGO);
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(url);
    } catch (error) {
        console.log(`Error en ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;