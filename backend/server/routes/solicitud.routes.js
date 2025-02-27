import { Router } from "express";
import {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} from "../controllers/solicitud.controllers.js";

const router = Router();

router.get("/api/solicitud", getSolicitudes);
router.get("/api/solicitud/:id", getSolicitud);
router.post("/api/solicitud", createSolicitud);
router.put("/api/solicitud/:id", updateSolicitud);
router.delete("/api/solicitud/:id", deleteSolicitud);

export default router;
