import dotenv from 'dotenv';
import app from './app.js';
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a Mongo Atlas"))
  .catch((err) => console.log("Error de conexión:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Corriendo en el puerto ${PORT}`)});
