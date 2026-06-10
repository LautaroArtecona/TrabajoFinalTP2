import { Router } from "express";
import { getMyTickets, cancelTicket } from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/tickets — devuelve los tickets del usuario autenticado
router.get("/", verifyToken, getMyTickets);

// DELETE /api/tickets/:id — cancela un ticket propio
router.delete("/:id", verifyToken, cancelTicket);

export default router;
