import express from "express";
import morgan from "morgan";
import cors from "cors"; //Faltaría configurar con los dominios permitidos

const app = express();

app.use(express.json());
app.use(morgan(dev));
app.use(cors());

export default app;