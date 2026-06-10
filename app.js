import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";
import eventRoutes from "./src/routes/event.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import ticketRoutes from "./src/routes/ticket.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerFile = JSON.parse(
    fs.readFileSync(join(__dirname, "./swagger-output.json"), "utf-8")
);

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Ruta de la documentación de Swagger
app.get("/swagger.json", (req, res) => res.json(swaggerFile));
app.get("/docs", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>E-Tickets API - Docs</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: "/swagger.json",
      dom_id: "#swagger-ui",
    });
  </script>
</body>
</html>`);
});

// Rutas de la APP
app.use("/api/v1", eventRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("Conectado a Mongo Atlas"))
    .catch((err) => console.log("Error de conexión:", err));
}

export default app;