const mongoose = require("mongoose");

const TicketsSchema = new mongoose.Schema({
  nacionalidad: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  tarifa: {
    type: String,
    required: true
  },
  formadepago: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Tickets = mongoose.model("Tickets", TicketsSchema);

module.exports = Tickets;
