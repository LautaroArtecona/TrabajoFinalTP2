import { createEventInDB, getAllEventsFromDB } from "../services/event.service.js";

export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, price, stock } = req.body;

        if (!title || !date || !location || !price || !stock) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        // Le pasa los datos limpios al servicio
        const savedEvent = await createEventInDB({ title, description, date, location, price, stock });

        res.status(201).json({ message: "Evento creado con éxito", event: savedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el evento", error: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        // Llama al servicio para obtener los datos
        const events = await getAllEventsFromDB();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los eventos", error: error.message });
    }
};