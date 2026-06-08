import express from "express";
import morgan from "morgan";
import cors from "cors"; //Faltaría configurar con los dominios permitidos

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Rutas de la APP
app.use("/api/v1/events", eventRoutes);

export default app;