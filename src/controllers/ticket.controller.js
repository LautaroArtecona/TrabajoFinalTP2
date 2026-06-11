import { getMyTicketsFromDB, createTicketInDB, cancelTicketInDB } from "../services/ticket.service.js";

export const getMyTickets = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const tickets = await getMyTicketsFromDB(userId);
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tickets", error: error.message });
  }
};

export const buyTicket = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const { eventId } = req.body; 
    if (!eventId) {
      return res.status(400).json({ message: "El ID del evento es requerido para la compra." });
    }

    const newTicket = await createTicketInDB(eventId, userId);

    res.status(201).json({ 
      message: "¡Compra realizada con éxito!", 
      ticket: newTicket 
    });

  } catch (error) {
      if (error.message.includes("stock") || error.message.includes("no existe")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al procesar la compra", error: error.message });
  }
};

export const cancelTicket = async (req, res) => {
  try {
   const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const ticketId = req.params.id;
    const deletedTicket = await cancelTicketInDB(ticketId, userId);

    res.status(200).json({ message: "Ticket cancelado con éxito", ticket: deletedTicket });
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al cancelar el ticket", error: error.message });
  }
};
