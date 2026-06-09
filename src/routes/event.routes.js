import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/event.controller.js";
import { verifyToken, soloOrganizador } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/v1/events — pública, cualquiera puede ver los eventos
router.get("/events", getAllEvents);

// POST /api/v1/events — protegida: solo organizadores logueados pueden crear eventos
router.post("/events", verifyToken, soloOrganizador, createEvent);

export default router;