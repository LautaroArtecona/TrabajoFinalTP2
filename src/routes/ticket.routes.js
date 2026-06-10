import { Router } from "express";
import { getMyTickets, cancelTicket } from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/tickets — devuelve los tickets del usuario autenticado
// #swagger.tags = ['Tickets']
// #swagger.description = 'Devuelve los tickets del usuario autenticado'
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Lista de tickets', schema: { tickets: [{ uniqueCode: 'ABC123', purchaseDate: '2026-06-10T00:00:00Z', event: { title: 'Evento ejemplo' } }] } }
router.get("/", verifyToken, getMyTickets);

// DELETE /api/tickets/:id — cancela un ticket propio
// #swagger.tags = ['Tickets']
// #swagger.description = 'Cancela un ticket propio (elimina y suma stock al evento)'
// #swagger.parameters['id'] = { description: 'ID del ticket a cancelar' }
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Ticket cancelado', schema: { message: 'Ticket cancelado con éxito', ticket: { uniqueCode: 'ABC123' } } }
router.delete("/:id", verifyToken, cancelTicket);

export default router;
