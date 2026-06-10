import { getMyTicketsFromDB, cancelTicketInDB } from "../services/ticket.service.js";

export const getMyTickets = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const tickets = await getMyTicketsFromDB(userId);
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tickets", error: error.message });
  }
};

export const cancelTicket = async (req, res) => {
  try {
    const userId = req.user?.id;
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
