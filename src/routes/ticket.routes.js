import { Router } from "express";
import { getMyTickets, cancelTicket, buyTicket } from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/v1/tickets — devuelve los tickets del usuario autenticado
// #swagger.tags = ['Tickets']
// #swagger.description = 'Devuelve los tickets del usuario autenticado'
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Lista de tickets', schema: { tickets: [{ uniqueCode: 'ABC123', purchaseDate: '2026-06-10T00:00:00Z', event: { title: 'Evento ejemplo' } }] } }
router.get("/", verifyToken, getMyTickets);

// DELETE /api/v1/tickets/:id — cancela un ticket propio
// #swagger.tags = ['Tickets']
// #swagger.description = 'Cancela un ticket propio (elimina y suma stock al evento)'
// #swagger.parameters['id'] = { description: 'ID del ticket a cancelar' }
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Ticket cancelado', schema: { message: 'Ticket cancelado con éxito', ticket: { uniqueCode: 'ABC123' } } }
router.delete("/:id", verifyToken, cancelTicket);

// POST /api/v1/tickets — realiza la compra de un ticket para un evento
// #swagger.tags = ['Tickets']
// #swagger.description = 'Registra la compra de un ticket para un evento específico, genera el código único y resta 1 de stock.'
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.parameters['body'] = { in: 'body', description: 'ID del evento a comprar', required: true, schema: { eventId: '654c1234567890abcdef1234' } }
// #swagger.responses[201] = { description: '¡Compra realizada con éxito!', schema: { message: '¡Compra realizada con éxito!', ticket: { uniqueCode: 'XYZ987', event: '654c1234567890abcdef1234', user: '654b1111111111abcdef5555' } } }
// #swagger.responses[400] = { description: 'Falta el eventId o el evento no tiene stock disponible' }
router.post("/", verifyToken, buyTicket);

export default router;
