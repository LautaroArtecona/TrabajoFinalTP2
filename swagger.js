import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "E-Tickets API",
    description: "Documentación oficial del backend para la gestión de eventos y venta de entradas.",
  }, 
  
  
  host: process.env.VERCEL_URL || "localhost:3000",
  basePath: "/api/v1",
  schemes: [process.env.VERCEL_URL ? "https" : "http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Ingresá el token JWT con el formato: Bearer <tu_token>",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  
  ignore: {path: ["/swagger.json", "/docs"]},
};

const outputFile = "./swagger-output.json";

const endpointsFiles = [
//  "./src/routes/event.routes.js",
//  "./src/routes/auth.routes.js",
//  "./src/routes/ticket.routes.js",
"./app.js"
];

swaggerAutogen()(outputFile, endpointsFiles, doc);