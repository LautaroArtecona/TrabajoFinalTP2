import mongoose from "mongoose";
const { Schema } = mongoose;

const ticketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Vincula con el modelo que creamos 
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event", // Vincula con el modelo que creamos 
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now, // Se setea la fecha al comprar
  },
  uniqueCode: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;