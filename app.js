import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import eventRoutes from "./src/routes/event.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

const swaggerFile = JSON.parse(
    fs.readFileSync("./swagger-output.json", "utf-8")
);

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Ruta de la documentación de Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rutas de la APP
app.use("/api/v1", eventRoutes);
app.use("/api/v1/auth", authRoutes);

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("Conectado a Mongo Atlas"))
    .catch((err) => console.log("Error de conexión:", err));
}

export default app;