import Ticket from "../models/ticket.model.js";
import Event from "../models/event.model.js";

export const getMyTicketsFromDB = async (userId) => {
  return await Ticket.find({ user: userId })
    .populate("event")
    .sort({ purchaseDate: -1 });
};

export const cancelTicketInDB = async (ticketId, userId) => {
  const ticket = await Ticket.findOne({ _id: ticketId, user: userId }).populate("event");
  if (!ticket) {
    throw new Error("Ticket no encontrado o no pertenece al usuario.");
  }

  const eventId = ticket.event?._id;
  await Ticket.deleteOne({ _id: ticketId });

  if (eventId) {
    await Event.findByIdAndUpdate(eventId, { $inc: { stock: 1 } });
  }

  return ticket;
};
