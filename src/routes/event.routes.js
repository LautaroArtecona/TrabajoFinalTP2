import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/event.controller.js";

const router = Router();

// POST /api/v1/events
router.post("/", createEvent);

// GET /api/v1/events
router.get("/", getAllEvents);

export default router;