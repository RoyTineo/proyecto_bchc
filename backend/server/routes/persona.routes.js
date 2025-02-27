import { Router } from "express";
import {
  getPersonas,
  getPersona,
  getPersonaByDNI,
  createPersona,
  updatePersona,
  deletePersona,
} from "../controllers/persona.controllers.js";

const router = Router();

router.get("/api/persona", getPersonas);
router.get("/api/persona/:id", getPersona);
router.get("/api/personabydni/:dni", getPersonaByDNI);
router.post("/api/persona", createPersona);
router.put("/api/persona/:id", updatePersona);
router.delete("/api/persona/:id", deletePersona);

export default router;
