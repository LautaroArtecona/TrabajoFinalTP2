import express from "express";
import morgan from "morgan";
import cors from "cors"; //Faltaría configurar con los dominios permitidos
import fs from "fs";
import swaggerUi from "swagger-ui-express"; // Middleware de Swagger
import eventRoutes from "./src/routes/event.routes.js";

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

export default app;