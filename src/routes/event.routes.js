import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/event.controller.js";

const router = Router();

// POST /api/v1/events
router.post("/events", createEvent);

// GET /api/v1/events
router.get("/events", getAllEvents);

export default router;