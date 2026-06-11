import Ticket from "../models/ticket.model.js";
import Event from "../models/event.model.js";
import crypto from "crypto";

export const getMyTicketsFromDB = async (userId) => {
  return await Ticket.find({ user: userId })
    .populate("event")
    .sort({ purchaseDate: -1 });
};

export const createTicketInDB = async (eventId, userId) => { 
  const event = await Event.findById(eventId); 
  if (!event) { throw new Error("El evento no existe.");} 

  if (event.stock <= 0) { throw new Error("Lo sentimos, no queda stock disponible para este evento.");} 

  const uniqueCode = crypto.randomBytes(4).toString("hex").toUpperCase();  
  const newTicket = await Ticket.create({ user: userId, event: eventId, uniqueCode: uniqueCode })  

  await Event.findByIdAndUpdate(eventId, { $inc: { stock: -1 } }); 
  return await newTicket.populate("event");
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
