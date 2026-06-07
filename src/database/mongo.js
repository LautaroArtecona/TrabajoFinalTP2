import { connect } from "mongoose";
import { config } from "./config.js"; 

export const connectMongo = async () => {
    try {
        await connect(config.mongoUri);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al intentar conectar a MongoDB", error);
    }
};