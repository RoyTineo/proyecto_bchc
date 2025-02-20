import { Router } from "express";
import {
  getPersonas,
  getPersona,
  createPersona,
  updatePersona,
  deletePersona,
} from "../controllers/persona.controllers.js";

const router = Router();

router.get("/persona", getPersonas);
router.get("/persona/:id", getPersona);
router.post("/persona", createPersona);
router.put("/persona/:id", updatePersona);
router.delete("/persona/:id", deletePersona);

export default router;
