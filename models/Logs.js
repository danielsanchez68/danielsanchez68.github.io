const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  accion: {
    type: String
  },
  usuario: {
    type: String
  }
});

const Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs;
