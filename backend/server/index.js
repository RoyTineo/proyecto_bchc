import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";

import registroRoutes from "./routes/registro.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import personaRoutes from "./routes/persona.routes.js";
import solicitudRoutes from "./routes/solicitud.routes.js";

const app = express();

 
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(indexRoutes);
app.use(registroRoutes);
app.use(rolRoutes);
app.use(personaRoutes);
app.use(solicitudRoutes);

app.listen(PORT);
console.log("Servidor corriendo en el puerto: " + PORT);
