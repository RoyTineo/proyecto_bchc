import { Router } from "express";
import {
  getRegistros,
  getRegistro,
  createRegistro,
  updateRegistro,
  deleteRegistro,
} from "../controllers/registro.controllers.js";
const router = Router();

router.get("/registro", getRegistros);

router.get("/registro/:id", getRegistro);

router.post("/registro", createRegistro);

router.put("/registro/:id", updateRegistro);

router.delete("/registro/:id", deleteRegistro);

export default router;
