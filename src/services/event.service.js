import Event from "../models/event.model.js";

export const createEventInDB = async (eventData) => {
    const { title, date, price, stock } = eventData;

    // Evita que se creen eventos duplicados con el mismo nombre en la misma fecha
    const eventExists = await Event.findOne({ title: title.trim(), date: date });
    if (eventExists) {
        throw new Error("Ya existe un evento con ese mismo título para la fecha seleccionada.");
    }

    if (price < 0) throw new Error("El precio del ticket no puede ser negativo.");
    if (stock < 0) throw new Error("El stock inicial no puede ser negativo.");

    const newEvent = new Event(eventData);
    return await newEvent.save();
};


export const getAllEventsFromDB = async () => {
    // Traemos los eventos ordenados por fecha, para que los más próximos aparezcan primero.
    return await Event.find().sort({ date: 1 });
};