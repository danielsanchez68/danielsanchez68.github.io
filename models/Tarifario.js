const mongoose = require("mongoose");

const TarifarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
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
  habiltado: {
    type: Boolean,
    default: 0
  }
});

const Tarifario = mongoose.model("Tarifario", TarifarioSchema);

module.exports = Tarifario;
